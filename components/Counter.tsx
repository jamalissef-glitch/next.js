'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 border rounded-lg max-w-xs">
      <p className="text-lg font-semibold mb-2">Count: {count}</p>
      <button
        onClick={() => setCount((prev) => prev + 1)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Increment
      </button>
    </div>
  );
}