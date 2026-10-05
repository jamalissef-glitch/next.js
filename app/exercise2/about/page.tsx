export const dynamic = 'force-static';

export default function AboutPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-2">About Us</h1>
      <p className="text-gray-600">
        Welcome to our company! This page is fully static and pre-rendered at build time.
      </p>
    </main>
  );
}