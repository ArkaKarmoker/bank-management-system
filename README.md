# 🏦 AK Bank — Bank Management System

![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_DOM-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

A modern, responsive, and robust **Bank Management System** web application built with React, Vite, Tailwind CSS, and Vitest.

---

## 📸 Application Previews

| Dashboard (`/`) | Deposit Money (`/deposit`) |
| :---: | :---: |
| ![Dashboard](screenshots/Dashboard%20Page.jpeg) | ![Deposit](screenshots/Deposit%20Money%20Page.jpeg) |

| Withdraw Money (`/withdraw`) | Transaction History (`/transactions`) |
| :---: | :---: |
| ![Withdraw](screenshots/Withdraw%20Money%20Page.jpeg) | ![Transactions](screenshots/Transaction%20History%20Page.jpeg) |

---

## ✨ Features

- **Account Dashboard**: Real-time balance cards (Available Balance, Total Deposited, Total Withdrawn), account details, and recent activity overview.
- **Deposit System**: Input validation (positive amounts, non-empty), quick preset chips (`+$50`, `+$100`, `+$250`), `useRef` auto-focus, and immediate balance updates.
- **Withdrawal Protection**: Strict overdraft guard preventing deductions exceeding balance, accompanied by a secure modal confirmation workflow.
- **Transaction Ledger**: Complete history with credit/debit badges, instant keyword search, category filters (All / Deposits / Withdrawals), and smart pagination.
- **State & Persistence**: Centralized React Context (`BankContext`) synced with `localStorage` across reloads.
- **Demo & Reset Controls**: One-click navbar controls to switch between a clean blank account ($1,000 deposit) and 50 populated demo transactions.

---

## 🛠️ Tech Stack

- **Core**: [React 18](https://react.dev/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/)

---

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/ArkaKarmoker/bank-management-system.git
```

### 2. Navigate to Project Directory

```bash
cd bank-management-system
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 5. Run Tests

```bash
npm test
```
The project includes **31 automated unit and integration tests** verifying context state, form validations, modal workflows, pagination, and routing.

### 6. Build for Production

```bash
npm run build
```

### 7. Preview Production Build

```bash
npm run preview
```

---

Developed by [Arka Karmoker](https://github.com/ArkaKarmoker)  
Project Repository: https://github.com/ArkaKarmoker/bank-management-system

