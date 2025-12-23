# Testing Guide - Bulk Entries TDL Add-on

**Comprehensive Testing Documentation for TallyPrime 7.0**

---

## Table of Contents
1. [Testing Environment Setup](#testing-environment-setup)
2. [Loading the TDL](#loading-the-tdl)
3. [Menu Testing](#menu-testing)
4. [Functional Testing](#functional-testing)
5. [Performance Testing](#performance-testing)
6. [Error Handling Testing](#error-handling-testing)
7. [Runtime Validation](#runtime-validation)
8. [Known Limitations](#known-limitations)

---

## Testing Environment Setup

### Prerequisites

**System Requirements:**
- TallyPrime 7.0 (installed and running)
- Test company with sample data
- Minimum 4GB RAM
- Windows 10/11 or compatible OS

**Test Data Required:**
1. **Bank Ledgers** (at least 2):
   - HDFC Bank Current Account
   - ICICI Bank Savings Account

2. **Party Ledgers** (at least 10):
   - Customer ABC Ltd
   - Customer XYZ Pvt Ltd
   - Supplier Materials Ltd
   - Supplier Goods Co
   - (Add more as needed)

3. **Expense Ledgers**:
   - Rent Expense
   - Salary Expense
   - Electricity Expense

### Create Test Company

**Option 1: New Test Company**
```
1. Gateway → Create Company
2. Company Name: "Test - Bulk Entries"
3. Financial Year: Current year
4. Create bank and party ledgers as listed above
```

**Option 2: Use Existing Company**
```
1. Take backup first: Gateway → Backup
2. Ensure required ledgers exist
3. Period should not be locked
```

---

## Loading the TDL

### Method 1: Runtime Loading (Recommended for Testing)

**Assumption: TallyPrime 7.0 is already running**

#### Step 1: Enable Developer Mode

```
1. Press F12 (Configure)
2. Navigate to: Display → TDL/Developer
3. Set Developer Mode: Yes
4. Accept and return to Gateway
```

#### Step 2: Load TDL File

```
1. Press Ctrl+Shift+Alt+T (TDL Viewer)
   OR
   F12 → Display → TDL/Developer → View TDL

2. If prompted with TDL list screen:
   - Press Alt+L (Load TDL)
   - Browse to: BulkEntries.tdl
   - Select and press Enter

3. Alternative method:
   - Press F12
   - Go to: TDL Names
   - Enter full path: C:\Path\to\BulkEntries.tdl
   - Press Enter, then Ctrl+A
```

#### Step 3: Verify TDL Loaded

```
1. Press Alt+O (View TDL Errors)
2. Check if any errors listed
3. If no errors → TDL loaded successfully
4. If errors → Check file path and syntax
```

**Expected Output:**
```
No TDL compilation errors
```

### Method 2: tally.ini Configuration

```
1. Close TallyPrime
2. Navigate to: C:\Users\[YourUsername]\TallyPrime\
3. Edit tally.ini
4. Add line: TDL = C:\Path\to\BulkEntries.tdl
5. Save and restart TallyPrime
```

---

## Menu Testing

### Test Case 1: Main Menu Visibility

**Objective:** Verify Bulk Entries menu appears under Banking

**Steps:**
```
1. Open TallyPrime
2. Select test company
3. Press Alt+G (Gateway of Tally)
4. Navigate to: Banking
5. Look for "Bulk Entries" option
```

**Expected Result:**
```
Gateway of Tally
  ├─ Accounting Vouchers
  ├─ Banking
  │   ├─ Bank Reconciliation
  │   ├─ Cheque Printing
  │   ├─ Bulk Entries ← NEW MENU SHOULD APPEAR HERE
  │   └─ ...
```

**Status:** ✅ Pass / ❌ Fail

**Screenshot Location:** [Attach screenshot if needed]

---

### Test Case 2: Submenu Structure

**Objective:** Verify all submenu items present

**Steps:**
```
1. Gateway → Banking → Bulk Entries
2. Observe menu items
```

**Expected Result:**
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

**Validation:**
- [ ] Bulk Receipts visible
- [ ] Bulk Payments visible
- [ ] XML Import visible
- [ ] Configuration visible
- [ ] Quit visible

**Status:** ✅ Pass / ❌ Fail

---

## Functional Testing

### Test Case 3: Bank Selection Screen (Receipts)

**Objective:** Test bank selection functionality

**Steps:**
```
1. Gateway → Banking → Bulk Entries → Bulk Receipts
2. Observe bank ledger list
3. Select "HDFC Bank Current Account"
4. Press Enter
```

**Expected Result:**
- List shows all ledgers under "Bank Accounts" group
- Bank names visible and selectable
- Screen title: "Select Bank Account for Bulk Receipts"

**Validation:**
- [ ] Bank list populated
- [ ] Ledgers sorted alphabetically
- [ ] Selection works on Enter
- [ ] Screen transitions to grid

**Status:** ✅ Pass / ❌ Fail

---

### Test Case 4: Bulk Receipt Grid Screen

**Objective:** Verify grid entry screen loads correctly

**Steps:**
```
1. After bank selection
2. Observe grid screen
```

**Expected Result:**
```
┌────────────────────────────────────────────────────────────┐
│  Bulk Receipt Entries For: HDFC Bank Current Account      │
│  Entry for each line will be created and voucher          │
│  numbers will be assigned automatically                   │
├────────────────────────────────────────────────────────────┤
│ Date   │ Ledger Name │ Bill Ref │ Amount │ Txn Type │ ... │
├────────────────────────────────────────────────────────────┤
│        │             │          │        │          │     │
│        │             │          │        │          │     │
└────────────────────────────────────────────────────────────┘
```

**Validation:**
- [ ] Title shows selected bank name
- [ ] Subtitle visible
- [ ] Column headers visible
- [ ] Columns: Date, Ledger, BillRef, Amount, TxnType, InstNo, InstDate, Narration
- [ ] Grid editable
- [ ] Footer shortcuts visible

**Status:** ✅ Pass / ❌ Fail

---

### Test Case 5: Single Receipt Entry Creation

**Objective:** Create one receipt voucher

**Test Data:**
```
Date:       Today's date
Ledger:     Customer ABC Ltd
Bill Ref:   New Ref → TEST-001
Amount:     10000.00
Txn Type:   Cash
Inst. No:   (leave blank)
Inst. Date: (leave blank)
Narration:  Test receipt entry
```

**Steps:**
```
1. In grid, enter data as above
2. Press Ctrl+A (Save All)
3. Observe summary message
```

**Expected Result:**
```
┌─────────────────────────────────┐
│          Summary                │
├─────────────────────────────────┤
│  Total Rows: 1                  │
│  Successfully Created: 1        │
│  Failed: 0                      │
└─────────────────────────────────┘
```

**Verification:**
```
1. Gateway → Display More Reports → Daybook
2. Filter today's date
3. Look for Receipt voucher
4. Voucher details should match:
   - Dr: HDFC Bank Current Account - 10000
   - Cr: Customer ABC Ltd - 10000
   - Narration: Test receipt entry
```

**Validation:**
- [ ] Voucher created successfully
- [ ] Correct ledgers
- [ ] Correct amount
- [ ] Narration saved
- [ ] Voucher number auto-assigned

**Status:** ✅ Pass / ❌ Fail

---

### Test Case 6: NEFT Receipt with Instrument Details

**Objective:** Test NEFT transaction with instrument number

**Test Data:**
```
Date:       Today's date
Ledger:     Customer XYZ Pvt Ltd
Bill Ref:   New Ref → TEST-002
Amount:     25000.00
Txn Type:   NEFT
Inst. No:   NEFT123456789
Inst. Date: Today's date
Narration:  NEFT payment test
```

**Steps:**
```
1. Enter data in grid
2. Save with Ctrl+A
```

**Expected Result:**
- Voucher created successfully
- Bank allocation includes:
  - Transaction Type: NEFT
  - Instrument Number: NEFT123456789
  - Instrument Date: Today's date

**Verification:**
```
1. Open created voucher from daybook
2. Check bank ledger entry
3. Press Alt+C (Bank Allocations)
4. Verify transaction type and instrument details
```

**Validation:**
- [ ] NEFT type saved
- [ ] Instrument number saved
- [ ] Instrument date saved
- [ ] All details visible in voucher

**Status:** ✅ Pass / ❌ Fail

---

### Test Case 7: Validation - Missing Ledger Name

**Objective:** Test validation when ledger is missing

**Test Data:**
```
Date:       Today's date
Ledger:     (leave blank)
Amount:     5000.00
Txn Type:   Cash
```

**Steps:**
```
1. Enter data with blank ledger
2. Press Ctrl+A
3. Observe error
```

**Expected Result:**
- Entry marked as Invalid (Red status)
- Error message: "Ledger name is required"
- Summary: Failed: 1

**Validation:**
- [ ] Validation triggered
- [ ] Error message clear
- [ ] No voucher created
- [ ] Other valid rows still processed

**Status:** ✅ Pass / ❌ Fail

---

### Test Case 8: Validation - Amount Zero/Negative

**Objective:** Test amount validation

**Test Data:**
```
Row 1: Amount = 0
Row 2: Amount = -1000
```

**Expected Result:**
- Both entries invalid
- Error: "Amount must be greater than 0"
- Amount field highlighted in red

**Status:** ✅ Pass / ❌ Fail

---

### Test Case 9: Validation - Instrument Number for Non-Cash

**Objective:** Test mandatory instrument number for NEFT/RTGS/UPI

**Test Data:**
```
Txn Type:   NEFT
Inst. No:   (leave blank)
```

**Expected Result:**
- Validation error
- Message: "Instrument number required for NEFT"

**Status:** ✅ Pass / ❌ Fail

---

### Test Case 10: Multiple Receipts (Bulk Test)

**Objective:** Create 10 receipts in one go

**Test Data:**
```
Create 10 rows with varying data:
- Mix of Cash, NEFT, UPI
- Different customers
- Different amounts
- Some with bill allocation, some on account
```

**Steps:**
```
1. Enter 10 rows
2. Press Ctrl+N to add rows as needed
3. Save with Ctrl+A
```

**Expected Result:**
```
Summary:
  Total Rows: 10
  Successfully Created: 10
  Failed: 0
```

**Validation:**
- [ ] All 10 vouchers created
- [ ] Voucher numbers sequential
- [ ] All details saved correctly
- [ ] No duplicate entries

**Status:** ✅ Pass / ❌ Fail

**Time Taken:** ______ seconds

---

### Test Case 11: Bulk Payment Entry

**Objective:** Test payment functionality

**Steps:**
```
1. Gateway → Banking → Bulk Entries → Bulk Payments
2. Select bank: ICICI Bank Savings Account
3. Enter payment data:
   - Ledger: Supplier Materials Ltd
   - Amount: 15000
   - Txn Type: Cheque
   - Inst. No: 456123
4. Save with Ctrl+A
```

**Expected Result:**
- Payment voucher created
- Dr: Supplier Materials Ltd
- Cr: ICICI Bank Savings Account

**Validation:**
- [ ] Voucher type = Payment
- [ ] Ledger entries correct (Dr/Cr reversed from Receipt)
- [ ] Bank allocation saved
- [ ] Amount correct

**Status:** ✅ Pass / ❌ Fail

---

### Test Case 12: Add Row (Ctrl+N)

**Objective:** Test new row addition

**Steps:**
```
1. In grid, enter 2 rows
2. Press Ctrl+N
3. Observe new row added
```

**Expected Result:**
- New blank row appears
- Cursor moves to new row
- Previous rows unchanged

**Status:** ✅ Pass / ❌ Fail

---

### Test Case 13: Delete Row (Alt+D)

**Objective:** Test row deletion

**Steps:**
```
1. In grid with 3 rows
2. Navigate to row 2
3. Press Alt+D
4. Confirm deletion if prompted
```

**Expected Result:**
- Row 2 deleted
- Rows 1 and 3 remain
- Row count decremented

**Status:** ✅ Pass / ❌ Fail

---

### Test Case 14: Bill-wise Allocation - New Ref

**Objective:** Test new bill reference creation

**Test Data:**
```
Ledger:   Customer ABC Ltd
Bill Ref: New Ref → INV-2025-001
Amount:   50000
```

**Steps:**
```
1. Enter data
2. In Bill Ref field, select "New Ref"
3. Enter: INV-2025-001
4. Save
```

**Expected Result:**
- Voucher created with bill allocation
- Bill name: INV-2025-001
- Bill amount: 50000

**Verification:**
```
1. Gateway → Display → Statement of Accounts
2. Select: Customer ABC Ltd
3. Check pending bills
4. INV-2025-001 should appear with amount 50000
```

**Status:** ✅ Pass / ❌ Fail

---

### Test Case 15: Bill-wise Allocation - Agst Ref

**Objective:** Test payment against existing bill

**Prerequisites:**
- Create a bill first (use Test Case 14)

**Test Data:**
```
Ledger:   Customer ABC Ltd
Bill Ref: Agst Ref → Select INV-2025-001
Amount:   50000
```

**Steps:**
```
1. Select "Agst Ref" in Bill Ref field
2. List of pending bills appears
3. Select INV-2025-001
4. Amount auto-fills or enter 50000
5. Save
```

**Expected Result:**
- Voucher created
- Bill cleared/adjusted
- Outstanding reduced

**Verification:**
```
1. Check Statement of Accounts
2. INV-2025-001 should show zero pending (if fully paid)
```

**Status:** ✅ Pass / ❌ Fail

---

### Test Case 16: Bill-wise Allocation - On Account

**Objective:** Test voucher without bill allocation

**Test Data:**
```
Ledger:   Customer ABC Ltd
Bill Ref: On Account
Amount:   10000
```

**Expected Result:**
- Voucher created
- No bill allocation
- Amount shown as advance

**Status:** ✅ Pass / ❌ Fail

---

### Test Case 17: Configuration Screen

**Objective:** Test configuration functionality

**Steps:**
```
1. Gateway → Banking → Bulk Entries → Configuration
2. Modify settings:
   - Receipt Voucher Type: Receipt
   - Payment Voucher Type: Payment
   - Transaction Types: Add "DD" (Demand Draft)
   - Narration Template: Custom format
3. Save (if save option available)
```

**Expected Result:**
- Configuration screen loads
- Fields editable
- Changes saved
- Applied to new entries

**Validation:**
- [ ] Configuration screen visible
- [ ] Fields modifiable
- [ ] Transaction type list updatable
- [ ] Changes persist

**Status:** ✅ Pass / ❌ Fail

---

### Test Case 18: XML Import - Test Mode

**Objective:** Test XML import in test mode

**Prerequisites:**
- sample_bulk_receipts.xml file available

**Steps:**
```
1. Gateway → Banking → Bulk Entries → XML Import
2. Input File: [Path to sample_bulk_receipts.xml]
3. Test Mode: Yes
4. Press Enter (Start Import)
5. Observe results
```

**Expected Result:**
- XML parsed successfully
- Preview shown
- No vouchers created
- Error list if any invalid entries

**Validation:**
- [ ] XML file loaded
- [ ] Parsing successful
- [ ] Preview visible
- [ ] No vouchers in daybook

**Status:** ✅ Pass / ❌ Fail

---

### Test Case 19: XML Import - Actual Import

**Objective:** Create vouchers from XML

**Steps:**
```
1. Same as Test Case 18
2. Test Mode: No
3. Start Import
```

**Expected Result:**
```
Import Complete
  Total Rows: 5 (based on sample file)
  Successfully Imported: 5
  Failed: 0
```

**Verification:**
- Check daybook
- 5 vouchers should be created
- All details as per XML

**Validation:**
- [ ] Vouchers created
- [ ] Count matches XML entries
- [ ] Details accurate
- [ ] Dates, amounts, ledgers correct

**Status:** ✅ Pass / ❌ Fail

---

## Performance Testing

### Test Case 20: 100 Rows Entry

**Objective:** Test performance with 100 entries

**Steps:**
```
1. Prepare 100 rows of data
2. Enter in grid
3. Measure time to save
```

**Expected Performance:**
- Entry time: < 30 minutes (manual entry)
- Save time: < 2 minutes
- Memory usage: Acceptable
- No crashes

**Metrics:**
- Entry start time: ________
- Entry end time: ________
- Total entry time: ________ minutes
- Save start time: ________
- Save end time: ________
- Total save time: ________ seconds

**Status:** ✅ Pass / ❌ Fail

---

### Test Case 21: 500 Rows Entry

**Objective:** Stress test with 500 entries

**Steps:**
```
1. Prepare 500 rows of test data
2. Enter in batches of 100
3. Save each batch
4. Monitor system performance
```

**Expected Performance:**
- Each batch: < 2 minutes save time
- Total time: < 15 minutes
- No memory leaks
- Stable performance

**Metrics:**
- Batch 1 save time: ________ seconds
- Batch 2 save time: ________ seconds
- Batch 3 save time: ________ seconds
- Batch 4 save time: ________ seconds
- Batch 5 save time: ________ seconds
- Total time: ________ minutes

**System Metrics:**
- RAM usage: ________ MB
- CPU usage: ________ %
- TallyPrime responsive: Yes / No

**Status:** ✅ Pass / ❌ Fail

---

### Test Case 22: 1000+ Rows Entry

**Objective:** Maximum capacity test

**Prerequisites:**
- System with 8GB+ RAM recommended
- Close other applications

**Steps:**
```
1. Prepare 1000 rows
2. Enter in batches of 200
3. Monitor performance
```

**Expected Result:**
- Completes successfully
- Time: < 30 minutes total
- No crashes

**Status:** ✅ Pass / ❌ Fail

**Notes:** _______________________________________

---

## Error Handling Testing

### Test Case 23: Invalid Ledger Name

**Test Data:**
```
Ledger: XYZ_NonExistent_Ledger_12345
```

**Expected Result:**
- Error during save
- Clear error message
- Entry marked invalid

**Status:** ✅ Pass / ❌ Fail

---

### Test Case 24: Locked Period

**Objective:** Test behavior when period is locked

**Steps:**
```
1. Lock current period: F11 → Security Control
2. Attempt to create entry with today's date
3. Observe error
```

**Expected Result:**
- Error message: Period locked
- No voucher created
- Clear error indication

**Status:** ✅ Pass / ❌ Fail

---

### Test Case 25: Insufficient User Rights

**Objective:** Test with restricted user

**Prerequisites:**
- Create user with no voucher creation rights

**Steps:**
```
1. Login as restricted user
2. Attempt bulk entry
3. Observe access control
```

**Expected Result:**
- Access denied or
- Voucher creation fails
- Clear error message

**Status:** ✅ Pass / ❌ Fail

---

### Test Case 26: Duplicate Voucher Detection

**Objective:** Test duplicate entry handling

**Test Data:**
```
Row 1: Ledger: Customer ABC, Amount: 10000, Date: Today
Row 2: Ledger: Customer ABC, Amount: 10000, Date: Today
       (Exact duplicate)
```

**Expected Result:**
- Warning about potential duplicate OR
- Both entries created (as Tally allows duplicates)
- User can verify in daybook

**Status:** ✅ Pass / ❌ Fail

**Note:** This is informational - Tally typically allows duplicate entries.

---

## Runtime Validation

### Test Case 27: TDL Syntax Check

**Objective:** Verify no TDL compilation errors

**Steps:**
```
1. After loading TDL
2. Press Alt+O (TDL Errors)
3. Review error list
```

**Expected Result:**
```
No TDL compilation errors found
```

**If Errors Found:**
- Document error message
- Line number
- Error description

**Status:** ✅ Pass / ❌ Fail

---

### Test Case 28: Screen Rendering

**Objective:** Verify all screens render correctly

**Screens to Check:**
- [ ] Bank selection screen - proper layout
- [ ] Bulk receipt grid - columns aligned
- [ ] Bulk payment grid - columns aligned
- [ ] XML import screen - fields visible
- [ ] Configuration screen - editable

**Issues to Look For:**
- Overlapping fields
- Missing labels
- Truncated text
- Alignment issues

**Status:** ✅ Pass / ❌ Fail

---

### Test Case 29: Memory Leak Test

**Objective:** Check for memory leaks during extended use

**Steps:**
```
1. Note TallyPrime memory usage (Task Manager)
2. Perform 10 bulk entry operations (50 rows each)
3. Check memory usage after each operation
4. Exit and re-enter multiple times
5. Monitor memory release
```

**Expected Result:**
- Memory usage stable
- No continuous increase
- Memory released on exit

**Metrics:**
- Initial memory: ________ MB
- After 5 operations: ________ MB
- After 10 operations: ________ MB
- After exit: ________ MB

**Status:** ✅ Pass / ❌ Fail

---

### Test Case 30: Multi-Company Test

**Objective:** Test TDL across multiple companies

**Steps:**
```
1. Create/open Company A
2. Perform bulk entry - 10 receipts
3. Shut company
4. Open Company B
5. Perform bulk entry - 10 receipts
6. Verify both companies have correct data
```

**Expected Result:**
- TDL works in both companies
- No data cross-contamination
- Vouchers saved to correct company

**Status:** ✅ Pass / ❌ Fail

---

## Known Limitations

### TallyPrime 7.0 Specific Observations

Based on testing, document any limitations:

1. **Grid Scrolling:**
   - Performance with 500+ rows: [Observation]
   - Recommended batch size: [Number]

2. **Ledger Lookup:**
   - Speed of ledger name suggestion: [Fast/Slow]
   - Lag with 1000+ ledgers: [Yes/No]

3. **Bank Allocation:**
   - All transaction types supported: [Yes/No/Partial]
   - Custom transaction types: [Supported/Not Supported]

4. **XML Import:**
   - Maximum file size tested: [Size]
   - Large file handling: [Performance notes]

5. **Bill Allocation:**
   - Partial bill payments: [Supported/Not Supported]
   - Multiple bill selection: [Supported/Not Supported]

6. **Screen Resolution:**
   - Minimum resolution: [Width x Height]
   - Layout issues on low resolution: [Yes/No]

7. **Keyboard Navigation:**
   - All shortcuts working: [Yes/No]
   - Alt+D deletion: [Working/Not Working]
   - Ctrl+A save: [Working/Not Working]

8. **Data Limits:**
   - Maximum rows in single operation: [Number]
   - Memory limit reached at: [Number] rows

---

## Test Summary Report Template

### Test Execution Summary

**Test Date:** _______________
**Tally Version:** TallyPrime 7.0
**TDL Version:** 1.0
**Tested By:** _______________
**Company:** Test - Bulk Entries

### Results

| Category | Total Tests | Passed | Failed | Skipped |
|----------|-------------|--------|--------|---------|
| Menu Testing | 2 | | | |
| Functional Testing | 17 | | | |
| Performance Testing | 3 | | | |
| Error Handling | 4 | | | |
| Runtime Validation | 4 | | | |
| **TOTAL** | **30** | | | |

**Pass Rate:** _______%

### Critical Issues Found

| Issue # | Description | Severity | Status |
|---------|-------------|----------|--------|
| 1 | | High/Medium/Low | Open/Fixed |
| 2 | | | |

### Recommendations

1. ___________________________________
2. ___________________________________
3. ___________________________________

### Sign-off

**Tester:** ___________________ Date: ___________
**Reviewer:** _________________ Date: ___________

---

## Automated Testing Script (Optional)

### PowerShell Script for Test Data Generation

```powershell
# Generate CSV test data for bulk entry
# Save as: generate_test_data.ps1

$outputFile = "bulk_receipt_test_data.csv"
$rowCount = 100

$header = "Date,Ledger,BillRef,Amount,TxnType,InstNo,InstDate,Narration"
$header | Out-File $outputFile

$ledgers = @("Customer A", "Customer B", "Customer C", "Customer D", "Customer E")
$txnTypes = @("Cash", "NEFT", "RTGS", "UPI", "Cheque")

for ($i = 1; $i -le $rowCount; $i++) {
    $date = (Get-Date).ToString("dd-MMM-yyyy")
    $ledger = $ledgers | Get-Random
    $billRef = "TEST-$($i.ToString('000'))"
    $amount = Get-Random -Minimum 1000 -Maximum 100000
    $txnType = $txnTypes | Get-Random
    $instNo = if ($txnType -eq "Cash") { "" } else { "INST$i" }
    $instDate = $date
    $narration = "Test entry $i"

    $row = "$date,$ledger,$billRef,$amount,$txnType,$instNo,$instDate,$narration"
    $row | Out-File $outputFile -Append
}

Write-Host "Generated $rowCount test records in $outputFile"
```

**Usage:**
```powershell
PS> .\generate_test_data.ps1
```

---

## Testing Checklist

### Pre-Testing
- [ ] TallyPrime 7.0 installed and running
- [ ] Test company created with sample data
- [ ] Bank ledgers created (minimum 2)
- [ ] Party ledgers created (minimum 10)
- [ ] TDL file available
- [ ] Sample XML files available

### During Testing
- [ ] Take screenshots of each screen
- [ ] Document errors with screenshots
- [ ] Note performance metrics
- [ ] Record any unusual behavior
- [ ] Test on actual data (after initial tests)

### Post-Testing
- [ ] Complete test summary report
- [ ] Document all issues found
- [ ] Verify all vouchers created correctly
- [ ] Check data integrity in Tally
- [ ] Create backup of test company
- [ ] Unload TDL and verify removal

---

**Testing Guide Version:** 1.0
**Last Updated:** December 2025
**Target Environment:** TallyPrime 7.0
