import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

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
async function submitToGAS(formData: any): Promise<{ success: boolean; message: string }> {
  const gasUrl = process.env.GAS_WEB_APP_URL;

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
    const body = await request.json();
    const { turnstileToken, ...formData } = body;

    // 1. Turnstile検証
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const isValidCaptcha = await verifyTurnstile(turnstileToken, ip);

    if (!isValidCaptcha) {
      return NextResponse.json(
        { success: false, message: 'キャプチャ検証に失敗しました。もう一度お試しください。' },
        { status: 400 }
      );
    }

    // 2. バリデーション
    const requiredFields = ['company_name', 'position', 'last_name', 'first_name', 'email', 'phone'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json(
          { success: false, message: `必須項目が入力されていません: ${field}` },
          { status: 400 }
        );
      }
    }

    // 3. GASにデータを送信
    const result = await submitToGAS(formData);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, message: '送信に失敗しました。しばらく経ってからもう一度お試しください。' },
      { status: 500 }
    );
  }
}
