# Expense Tracker for CA Practice

A comprehensive expense tracking application designed specifically for Chartered Accountants in India. Track expenses, manage GST, monitor client-wise spending, and export reports with ease.

## Features

### Core Functionality
- **Add, Edit, and Delete Expenses** - Complete CRUD operations for expense management
- **GST Calculation** - Automatic GST calculation with support for CGST+SGST and IGST
- **Multiple GST Rates** - Support for 0%, 5%, 12%, 18%, and 28% GST rates
- **Client/Project Tracking** - Track expenses by client or project
- **Payment Mode Tracking** - Record payment methods (Cash, Bank Transfer, UPI, Cards, Cheque)

### Indian CA-Specific Features
- **Pre-defined Categories** - Common CA practice expense categories:
  - Office Rent
  - Utilities (Electric/Water/Internet)
  - Salaries & Wages
  - Professional Fees
  - Stationery & Printing
  - Software & Subscriptions
  - Travel & Conveyance
  - Communication
  - Books & Periodicals
  - Marketing & Advertisement
  - And more...

- **GST Type Selection** - Choose between CGST+SGST or IGST
- **Invoice Number Tracking** - Record bill/invoice numbers for reference
- **Financial Year Compatibility** - Works with Indian financial year (April-March)

### Analytics & Reporting
- **Real-time Summary Dashboard**
  - Total Expenses (including GST)
  - Total GST Amount
  - Current Month Expenses
  - Total Number of Entries

- **Advanced Filtering**
  - Filter by Category
  - Filter by Client/Project
  - Filter by Month
  - Clear all filters instantly

- **Export to CSV** - Export filtered expenses to CSV format with summary totals

### Data Management
- **Local Storage** - All data stored locally in your browser
- **No Server Required** - Works completely offline
- **Data Privacy** - Your data never leaves your computer

## Installation & Usage

### Quick Start

1. **Clone or Download** this repository to your computer

2. **Open the Application**
   - Simply open `index.html` in any modern web browser
   - No installation or server setup required!

3. **Start Tracking**
   - Fill in the expense form
   - Click "Add Expense"
   - View your expenses in the table below

### Detailed Usage

#### Adding an Expense

1. **Fill in Required Fields** (marked with *):
   - **Date**: Select the expense date
   - **Category**: Choose from predefined categories
   - **Amount**: Enter the base amount (before GST)

2. **GST Details**:
   - Select GST Rate (0%, 5%, 12%, 18%, 28%)
   - Choose GST Type (CGST+SGST or IGST)
   - GST amount will be calculated automatically

3. **Optional Information**:
   - Client/Project name
   - Invoice/Bill number
   - Payment mode
   - Detailed description

4. Click **"Add Expense"** to save

#### Editing an Expense

1. Click the **"Edit"** button on any expense row
2. The form will populate with existing data
3. Make your changes
4. Click **"Add Expense"** to save the updated entry

#### Filtering Expenses

Use the filter section to view specific expenses:
- Select a **category** to see expenses in that category only
- Select a **client** to see client-specific expenses
- Select a **month** to view monthly expenses
- Click **"Clear Filters"** to reset all filters

#### Exporting Data

1. Apply any filters (optional) to export specific data
2. Click **"Export to CSV"**
3. The file will download automatically with:
   - All filtered expense details
   - Summary totals at the bottom
   - Filename includes current date

#### Managing Data

- **Clear Form**: Reset the form without saving
- **Clear All Data**: Delete all expense records (requires double confirmation)

## Technical Details

### File Structure
```
expense-tracker/
├── index.html      # Main application page
├── styles.css      # Styling and layout
├── app.js          # Application logic
└── README.md       # Documentation
```

### Technology Stack
- **HTML5** - Structure
- **CSS3** - Styling with modern gradients and animations
- **Vanilla JavaScript** - No frameworks required
- **LocalStorage API** - Data persistence

### Browser Compatibility
Works on all modern browsers:
- Chrome/Edge (v90+)
- Firefox (v88+)
- Safari (v14+)
- Opera (v76+)

### Data Storage
- All data stored in browser's `localStorage`
- No external database required
- Data persists until manually cleared
- Each browser/device maintains separate data

## Features for CA Practice

### Why This Tool is Perfect for CAs

1. **GST Compliance**
   - Track GST input credit
   - Separate CGST+SGST and IGST tracking
   - Support for all GST rates

2. **Client Management**
   - Track expenses by client/project
   - Generate client-wise expense reports
   - Filter and export client-specific data

3. **Professional Categories**
   - Pre-configured with CA practice expenses
   - Easy categorization for accounting
   - Aligned with common CA expense heads

4. **Quick Reporting**
   - Instant CSV export for accounting software
   - Monthly, quarterly, and annual views
   - Real-time expense summaries

5. **Audit Trail**
   - Invoice number tracking
   - Payment mode recording
   - Detailed descriptions
   - Date-wise tracking

## Tips & Best Practices

1. **Regular Data Export**
   - Export your data monthly as backup
   - Import CSV into your accounting software
   - Keep digital records of exported files

2. **Consistent Categorization**
   - Use the same categories consistently
   - Add client names in standard format
   - Record invoice numbers for future reference

3. **GST Input Credit**
   - Track all GST payments for input credit claims
   - Use filters to generate GST reports
   - Export monthly GST data for returns

4. **Browser Data**
   - Bookmark the application for easy access
   - Don't clear browser data without exporting first
   - Use the same browser/device for consistency

5. **Backup Strategy**
   - Export data weekly/monthly
   - Keep CSV files in organized folders
   - Name exports with dates (automatic)

## Customization

### Adding New Categories
Edit `index.html` around line 52 to add new expense categories:
```html
<option value="Your Category">Your Category</option>
```

### Changing GST Rates
Edit `index.html` around line 67 to modify GST rate options:
```html
<option value="15">15%</option>
```

### Styling
Modify `styles.css` to change colors, fonts, or layout to match your preferences.

## Security & Privacy

- **100% Client-Side**: All processing happens in your browser
- **No Data Transmission**: Data never sent to any server
- **No Tracking**: No analytics or tracking scripts
- **No Login Required**: No accounts or passwords needed
- **Your Data, Your Control**: Export and delete anytime

## License

MIT License - Free to use, modify, and distribute

## Version

**Version 1.0.0** - Initial Release
- Date: 2025-11-05
- Status: Production Ready

## Future Enhancements

Potential features for future versions:
- PDF export with professional formatting
- Multi-user support with cloud sync
- Recurring expense templates
- Budget tracking and alerts
- Financial year-wise reports
- Integration with accounting software
- Mobile app version
- Expense receipt photo uploads

## Acknowledgments

Built with care for the Chartered Accountant community in India.

---

**Happy Expense Tracking!**

For best results, use this tool alongside your regular accounting software for comprehensive financial management.
