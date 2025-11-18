
'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img
                src="/Axelink_Bg.svg"
                alt="Axelink"
                className="h-8"
              />
            </div>
            <p className="text-gray-600 leading-relaxed max-w-md">
              AI導入のパートナーとして、あなたの事業を加速します。
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-6 text-[#1F2A44]">サービス</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-[#1F2A44] transition-colors cursor-pointer">AxelAgent</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#1F2A44] transition-colors cursor-pointer">AxelConsulting</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#1F2A44] transition-colors cursor-pointer">AxelMarket</a></li>
              <li><Link href="/consultation" className="text-gray-600 hover:text-[#1F2A44] transition-colors cursor-pointer">お問い合わせ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-6 text-[#1F2A44]">会社情報</h3>
            <ul className="space-y-3 text-sm">
              <li className="text-gray-600">
                <strong className="text-[#1F2A44]">株式会社ビズリンク</strong>
              </li>
              <li className="text-gray-600">
                代表者：姜 大成
              </li>
              <li className="text-gray-600">
                〒141-0022<br />
                東京都品川区東五反田2-3-5<br />
                五反田中央ビル8階
              </li>
              <li className="text-gray-600">
                TEL: 03-6722-6028
              </li>
              <li>
                <a href="mailto:info@bizlink.io" className="text-gray-600 hover:text-[#1F2A44] transition-colors cursor-pointer">
                  info@bizlink.io
                </a>
              </li>
              <li className="text-gray-600">
                URL: https://corp.bizlink.io/
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-300 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <Link href="https://freelance.bizlink.io/privacy" className="hover:text-[#1F2A44] transition-colors cursor-pointer">プライバシーポリシー</Link>
              <Link href="https://freelance.bizlink.io/terms" className="hover:text-[#1F2A44] transition-colors cursor-pointer">利用規約</Link>
            </div>
            <p className="text-sm text-gray-600">
              © 2024 株式会社ビズリンク. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
