# Installation & Loading Guide - Bulk Entries TDL Add-on

## Target Environment
- **Primary**: TallyPrime 7.0
- **Secondary**: Tally.ERP 9 Release 6.6+ (compatible with minor adjustments)

---

## Method 1: Auto-Load Configuration (Recommended)

### For TallyPrime 7.0

1. **Locate TallyPrime Installation Directory**
   ```
   Default Path: C:\Program Files\TallyPrime
   ```

2. **Copy TDL File**
   - Copy `BulkEntries.tdl` to TallyPrime installation directory
   - Recommended subfolder: `C:\Program Files\TallyPrime\TDL\`

3. **Configure tally.ini**
   - Navigate to TallyPrime data directory
     ```
     Default: C:\Users\[YourUsername]\TallyPrime\
     ```
   - Open `tally.ini` in a text editor (Notepad++)
   - Add the following line under `[TallyPrime]` section:
     ```ini
     TDL = BulkEntries.tdl
     ```
   - If TDL file is in a subfolder:
     ```ini
     TDL = TDL\BulkEntries.tdl
     ```
   - For multiple TDL files, separate with semicolons:
     ```ini
     TDL = TDL\BulkEntries.tdl;TDL\OtherAddon.tdl
     ```

4. **Restart TallyPrime**
   - Close TallyPrime completely
   - Relaunch TallyPrime
   - Open your company

5. **Verify Installation**
   - Press `Alt+G` (Gateway of Tally)
   - Navigate to **Banking**
   - Look for **Bulk Entries** option
   - If visible, installation successful!

---

## Method 2: Manual Load (Session-Based)

### For TallyPrime 7.0 Running Instance

1. **While TallyPrime is Running**
   - Open your company
   - Press `F12` (Configure)

2. **Navigate to TDL Configuration**
   - Go to: `Display → TDL/Developer → TDL Names`
   - OR search for "TDL" in F12 configuration

3. **Add TDL File**
   - In the TDL Names field, enter full path:
     ```
     C:\Path\to\BulkEntries.tdl
     ```
   - Press `Enter` to save
   - Press `Ctrl+A` to accept

4. **Reload Company**
   - Close company (Gateway → Shut Company)
   - Reopen company

5. **Verify**
   - Check **Gateway → Banking → Bulk Entries**

---

## Method 3: Company-Specific Configuration

### Load TDL for Specific Company Only

1. **Open Company in TallyPrime**

2. **Access Company Features**
   - Press `F11` (Company Features)
   - Go to `TDL & Add-ons` section

3. **Specify TDL Path**
   - Enable "Use TDL files"
   - Add file path: `C:\Path\to\BulkEntries.tdl`
   - Accept and save

4. **Reload Company**

---

## Method 4: Dynamic Loading via Developer Mode

### For Development & Testing

1. **Enable Developer Mode**
   - Press `F12` in TallyPrime
   - Navigate to `Display → TDL/Developer`
   - Enable **Developer Mode**: Yes

2. **Load TDL Dynamically**
   - Press `Ctrl+Shift+Alt+T` (TDL Viewer)
   - OR: `F12 → Display → TDL/Developer → View TDL`

3. **Add TDL File**
   - Click "Load TDL"
   - Browse and select `BulkEntries.tdl`
   - Click "Apply"

4. **Test Immediately**
   - No restart required
   - Changes reflect immediately
   - Navigate to Gateway → Banking → Bulk Entries

---

## Verification Steps

### 1. Menu Visibility Test
```
Gateway of Tally
  └─ Banking
      └─ Bulk Entries (NEW)
          ├─ Bulk Receipts
          ├─ Bulk Payments
          ├─ XML Import
          ├─ Configuration
          └─ Quit
```

### 2. Functional Test
1. Click **Bulk Receipts**
2. Select a bank ledger from list
3. If grid screen appears with title "Bulk Receipt Entries For: [Bank Name]"
   → **Installation Successful!**

### 3. Error Checking
- Press `Alt+O` (TDL Errors)
- OR: `F12 → Display → TDL/Developer → TDL Errors`
- If no errors listed → **TDL Loaded Correctly**

---

## Troubleshooting

### Issue 1: Menu Not Visible

**Possible Causes:**
- TDL file not loaded
- File path incorrect in tally.ini
- Syntax errors in TDL

**Solutions:**
1. Check `tally.ini` TDL path
2. Verify file exists at specified location
3. Check TDL error log (`Alt+O`)
4. Reload TDL: `Ctrl+Shift+Alt+T`

---

### Issue 2: TDL Errors on Load

**Check Error Log:**
```
Alt+O → View TDL Errors
```

**Common Errors:**

1. **"File not found"**
   - Verify TDL file path
   - Use absolute paths

2. **"Syntax Error at Line X"**
   - Check TDL file integrity
   - Re-download/copy file

3. **"Collection/Object not found"**
   - Ensure TallyPrime version compatibility
   - Check if base voucher types exist

**Fix:**
- Correct the path
- Fix syntax issues
- Reload TDL

---

### Issue 3: Bank Ledgers Not Showing

**Cause:**
- No ledgers under "Bank Accounts" group

**Solution:**
1. Create bank ledgers
2. Ensure ledgers are under group: **Bank Accounts**
3. Master creation:
   ```
   Gateway → Accounts Info → Ledgers → Create
   - Name: HDFC Bank Current Account
   - Under: Bank Accounts
   ```

---

### Issue 4: Vouchers Not Created

**Possible Causes:**
- Invalid voucher type names
- Missing ledger masters
- Period locked

**Solutions:**
1. Verify "Receipt" and "Payment" voucher types exist
2. Check all party ledgers exist in masters
3. Ensure financial year period is active
4. Check user permissions

---

## Performance Optimization

### For 1000+ Row Entry

1. **Disable Auto-Refresh**
   - In TDL, set screen refresh only after save

2. **Batch Processing**
   - Process in batches of 500 rows
   - Save after each batch

3. **System Requirements**
   - RAM: Minimum 4GB, Recommended 8GB+
   - Processor: i5 or higher
   - SSD preferred for faster data access

---

## Uninstallation

### Remove TDL Add-on

1. **Edit tally.ini**
   - Remove TDL entry: `TDL = BulkEntries.tdl`
   - Save file

2. **Restart TallyPrime**
   - Menu option will disappear

3. **Delete TDL File** (Optional)
   - Remove `BulkEntries.tdl` from disk

**Note:** Existing vouchers created via add-on will remain intact

---

## Multi-Company Setup

### Load TDL for All Companies

**Option A: Global Load**
- Use Method 1 (Auto-Load via tally.ini)
- TDL available for all companies

**Option B: Selective Load**
- Use Method 3 (Company-specific)
- Configure each company individually

---

## Version-Specific Notes

### TallyPrime 7.0
- Full compatibility
- All features supported
- Enhanced grid performance

### TallyPrime 6.x
- Compatible with minor syntax adjustments
- Test grid scrolling behavior

### Tally.ERP 9 Release 6.6+
- Compatible
- May require voucher type name adjustments
- Bank allocation fields may differ slightly

**Key Differences:**
| Feature | TallyPrime 7.0 | Tally.ERP 9 |
|---------|----------------|-------------|
| Menu Path | Gateway → Banking | Gateway → Banking |
| Grid Entry | Full Support | Full Support |
| Bank Allocations | Enhanced | Standard |
| UPI/IMPS Types | Native Support | May need custom types |

---

## Network/Server Mode

### TallyPrime Server Edition

1. **Install on Server**
   - Copy TDL to server installation directory
   - Configure server `tally.ini`

2. **Client Access**
   - Clients automatically inherit TDL
   - No client-side configuration needed

3. **Verification**
   - Test from client workstation
   - Check menu availability

---

## Security Considerations

1. **User Permissions**
   - Ensure users have voucher creation rights
   - Set up security controls in Tally

2. **Audit Trail**
   - All vouchers maintain audit trail
   - Creation details logged automatically

3. **Data Validation**
   - TDL includes built-in validations
   - Invalid entries blocked before posting

---

## Support & Updates

### Check TDL Version
- Open TDL file in text editor
- Version information in header comments

### Future Updates
- Replace `BulkEntries.tdl` with newer version
- Restart TallyPrime to apply changes
- No data migration needed

---

## Quick Reference Card

### Installation Checklist
- [ ] TDL file copied to TallyPrime directory
- [ ] tally.ini updated with TDL path
- [ ] TallyPrime restarted
- [ ] Menu visible under Banking
- [ ] Bank ledgers exist in company
- [ ] Test receipt entry successful
- [ ] Test payment entry successful

### File Locations
```
TDL File: C:\Program Files\TallyPrime\TDL\BulkEntries.tdl
Config:   C:\Users\[User]\TallyPrime\tally.ini
Data:     [Company Data Path]\[CompanyName]
```

### Key Shortcuts in Add-on
- `Ctrl+A` → Save all entries
- `Ctrl+N` → Add new row
- `Alt+D` → Delete row
- `Esc` → Exit/Back

---

**Installation Guide Version:** 1.0
**Last Updated:** December 2025
**For TDL Version:** 1.0
