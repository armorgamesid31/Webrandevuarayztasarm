SalonAsistan – Frontend (UI-first)

This repository contains the UI-first frontend implementation of the SalonAsistan Magic Link Booking experience.

The project is intentionally designed with a strict separation between UI and business logic to enable fast iteration, Figma-driven development, and AI-assisted workflows.

🎯 Project Scope

This repository focuses on:

✅ Presentational UI components

✅ Mobile-first booking flow (390px baseline)

✅ Figma-accurate layout and styling

✅ Minimal local state for interaction

❌ No real backend integration

❌ No production business logic

❌ No API calls

All complex logic (pricing rules, availability, user auth, payments) will be handled by a separate backend service.

🧱 Tech Stack

React 19

Vite

TypeScript

Tailwind CSS v4

Lucide React (icons)

🎨 Design Principles

UI source of truth: Figma

Primary color: #D4AF37 (Gold)

Dark text: #2D2D2D

Background: #FAFAFA

Rounded cards: rounded-2xl

Mobile-first: Designed for 390px width, then scaled up

Accessibility: aria-label on all interactive elements

⚠️ UI is not interpreted or redesigned in code.
The implementation strictly follows the Figma reference.

📦 Project Structure
src/
 ├─ components/        # Pure presentational components
 │   ├─ Header.tsx
 │   ├─ QuickActionCards.tsx
 │   ├─ ReferralBanner.tsx
 │   ├─ ServiceCard.tsx
 │   ├─ PriceFooter.tsx
 │   └─ ...
 ├─ pages/
 │   └─ Home.tsx       # All local state & interaction logic lives here
 ├─ data/
 │   └─ services.ts    # Mock data only
 ├─ styles/
 │   └─ globals.css
 └─ App.tsx            # Renders <Home />

🧠 Architectural Rules
Components

Props-only

No internal business logic

No API calls

No side effects

State Management

All state is managed at page-level (Home.tsx)

Local React state only

No Redux / Zustand / external stores

Logic Policy

UI components = visual only

Interaction logic = parent container

Backend logic = out of scope

🧪 Current Interaction Coverage (Mock)

Implemented with local state only:

👤 Bana / Misafir selection per service

📦 Paketimi Kullan toggle (mock package count)

🔁 Son İşlemi Tekrarla (mock last appointment)

💰 Sticky price footer with discount state

🎁 Referral toggle (100 TL discount UI)

All data is mocked and intended for visual & flow validation only.

🚀 Development
npm install
npm run dev

⚠️ Important Notes

This project is NOT production-complete

Backend, authentication, payments, and real availability are intentionally excluded

This repo is designed to be:

Connected to an API later

Reused across multiple salon instances

Used as a visual reference in stakeholder demos

📌 Why This Repo Exists

This frontend exists to:

Move fast without backend dependency

Keep Figma and code perfectly aligned

Allow AI tools (Cline, Copilot, etc.) to safely work on behavior without redesigning UI

Serve as a visual contract for backend integration

🧩 Next Steps (Planned)

API integration layer

Magic Link authentication

Availability & calendar logic

Payment flow

Multi-salon support

SalonAsistan Frontend is intentionally UI-first.
If you are looking for business logic or backend code, this is not the repo you want.
