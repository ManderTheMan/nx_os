# Nexus OS - Visual Architecture Guide

## 🗺️ Navigation Flow

```
┌─────────────────────────────────────────────────────────┐
│                    ORACLE ENTRY (Home)                  │
│                   Radial Navigation                     │
│                                                          │
│    ┌─────────┐  ┌─────────┐  ┌─────────┐              │
│    │Crucible │  │  Forge  │  │   Lab   │              │
│    │ (Gym)   │  │ (Build) │  │(Create) │              │
│    └────┬────┘  └────┬────┘  └────┬────┘              │
│         │            │             │                    │
│      ┌──┴──┐      ┌──┴──┐       ┌──┴──┐               │
│      │Azure│      │Marcus│      │Gemini│               │
│      └─────┘      └──┬──┘       └─────┘               │
│                      │                                  │
└──────────────────────┼──────────────────────────────────┘
                       │
                       ▼
        ┌──────────────────────────┐
        │    ACTION VIEW           │
        │  (The Forge / Lab)       │
        │  • Document Analysis     │
        │  • Task Breakdown        │
        │  • Workshop Drawer       │
        └──────────────────────────┘
```

## 📊 Resolution-Based Views

```
RESOLUTION SLIDER: 0% ──────────────────────────────── 100%

CREATE VIEW TRANSFORMATIONS:
┌─────────────────────────────────────────────────────────┐
│  0-40%          40-85%           85-100%                │
│ ┌─────┐       ┌───────┐        ┌─────────┐            │
│ │ Zen │  ──>  │Staging│  ──>   │  Vault  │            │
│ │Write│       │ Area  │        │ (Files) │            │
│ └─────┘       └───────┘        └─────────┘            │
│                                                         │
│ Simple         Projects         Deep Storage           │
│ Focus          Blueprints       File System            │
│                Management       Deduplication           │
└─────────────────────────────────────────────────────────┘

INTELLIGENCE MODE:
┌─────────────────────────────────────────────────────────┐
│  0-60%                          60-100%                 │
│ ┌─────────┐                    ┌────────┐              │
│ │ STEALTH │  ───────────────>  │ ORACLE │              │
│ │  Mode   │                    │  Mode  │              │
│ └─────────┘                    └────────┘              │
│ Local Only                     AI Enhanced             │
└─────────────────────────────────────────────────────────┘
```

## 🏗️ Component Architecture

```
nexus-os/
│
├── src/
│   │
│   ├── 3-matter/ (UI LAYER - What You See)
│   │   ├── OracleEntry.tsx ──> Home screen with radial nav
│   │   ├── ActionView.tsx ───> Document analysis workspace
│   │   ├── StreamView.tsx ───> Timeline conversation view
│   │   ├── CreateView.tsx ───> Multi-mode creation space
│   │   ├── ArchiveView.tsx ──> Thread history browser
│   │   ├── ResolutionLens.tsx > Slider component
│   │   └── GlassInput.tsx ───> Chat interface (unused)
│   │
│   ├── 6-energy/ (STATE LAYER - How Data Flows)
│   │   ├── FasciaContext.tsx ─> Global state + AI integration
│   │   └── Layout.tsx ────────> App shell + navigation
│   │
│   └── 9-spirit/ (FOUNDATION - Data & Utils)
│       └── mockVault.ts ──────> Sample data
│
└── App.tsx ─────────────────────> Router + view logic
```

## 🤖 AI Agent System

```
┌──────────────────────────────────────────────────────────┐
│                    AGENT ECOSYSTEM                       │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐       │
│  │ Marcus │  │ Azure  │  │ Gemini │  │ Keeper │       │
│  │ Shield │  │ Heart  │  │ Brain  │  │Database│       │
│  └───┬────┘  └───┬────┘  └───┬────┘  └───┬────┘       │
│      │           │            │            │            │
│   Building    Wellness    Strategy     Memory          │
│   & Code      & Flow      & Vision     Archive         │
│      │           │            │            │            │
│      └───────────┴────────────┴────────────┘            │
│                      │                                   │
│                      ▼                                   │
│              ┌──────────────┐                           │
│              │  PARTICLES   │                           │
│              │  (Messages)  │                           │
│              └──────┬───────┘                           │
│                     │                                    │
│                     ▼                                    │
│              ┌──────────────┐                           │
│              │   THREADS    │                           │
│              │  (Archives)  │                           │
│              └──────────────┘                           │
└──────────────────────────────────────────────────────────┘
```

## 💾 Data Flow

```
USER INPUT
    │
    ▼
┌─────────────┐
│ GlassInput  │ (Planned integration)
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│ FasciaContext   │ ◄──── LocalStorage Persistence
│ Global State    │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌──────────┐
│Particles│ │Resolution│
│ Array  │ │  Number  │
└────┬───┘ └────┬─────┘
     │          │
     ▼          ▼
┌──────────┐ ┌──────────┐
│StreamView│ │CreateView│
│          │ │(Morphs)  │
└──────────┘ └──────────┘
```

## 🎨 Color System

```
┌─────────────────────────────────────────────┐
│ TAILWIND CUSTOM COLORS                      │
├─────────────────────────────────────────────┤
│ background  #f8f9fa  Paper White            │
│ surface     #ffffff  Pure White             │
│ primary     #f59e0b  Amber-500 (Gold)       │
│ secondary   #3b82f6  Blue-500 (Lab)         │
│ action      #ef4444  Red-500 (Gym)          │
│ text        #0f172a  Slate-900 (Dark)       │
│ muted       #94a3b8  Slate-400 (Gray)       │
└─────────────────────────────────────────────┘
```

## 🔄 State Management Pattern

```
┌────────────────────────────────────────────────┐
│ FASCIA CONTEXT (Global State)                 │
├────────────────────────────────────────────────┤
│                                                │
│  useState ──> useEffect ──> localStorage      │
│     │                             │            │
│     │                             │            │
│     ▼                             ▼            │
│  ┌─────────┐                ┌─────────┐       │
│  │ Setter  │                │  Key    │       │
│  │Function │                │ "nexus_*│       │
│  └────┬────┘                └─────────┘       │
│       │                                        │
│       ▼                                        │
│  Components consume via useFascia() hook      │
│                                                │
└────────────────────────────────────────────────┘

Example:
  resolution → localStorage.setItem('nexus_resolution')
  particles  → localStorage.setItem('nexus_particles')
  archives   → localStorage.setItem('nexus_archives')
```

## 🌐 API Integration

```
┌───────────────────────────────────────────────┐
│ GEMINI API FLOW                               │
├───────────────────────────────────────────────┤
│                                               │
│  User uploads file                            │
│         │                                     │
│         ▼                                     │
│  ActionView.handleFileUpload()               │
│         │                                     │
│         ▼                                     │
│  askOracle(prompt, context)                  │
│         │                                     │
│         ▼                                     │
│  ┌──────────────────────────┐               │
│  │ Gemini API Request       │               │
│  │ POST /generateContent    │               │
│  └───────────┬──────────────┘               │
│              │                                │
│              ▼                                │
│  ┌──────────────────────────┐               │
│  │ Parse JSON Response      │               │
│  │ Extract concepts/patterns│               │
│  └───────────┬──────────────┘               │
│              │                                │
│              ▼                                │
│  Update projects state                       │
│         │                                     │
│         ▼                                     │
│  Render fractal nodes                        │
│                                               │
└───────────────────────────────────────────────┘

API Key Sources (priority order):
1. VITE_GEMINI_KEY environment variable
2. localStorage.getItem('nexus_api_key')
```

## 🎯 Feature Matrix

```
┌─────────────────┬──────────┬────────────┬──────────┐
│ FEATURE         │ BUILT    │ INTEGRATED │ POLISHED │
├─────────────────┼──────────┼────────────┼──────────┤
│ OracleEntry     │    ✅    │     ✅     │    ✅    │
│ ActionView      │    ✅    │     ✅     │    ✅    │
│ StreamView      │    ✅    │     ✅     │    ✅    │
│ CreateView      │    ✅    │     ✅     │    ✅    │
│ ArchiveView     │    ✅    │     ✅     │    ✅    │
│ ResolutionLens  │    ✅    │     ❌     │    ⚠️    │
│ GlassInput      │    ✅    │     ❌     │    ⚠️    │
│ AI Integration  │    ✅    │     ✅     │    ⚠️    │
│ LocalStorage    │    ✅    │     ✅     │    ✅    │
│ Thread Weaving  │    ✅    │     ✅     │    ✅    │
└─────────────────┴──────────┴────────────┴──────────┘

Legend:
✅ Complete
⚠️  Needs improvement  
❌ Not implemented
```

## 🚀 Recommended Integration Path

```
CURRENT STATE
     │
     ▼
┌─────────────────────────────────────────┐
│ Step 1: Add ResolutionLens to Layout   │
│ • Shows current resolution visually     │
│ • Makes core concept obvious            │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│ Step 2: Add GlassInput trigger         │
│ • Cmd/Ctrl+K shortcut                   │
│ • Floating action button                │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│ Step 3: Create Settings View           │
│ • API key configuration                 │
│ • User preferences                      │
└──────────────┬──────────────────────────┘
               │
               ▼
         FEATURE COMPLETE
```

---

**This visual guide should help understand the project structure at a glance!**

See README.md and PROJECT_REVIEW.md for detailed text documentation.
