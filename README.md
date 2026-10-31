# 🏦 AK Bank — Bank Management System

A modern, responsive, and robust **Bank Management System** web application built with **React**, **Vite**, **Tailwind CSS**, and **Vitest**.

Developed to showcase React fundamentals, reusable component composition, form handling with input validation, client-side routing, and centralized state management with persistent storage.

---

## 📸 Application Previews

### 1. Account Dashboard (`/`)
> Overview of account balance, real-time credit/debit metric cards, quick-action navigation, and recent activity.

![Dashboard Page](screenshots/Dashboard%20Page.jpeg)

<br/>

### 2. Deposit Money (`/deposit`)
> Controlled deposit form with validation, auto-focus via `useRef`, preset amount buttons, and instant balance recalculation.

![Deposit Money Page](screenshots/Deposit%20Money%20Page.jpeg)

<br/>

### 3. Withdraw Money (`/withdraw`)
> Controlled withdrawal form with overdraft protection, security confirmation modal dialog, and immediate balance deduction.

![Withdraw Money Page](screenshots/Withdraw%20Money%20Page.jpeg)

<br/>

### 4. Transaction History & Smart Pagination (`/transactions`)
> Complete transaction ledger with credit/debit color coding, live search by notes, type filtering (All/Deposits/Withdrawals), and smart pagination controls.

![Transaction History Page](screenshots/Transaction%20History%20Page.jpeg)

---

## 🚀 Features

### Core Requirements
* **Task 1: Account Dashboard (`/`)**
  * Displays bank name, application title, account holder name, and account number.
  * Real-time metric cards for **Current Balance**, **Total Deposited**, and **Total Withdrawn**.
  * Quick-access action buttons and a preview of recent account activity.
* **Task 2: Deposit Money (`/deposit`)**
  * Dedicated deposit form managed via React state.
  * Strict validation preventing empty, zero, or negative deposit amounts.
  * Immediate balance recalculation upon deposit.
  * Real-time success confirmation banner and convenient quick-add amount buttons (`+$50`, `+$100`, `+$250`, etc.).
* **Task 3: Withdraw Money (`/withdraw`)**
  * Dedicated withdrawal form with overdraft protection (prevents withdrawals exceeding current balance).
  * Strict validation preventing zero or negative values.
  * Immediate balance and debit ledger update.
* **Task 4: Transaction History (`/transactions`)**
  * Full transaction ledger displayed via `.map()`.
  * Distinct, accessible visual badges for **Deposits** (emerald green with `+` sign) and **Withdrawals** (rose red with `-` sign).
  * Interactive filtering by transaction type (All / Deposits / Withdrawals) and instant keyword search.
  * Smart conditional pagination (5 items per page with Previous/Next controls, automatically appearing when records exceed 5).
  * Conditional empty-state rendering when no transactions match.
* **Task 5: Navigation & Routing**
  * Client-side routing with `react-router-dom`.
  * Consistent, sticky `<Navbar />` with active route highlights (`NavLink`), quick balance indicator, and responsive mobile hamburger menu.
* **Task 6: Reusable Component Architecture**
  * Modular design featuring reusable components: `Navbar`, `BalanceCard`, `DepositForm`, `WithdrawForm`, `TransactionList`, `TransactionItem`, and `ConfirmModal`.

### 🌟 Bonus Tasks (All Implemented)
1. **`useRef` Input Auto-focus**: Amount input automatically receives focus on page load and refocuses after transaction submissions.
2. **React Context API (`BankContext`)**: Centralized global state accessible across all routes with a clean `useBank()` hook.
3. **`localStorage` Persistence**: Account balance, deposits, withdrawals, and transaction records survive page refreshes.
4. **Withdrawal Confirmation Dialog**: Security confirmation modal (`ConfirmModal`) prompted before any funds are debited from the account.

---

## 🛠️ Tech Stack

* **Build Tool & Framework**: [Vite](https://vitejs.dev/) + [React 18](https://react.dev/)
* **Routing**: [React Router DOM v6](https://reactrouter.com/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Testing**: [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) + `@testing-library/jest-dom`

---

## 📂 Project Structure

```text
bank-management-system/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── screenshots/
│   ├── Dashboard Page.jpeg
│   ├── Deposit Money Page.jpeg
│   ├── Transaction History Page.jpeg
│   └── Withdraw Money Page.jpeg
├── src/
│   ├── components/
│   │   ├── BalanceCard.jsx         # Metric card (balance, total deposited, total withdrawn)
│   │   ├── ConfirmModal.jsx        # Modal confirmation for withdrawals (Bonus 4)
│   │   ├── DepositForm.jsx         # Deposit form with validation & useRef (Task 2, Bonus 1)
│   │   ├── FintechLogo.jsx         # Bespoke modern abstract fintech vector logo
│   │   ├── Navbar.jsx              # Navigation header with active links & controls (Task 5)
│   │   ├── PopulateModal.jsx       # Modal for loading 50 demo transactions
│   │   ├── ResetModal.jsx          # Modal for resetting account to blank state
│   │   ├── TransactionItem.jsx     # Individual transaction row with badges (Task 4)
│   │   ├── TransactionList.jsx     # List renderer with conditional empty state (Task 4)
│   │   └── WithdrawForm.jsx        # Withdraw form with validation & modal (Task 3, Bonus 4)
│   ├── context/
│   │   └── BankContext.jsx         # Context API & localStorage persistence (Bonus 2 & 3)
│   ├── data/
│   │   └── mockTransactions.js     # 50 realistic demo transactions & initial state
│   ├── pages/
│   │   ├── Dashboard.jsx           # Overview & high-level stats (Task 1)
│   │   ├── Deposit.jsx             # Deposit page (Task 2)
│   │   ├── Transactions.jsx        # Transaction history, search & modern pagination (Task 4)
│   │   └── Withdraw.jsx            # Withdraw page (Task 3)
│   ├── test/
│   │   ├── BankContext.test.jsx    # Core state engine & business rules
│   │   ├── DepositForm.test.jsx    # Deposit validation & auto-focus
│   │   ├── Integration.test.jsx    # End-to-end user journeys & localStorage persistence
│   │   ├── Pagination.test.jsx     # Smart pagination, entries dropdown, ellipsis
│   │   ├── setup.js                # Testing setup & matchers
│   │   └── WithdrawForm.test.jsx   # Withdraw validation, overdraft & confirmation modal
│   ├── utils/
│   │   └── formatters.js           # Currency ($) and date formatting helpers
│   ├── App.jsx                     # Route definitions & layout structure
│   ├── index.css                   # Tailwind CSS layers and font styling
│   └── main.jsx                    # Root React entrypoint
└── README.md
```

---

## 🧪 Testing Suite

The project includes **31 focused automated unit and integration tests** covering all core requirements, state workflows, edge cases, and user journeys:

```bash
# Run test suite once
npm test

# Run tests in interactive watch mode
npm run test:watch
```

### What is tested:
* **Context & Business Logic**: Accurate deposits, withdrawals, overdraft rejection, zero/negative rejection, reset to blank state, and demo data population.
* **Form Validations**: Prevention of empty inputs, zero amounts, negative numbers, non-numeric entries, and exceeding available balance.
* **Modal Workflow**: Withdrawal modal cancellation keeping balance intact vs confirmation applying deduction.
* **Smart Pagination**: Multi-page navigation, items per page selector (5/10/20), range label calculation, and conditional rendering when data is sparse.
* **Full Integration & Persistence**: Complete end-to-end user navigation across pages, deposit flow, withdrawal flow, transaction history filtering, and `localStorage` persistence across page reloads.

---

## 💻 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18.0.0 or higher)
* `npm` (v9.0.0 or higher)

### Installation

1. Clone repository:
   ```bash
   git clone https://github.com/<your-username>/bank-management-system.git
   cd bank-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

---

## 📄 License
This project is open-source and created for educational / assignment purposes.
