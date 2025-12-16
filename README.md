# Nexus OS

A resolution-based personal knowledge management and AI productivity system built with React, TypeScript, and modern web technologies.

## 🌟 Overview

Nexus OS is a unique productivity application that uses a **resolution slider** to progressively reveal different layers of functionality - from simple note-taking to complex knowledge management. It integrates AI agents to help with analysis, planning, and organization.

### Key Concepts

- **Resolution System**: A 0-100% slider that controls interface complexity and feature visibility
- **Multi-Agent AI**: Specialized AI personas (Marcus, Azure, Gemini, Keeper) for different tasks
- **Particle System**: Thought-based conversation tracking with timeline visualization
- **Thread Weaving**: Archive and restore conversation contexts

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Gemini API key (for AI features)

### Installation

```bash
# Clone the repository
git clone https://github.com/ManderTheMan/nx_os.git
cd nx_os/nexus-os

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your VITE_GEMINI_KEY

# Start development server
npm run dev
```

### Building for Production

```bash
npm run build
npm run preview
```

## 🏗️ Project Structure

```
nexus-os/
├── src/
│   ├── 3-matter/        # UI Components (visible layer)
│   │   ├── OracleEntry.tsx    # Radial navigation home
│   │   ├── ActionView.tsx     # Document analysis & tasks
│   │   ├── StreamView.tsx     # Timeline/chat interface
│   │   ├── CreateView.tsx     # Multi-mode workspace
│   │   └── ArchiveView.tsx    # Thread history
│   ├── 6-energy/        # State Management (data layer)
│   │   ├── FasciaContext.tsx  # Global state & AI integration
│   │   └── Layout.tsx         # App shell
│   └── 9-spirit/        # Utilities & Data (foundation)
│       └── mockVault.ts       # Mock data
├── public/              # Static assets
└── package.json
```

## 🎯 Features

### Resolution-Based Interface

The resolution slider (0-100%) reveals progressively deeper functionality:

- **0-40%**: Zen writing mode - focused, distraction-free
- **40-85%**: Project staging - blueprints and active work
- **85-100%**: The Vault - deep file management

### Four Main Views

1. **Oracle Entry (Home)** - Circular navigation to 6 domains
2. **Action (Forge/Lab)** - AI-powered document analysis and task breakdown
3. **Stream** - Temporal timeline of conversations with AI agents
4. **Create** - Multi-layered workspace from notes to file system
5. **Archives** - Stored conversation threads with restore capability

### AI Integration

- **Gemini API** for document analysis and intelligent queries
- **Multiple AI Agents**: Each with specialized personas
  - Marcus: System building & code
  - Azure: Energy & wellness
  - Gemini: Planning & strategy
  - Keeper: Archive & memory

## 📝 Configuration

### Environment Variables

Create a `.env` file in the `nexus-os` directory:

```env
VITE_GEMINI_KEY=your_gemini_api_key_here
```

**Getting a Gemini API Key:**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy it to your `.env` file

### Alternative: LocalStorage

If no environment variable is set, the app will look for an API key in `localStorage` under the key `nexus_api_key`.

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### Tech Stack

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **AI**: Google Gemini API
- **Build Tool**: Vite
- **Markdown**: react-markdown + remark-gfm

## 🐛 Known Issues

See [PROJECT_REVIEW.md](./PROJECT_REVIEW.md) for detailed analysis. Key issues:

- TypeScript compilation errors (unused imports)
- ESLint warnings (type safety, React patterns)
- GlassInput component built but not integrated
- Resolution slider not visible in current UI
- No test coverage

## 🗺️ Roadmap

### Immediate (v0.1)
- [ ] Fix build and lint errors
- [ ] Add ResolutionLens to UI
- [ ] Integrate GlassInput component
- [ ] Complete API key configuration UI

### Near-term (v0.2)
- [ ] Add error boundaries
- [ ] Implement loading states
- [ ] Add keyboard shortcuts
- [ ] Settings panel

### Future
- [ ] Test coverage
- [ ] Offline mode
- [ ] Multiple AI provider support
- [ ] Export/import functionality
- [ ] Browser extension

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is currently in development. License to be determined.

## 🙏 Acknowledgments

- Built with React and modern web technologies
- Powered by Google's Gemini AI
- Icons by Lucide React
- Animations by Framer Motion

## 📚 Documentation

For a detailed understanding of the project architecture and areas needing work, see:
- [PROJECT_REVIEW.md](./PROJECT_REVIEW.md) - Comprehensive project analysis

---

**Status**: Early Development (v0.0.0)  
**Author**: ManderTheMan  
**Last Updated**: December 2024
