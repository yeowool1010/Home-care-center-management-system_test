// src/app/api/center/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabaseClient';

// READ: center 테이블의 모든 데이터 조회
export async function GET() {
  try {
    const { data, error } = await supabase.from('center').select('*');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
