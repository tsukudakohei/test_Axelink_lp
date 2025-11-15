
'use client';

import Link from 'next/link';

export default function ServicesOverview() {
  const services = [
    {
      name: 'AxelConsulting',
      subtitle: 'AX/DXコンサルティング',
      description: '課題診断からPoC実装、運用定着まで一気通貫でサポート。戦略立案から実行まで伴走します。',
      features: ['AI戦略策定', 'PoC実装支援', '運用定着支援', 'ROI最適化'],
      color: 'bg-orange-50 border-orange-200',
      iconColor: 'text-orange-600',
      hasCustomIcon: true,
      customIcon: 'https://static.readdy.ai/image/079662e86cc1d0cda5f94cae0351bd2c/b494930f6190a87caecc67f61647bffb.png'
    },
    {
      name: 'AxelAgent',
      subtitle: 'AI特化型フリーランスエージェント',
      description: '15,000名のAI/データ専門家から最適な人材をマッチング。スポット相談から長期プロジェクトまで対応。',
      features: ['AI/ML専門家', 'データサイエンティスト', 'AIエンジニア', 'プロダクトマネージャー'],
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
      hasCustomIcon: true,
      customIcon: 'https://static.readdy.ai/image/079662e86cc1d0cda5f94cae0351bd2c/46e5ea9aad404e15eb50156e9efa1e92.png'
    },
    {
      name: 'AxelMarket',
      subtitle: 'AIユースケース・ツールマーケット',
      description: '業界別AIユースケースやツールを提供。すぐに使える実装例やテンプレートで開発を加速。',
      features: ['業界別ユースケース', 'AIツールライブラリ', '実装テンプレート', 'ベストプラクティス'],
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600',
      hasCustomIcon: true,
      customIcon: 'https://static.readdy.ai/image/079662e86cc1d0cda5f94cae0351bd2c/f658b90d9ffe914af0c465cc900a4976.png'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1F2A44] mb-6">
            サービス全体像
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            3つのプロダクトが連携し、AI活用の全工程をサポート
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div key={index} className={`border-2 ${service.color} p-8 rounded-2xl min-h-[420px]`}>
              <div className="text-center mb-6">
                <div className={`w-full h-40 rounded-2xl ${service.color} flex items-center justify-center mx-auto mb-6`}>
                  {service.hasCustomIcon ? (
                    <img 
                      src={service.customIcon} 
                      alt={service.name}
                      className={
                        service.name === 'AxelConsulting' 
                          ? "w-50 h-50 object-contain"
                          : service.name === 'AxelAgent'
                          ? "w-44.3 h-44.3 object-contain"
                          : "w-48.2 h-48.2 object-contain"
                      }
                    />
                  ) : (
                    <i className={`ri-cpu-line text-4xl ${service.iconColor}`}></i>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-[#1F2A44] mb-3"></h3>
                <p className="text-gray-600 font-medium text-lg">{service.subtitle}</p>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">{service.description}</p>
              
              <ul className="space-y-3 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 bg-[#F49B28] rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center bg-white p-10 rounded-2xl shadow-sm">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-[#1F2A44] mb-6">
              連携効果で最大のROIを実現
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed text-lg">
              人材・コンサル・ツールが一体となって、AI活用の成功確率を最大化します
            </p>
            <Link 
              href="/consultation"
              className="bg-[#F49B28] text-white px-10 py-5 rounded-lg text-xl font-medium hover:bg-[#e8912a] transition-colors cursor-pointer whitespace-nowrap inline-block"
            >
              無料相談する
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
