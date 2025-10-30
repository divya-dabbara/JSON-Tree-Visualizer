import { useState } from 'react';
import { validateJSON } from '../utils/jsonParser';

const SAMPLE_JSON = `{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "address": {
      "city": "New York",
      "country": "USA",
      "zipCode": "10001"
    }
  },
  "items": [
    {
      "name": "Item1",
      "price": 29.99,
      "inStock": true
    },
    {
      "name": "Item2",
      "price": 49.99,
      "inStock": false
    }
  ],
  "metadata": {
    "version": "1.0",
    "lastUpdated": "2025-10-30"
  }
}`;

const JSONInput = ({ onVisualize, onClear }) => {
  const [jsonInput, setJsonInput] = useState(SAMPLE_JSON);
  const [error, setError] = useState('');

  const handleVisualize = () => {
    const validation = validateJSON(jsonInput);

    if (!validation.valid) {
      setError(validation.error || 'Invalid JSON');
      return;
    }

    setError('');
    const parsedData = JSON.parse(jsonInput);
    onVisualize(parsedData);
  };

  const handleClear = () => {
    setJsonInput('');
    setError('');
    onClear();
  };

  const handleLoadSample = () => {
    setJsonInput(SAMPLE_JSON);
    setError('');
  };

  return (
    <div className="w-full h-full flex flex-col p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800">JSON Input</h2>
        <button
          onClick={handleLoadSample}
          className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors"
        >
          Load Sample
        </button>
      </div>

      <textarea
        value={jsonInput}
        onChange={(e) => {
          setJsonInput(e.target.value);
          setError('');
        }}
        placeholder="Paste or type JSON data here..."
        className="flex-1 w-full p-3 border border-gray-300 rounded-md font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {error && (
        <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-2 mt-3">
        <button
          onClick={handleVisualize}
          className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
        >
          Generate Tree
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-md transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default JSONInput;
