# 🏦 AK Bank — Bank Management System

A sleek, responsive, and robust Bank Management System built with **React 18**, **Tailwind CSS**, **Vite**, and **Vitest**.

🔗 **Repository:** [https://github.com/ArkaKarmoker/bank-management-system](https://github.com/ArkaKarmoker/bank-management-system)

---

## 📸 Previews

| Dashboard (`/`) | Deposit (`/deposit`) |
| :---: | :---: |
| ![Dashboard](screenshots/Dashboard%20Page.jpeg) | ![Deposit](screenshots/Deposit%20Money%20Page.jpeg) |

| Withdraw (`/withdraw`) | Transaction History (`/transactions`) |
| :---: | :---: |
| ![Withdraw](screenshots/Withdraw%20Money%20Page.jpeg) | ![Transactions](screenshots/Transaction%20History%20Page.jpeg) |

---

## ✨ Key Features

- **Account Overview:** Real-time metrics for Current Balance, Total Deposited, and Total Withdrawn with recent activity preview.
- **Deposit & Withdraw:** Controlled forms with strict input validation, preset amount chips, overdraft protection, and `useRef` auto-focus.
- **Security Modal:** Interactive confirmation dialog modal before completing any withdrawal transaction.
- **Transaction History:** Credit (emerald) and Debit (rose) visual styling, live text search, type filters (All / Deposits / Withdrawals), and smart pagination.
- **State & Persistence:** React Context API (`BankContext`) with automatic `localStorage` synchronization across page reloads.
- **Demo & Reset Controls:** 1-click modal actions in header to toggle between a clean fresh account and 50 rich mock records.

---

## 🛠️ Tech Stack

- **Core:** [React 18](https://react.dev/), [Vite](https://vitejs.dev/), [React Router DOM v6](https://reactrouter.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/), [Lucide React](https://lucide.dev/)
- **Testing:** [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/), `@testing-library/jest-dom`

---

## 🚀 Quick Start

```bash
# 1. Clone repository
git clone https://github.com/ArkaKarmoker/bank-management-system.git
cd bank-management-system

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

---

## 🧪 Testing

Includes **31 automated unit and integration tests** verifying state calculations, form validations, overdraft protection, pagination, and full routing journeys.

```bash
# Run tests
npm test
```

---

## 📄 License
MIT / Educational Assignment
