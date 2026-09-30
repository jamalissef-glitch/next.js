interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  const path = slug && slug.length > 0 ? slug.join('/') : '';

  return (
    <div>
      <h1>You visit Blog Page</h1>
      <p>Path: {path}</p>
    </div>
  );
}