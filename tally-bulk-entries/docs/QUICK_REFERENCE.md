# Quick Reference Guide - Bulk Entries Add-on

**One-Page Cheat Sheet for Daily Use**

---

## Menu Access
```
Gateway of Tally → Banking → Bulk Entries
```

---

## Keyboard Shortcuts

| Shortcut | Function |
|----------|----------|
| **Ctrl+A** | Save all entries |
| **Ctrl+N** | Add new row |
| **Alt+D** | Delete row |
| **Esc** | Exit/Back |
| **Enter** | Next field |
| **Tab** | Next column |
| **Shift+Tab** | Previous column |
| **↑ ↓** | Navigate rows |
| **F12** | Configure |
| **Alt+O** | View TDL errors |

---

## Grid Columns

| Column | Description | Required? | Example |
|--------|-------------|-----------|---------|
| **Date** | Voucher date | ✅ Yes | 23-Dec-2025 |
| **Ledger** | Party/Expense ledger | ✅ Yes | Customer ABC Ltd |
| **Bill Ref** | New/Agst/On Account | ✅ Yes | INV-2025-001 |
| **Amount** | Transaction amount | ✅ Yes | 50000.00 |
| **Txn Type** | Transaction mode | ✅ Yes | NEFT |
| **Inst. No** | Cheque/UTR number | ⚠️ For non-cash | NEFT123456789 |
| **Inst. Date** | Instrument date | ⚠️ For non-cash | 23-Dec-2025 |
| **Narration** | Description | Optional | Payment received |

---

## Transaction Types

| Type | When Required | Inst. No. Needed? |
|------|---------------|-------------------|
| **Cash** | Cash transactions | ❌ No |
| **Cheque** | Cheque payments | ✅ Yes |
| **NEFT** | NEFT transfers | ✅ Yes |
| **RTGS** | RTGS transfers | ✅ Yes |
| **UPI** | UPI payments | ✅ Yes |
| **IMPS** | IMPS transfers | ✅ Yes |
| **Others** | Other modes | Optional |

---

## Bill Reference Types

| Type | Use When |
|------|----------|
| **New Ref** | Creating new bill entry |
| **Agst Ref** | Paying against existing bill |
| **On Account** | Advance payment or no bill |

---

## Status Indicators

| Color | Meaning |
|-------|---------|
| 🟦 **Blue** | New entry (not saved) |
| 🟢 **Green** | Successfully posted |
| 🔴 **Red** | Validation error |

---

## Common Validations

| Error | Reason | Solution |
|-------|--------|----------|
| "Amount must be > 0" | Zero/negative amount | Enter positive amount |
| "Ledger name required" | Blank ledger | Select valid ledger |
| "Party cannot be bank" | Same as bank ledger | Choose different ledger |
| "Instrument number required" | Missing for NEFT/UPI/etc. | Enter UTR/Txn ID |

---

## Quick Workflow

### Bulk Receipts
1. **Select**: Bulk Receipts
2. **Choose Bank**: Select receiving bank
3. **Enter Data**: Fill grid
4. **Save**: Ctrl+A
5. **Verify**: Check summary

### Bulk Payments
1. **Select**: Bulk Payments
2. **Choose Bank**: Select paying bank
3. **Enter Data**: Fill grid
4. **Save**: Ctrl+A
5. **Verify**: Check summary

### XML Import
1. **Select**: XML Import
2. **File**: Enter XML path
3. **Test Mode**: Yes (first time)
4. **Import**: Press Enter
5. **Verify**: Check results

---

## File Locations

```
TDL File:    C:\Program Files\TallyPrime\TDL\BulkEntries.tdl
Config:      C:\Users\[User]\TallyPrime\tally.ini
Samples:     [Project]\samples\
```

---

## Troubleshooting (Quick Fixes)

| Problem | Quick Fix |
|---------|-----------|
| Menu not visible | Check tally.ini, restart Tally |
| No banks shown | Create ledger under "Bank Accounts" |
| Vouchers not created | Check period not locked |
| Slow performance | Process in batches of 100 |
| Error on save | Review red-highlighted fields |

---

## Performance Tips

- **Batch Size**: 100-200 rows optimal
- **Before Bulk Entry**: Close other applications
- **Large Data**: Disable cloud sync temporarily
- **Always**: Backup before bulk operations

---

## Best Practices

✅ **DO:**
- Test with 5-10 entries first
- Review summary after save
- Verify in daybook
- Backup before bulk operations
- Use consistent date format

❌ **DON'T:**
- Enter 500+ rows in one go
- Skip validation review
- Forget to check summary
- Use without testing first
- Ignore error messages

---

## Configuration Access

```
Gateway → Banking → Bulk Entries → Configuration
```

**Customizable:**
- Receipt voucher type
- Payment voucher type
- Transaction types list
- Narration template

---

## Sample Data Format

### Receipt Example
```
Date:       23-Dec-2025
Ledger:     Customer ABC Ltd
Bill Ref:   New Ref → INV-001
Amount:     50000
Txn Type:   NEFT
Inst. No:   NEFT123456789
Inst. Date: 23-Dec-2025
Narration:  Payment received
```

### Payment Example
```
Date:       23-Dec-2025
Ledger:     Supplier XYZ Ltd
Bill Ref:   Agst Ref → PUR-050
Amount:     35000
Txn Type:   Cheque
Inst. No:   456123
Inst. Date: 23-Dec-2025
Narration:  Payment made
```

---

## Emergency Contacts

**TDL Errors:** Press Alt+O in TallyPrime
**Support:** Consult Installation Guide
**Help:** See User Guide

---

## Version Info

**Add-on Version:** 1.0
**TallyPrime:** 7.0
**Last Updated:** December 2025

---

**Print this page for desk reference!**
