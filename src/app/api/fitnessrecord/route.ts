import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/utils/supabaseClient';

// CREATE: 새로운 기록 추가
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      member_id,
      check_th,
      measurement_date,
      upper_body_strength,
      upper_body_flexibility,
      lower_body_strength,
      lower_body_flexibility,
      tug,
      walking_distance,
      avg_level,
      status,
      comment,
    } = body;

    const { data, error } = await supabase.from('fitnessrecord').insert([
      {
        member_id,
        check_th,
        measurement_date,
        upper_body_strength,
        upper_body_flexibility,
        lower_body_strength,
        lower_body_flexibility,
        tug,
        walking_distance,
        avg_level,
        status,
        comment,
      },
    ]);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

// READ: 모든 기록 조회
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const member_id = searchParams.get('member_id');

    let query = supabase.from('fitnessrecord').select('*');

    if (member_id) {
      query = query.eq('member_id', member_id);
    }

    const { data, error } = await query;

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Error fetching records' }, { status: 500 });
  }
}

// UPDATE: 기록 수정
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updateFields } = body;

    const { data, error } = await supabase.from('fitnessrecord').update(updateFields).eq('id', id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

// DELETE: 기록 삭제
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    const { data, error } = await supabase.from('fitnessrecord').delete().eq('id', id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
