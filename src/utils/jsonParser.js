const NODE_WIDTH = 200;
const NODE_HEIGHT = 80;
const HORIZONTAL_SPACING = 250;
const VERTICAL_SPACING = 120;

export const parseJSONToNodes = (jsonData) => {
  const nodes = [];
  const edges = [];
  let nodeId = 0;

  const levelWidths = new Map();

  const getNextId = () => `node-${nodeId++}`;

  const determineNodeType = (value) => {
    if (Array.isArray(value)) return 'array';
    if (value !== null && typeof value === 'object') return 'object';
    return 'primitive';
  };

  const formatValue = (value) => {
    if (value === null) return 'null';
    if (typeof value === 'string') return `"${value}"`;
    if (typeof value === 'boolean') return value.toString();
    if (typeof value === 'number') return value.toString();
    return String(value);
  };

  const traverse = (obj, parentId, key, path, level) => {
    const id = getNextId();
    const nodeType = determineNodeType(obj);

    const currentWidth = levelWidths.get(level) || 0;
    levelWidths.set(level, currentWidth + 1);

    const position = {
      x: currentWidth * HORIZONTAL_SPACING,
      y: level * VERTICAL_SPACING,
    };

    let label = '';
    let value = undefined;

    if (nodeType === 'primitive') {
      label = `${key}`;
      value = obj;
    } else if (nodeType === 'array') {
      label = `${key} []`;
      value = `Array(${obj.length})`;
    } else {
      label = `${key}`;
      value = 'Object';
    }

    nodes.push({
      id,
      type: nodeType,
      data: {
        label,
        value,
        path,
        isHighlighted: false,
      },
      position,
    });

    if (parentId) {
      edges.push({
        id: `edge-${parentId}-${id}`,
        source: parentId,
        target: id,
      });
    }

    if (nodeType === 'object') {
      Object.entries(obj).forEach(([childKey, childValue]) => {
        const childPath = path ? `${path}.${childKey}` : childKey;
        traverse(childValue, id, childKey, childPath, level + 1);
      });
    } else if (nodeType === 'array') {
      obj.forEach((item, index) => {
        const childPath = `${path}[${index}]`;
        traverse(item, id, `[${index}]`, childPath, level + 1);
      });
    }

    return id;
  };

  const rootKey = 'root';
  const rootPath = '$';
  traverse(jsonData, null, rootKey, rootPath, 0);

  centerNodes(nodes, levelWidths);

  return { nodes, edges };
};

const centerNodes = (nodes, levelWidths) => {
  const levelNodes = new Map();

  nodes.forEach(node => {
    const level = node.position.y / VERTICAL_SPACING;
    if (!levelNodes.has(level)) {
      levelNodes.set(level, []);
    }
    levelNodes.get(level).push(node);
  });

  levelNodes.forEach((nodesAtLevel, level) => {
    const totalWidth = (nodesAtLevel.length - 1) * HORIZONTAL_SPACING;
    const offset = -totalWidth / 2;

    nodesAtLevel.forEach((node, index) => {
      node.position.x = offset + index * HORIZONTAL_SPACING;
    });
  });
};

export const searchNodeByPath = (nodes, searchPath) => {
  const normalizedSearch = searchPath.trim().toLowerCase();

  const found = nodes.find(node => {
    const nodePath = node.data.path.toLowerCase();
    return nodePath === normalizedSearch || nodePath.includes(normalizedSearch);
  });

  return found
    ? { found: true, nodeId: found.id }
    : { found: false };
};

export const validateJSON = (jsonString) => {
  try {
    JSON.parse(jsonString);
    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Invalid JSON',
    };
  }
};
