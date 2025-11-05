// Expense Tracker Application
class ExpenseTracker {
    constructor() {
        this.expenses = this.loadExpenses();
        this.currentFilter = {
            category: '',
            client: '',
            month: ''
        };
        this.init();
    }

    // Initialize the application
    init() {
        this.setupEventListeners();
        this.setDefaultDate();
        this.renderExpenses();
        this.updateSummary();
        this.populateFilters();
    }

    // Setup all event listeners
    setupEventListeners() {
        document.getElementById('expenseForm').addEventListener('submit', (e) => this.addExpense(e));
        document.getElementById('resetBtn').addEventListener('click', () => this.resetForm());
        document.getElementById('exportCSV').addEventListener('click', () => this.exportToCSV());
        document.getElementById('clearAll').addEventListener('click', () => this.clearAllData());
        document.getElementById('filterCategory').addEventListener('change', (e) => this.applyFilter('category', e.target.value));
        document.getElementById('filterClient').addEventListener('change', (e) => this.applyFilter('client', e.target.value));
        document.getElementById('filterMonth').addEventListener('change', (e) => this.applyFilter('month', e.target.value));
        document.getElementById('clearFilters').addEventListener('click', () => this.clearFilters());
    }

    // Set default date to today
    setDefaultDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('date').value = today;
    }

    // Add new expense
    addExpense(e) {
        e.preventDefault();

        const expense = {
            id: Date.now(),
            date: document.getElementById('date').value,
            category: document.getElementById('category').value,
            amount: parseFloat(document.getElementById('amount').value),
            gstRate: parseFloat(document.getElementById('gstRate').value),
            gstType: document.getElementById('gstType').value,
            client: document.getElementById('client').value || 'N/A',
            invoiceNumber: document.getElementById('invoiceNumber').value || 'N/A',
            paymentMode: document.getElementById('paymentMode').value,
            description: document.getElementById('description').value || 'N/A'
        };

        // Calculate GST
        expense.gstAmount = (expense.amount * expense.gstRate) / 100;
        expense.totalAmount = expense.amount + expense.gstAmount;

        // Add to expenses array
        this.expenses.unshift(expense);
        this.saveExpenses();
        this.renderExpenses();
        this.updateSummary();
        this.populateFilters();
        this.resetForm();

        // Show success message
        this.showMessage('Expense added successfully!', 'success');
    }

    // Delete expense
    deleteExpense(id) {
        if (confirm('Are you sure you want to delete this expense?')) {
            this.expenses = this.expenses.filter(expense => expense.id !== id);
            this.saveExpenses();
            this.renderExpenses();
            this.updateSummary();
            this.populateFilters();
            this.showMessage('Expense deleted successfully!', 'success');
        }
    }

    // Edit expense
    editExpense(id) {
        const expense = this.expenses.find(exp => exp.id === id);
        if (!expense) return;

        // Populate form with expense data
        document.getElementById('date').value = expense.date;
        document.getElementById('category').value = expense.category;
        document.getElementById('amount').value = expense.amount;
        document.getElementById('gstRate').value = expense.gstRate;
        document.getElementById('gstType').value = expense.gstType;
        document.getElementById('client').value = expense.client === 'N/A' ? '' : expense.client;
        document.getElementById('invoiceNumber').value = expense.invoiceNumber === 'N/A' ? '' : expense.invoiceNumber;
        document.getElementById('paymentMode').value = expense.paymentMode;
        document.getElementById('description').value = expense.description === 'N/A' ? '' : expense.description;

        // Delete the old entry
        this.expenses = this.expenses.filter(exp => exp.id !== id);
        this.saveExpenses();
        this.renderExpenses();
        this.updateSummary();

        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.showMessage('Expense loaded for editing. Update and submit.', 'info');
    }

    // Reset form
    resetForm() {
        document.getElementById('expenseForm').reset();
        this.setDefaultDate();
    }

    // Render expenses in table
    renderExpenses() {
        const tbody = document.getElementById('expensesBody');
        const filteredExpenses = this.getFilteredExpenses();

        if (filteredExpenses.length === 0) {
            tbody.innerHTML = '<tr class="no-data"><td colspan="10">No expenses found matching your filters.</td></tr>';
            return;
        }

        tbody.innerHTML = filteredExpenses.map(expense => `
            <tr class="expense-row">
                <td>${this.formatDate(expense.date)}</td>
                <td>${expense.category}</td>
                <td>${expense.description}</td>
                <td>${expense.client}</td>
                <td class="amount-cell">₹${expense.amount.toFixed(2)}</td>
                <td class="gst-cell">₹${expense.gstAmount.toFixed(2)} (${expense.gstRate}% ${expense.gstType})</td>
                <td class="total-cell">₹${expense.totalAmount.toFixed(2)}</td>
                <td>${expense.invoiceNumber}</td>
                <td>${expense.paymentMode}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-warning" onclick="tracker.editExpense(${expense.id})">Edit</button>
                        <button class="btn btn-danger" onclick="tracker.deleteExpense(${expense.id})">Delete</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    // Get filtered expenses
    getFilteredExpenses() {
        return this.expenses.filter(expense => {
            const categoryMatch = !this.currentFilter.category || expense.category === this.currentFilter.category;
            const clientMatch = !this.currentFilter.client || expense.client === this.currentFilter.client;
            const monthMatch = !this.currentFilter.month || expense.date.startsWith(this.currentFilter.month);

            return categoryMatch && clientMatch && monthMatch;
        });
    }

    // Apply filter
    applyFilter(type, value) {
        this.currentFilter[type] = value;
        this.renderExpenses();
        this.updateSummary();
    }

    // Clear all filters
    clearFilters() {
        this.currentFilter = {
            category: '',
            client: '',
            month: ''
        };
        document.getElementById('filterCategory').value = '';
        document.getElementById('filterClient').value = '';
        document.getElementById('filterMonth').value = '';
        this.renderExpenses();
        this.updateSummary();
    }

    // Populate filter dropdowns
    populateFilters() {
        // Categories
        const categories = [...new Set(this.expenses.map(exp => exp.category))].sort();
        const categoryFilter = document.getElementById('filterCategory');
        categoryFilter.innerHTML = '<option value="">All Categories</option>' +
            categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');

        // Clients
        const clients = [...new Set(this.expenses.map(exp => exp.client).filter(c => c !== 'N/A'))].sort();
        const clientFilter = document.getElementById('filterClient');
        clientFilter.innerHTML = '<option value="">All Clients</option>' +
            clients.map(client => `<option value="${client}">${client}</option>`).join('');
    }

    // Update summary statistics
    updateSummary() {
        const filteredExpenses = this.getFilteredExpenses();

        const totalExpenses = filteredExpenses.reduce((sum, exp) => sum + exp.totalAmount, 0);
        const totalGST = filteredExpenses.reduce((sum, exp) => sum + exp.gstAmount, 0);

        // Calculate current month expenses
        const currentMonth = new Date().toISOString().slice(0, 7);
        const monthExpenses = filteredExpenses
            .filter(exp => exp.date.startsWith(currentMonth))
            .reduce((sum, exp) => sum + exp.totalAmount, 0);

        document.getElementById('totalExpenses').textContent = `₹${totalExpenses.toFixed(2)}`;
        document.getElementById('totalGST').textContent = `₹${totalGST.toFixed(2)}`;
        document.getElementById('monthExpenses').textContent = `₹${monthExpenses.toFixed(2)}`;
        document.getElementById('totalEntries').textContent = filteredExpenses.length;
    }

    // Format date for display
    formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // Export to CSV
    exportToCSV() {
        if (this.expenses.length === 0) {
            alert('No expenses to export!');
            return;
        }

        const filteredExpenses = this.getFilteredExpenses();

        // CSV Headers
        const headers = [
            'Date', 'Category', 'Description', 'Client/Project',
            'Amount', 'GST Rate', 'GST Type', 'GST Amount', 'Total Amount',
            'Invoice Number', 'Payment Mode'
        ];

        // CSV Rows
        const rows = filteredExpenses.map(exp => [
            this.formatDate(exp.date),
            exp.category,
            exp.description,
            exp.client,
            exp.amount.toFixed(2),
            `${exp.gstRate}%`,
            exp.gstType,
            exp.gstAmount.toFixed(2),
            exp.totalAmount.toFixed(2),
            exp.invoiceNumber,
            exp.paymentMode
        ]);

        // Summary rows
        const totalAmount = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
        const totalGST = filteredExpenses.reduce((sum, exp) => sum + exp.gstAmount, 0);
        const grandTotal = filteredExpenses.reduce((sum, exp) => sum + exp.totalAmount, 0);

        rows.push([]);
        rows.push(['', '', '', 'TOTAL:', totalAmount.toFixed(2), '', '', totalGST.toFixed(2), grandTotal.toFixed(2), '', '']);

        // Create CSV content
        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        // Download CSV
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', `expense_report_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.showMessage('Expenses exported successfully!', 'success');
    }

    // Clear all data
    clearAllData() {
        if (confirm('Are you sure you want to delete ALL expense records? This cannot be undone!')) {
            if (confirm('Really sure? This will permanently delete all your data!')) {
                this.expenses = [];
                this.saveExpenses();
                this.renderExpenses();
                this.updateSummary();
                this.populateFilters();
                this.showMessage('All data cleared!', 'success');
            }
        }
    }

    // Show message (simple alert for now)
    showMessage(message, type) {
        alert(message);
    }

    // Save expenses to localStorage
    saveExpenses() {
        localStorage.setItem('expenses', JSON.stringify(this.expenses));
    }

    // Load expenses from localStorage
    loadExpenses() {
        const stored = localStorage.getItem('expenses');
        return stored ? JSON.parse(stored) : [];
    }
}

// Initialize the application
let tracker;
document.addEventListener('DOMContentLoaded', () => {
    tracker = new ExpenseTracker();
});
