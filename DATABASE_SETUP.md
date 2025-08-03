# 🗄️ AI Expense Tracker - Database Setup

## 📊 Database Schema Overview

Your Supabase database has been successfully set up with the following tables and features:

### 🔗 **Database Connection Details**
- **Project URL**: `https://exjvmlrlignixjblqrlf.supabase.co`
- **Project ID**: `exjvmlrlignixjblqrlf`
- **Status**: ✅ Active & Healthy
- **Region**: Asia Pacific (Southeast) - `ap-southeast-1`

---

## 📋 **Database Tables**

### 1. **expense_categories**
**Purpose**: Categorize different types of expenses
```sql
Columns:
- id (UUID, Primary Key, Auto-generated)
- name (VARCHAR(255), UNIQUE, NOT NULL) 
- description (TEXT, Optional)
- created_at (TIMESTAMP, Auto-generated)
- updated_at (TIMESTAMP, Auto-updated)
```

**Pre-loaded Categories:**
- 🍽️ Food & Dining
- 🚗 Transportation  
- 🎬 Entertainment
- 🛍️ Shopping
- 💡 Bills & Utilities
- 🏥 Healthcare
- 📚 Education
- ✈️ Travel
- 💅 Personal Care
- 📦 Others

### 2. **expenses**
**Purpose**: Track individual expense records
```sql
Columns:
- id (UUID, Primary Key, Auto-generated)
- category_id (UUID, Foreign Key → expense_categories.id)
- name (VARCHAR(255), NOT NULL)
- price (DECIMAL(12,2), NOT NULL, ≥ 0)
- description (TEXT, Optional)
- expense_date (DATE, Default: Current Date)
- created_at (TIMESTAMP, Auto-generated)
- updated_at (TIMESTAMP, Auto-updated)
```

### 3. **income**
**Purpose**: Track income sources
```sql
Columns:
- id (UUID, Primary Key, Auto-generated)
- name (VARCHAR(255), NOT NULL)
- price (DECIMAL(12,2), NOT NULL, ≥ 0)
- description (TEXT, Optional)
- income_date (DATE, Default: Current Date)  
- created_at (TIMESTAMP, Auto-generated)
- updated_at (TIMESTAMP, Auto-updated)
```

### 4. **transactions**
**Purpose**: Complete transaction history (Auto-populated)
```sql
Columns:
- id (UUID, Primary Key, Auto-generated)
- transaction_type (ENUM: 'debit' | 'credit')
- trans_date (DATE, NOT NULL)
- trans_amount (DECIMAL(12,2), NOT NULL, > 0)
- description (TEXT, Optional)
- reference_id (UUID, Optional - Links to expenses/income)
- reference_type (VARCHAR(20), Optional - 'expense'/'income')
- created_at (TIMESTAMP, Auto-generated)
- updated_at (TIMESTAMP, Auto-updated)
```

---

## 🔍 **Database Views** (Pre-built Analytics)

### 1. **expense_summary_by_category**
```sql
-- Get spending summary by category
SELECT * FROM expense_summary_by_category;
```
Returns: category_name, total_amount, expense_count, average_amount, last_expense_date

### 2. **monthly_financial_summary** 
```sql  
-- Get monthly income vs expenses
SELECT * FROM monthly_financial_summary;
```
Returns: month, total_expenses, total_income, net_amount

### 3. **recent_transactions_detailed**
```sql
-- Get recent transactions with category info
SELECT * FROM recent_transactions_detailed LIMIT 10;
```
Returns: Complete transaction details with category names

---

## ⚙️ **Database Functions**

### **get_spending_summary(start_date, end_date)**
```sql
-- Get spending summary for date range
SELECT * FROM get_spending_summary('2025-01-01', '2025-01-31');
```
Returns: total_expenses, total_income, net_amount, transaction_count

---

## 🔄 **Auto-Triggers**

✅ **Automatic Transaction Creation**: When you add expenses or income, transactions are automatically created
✅ **Auto-Update Timestamps**: All tables automatically update `updated_at` on modifications
✅ **Row Level Security**: Enabled on all tables for future user authentication

---

## 🛠️ **Usage in Your Application**

### **Environment Setup**
Your `.env.local` file is already configured with:
```env
NEXT_PUBLIC_SUPABASE_URL=https://exjvmlrlignixjblqrlf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### **Type-Safe Database Client**
Use the pre-configured client in `lib/supabase.ts`:

```typescript
import { expenses, income, expenseCategories, transactions, views, functions } from '@/lib/supabase'

// Get all expenses with categories
const { data: expenseList } = await expenses.getAll()

// Add new expense
const newExpense = await expenses.create({
  category_id: "category-uuid",
  name: "Coffee",
  price: 4.50,
  description: "Morning coffee"
})

// Get expense summary by category  
const { data: summary } = await views.expenseSummaryByCategory()

// Get spending summary for last 30 days
const { data: spendingSummary } = await functions.getSpendingSummary()
```

---

## 📊 **Sample Data**

Your database comes pre-populated with realistic sample data:

**✅ 10 Expense Categories**
**✅ 8 Sample Expenses** ($449.30 total)
**✅ 6 Sample Income Sources** ($5,215.49 total)  
**✅ 14 Auto-Generated Transactions**
**✅ Net Balance**: +$4,766.19

---

## 🔒 **Security Features**

- ✅ **Row Level Security (RLS)** enabled on all tables
- ✅ **Currently**: Open access policies (for development)
- ✅ **Data Validation**: Price constraints, type checking
- ✅ **Foreign Key Constraints**: Data integrity maintained
- ✅ **Indexed Columns**: Optimized for performance

---

## 🚀 **Next Steps**

1. **Install Dependencies**: `npm install @supabase/supabase-js` ✅ (Already done)
2. **Test Connection**: Try the sample queries in your components
3. **Build Features**: Use the type-safe client for your expense tracker
4. **Add Authentication**: Configure user-specific policies when ready
5. **Extend Schema**: Add more tables/columns as your app grows

---

## 📞 **Quick Testing**

Test your database connection:

```typescript
// Test in any component
import { supabase } from '@/lib/supabase'

const testConnection = async () => {
  const { data, error } = await supabase
    .from('expense_categories')
    .select('*')
    .limit(5)
  
  console.log('Categories:', data)
}
```

---

🎉 **Your AI Expense Tracker database is fully configured and ready to use!**

Need help with specific queries or want to add more features? Just ask! 🚀