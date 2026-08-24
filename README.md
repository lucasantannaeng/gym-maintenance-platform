# 🏋️‍♂️ Forensic Gym Engineering & Technical Audit Suite v6.0

[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![NR-12 MTE](https://img.shields.io/badge/MTE-NR--12%202022-orange.svg)]()
[![ABNT NBR ISO 20957](https://img.shields.io/badge/ABNT-ISO%2020957-blue.svg)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Enterprise-grade forensic mechanical engineering web platform for gym equipment inspection, non-conformity auditing, predictive maintenance scheduling, and 1-click legal PDF technical report generation with Lion Fitness native presets.**

---

## 🌟 Overview & Key Capabilities

* 📋 **4 Dedicated Regulatory & Forensic Report Templates**:
  1. **NR-12 Compliance & Safety Audit**: Mechanical trapping gap analysis, safety guarding, and labor regulatory conformity (MTE Portaria 4.219/2022).
  2. **PMOC & Preventive Maintenance Schedule**: Steel wire rope wear tracking (ISO 4309), guide rod lubrication regimes, and MTBF/MTTR metrics.
  3. **Forensic Accident & Failure Investigation**: Causal link determination (nexo causal), fatigue fracture surface analysis, and civil liability determination (Civil Code Art. 618, CDC Arts. 12/14).
  4. **Commissioning & Technical Handover**: Alignment tolerances, torque validation, and manufacturer warranty acceptance.
* 🦁 **Native Lion Fitness Presets Catalog**:
  - Full parametric specifications for **KRATOS**, **IRIDIUM**, **OPTIMUS**, and **LFR (Outdoor)** lines.
  - Wire rope construction ($6\times19$ / $7\times19$), MBL in kN, sealed bearings (608-2RS, 6202-2RS, 7202B-TVP), PA6/POM pulleys, gas spring ratings, and structural bolt torques.
* 📸 **Client-Side Photo Pipeline with Auto-Compression**:
  - Drag-and-drop photographic evidence uploader.
  - Automatic Canvas-based client-side compression (1920px max, WebP/JPEG quality 0.85) maintaining PDF size < 5MB for 10+ photos.
  - Real-time SHA-256 evidence hashing and severity categorization (CRÍTICA, MAIOR, MENOR, INFO).
* 📖 **Interactive Walkthrough Tour (`WalkthroughModal.tsx`)**:
  - Step-by-step onboarding tour explaining client identification, regulatory template selection, preset mapping, and 1-click generation.
* 📊 **Executive Inventory Dashboard (`InventorySummaryCard.tsx`)**:
  - Live metric card tracking total machines, compliance distribution, and overall facility risk index (GUT / HRN).
* 🖨️ **Vector A4 PDF Engine with Anti-Fraud Verification**:
  - Multi-page editorial layout with zero text/photo cutting across page breaks.
  - Photographic evidence cards with severity borders.
  - CONFEA / CREA ART technical responsibility block with ICP-Brasil digital signature line.
  - Dynamic QR Code with canonical SHA-256 hash string for public authenticity verification.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build optimized production bundle
npm run build

# Type check
npx tsc --noEmit
```

---

## 📑 Regulatory Framework & Engineering Standards

- **NR-12 MTE (Portaria 4.219/2022)**: Safety in Machinery & Equipment.
- **ABNT NBR ISO 20957 (Parts 1 to 9)**: Stationary training equipment safety & testing.
- **ISO 4309:2017**: Cranes and wire ropes — Care, maintenance, inspection, and discard criteria.
- **ABNT NBR 16779:2019**: Outdoor fitness equipment safety requirements.
- **CONFEA Resolution 1.025/2009 & Law 6.496/77**: Anotação de Responsabilidade Técnica (ART).

---

## 📄 License

MIT License — Copyright (c) 2026 Luca Rodrigues Gomes de Sant'Anna.