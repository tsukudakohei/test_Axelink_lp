import { NextRequest, NextResponse } from 'next/server';

// セミナー設定を一元管理
const SEMINAR_CONFIGS: Record<string, any> = {
  '20260224': {
    seminar_name: '生成AIを実務の武器に変える「業務解像度」向上セミナー',
    event_date: '2026-02-24',
    event_date_display: '2026年2月24日（火）15:00〜16:00',
    event_datetime: '2026-02-24T15:00:00+09:00',
    seminar_type: 'セミナー',
    event_format: 'オンライン',
    seminar_url: 'https://us06web.zoom.us/webinar/register/WN_TfEYFMxVS_2qwBuNvaV2pA',
    title: '生成AIを実務の武器に変える「業務解像度」向上セミナー',
    description: '本セミナーは、最新ツールの紹介やプロンプトの丸暗記を目的としたものではありません。生成AIを「優秀な部下」として使いこなし、実務で確かな成果を出すために不可欠な「業務を設計する力」を習得するための実践的プログラムです。',
    image: '/AIセミナー_20260224.png',
    schedule: {
      date: '2026年2月24日（火）15：00〜16：00',
      format: 'オンライン開催',
      note: '※お申し込みいただいた方に別途URLをお送りいたします。',
    },
    target_audience: [
      '組織の生産性を高めたい、事業責任者・マネジメント層の方',
      'YouTubeやセミナーで勉強したが、実務への応用がうまくいかない方',
      '自社でAIは導入されているが、日常業務で活用の糸口が掴めない方',
    ],
    overview: {
      name: '生成AIを実務の武器に変える「業務解像度」向上セミナー',
      date: '2026年2月24日（火）15:00〜16:00',
      format: 'オンライン開催（ウェビナー）',
      organizer: '株式会社ビズリンク',
    },
  },
  // 他のセミナーもここに追加可能
  // '20260315': { ... },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const config = SEMINAR_CONFIGS[id];

  if (!config) {
    return NextResponse.json(
      { success: false, message: 'セミナーが見つかりません' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: config,
  });
}
