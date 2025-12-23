# User Guide - Bulk Entries Add-on for TallyPrime

**Accountant-Friendly Guide for Bulk Receipt & Payment Entries**

---

## Table of Contents
1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Bulk Receipt Entry](#bulk-receipt-entry)
4. [Bulk Payment Entry](#bulk-payment-entry)
5. [XML Import](#xml-import)
6. [Configuration](#configuration)
7. [Tips & Best Practices](#tips--best-practices)
8. [Troubleshooting](#troubleshooting)

---

## Overview

### What is Bulk Entries Add-on?

A time-saving tool for accountants to create multiple bank receipts and payments in a single grid interface, eliminating the need to enter vouchers one by one.

### Key Benefits
- ✅ Create 100+ vouchers in minutes instead of hours
- ✅ Excel-like grid interface - familiar and easy to use
- ✅ Automatic voucher numbering
- ✅ Built-in validations to prevent errors
- ✅ Support for all transaction types (Cash, Cheque, NEFT, RTGS, UPI, IMPS)
- ✅ Bill-wise allocation support
- ✅ XML import for bank statement reconciliation

### When to Use This Add-on?

**Perfect For:**
- Daily bank reconciliation entries
- Bulk customer payment receipts
- Bulk supplier payment processing
- Month-end bank statement entries
- Festival/year-end payment processing

**Not Recommended For:**
- Single voucher entry (use standard Tally entry)
- Complex journal entries
- Inventory vouchers

---

## Getting Started

### Accessing the Add-on

1. Open TallyPrime
2. Select your company
3. From **Gateway of Tally**, navigate:
   ```
   Gateway of Tally → Banking → Bulk Entries
   ```

4. You'll see the main menu:
   ```
   ┌─────────────────────────────────┐
   │        Bulk Entries             │
   ├─────────────────────────────────┤
   │  Bulk Receipts                  │
   │  Bulk Payments                  │
   │  XML Import                     │
   │  Configuration                  │
   │  Quit                           │
   └─────────────────────────────────┘
   ```

---

## Bulk Receipt Entry

### Step-by-Step Process

#### Step 1: Access Bulk Receipts
- From Bulk Entries menu, select **Bulk Receipts**

#### Step 2: Select Bank Account
- A list of all bank ledgers will appear
- Select the bank account where money is being received
- Example: "HDFC Bank Current Account"

**Note:** If no banks appear, create bank ledgers first:
```
Gateway → Accounts Info → Ledgers → Create
- Name: HDFC Bank Current Account
- Under: Bank Accounts
```

#### Step 3: Grid Entry Screen

You'll see a screen titled:
```
Bulk Receipt Entries For: HDFC Bank Current Account

Entry for each line will be created and voucher numbers
will be assigned automatically
```

**Grid Columns:**

| Column | Description | Example |
|--------|-------------|---------|
| **Date** | Receipt date | 23-Dec-2025 |
| **Ledger Name** | Customer/Party ledger | ABC Traders |
| **Bill Ref** | Bill reference (New Ref/Agst Ref/On Account) | INV-2025-001 |
| **Amount** | Receipt amount | 50000.00 |
| **Txn Type** | Transaction type | NEFT |
| **Inst. No** | Cheque/UTR number | NEFT123456789 |
| **Inst. Date** | Instrument date | 23-Dec-2025 |
| **Narration** | Description/remarks | Payment received for Dec invoice |

#### Step 4: Enter Data

**Row 1 Example - Cash Receipt:**
```
Date:         23-Dec-2025
Ledger:       Customer ABC Ltd
Bill Ref:     New Ref → Enter: INV-2025-001
Amount:       50000
Txn Type:     Cash
Inst. No:     (skip - not needed for cash)
Inst. Date:   (skip)
Narration:    Payment received for Invoice INV-2025-001
```

**Row 2 Example - NEFT Receipt:**
```
Date:         23-Dec-2025
Ledger:       Customer XYZ Pvt Ltd
Bill Ref:     Agst Ref → Select existing bill
Amount:       125000
Txn Type:     NEFT
Inst. No:     NEFT123456789
Inst. Date:   23-Dec-2025
Narration:    NEFT payment received
```

**Row 3 Example - UPI Receipt:**
```
Date:         23-Dec-2025
Ledger:       Walk-in Customer
Bill Ref:     On Account
Amount:       5500
Txn Type:     UPI
Inst. No:     436712345678
Inst. Date:   23-Dec-2025
Narration:    UPI payment - Order #1234
```

#### Step 5: Add More Rows
- Press `Ctrl+N` to add a new row
- Continue entering data

#### Step 6: Delete Rows (if needed)
- Navigate to the row to delete
- Press `Alt+D`

#### Step 7: Save All Entries
- Review all entries for accuracy
- Press `Ctrl+A` to save all

#### Step 8: View Summary
After saving, you'll see:
```
┌─────────────────────────────────┐
│          Summary                │
├─────────────────────────────────┤
│  Total Rows: 50                 │
│  Successfully Created: 48       │
│  Failed: 2                      │
└─────────────────────────────────┘
```

**Status Column Colors:**
- 🟦 Blue = New (not saved yet)
- 🟢 Green = Posted (voucher created)
- 🔴 Red = Invalid (error - check details)

---

## Bulk Payment Entry

### Step-by-Step Process

#### Step 1: Access Bulk Payments
- From Bulk Entries menu, select **Bulk Payments**

#### Step 2: Select Bank Account
- Select the bank from which payment is made
- Example: "ICICI Bank Current Account"

#### Step 3: Grid Entry Screen

Similar to Bulk Receipts, but for payments.

**Grid Columns:** Same as receipts

#### Step 4: Enter Data

**Row 1 Example - Cash Payment to Supplier:**
```
Date:         23-Dec-2025
Ledger:       Supplier ABC Pvt Ltd
Bill Ref:     Agst Ref → Select: PUR-2025-050
Amount:       35000
Txn Type:     Cash
Inst. No:     (skip)
Inst. Date:   (skip)
Narration:    Payment for Purchase Invoice PUR-2025-050
```

**Row 2 Example - Cheque Payment:**
```
Date:         23-Dec-2025
Ledger:       Office Rent
Bill Ref:     On Account
Amount:       45000
Txn Type:     Cheque
Inst. No:     456123
Inst. Date:   23-Dec-2025
Narration:    Rent payment for December 2025
```

**Row 3 Example - NEFT Payment:**
```
Date:         23-Dec-2025
Ledger:       Supplier XYZ Ltd
Bill Ref:     New Ref → Enter: PUR-2025-051
Amount:       95000
Txn Type:     NEFT
Inst. No:     NEFT987654321
Inst. Date:   23-Dec-2025
Narration:    NEFT payment for raw materials
```

#### Step 5: Save
- Press `Ctrl+A` to save all entries

---

## Transaction Types Explained

### Available Types

| Type | When to Use | Instrument No. Required? |
|------|-------------|--------------------------|
| **Cash** | Physical cash transactions | No |
| **Cheque** | Payment by cheque | Yes (Cheque number) |
| **NEFT** | Online bank transfer (NEFT) | Yes (UTR/Reference number) |
| **RTGS** | High-value bank transfer | Yes (UTR/Reference number) |
| **UPI** | UPI payments (PhonePe, GPay, etc.) | Yes (Transaction ID) |
| **IMPS** | Immediate payment service | Yes (Transaction ID) |
| **Others** | Any other mode | Optional |

### Bill Reference Types

| Type | Description | When to Use |
|------|-------------|-------------|
| **New Ref** | Create new bill entry | For new invoices/bills |
| **Agst Ref** | Against existing bill | To clear pending bills |
| **On Account** | No bill allocation | Advance payments or expenses |

---

## XML Import

### When to Use XML Import?

- Importing bank statement data
- Bulk entries prepared externally
- Integration with other systems

### Step-by-Step Process

#### Step 1: Prepare XML File
- Use provided sample files as template
- Edit in XML editor or text editor
- Ensure proper XML structure

**Sample XML Structure:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<ENVELOPE>
  <BODY>
    <IMPORTDATA>
      <REQUESTDATA>
        <TALLYMESSAGE>
          <VOUCHER VCHTYPE="Receipt" ACTION="Create">
            <DATE>20251223</DATE>
            <VOUCHERTYPENAME>Receipt</VOUCHERTYPENAME>
            <NARRATION>Payment received</NARRATION>
            <!-- More details -->
          </VOUCHER>
        </TALLYMESSAGE>
      </REQUESTDATA>
    </IMPORTDATA>
  </BODY>
</ENVELOPE>
```

#### Step 2: Access XML Import
- From Bulk Entries menu, select **XML Import**

#### Step 3: Configure Import
```
┌──────────────────────────────────────────────────┐
│  === BULK RECEIPT / PAYMENT VOUCHER IMPORT ===   │
├──────────────────────────────────────────────────┤
│  Input File (XML):  C:\Data\receipts.xml         │
│  Test Mode (No Save):  Yes / No                  │
│                                                  │
│  [Enter] Start Import    [Esc] Cancel            │
└──────────────────────────────────────────────────┘
```

**Fields:**
- **Input File**: Full path to XML file
- **Test Mode**:
  - `Yes` = Preview only, no vouchers created
  - `No` = Create vouchers

#### Step 4: Test Import (Recommended)
- Set Test Mode: `Yes`
- Press `Enter` to start
- Review results
- Check for errors

#### Step 5: Actual Import
- Set Test Mode: `No`
- Press `Enter`
- Vouchers will be created

#### Step 6: View Summary
```
┌─────────────────────────────────┐
│      Import Complete            │
├─────────────────────────────────┤
│  Total Rows: 100                │
│  Successfully Imported: 97      │
│  Failed: 3                      │
└─────────────────────────────────┘
```

---

## Configuration

### Customizing Settings

#### Access Configuration
- From Bulk Entries menu, select **Configuration**

#### Available Settings

```
┌──────────────────────────────────────────────────┐
│        Bulk Entries Configuration                │
├──────────────────────────────────────────────────┤
│  Default Receipt Voucher Type:  Receipt          │
│  Default Payment Voucher Type:  Payment          │
│  Transaction Types (;-separated):                │
│    Cash;Cheque;NEFT;RTGS;UPI;IMPS;Others         │
│  Narration Template:                             │
│    Txn:<<Type>> | Inst:<<No>> | Dt:<<Date>>      │
│                                                  │
│  [Enter] Save Configuration  [Esc] Cancel        │
└──────────────────────────────────────────────────┘
```

#### Customization Options

**1. Voucher Types**
- Change if you use custom voucher types
- Example: "Bank Receipt" instead of "Receipt"

**2. Transaction Types**
- Add/remove transaction types
- Format: Separate with semicolon (;)
- Example: `Cash;Cheque;NEFT;RTGS;UPI;IMPS;DD;Others`

**3. Narration Template**
- Customize automatic narration format
- Placeholders:
  - `<<Type>>` = Transaction type
  - `<<No>>` = Instrument number
  - `<<Date>>` = Instrument date
- Example: `Mode: <<Type>>, Ref: <<No>>, Date: <<Date>>`

---

## Tips & Best Practices

### Data Entry Tips

1. **Prepare Data in Excel First**
   - Maintain Excel sheet with all columns
   - Copy-paste ready
   - Easier to review before entry

2. **Use Consistent Date Format**
   - Stick to DD-MM-YYYY or DD-Mon-YYYY
   - Avoid confusion

3. **Ledger Name Accuracy**
   - Use exact ledger names from Tally
   - Enable name suggestion (appears while typing)
   - Create missing ledgers before bulk entry

4. **Bill-wise Entries**
   - For New Ref: Enter unique bill numbers
   - For Agst Ref: Select from list
   - For On Account: Leave as is

5. **Instrument Details**
   - Always enter for non-cash transactions
   - Helps in bank reconciliation
   - Required for audit trail

### Workflow Best Practices

1. **Daily Reconciliation**
   - Enter receipts daily
   - Don't accumulate entries
   - Easier to track errors

2. **Batch Processing**
   - For 500+ entries, split into batches
   - Process 100-200 rows at a time
   - Reduces memory load

3. **Validation Before Save**
   - Review all red-colored fields
   - Check amounts carefully
   - Verify ledger names

4. **Backup Before Bulk Operations**
   - Take company backup before large imports
   - Easy rollback if needed

### Performance Tips

1. **Close Unnecessary Programs**
   - For 500+ entries, close other applications
   - Improves TallyPrime performance

2. **Disable Tally Sync During Entry**
   - Temporarily disable cloud sync
   - Re-enable after completion

3. **Use SSD if Available**
   - Faster data writing
   - Smoother grid scrolling

---

## Troubleshooting

### Common Issues & Solutions

#### Issue 1: Ledger Not Found

**Error:** "Ledger name is required" or Red highlighting

**Solution:**
1. Check spelling of ledger name
2. Create ledger if doesn't exist:
   ```
   Gateway → Accounts Info → Ledgers → Create
   ```
3. Use ledger name suggestion (appears while typing)

---

#### Issue 2: Amount Validation Error

**Error:** "Amount must be greater than 0" or Red highlighting

**Solution:**
1. Ensure amount is positive number
2. No alphabets or special characters
3. Use decimal point (.) not comma (,)
4. Example: `50000.00` ✅ not `50,000` ❌

---

#### Issue 3: Instrument Number Required

**Error:** "Instrument number required for NEFT"

**Solution:**
1. For non-cash transactions, instrument number is mandatory
2. Enter cheque number, UTR, or transaction ID
3. If not available, use transaction type "Others"

---

#### Issue 4: Vouchers Not Created

**Error:** Failed count showing in summary

**Solution:**
1. Check TallyPrime voucher creation rights
2. Verify voucher type exists
3. Ensure period is not locked
4. Check if ledgers exist
5. Review validation errors

---

#### Issue 5: Duplicate Entries

**Problem:** Same entry created twice

**Prevention:**
1. Don't press Ctrl+A multiple times
2. Wait for summary screen
3. Check daybook after save

**Fix:**
1. Delete duplicate vouchers manually
2. Use Tally's duplicate detection

---

#### Issue 6: Grid Scrolling Slow

**Problem:** Slow performance with many rows

**Solution:**
1. Process in smaller batches
2. Close other TallyPrime reports
3. Increase system RAM
4. Use faster storage (SSD)

---

## Keyboard Shortcuts Reference

### Main Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+A` | Save all entries |
| `Ctrl+N` | Add new row |
| `Alt+D` | Delete current row |
| `Esc` | Exit / Go back |
| `Enter` | Move to next field |
| `Tab` | Move to next column |
| `Shift+Tab` | Move to previous column |
| `↑` `↓` | Navigate rows |
| `←` `→` | Navigate columns |

### TallyPrime Standard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Alt+G` | Gateway of Tally |
| `F12` | Configure |
| `Alt+O` | View TDL errors |
| `Ctrl+Q` | Quit / Close |

---

## Sample Scenarios

### Scenario 1: Daily Customer Receipts (50 receipts)

**Time Saved:** 2 hours → 15 minutes

**Process:**
1. Maintain Excel with customer names and amounts
2. Select bank: "HDFC Current Account"
3. Grid entry:
   - Date: Today's date for all
   - Copy ledger names from Excel
   - Bill Ref: New Ref (auto-generate numbers)
   - Enter amounts
   - Txn Type: As per actual (Cash/NEFT/UPI)
4. Save: Ctrl+A

---

### Scenario 2: Month-end Supplier Payments (100 payments)

**Time Saved:** 4 hours → 30 minutes

**Process:**
1. Export pending bills from Tally
2. Prepare payment list in Excel
3. Select bank: "ICICI Current Account"
4. Grid entry in batches of 25:
   - Ledger: Supplier names
   - Bill Ref: Agst Ref (select from list)
   - Amount: Payment amount
   - Txn Type: NEFT (mostly)
   - Inst. No: Copy UTR from bank statement
5. Save batch: Ctrl+A
6. Repeat for next batch

---

### Scenario 3: Bank Statement Import (200 transactions)

**Time Saved:** 6 hours → 45 minutes

**Process:**
1. Download bank statement in Excel
2. Convert to XML format using template
3. Use XML Import feature
4. Test Mode: Yes (first run)
5. Review errors, fix in XML
6. Test Mode: No (actual import)
7. Verify in daybook

---

## Reporting & Verification

### Verify Created Vouchers

1. **Daybook**
   ```
   Gateway → Display More Reports → Daybook
   Filter by date range
   ```

2. **Bank Ledger**
   ```
   Gateway → Display More Reports → Account Books → Ledger
   Select bank ledger
   View all entries
   ```

3. **Party-wise Summary**
   ```
   Gateway → Display More Reports → Outstanding Reports
   ```

### Export Data

- All vouchers created via add-on are standard Tally vouchers
- Can be exported using Tally's export features
- No special export needed

---

## Support & Help

### Getting Help

1. **Check Error Log**
   - Press `Alt+O` in TallyPrime
   - View TDL errors

2. **Consult This Guide**
   - Reference troubleshooting section

3. **Test with Sample Data**
   - Use test company first
   - Create 5-10 sample entries
   - Verify vouchers created correctly

### Best Contact for Issues

1. Your TallyPrime partner
2. IT administrator (for technical issues)
3. Refer to installation documentation

---

## Appendix: Field Validations

| Field | Validation | Error if Invalid |
|-------|------------|------------------|
| Date | Must be valid date within period | Red highlighting |
| Ledger | Must exist in masters | "Ledger name required" |
| Amount | Must be > 0 | "Amount must be greater than 0" |
| Txn Type | Must select from list | - |
| Inst. No | Required for non-cash | "Instrument number required" |
| Inst. Date | Valid date | Red highlighting |

---

## Quick Start Checklist

- [ ] TDL add-on installed
- [ ] Menu visible under Banking
- [ ] Bank ledgers created
- [ ] Party ledgers exist
- [ ] Test with 5 sample receipts
- [ ] Test with 5 sample payments
- [ ] Verify in daybook
- [ ] Ready for production use!

---

**User Guide Version:** 1.0
**Last Updated:** December 2025
**Target Users:** Accountants, Data Entry Operators, Tally Users
