export const dynamic = 'force-dynamic';

export default function SSRTimePage() {
  const currentTime = new Date().toLocaleTimeString();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-2"> Time Simulation</h1>
      <p className="text-lg text-gray-700">
        Current Server Time: <strong>{currentTime}</strong>
      </p>
    </main>
  );
}