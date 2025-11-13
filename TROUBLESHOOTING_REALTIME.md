# 🔧 Troubleshooting: Prices Not Updating

## Quick Diagnostic Steps

### Step 1: Open Browser Console
1. Open your website (`http://localhost:5173`)
2. Press **F12** (or Right-click → Inspect)
3. Click the **Console** tab
4. Look for these messages:

**✅ GOOD - Real-time is working:**
```
🔄 Fetching products from database...
📦 Found 12 products
  └─ Tirzepatide 15mg: 1 variations, prices: 15mg Vial:₱8500
📡 Real-time subscription status: SUBSCRIBED
```

**❌ BAD - Real-time is NOT working:**
```
📡 Real-time subscription status: CHANNEL_ERROR
or
No subscription messages at all
```

### Step 2: Test Real-time Connection

Open this file in your browser:
```
/Users/ynadonaire/Desktop/peptivate/REALTIME_DIAGNOSTIC.html
```

This will test if Supabase Real-time is enabled.

### Step 3: Enable Real-time in Supabase (MOST COMMON ISSUE!)

**This is probably your issue!** Real-time is NOT enabled by default.

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your **peptivate** project
3. Click **Database** in sidebar
4. Click **Replication** (or **Publications** in older versions)
5. Find these tables and **ENABLE** them:
   - ✅ `products`
   - ✅ `product_variations`
6. **IMPORTANT:** Wait 30-60 seconds for changes to apply
7. Refresh your website
8. Check console again - should now say `SUBSCRIBED`

### Step 4: Verify Database Was Actually Updated

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click **Table Editor**
3. Select `product_variations` table
4. Find the variation you edited
5. **Check if the price actually changed in the database**
   - If YES → Real-time issue (see Step 3)
   - If NO → The update didn't save (see Step 5)

### Step 5: Verify Update Saved Successfully

When you edit a variation in admin:
1. Look for **"Variation updated successfully!"** alert
2. If you don't see this, check console for errors
3. Try editing again and watch the console

### Step 6: Manual Refresh Test

1. Open your website
2. Note a product's current price
3. Go to admin dashboard
4. Edit that product's variation price
5. Save changes
6. Go back to website tab
7. Press **Cmd+Shift+R** (Mac) or **Ctrl+Shift+R** (Windows) for hard refresh
8. Check if price changed
   - If YES → Real-time issue (enable it in Supabase)
   - If NO → Database update issue (check Supabase dashboard)

## Common Issues & Solutions

### Issue 1: "Real-time is not enabled in Supabase"

**Solution:**
```
Supabase Dashboard
 → Database
 → Replication
 → Enable: products ✅
 → Enable: product_variations ✅
 → Wait 30-60 seconds
```

### Issue 2: "Price changed in admin but not on website"

**Check These:**
1. ✅ Hard refresh the website (Cmd+Shift+R)
2. ✅ Check if real-time is enabled (see Issue 1)
3. ✅ Check browser console for errors
4. ✅ Verify database actually updated (Supabase Table Editor)
5. ✅ Click the Refresh button in admin Products view

### Issue 3: "Edit button not showing in Variation Manager"

**Solution:**
1. Click the **Layers icon** (📦) on a product first
2. This opens the Variation Manager
3. Now you should see **Edit** (✏️) buttons

### Issue 4: "Variations prices won't update"

**Try This:**
1. Open Admin Dashboard
2. Go to Products
3. Click Layers icon (📦) on product
4. Click **Edit** (✏️) on the variation
5. Change the price
6. Click "Save Changes"
7. Wait for "Variation updated successfully!" message
8. Check browser console - should see: `✅ Variation changed: ...`
9. Switch to website tab
10. Console should show: `👁️ Tab became visible - refreshing products...`

### Issue 5: "Console shows CHANNEL_ERROR"

This means **Real-time is NOT enabled**. Follow Issue 1 solution above.

### Issue 6: "Nothing happens when I click Save"

**Check:**
1. Browser console for error messages
2. Make sure all fields are filled in correctly
3. Price must be greater than 0
4. Quantity must be greater than 0

## Testing the Fix

### Quick 30-Second Test:

1. **Terminal 1:** Make sure dev server is running
   ```bash
   npm run dev
   ```

2. **Tab 1:** Open website
   ```
   http://localhost:5173
   ```

3. **Tab 2:** Open admin dashboard
   ```
   http://localhost:5173/admin
   ```

4. **In Admin Tab:**
   - Go to Products
   - Click Layers (📦) on "Tirzepatide 15mg"
   - Click Edit (✏️) on "15mg Vial"
   - Change price from ₱8,500 to ₱9,999
   - Click "Save Changes"
   - Watch console: Should see `✅ Variation changed`

5. **Switch to Website Tab:**
   - Console should show: `👁️ Tab became visible - refreshing products...`
   - Console should show: `🔄 Fetching products from database...`
   - Console should show: `✅ Products updated successfully`
   - **Price should change to ₱9,999 within 2 seconds!**

## If Still Not Working

### Run the Diagnostic Tool:

```bash
# Open this file in your browser:
open /Users/ynadonaire/Desktop/peptivate/REALTIME_DIAGNOSTIC.html
```

This will show you exactly what's wrong.

### Check Supabase Status:

Visit: https://status.supabase.com

Make sure all services are operational.

### Enable Real-time via SQL (Alternative):

If the UI doesn't work, try SQL:

1. Go to Supabase Dashboard → SQL Editor
2. Run this query:

```sql
-- Enable real-time for products table
ALTER PUBLICATION supabase_realtime ADD TABLE products;

-- Enable real-time for product_variations table
ALTER PUBLICATION supabase_realtime ADD TABLE product_variations;
```

3. Wait 60 seconds
4. Test again

## What Console Logs Mean

### ✅ GOOD Logs:
```
📡 Real-time subscription status: SUBSCRIBED
✅ Variation changed: {...}
👁️ Window focused - refreshing products...
🔄 Fetching products from database...
📦 Found 12 products
✅ Products updated successfully at 3:45:22 PM
```

### ❌ BAD Logs:
```
📡 Real-time subscription status: CHANNEL_ERROR
❌ Error fetching products: ...
Failed to update variation
```

## Quick Reference

### Where to Find Things:

**Edit Variation Price:**
```
Admin → Products → Layers Icon (📦) → Edit (✏️) → Change Price → Save
```

**Manual Refresh:**
```
Admin → Products → Refresh Button (🔄)
```

**View Console:**
```
Website → F12 → Console Tab
```

**Enable Real-time:**
```
Supabase → Database → Replication → Enable Tables
```

## Need More Help?

1. Check console logs (F12)
2. Run diagnostic tool (`REALTIME_DIAGNOSTIC.html`)
3. Verify Supabase real-time is enabled
4. Try hard refresh (Cmd+Shift+R)
5. Check Supabase Table Editor to confirm data changed

---

**Most Common Solution:** Enable Real-time in Supabase Dashboard → Database → Replication

