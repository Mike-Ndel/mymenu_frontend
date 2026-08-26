# MyMenu — Admin Dashboard (Frontend)

Frontend-only admin dashboard for the MyMenu multi-restaurant QR ordering
platform. This covers **only** the business admin dashboard — no backend,
database, auth, APIs, or customer-facing ordering flow.

## Stack

- React (JavaScript, no TypeScript)
- Vite
- Tailwind CSS
- React Router DOM
- lucide-react icons
- Local mock data (no network calls)

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (defaults to http://localhost:5173).

## Step 1 — what's included so far

Per the incremental build plan, this first pass only covers:

1. Project structure (`src/components`, `src/pages`, `src/settings`, `src/data`,
   `src/services`, `src/hooks`, `src/utils`, `src/context`, `src/assets`)
2. Routing — every sidebar destination has a route and renders a page
3. `DashboardLayout` — sidebar + header + scrollable content area
4. `Sidebar` — Overview / Orders / Tables / Menu / Receipts, plus a
   collapsible Settings section with its 6 sub-pages
5. `Header` — restaurant name, branch selector, notifications, user profile
6. Theme setup — MyMenu Yellow `#FFC107` / Black `#111827` / White / Light
   Gray tokens wired into `tailwind.config.js`, applied to the sidebar and
   active nav states

Every page beyond the layout currently renders a placeholder card. Actual
page content (Overview stats, Orders table, Tables grid, Menu cards,
Receipts table, and each Settings page) comes in the next steps, in the
order given in the brief.

## Folder structure

```
src/
├── components/
│   ├── layout/        Sidebar, Header, DashboardLayout
│   ├── ui/             Shared building blocks (PageHeader, ComingSoonCard, ...)
│   ├── cards/          (reserved — stat cards, table cards, menu cards)
│   ├── tables/         (reserved — Orders/Receipts data tables)
│   ├── forms/          (reserved — settings forms)
│   └── modals/         (reserved — order details, add/edit menu item, ...)
├── pages/              Overview, Orders, Tables, Menu, Receipts
├── settings/           RestaurantProfile, Branding, CustomizeDashboard,
│                       PaymentSettings, Security, ReceiptSettings
├── data/               Mock data (restaurants.js, more to come)
├── services/           (reserved — data-access layer over the mock data)
├── hooks/              (reserved — shared hooks)
├── utils/              navigation.js, formatCurrency.js
├── context/            (reserved — e.g. active branch/theme context)
└── assets/             (reserved — images/icons)
```

## Theme

The admin dashboard theme is fixed (Yellow / Black / White / Light Gray) and
defined once in `tailwind.config.js` under `primary`, `ink`, and `surface`.
The customer-facing menu's Branding settings page is a separate, fully
customizable theme and does not touch these tokens.
