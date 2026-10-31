/**
 * 50 Realistic Mock Transactions for Testing and Demonstration
 */

const baseTime = Date.now();
const ONE_HOUR = 3600000;
const ONE_DAY = 86400000;

export const INITIAL_50_TRANSACTIONS = [
  { id: 'tx-01', type: 'Deposit', amount: 3200.00, date: new Date(baseTime - ONE_HOUR * 2).toISOString(), note: 'Monthly Salary (TechCorp Inc)' },
  { id: 'tx-02', type: 'Withdrawal', amount: 85.40, date: new Date(baseTime - ONE_HOUR * 5).toISOString(), note: 'Grocery Shopping (Whole Foods)' },
  { id: 'tx-03', type: 'Withdrawal', amount: 14.99, date: new Date(baseTime - ONE_DAY * 1).toISOString(), note: 'Netflix Subscription' },
  { id: 'tx-04', type: 'Deposit', amount: 450.00, date: new Date(baseTime - ONE_DAY * 1 - ONE_HOUR * 3).toISOString(), note: 'Freelance Web Development' },
  { id: 'tx-05', type: 'Withdrawal', amount: 42.50, date: new Date(baseTime - ONE_DAY * 2).toISOString(), note: 'Gas Station Fuel Fill-up' },
  { id: 'tx-06', type: 'Withdrawal', amount: 1200.00, date: new Date(baseTime - ONE_DAY * 2 - ONE_HOUR * 4).toISOString(), note: 'Apartment Rent Payment' },
  { id: 'tx-07', type: 'Deposit', amount: 75.00, date: new Date(baseTime - ONE_DAY * 3).toISOString(), note: 'ATM Cash Deposit' },
  { id: 'tx-08', type: 'Withdrawal', amount: 28.00, date: new Date(baseTime - ONE_DAY * 3 - ONE_HOUR * 2).toISOString(), note: 'Dinner with Colleagues' },
  { id: 'tx-09', type: 'Withdrawal', amount: 12.99, date: new Date(baseTime - ONE_DAY * 4).toISOString(), note: 'Spotify Music Premium' },
  { id: 'tx-10', type: 'Deposit', amount: 850.00, date: new Date(baseTime - ONE_DAY * 4 - ONE_HOUR * 6).toISOString(), note: 'Consulting Milestone Delivery' },
  { id: 'tx-11', type: 'Withdrawal', amount: 64.20, date: new Date(baseTime - ONE_DAY * 5).toISOString(), note: 'Electricity Utility Bill' },
  { id: 'tx-12', type: 'Withdrawal', amount: 120.00, date: new Date(baseTime - ONE_DAY * 5 - ONE_HOUR * 5).toISOString(), note: 'Fiber Internet & Broadband' },
  { id: 'tx-13', type: 'Deposit', amount: 250.00, date: new Date(baseTime - ONE_DAY * 6).toISOString(), note: 'Birthday Gift from Family' },
  { id: 'tx-14', type: 'Withdrawal', amount: 45.00, date: new Date(baseTime - ONE_DAY * 6 - ONE_HOUR * 3).toISOString(), note: 'Monthly Gym Membership' },
  { id: 'tx-15', type: 'Withdrawal', amount: 18.50, date: new Date(baseTime - ONE_DAY * 7).toISOString(), note: 'Pharmacy & Health Supplies' },
  { id: 'tx-16', type: 'Withdrawal', amount: 95.00, date: new Date(baseTime - ONE_DAY * 7 - ONE_HOUR * 4).toISOString(), note: 'Department Store Apparel' },
  { id: 'tx-17', type: 'Deposit', amount: 180.00, date: new Date(baseTime - ONE_DAY * 8).toISOString(), note: 'Corporate Travel Expense Reimbursement' },
  { id: 'tx-18', type: 'Withdrawal', amount: 32.40, date: new Date(baseTime - ONE_DAY * 8 - ONE_HOUR * 6).toISOString(), note: 'Artisan Bakery & Coffee' },
  { id: 'tx-19', type: 'Withdrawal', amount: 220.00, date: new Date(baseTime - ONE_DAY * 9).toISOString(), note: 'Car Maintenance & Oil Service' },
  { id: 'tx-20', type: 'Deposit', amount: 600.00, date: new Date(baseTime - ONE_DAY * 9 - ONE_HOUR * 5).toISOString(), note: 'Quarterly Stock Dividend Payout' },
  { id: 'tx-21', type: 'Withdrawal', amount: 15.00, date: new Date(baseTime - ONE_DAY * 10).toISOString(), note: 'Cloud Storage Backup' },
  { id: 'tx-22', type: 'Withdrawal', amount: 78.90, date: new Date(baseTime - ONE_DAY * 10 - ONE_HOUR * 4).toISOString(), note: 'Weekend Supermarket Restock' },
  { id: 'tx-23', type: 'Deposit', amount: 920.00, date: new Date(baseTime - ONE_DAY * 11).toISOString(), note: 'Client Monthly Retainer' },
  { id: 'tx-24', type: 'Withdrawal', amount: 55.00, date: new Date(baseTime - ONE_DAY * 11 - ONE_HOUR * 3).toISOString(), note: 'Japanese Restaurant Lunch' },
  { id: 'tx-25', type: 'Withdrawal', amount: 110.00, date: new Date(baseTime - ONE_DAY * 12).toISOString(), note: 'Dental Clinic Examination' },
  { id: 'tx-26', type: 'Deposit', amount: 120.00, date: new Date(baseTime - ONE_DAY * 12 - ONE_HOUR * 6).toISOString(), note: 'Online Marketplace Sales' },
  { id: 'tx-27', type: 'Withdrawal', amount: 24.50, date: new Date(baseTime - ONE_DAY * 13).toISOString(), note: 'Cinema Tickets & Snacks' },
  { id: 'tx-28', type: 'Withdrawal', amount: 65.00, date: new Date(baseTime - ONE_DAY * 13 - ONE_HOUR * 5).toISOString(), note: 'Mobile Carrier Monthly Plan' },
  { id: 'tx-29', type: 'Deposit', amount: 3200.00, date: new Date(baseTime - ONE_DAY * 14).toISOString(), note: 'Previous Month Salary' },
  { id: 'tx-30', type: 'Withdrawal', amount: 1200.00, date: new Date(baseTime - ONE_DAY * 14 - ONE_HOUR * 4).toISOString(), note: 'Rent Payment (Previous Month)' },
  { id: 'tx-31', type: 'Withdrawal', amount: 40.00, date: new Date(baseTime - ONE_DAY * 15).toISOString(), note: 'Technical Books & Stationery' },
  { id: 'tx-32', type: 'Withdrawal', amount: 16.80, date: new Date(baseTime - ONE_DAY * 15 - ONE_HOUR * 2).toISOString(), note: 'Rideshare Trip (Uber)' },
  { id: 'tx-33', type: 'Deposit', amount: 350.00, date: new Date(baseTime - ONE_DAY * 16).toISOString(), note: 'Freelance Logo & Branding' },
  { id: 'tx-34', type: 'Withdrawal', amount: 88.50, date: new Date(baseTime - ONE_DAY * 16 - ONE_HOUR * 5).toISOString(), note: 'Home Hardware & DIY Supplies' },
  { id: 'tx-35', type: 'Withdrawal', amount: 35.00, date: new Date(baseTime - ONE_DAY * 17).toISOString(), note: 'Haircut & Styling' },
  { id: 'tx-36', type: 'Deposit', amount: 150.00, date: new Date(baseTime - ONE_DAY * 17 - ONE_HOUR * 3).toISOString(), note: 'Cash Deposit via Express ATM' },
  { id: 'tx-37', type: 'Withdrawal', amount: 52.30, date: new Date(baseTime - ONE_DAY * 18).toISOString(), note: 'Fresh Organic Produce' },
  { id: 'tx-38', type: 'Withdrawal', amount: 19.99, date: new Date(baseTime - ONE_DAY * 18 - ONE_HOUR * 4).toISOString(), note: 'Design Software Subscription' },
  { id: 'tx-39', type: 'Deposit', amount: 500.00, date: new Date(baseTime - ONE_DAY * 19).toISOString(), note: 'Performance Incentive Bonus' },
  { id: 'tx-40', type: 'Withdrawal', amount: 140.00, date: new Date(baseTime - ONE_DAY * 19 - ONE_HOUR * 5).toISOString(), note: 'Athletic Running Shoes' },
  { id: 'tx-41', type: 'Withdrawal', amount: 29.50, date: new Date(baseTime - ONE_DAY * 20).toISOString(), note: 'Weekend Cafe Brunch' },
  { id: 'tx-42', type: 'Deposit', amount: 200.00, date: new Date(baseTime - ONE_DAY * 20 - ONE_HOUR * 4).toISOString(), note: 'Friend Split Bill Reimbursement' },
  { id: 'tx-43', type: 'Withdrawal', amount: 72.00, date: new Date(baseTime - ONE_DAY * 21).toISOString(), note: 'City Water & Sewer Bill' },
  { id: 'tx-44', type: 'Withdrawal', amount: 15.50, date: new Date(baseTime - ONE_DAY * 21 - ONE_HOUR * 3).toISOString(), note: 'Lunch Takeout' },
  { id: 'tx-45', type: 'Deposit', amount: 400.00, date: new Date(baseTime - ONE_DAY * 22).toISOString(), note: 'Architecture Advisory Session' },
  { id: 'tx-46', type: 'Withdrawal', amount: 60.00, date: new Date(baseTime - ONE_DAY * 22 - ONE_HOUR * 4).toISOString(), note: 'Veterinary Check & Pet Food' },
  { id: 'tx-47', type: 'Withdrawal', amount: 115.00, date: new Date(baseTime - ONE_DAY * 23).toISOString(), note: 'Formal Dry Cleaning' },
  { id: 'tx-48', type: 'Deposit', amount: 100.00, date: new Date(baseTime - ONE_DAY * 23 - ONE_HOUR * 2).toISOString(), note: 'Credit Card Cashback Reward' },
  { id: 'tx-49', type: 'Withdrawal', amount: 48.00, date: new Date(baseTime - ONE_DAY * 24).toISOString(), note: 'Family Pizzeria Dinner' },
  { id: 'tx-50', type: 'Deposit', amount: 5000.00, date: new Date(baseTime - ONE_DAY * 25).toISOString(), note: 'Account Opening Deposit' },
];

// Calculated Totals from the 50 transactions
export const TOTAL_DEPOSITED = Math.round(
  INITIAL_50_TRANSACTIONS
    .filter((tx) => tx.type === 'Deposit')
    .reduce((sum, tx) => sum + tx.amount, 0) * 100
) / 100;

export const TOTAL_WITHDRAWN = Math.round(
  INITIAL_50_TRANSACTIONS
    .filter((tx) => tx.type === 'Withdrawal')
    .reduce((sum, tx) => sum + tx.amount, 0) * 100
) / 100;

export const INITIAL_BALANCE = Math.round((TOTAL_DEPOSITED - TOTAL_WITHDRAWN) * 100) / 100;

/**
 * Clean Blank Account State (Fresh account with 1 initial deposit)
 */
export const BLANK_STATE = {
  balance: 1000.00,
  totalDeposited: 1000.00,
  totalWithdrawn: 0.00,
  transactions: [
    {
      id: 'tx-init-01',
      type: 'Deposit',
      amount: 1000.00,
      date: new Date().toISOString(),
      note: 'Initial Account Deposit',
    },
  ],
};

/**
 * Populated 50 Demo Transactions State
 */
export const DEMO_50_STATE = {
  balance: INITIAL_BALANCE,
  totalDeposited: TOTAL_DEPOSITED,
  totalWithdrawn: TOTAL_WITHDRAWN,
  transactions: INITIAL_50_TRANSACTIONS,
};
