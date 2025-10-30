import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import JSONInput from './components/JSONInput';
import TreeVisualization from './components/TreeVisualization';
import { parseJSONToNodes } from './utils/jsonParser';

function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [hasVisualization, setHasVisualization] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleVisualize = (jsonData) => {
    const { nodes: parsedNodes, edges: parsedEdges } = parseJSONToNodes(jsonData);
    setNodes(parsedNodes);
    setEdges(parsedEdges);
    setHasVisualization(true);
  };

  const handleClear = () => {
    setNodes([]);
    setEdges([]);
    setHasVisualization(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-green-50'}`}>
      <div className="h-screen flex flex-col">
        <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-md border-b`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  JSON Tree Visualizer
                </h1>
                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Visualize JSON data as an interactive hierarchical tree
                </p>
              </div>

              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                title={darkMode ? 'Light Mode' : 'Dark Mode'}
              >
                {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-hidden">
          <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
            <div className="lg:col-span-1 h-full min-h-[400px]">
              <JSONInput onVisualize={handleVisualize} onClear={handleClear} />
            </div>

            <div className={`lg:col-span-2 h-full min-h-[400px] rounded-lg shadow-md overflow-hidden ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              {hasVisualization ? (
                <TreeVisualization nodes={nodes} edges={edges} />
              ) : (
                <div className={`h-full flex flex-col items-center justify-center ${
                  darkMode ? 'text-gray-700' : 'text-gray-800'
                }`}>
                  <svg
                    className="w-24 h-24 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                  <p className="text-lg font-medium mb-2">No Visualization Yet</p>
                  <p className="text-sm">Enter JSON data and click "Generate Tree" to visualize</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
