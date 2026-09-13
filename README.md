# IV-SENTINEL Dashboard

Intelligent IV Infusion Monitoring & Nursing Response System prototype. This dashboard is built for a clean, minimal, and professional medical technology aesthetic, allowing nurses to monitor ESP32-based IV monitoring devices.

## 1. Project Structure

The project is built using React, TypeScript, and Tailwind CSS powered by Vite. The structure follows a standard component-based architecture:

```
iv-sentinel-dashboard/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components (Sidebar, TopBar, BedCard, SummaryCard)
│   ├── data/               # Mock data for Phase 1 simulation (MOCK_BEDS, MOCK_ALERTS)
│   ├── layouts/            # Page layouts like the main dashboard wrapper
│   ├── pages/              # Main application views (Dashboard, History, PatientDetails, Reports)
│   ├── types/              # TypeScript type definitions for the data model
│   ├── App.tsx             # Application routing logic
│   ├── main.tsx            # React application entry point
│   ├── index.css           # Tailwind base styles and custom overrides
│   └── vite-env.d.ts       # Vite TypeScript declarations
├── package.json
├── tailwind.config.js      # Tailwind configuration with custom theme colors
└── vite.config.ts
```

## 2. How to Run the Project

1. Make sure you have Node.js installed.
2. In the project directory (`d:\IV SENTINEL DASHBOARD`), install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the displayed local URL (typically `http://localhost:5173`) in your browser.

## 3. Main Components Created

- **`Sidebar` & `TopBar`**: Provide global navigation and system status overview.
- **`Dashboard` (Page)**: The main view containing summary metrics and the patient overview logic.
- **`PatientDetails` (Page)**: Detailed per-patient view featuring `recharts` for Volume and Drop Rate tracking over time.
- **`BedCard`**: A flexible, scannable sub-component displaying essential IV stats natively colored based on attention priority levels.
- **`SummaryCard`**: A minimal KPI box for tracking total/normal/attention/critical beds at a glance.

## 4. Where Mock Data is Stored

The mock data is located centrally in `src/data/mockData.ts`. This file exports `MOCK_BEDS` and `MOCK_ALERTS` arrays which perfectly adhere to the complex typings available in `src/types/index.ts`. All charts, statuses, and calculations on the frontend read from this simulated data schema.

## 5. Where ESP32 Integration Will Later Be Connected

The ESP32 integration will replace the direct imports from `src/data/mockData.ts` in Phase 2 & 3. 
- You will want to build an abstraction layer, for example, a `src/services/api.ts` or a global context wrapper (like `src/context/DataContext.tsx`) that fetches real-time data or listens to WebSocket/MQTT messages.
- The components expecting arrays of beds/alerts (e.g., `Dashboard.tsx`, `PatientDetails.tsx`) are purposefully decoupled from the data pipeline, and will accept live states without needing structural UI refactoring.

## 6. What Should Be Tested Before Moving to Phase 2

Before replacing the mock data with actual API integration, verify the following in Phase 1:
- **Visual Priority & Scannability:** Ensure critical states (red/orange) draw attention properly among multiple normal cards without overwhelming the user visually.
- **Alert Workflows:** Test the alert acknowledgement button logically in `Dashboard.tsx`, ensuring it reflects a visual change from active to acknowledged.
- **Responsiveness:** Shrink the screen to mobile/tablet sizes and verify that `BedCard`s stack appropriately, leaving alerts visible.
- **Charts Configuration:** Make sure that the `recharts` axes correctly accommodate exact real volume sizes and drops/min boundaries.
