import { Suspense } from 'react';
import SlowComponent from '@/components/SlowComponent';

export default function StreamingPage() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Streaming with Suspense Demo</h1>
      <p>The main layout loads instantly below:</p>
      
      <Suspense fallback={<div className="p-4 bg-yellow-100 text-yellow-800 rounded-md animate-pulse">Loading content...</div>}>
        <SlowComponent />
      </Suspense>
    </main>
  );
}