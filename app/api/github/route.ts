import { NextRequest, NextResponse } from 'next/server';

const GITHUB_USERNAME = 'mohsinhamza7248';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const repos = searchParams.get('repos');

  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
  };
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }

  try {
    if (repos === 'true') {
      const res = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12&type=public`,
        { headers, next: { revalidate: 3600 } }
      );
      if (!res.ok) throw new Error('GitHub API error');
      const data = await res.json();
      return NextResponse.json(data);
    } else {
      const res = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}`,
        { headers, next: { revalidate: 3600 } }
      );
      if (!res.ok) throw new Error('GitHub API error');
      const data = await res.json();
      return NextResponse.json(data);
    }
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 500 });
  }
}
