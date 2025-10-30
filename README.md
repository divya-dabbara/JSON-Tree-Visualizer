# JSON Tree Visualizer

An interactive web application that visualizes JSON data as a hierarchical tree structure using React Flow. Built with React, JavaScript, and Tailwind CSS.

## Features

### Core Features ✅
- **JSON Input & Validation**: Paste or type JSON data with real-time validation and error messages
- **Interactive Tree Visualization**: Hierarchical node-based visualization using React Flow
- **Node Type Differentiation**:
  - Objects (Blue nodes)
  - Arrays (Green nodes)
  - Primitives (Orange nodes)
- **Search Functionality**: Search nodes by JSON path (e.g., `$.user.address.city`) with automatic highlighting and view centering
- **Sample JSON**: Pre-loaded example for quick testing

### Interactive Features ⚡
- **Zoom Controls**: Zoom in, zoom out, and fit view buttons
- **Pan & Navigate**: Drag the canvas to explore large JSON structures
- **Node Information**: Hover to see full path and value details
- **Copy Path**: Click any node to copy its JSON path to clipboard
- **Dark/Light Mode**: Toggle between dark and light themes
- **Clear/Reset**: Clear input and tree visualization
- **Background Grid**: Visual grid for better spatial awareness

## Technology Stack

- **React 18** - Modern UI framework with hooks
- **JavaScript (ES6+)** - No TypeScript dependencies
- **React Flow 11** - Professional tree visualization library
- **Tailwind CSS 3** - Utility-first CSS framework
- **Vite 5** - Fast build tool and dev server
- **Lucide React** - Beautiful icon library

## Quick Start

### Prerequisites
- Node.js v16 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd json-tree-visualizer

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage Guide

### 1. Input JSON Data
- Paste your JSON data in the textarea
- Or click "Load Sample" to see an example
- The validator will show errors if JSON is invalid

### 2. Generate Tree
- Click "Generate Tree" button
- The tree will render with color-coded nodes
- Navigate using mouse drag or zoom controls

### 3. Search Nodes
Use the search bar to find specific nodes by their JSON path:
- `$.user.name` - Find user name
- `$.user.address.city` - Find city in address
- `$.items[0].name` - Find first item's name
- `$.metadata` - Find metadata object

### 4. Interactive Features
- **Click a node**: Copy its JSON path to clipboard
- **Drag canvas**: Pan around large trees
- **Zoom controls**: Use +/- buttons or mouse wheel
- **Fit View**: Reset zoom to show entire tree
- **Dark Mode**: Toggle theme with sun/moon icon

## Project Structure

```
json-tree-visualizer/
├── src/
│   ├── components/           # React components
│   │   ├── CustomNode.jsx   # Custom React Flow node
│   │   ├── JSONInput.jsx    # JSON input panel
│   │   └── TreeVisualization.jsx  # Main tree component
│   ├── types/               # JSDoc type definitions
│   │   └── index.js
│   ├── utils/               # Utility functions
│   │   └── jsonParser.js    # JSON parsing & search
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js         # Vite configuration
├── README.md              # This file
```

## Features Implementation

### JSON Parsing
- Recursive traversal of JSON structure
- Automatic node type detection (object/array/primitive)
- Path generation for each node
- Hierarchical positioning algorithm

### Tree Visualization
- Custom node components with type-specific styling
- Dynamic highlighting for search results
- Smooth animations and transitions
- Responsive layout with proper spacing

### Search Functionality
- Path-based search with normalization
- Case-insensitive matching
- Auto-center and zoom on match
- Visual feedback for search results

## Browser Support

Modern browsers with ES6+ support:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

### GitHub Pages
```bash
npm install -D gh-pages

# Add to package.json scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"

npm run deploy
```

## Author

**Created using React and React Flow as part of APIWiz Frontend Intern/Fresher Role Assignment**