import { NextResponse } from 'next/server';
import than_gioi from '@/data/chibi/than_gioi.json';
import tay_du from '@/data/chibi/tay_du.json';
import viet_nam from '@/data/chibi/viet_nam.json';
import tam_quoc from '@/data/chibi/tam_quoc.json';
import kim_dung from '@/data/chibi/kim_dung.json';
import phong_van from '@/data/chibi/phong_van.json';
import wwe from '@/data/chibi/wwe.json';

export async function GET() {
  const aggregatedData = {
    than_gioi,
    tay_du,
    viet_nam,
    tam_quoc,
    kim_dung,
    phong_van,
    wwe,
  };

  return NextResponse.json(aggregatedData);
}
