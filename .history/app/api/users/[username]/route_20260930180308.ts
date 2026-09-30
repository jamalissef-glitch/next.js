import { NextResponse } from 'next/server';

interface RouteProps {
  params: Promise<{
    username: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: RouteProps
) {
  const { username } = await params;

  return NextResponse.json({ username });
}