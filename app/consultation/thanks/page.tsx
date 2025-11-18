
import Link from 'next/link';

export default function ThanksPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-2xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-check-line text-3xl text-green-600"></i>
          </div>
          <h1 className="text-2xl font-bold text-[#1F2A44] mb-4">
            お申し込みありがとうございます
          </h1>
          <p className="text-gray-600 mb-6">
            担当者より3営業日以内にご連絡いたします。<br />
            お急ぎの場合は、お電話でもお問い合わせいただけます。
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-8">
            <p className="text-sm text-gray-600">
              TEL: 03-6722-6028<br />
              受付時間: 平日 9:00-18:00
            </p>
          </div>
          <Link
            href="/"
            className="inline-block bg-[#F49B28] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#e8912a] transition-colors"
          >
            トップページへ戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
