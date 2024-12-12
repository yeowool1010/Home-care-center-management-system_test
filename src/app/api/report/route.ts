import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/utils/supabaseClient';

//////////////////////////////
// CREATE: 새 보고서 추가
//////////////////////////////
export async function POST(req: NextRequest) {
  try {
    const {
      member_id,
      record_date,
      record_5th,
      first_record,
      comment,
    } = await req.json();

    const { data, error } = await supabase
      .from('report')
      .insert([
        {
          member_id,
          record_date,
          record_5th,
          first_record,
          comment,
        },
      ])
      .select();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    console.error('Create Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//////////////////////////////
// READ: 전체 보고서 또는 특정 보고서 조회
//////////////////////////////
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    let query = supabase.from('report').select('*');

    if (id) {
      query = query.eq('id', Number(id));
    } 
    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error('Read Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
//////////////////////////////
// UPDATE: 보고서 정보 수정
//////////////////////////////
export async function PUT(req: NextRequest) {
  try {
    const {
      id,
      member_id,
      record_date,
      record_5th,
      first_record,
      comment,
    } = await req.json();

    const { data, error } = await supabase
      .from('report')
      .update({
        member_id,
        record_date,
        record_5th,
        first_record,
        comment,
      })
      .eq('id', id)
      .select();

    if (error) throw error;

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error('Update Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//////////////////////////////
// DELETE: 보고서 삭제
//////////////////////////////
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    const { data, error } = await supabase
      .from('report')
      .delete()
      .eq('id', id)
      .select();

    if (error) throw error;

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error('Delete Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
