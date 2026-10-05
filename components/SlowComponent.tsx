async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function SlowComponent() {
  // Waxay sugaysaa 3 sekan
  await delay(3000);

  return (
    <div className="p-4 bg-green-100 text-green-900 rounded-md">
      <p className="font-semibold">Slow content loaded successfully after 3 seconds!</p>
    </div>
  );
}