
# Kodbank: Full-Stack Banking Web Application

## Overview
A secure banking web app where users can register, log in, and access a dashboard to check their balance. Built with React + Supabase (replacing Node.js/Express/MongoDB with equivalent functionality).

---

## Phase 1: Authentication System
- **Registration page** — username, email, password, phone fields
- Password hashing handled automatically by Supabase Auth
- New users get a default balance of 100,000
- Toast notifications for success/error states
- **Login page** — email + password authentication
- JWT token generation via Supabase Auth
- Session persistence (equivalent to httpOnly cookies)
- Redirect to dashboard on success

## Phase 2: Database Setup
- **Users table** — uid, username, email, balance (default 100000), phone, role ("Customer")
- **Tokens table** — token, uid, expiry
- Row-Level Security (RLS) so users can only access their own data
- Edge function for secure balance retrieval with token verification

## Phase 3: Dashboard & Balance
- **Dashboard page** with two main actions:
  - "Check Balance" button → verifies JWT, checks token expiry, fetches balance from database
  - "View JWT Token" button → opens secure modal displaying current token
- **Balance display** — animated glassmorphism card with confetti celebration effect
- Loading spinner during balance fetch
- Logout functionality

## Phase 4: Security Implementation
- JWT verification on every protected request
- Token expiry checks
- Database token comparison before serving data
- Protected routes — no balance access without login
- All secrets stored securely in Supabase

## Phase 5: UI & Polish
- **Dark banking theme** with gradient backgrounds
- **Glassmorphism** cards and modals
- Hover animations on buttons and cards
- Loading spinner/skeleton states
- Toast alerts for all user actions (login, register, errors)
- Fully **mobile responsive** design
- Smooth page transitions
