# React Assignment: Bank Management System

## 1. Project Overview

Build a simple **Bank Management System** using React and Vite. The application will allow users to view account information, check their balance, deposit money, and withdraw money.

The goal is to practice React components, props, hooks, forms, conditional rendering, and component reusability.

## 2. Project Requirements

### Task 1: Dashboard

Create a dashboard displaying:

* Bank name and application title
* Account holder's name
* Account number
* Current account balance
* Total deposited amount
* Total withdrawn amount

Use reusable React components to display account information.

### Task 2: Deposit Money

Create a deposit form with an amount input and a Deposit button.

Requirements:

* Use `useState` to manage the input and account balance.
* Handle form submission using `onSubmit`.
* Allow users to deposit money.
* Update the balance immediately after a successful deposit.
* Prevent empty, zero, or negative amounts.
* Display a success message after depositing money.

### Task 3: Withdraw Money

Create a withdrawal form.

Requirements:

* Allow users to enter a withdrawal amount.
* Update the account balance after a successful withdrawal.
* Prevent withdrawals greater than the available balance.
* Prevent zero or negative amounts.
* Display an appropriate success or error message.

### Task 4: Transaction History

Display a list of recent transactions.

Each transaction should include:

* Transaction type (Deposit or Withdrawal)
* Transaction amount
* Transaction date

Requirements:

* Store transactions using `useState`.
* Display transactions using the `map()` method.
* Use conditional rendering to show a message when no transactions exist.
* Use different styles for deposits and withdrawals.

### Task 5: Navigation

Create a simple navigation menu with these pages:

* Dashboard
* Deposit
* Withdraw
* Transaction History

Requirements:

* Use React Router DOM.
* Use `Link` or `NavLink` for navigation.
* Keep navigation consistent across pages.

### Task 6: Reusable Components

Create reusable components such as:

* `Navbar`
* `BalanceCard`
* `DepositForm`
* `WithdrawForm`
* `TransactionList`
* `TransactionItem`

Pass data using props and use component composition where appropriate.

## 3. Bonus Tasks (Optional)

* Use `useRef` to focus on the amount input.
* Use Context API to share account information across pages.
* Save account balance and transaction history in `localStorage` so the data remains after refreshing.
* Add a confirmation message before withdrawing money.

## 4. Suggested Folder Structure

```text
bank-management/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── BalanceCard.jsx
│   │   └── TransactionItem.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Deposit.jsx
│   │   ├── Withdraw.jsx
│   │   └── Transactions.jsx
│   ├── context/
│   │   └── BankContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── README.md
```

## 5. Technical Requirements

* React with Vite
* Functional components
* `useState` and `useEffect`
* React Router DOM
* Props and reusable components
* Form handling and validation
* Conditional rendering
* Responsive CSS styling

**Important:** This is a frontend-only practice project. No backend, database, real bank account, or actual money transfers are required. The account balance is simulated.

## 6. Submission Guidelines

1. Complete the project using React and Vite.
2. Upload the source code to a public GitHub repository.
3. Include a `README.md` file with the project description, features, and installation instructions.
4. Ensure the project runs without errors.
5. Submit the GitHub repository link.