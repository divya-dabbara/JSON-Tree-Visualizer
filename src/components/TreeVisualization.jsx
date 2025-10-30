import { useCallback, useMemo, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Panel,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';
import { searchNodeByPath } from '../utils/jsonParser';
import { ZoomIn, ZoomOut, Maximize2, Search } from 'lucide-react';

const TreeVisualization = ({ nodes: initialNodes, edges: initialEdges }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMessage, setSearchMessage] = useState('');
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const nodeTypes = useMemo(
    () => ({
      object: (props) => <CustomNode {...props} type="object" />,
      array: (props) => <CustomNode {...props} type="array" />,
      primitive: (props) => <CustomNode {...props} type="primitive" />,
    }),
    []
  );

  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) {
      setSearchMessage('');
      return;
    }

    const result = searchNodeByPath(initialNodes, searchQuery);

    if (result.found && result.nodeId) {
      const updatedNodes = nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          isHighlighted: node.id === result.nodeId,
        },
      }));

      setNodes(updatedNodes);
      setSearchMessage('Match found!');

      if (reactFlowInstance) {
        const matchedNode = nodes.find((n) => n.id === result.nodeId);
        if (matchedNode) {
          reactFlowInstance.setCenter(
            matchedNode.position.x,
            matchedNode.position.y,
            { zoom: 1.2, duration: 800 }
          );
        }
      }
    } else {
      const clearedNodes = nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          isHighlighted: false,
        },
      }));
      setNodes(clearedNodes);
      setSearchMessage('No match found');
    }
  }, [searchQuery, nodes, initialNodes, setNodes, reactFlowInstance]);

  const handleZoomIn = () => {
    if (reactFlowInstance) {
      reactFlowInstance.zoomIn({ duration: 300 });
    }
  };

  const handleZoomOut = () => {
    if (reactFlowInstance) {
      reactFlowInstance.zoomOut({ duration: 300 });
    }
  };

  const handleFitView = () => {
    if (reactFlowInstance) {
      reactFlowInstance.fitView({ padding: 0.2, duration: 300 });
    }
  };

  const handleNodeClick = useCallback((_event, node) => {
    const path = node.data.path;
    navigator.clipboard.writeText(path);

    setSearchMessage(`Copied path: ${path}`);
    setTimeout(() => setSearchMessage(''), 3000);
  }, []);

  return (
    <div className="w-full h-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onInit={setReactFlowInstance}
        onNodeClick={handleNodeClick}
        fitView
        minZoom={0.1}
        maxZoom={2}
        className="bg-gray-50"
      >
        <Background color="#e5e7eb" gap={16} />

        <Controls showInteractive={false} className="!shadow-lg" />

        <Panel position="top-left" className="space-y-2">
          <div className="bg-white p-3 rounded-lg shadow-lg">
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="e.g., $.user.address.city"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center gap-1"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>

            {searchMessage && (
              <div
                className={`text-sm px-2 py-1 rounded ${
                  searchMessage.includes('found!') || searchMessage.includes('Copied')
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {searchMessage}
              </div>
            )}
          </div>

          <div className="bg-white p-2 rounded-lg shadow-lg flex gap-2">
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <button
              onClick={handleFitView}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Fit View"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </Panel>

        <Panel position="top-right" className="bg-white p-3 rounded-lg shadow-lg">
          <div className="text-sm space-y-1">
            <div className="font-semibold text-gray-800 mb-2">Legend</div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-gray-700">Object</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-gray-700">Array</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="text-gray-700">Primitive</span>
            </div>
            <div className="text-xs text-gray-500 mt-2 pt-2 border-t">
              Click node to copy path
            </div>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default TreeVisualization;