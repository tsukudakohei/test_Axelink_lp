import { NextRequest, NextResponse } from 'next/server';

// Cloudflare Turnstileの検証
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.error('TURNSTILE_SECRET_KEY is not set');
    return false;
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
        remoteip: ip,
      }),
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

// GASへのデータ送信
async function submitToGAS(formData: any, gasUrl: string): Promise<{ success: boolean; message: string }> {
  if (!gasUrl) {
    throw new Error('GAS_WEB_APP_URL is not configured');
  }

  try {
    const response = await fetch(gasUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`GAS request failed with status ${response.status}`);
    }

    // GASからのレスポンスを取得（必要に応じて処理）
    // const result = await response.json();

    return {
      success: true,
      message: 'セミナーのお申し込みを受け付けました',
    };
  } catch (error) {
    console.error('GAS submission error:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // GAS URL（環境変数または直接指定）
    const gasUrl = process.env.GAS_WEB_APP_URL || 'https://script.google.com/macros/s/AKfycby9bsHJsQFnneVWTMXtPfE5oyIkpnXWwC2QYXSBVordWYEEZYmvGKTVfU4-kwzZhYyw/exec';

    // 1. バリデーション
    const requiredFields = ['company_name', 'position', 'last_name', 'first_name', 'email', 'phone'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json(
          { success: false, message: `必須項目が入力されていません: ${field}` },
          { status: 400 }
        );
      }
    }

    // 2. GASにデータを送信
    const result = await submitToGAS(formData, gasUrl);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    const errorMessage = error instanceof Error ? error.message : '不明なエラー';
    return NextResponse.json(
      {
        success: false,
        message: '送信に失敗しました。しばらく経ってからもう一度お試しください。',
        error: errorMessage,
        debug: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}
