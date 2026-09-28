import { NextRequest, NextResponse } from 'next/server';
import { getVisitsData } from '@/src/services/visitsService';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get('key') || undefined;

  const result = await getVisitsData(key);

  if (!result.authorized) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(result);
}
