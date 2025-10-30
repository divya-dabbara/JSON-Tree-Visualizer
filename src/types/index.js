// Type definitions as JSDoc comments for better IDE support

/**
 * @typedef {Object} JSONNodeData
 * @property {string} label
 * @property {*} [value]
 * @property {string} path
 * @property {boolean} [isHighlighted]
 */

/**
 * @typedef {Object} JSONNode
 * @property {string} id
 * @property {'object' | 'array' | 'primitive'} type
 * @property {JSONNodeData} data
 * @property {{x: number, y: number}} position
 */

/**
 * @typedef {Object} JSONEdge
 * @property {string} id
 * @property {string} source
 * @property {string} target
 * @property {string} [type]
 */

/**
 * @typedef {Object} SearchResult
 * @property {boolean} found
 * @property {string} [nodeId]
 * @property {string} [path]
 */

export {};