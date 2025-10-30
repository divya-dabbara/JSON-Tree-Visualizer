import { memo } from 'react';
import { Handle, Position } from 'reactflow';

const CustomNode = memo(({ data, type }) => {
  const getNodeStyle = () => {
    const baseStyle = 'rounded-lg shadow-lg border-2 p-4 min-w-[180px] transition-all duration-300';

    if (data.isHighlighted) {
      return `${baseStyle} bg-yellow-200 border-yellow-500 scale-110`;
    }

    switch (type) {
      case 'object':
        return `${baseStyle} bg-blue-100 border-blue-500`;
      case 'array':
        return `${baseStyle} bg-green-100 border-green-500`;
      case 'primitive':
        return `${baseStyle} bg-orange-100 border-orange-500`;
      default:
        return `${baseStyle} bg-gray-100 border-gray-500`;
    }
  };

  const formatDisplayValue = () => {
    if (data.value === undefined) return null;

    const valueStr = String(data.value);
    if (valueStr.length > 30) {
      return valueStr.substring(0, 27) + '...';
    }
    return valueStr;
  };

  return (
    <div className={getNodeStyle()} title={`Path: ${data.path}\nValue: ${data.value}`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-gray-500" />

      <div className="flex flex-col gap-1">
        <div className="font-semibold text-sm text-gray-800 break-words">
          {data.label}
        </div>

        {data.value !== undefined && (
          <div className="text-xs text-gray-600 break-words font-mono">
            {formatDisplayValue()}
          </div>
        )}

        <div className="text-xs text-gray-500 mt-1 truncate" title={data.path}>
          {data.path}
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-gray-500" />
    </div>
  );
});

CustomNode.displayName = 'CustomNode';

export default CustomNode;