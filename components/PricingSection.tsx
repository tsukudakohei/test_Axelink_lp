
'use client';

export default function PricingSection() {
  const pricingModels = [
    {
      title: '人材アサイン',
      subtitle: '時間単価 / 月額',
      description: '週1日から常駐まで柔軟な稼働形態',
      features: [
        'AI専門家：8,000円〜/時間',
        'データサイエンティスト：7,000円〜/時間',
        'AIエンジニア：6,000円〜/時間',
        '月額固定：週1日〜フルタイム'
      ],
      highlight: '最短即日アサイン',
      color: 'border-blue-200 bg-blue-50'
    },
    {
      title: 'PoCパッケージ',
      subtitle: '定額制',
      description: '要件定義から実装まで一括対応',
      features: [
        'スモール：50万円〜',
        'スタンダード：150万円〜',
        'エンタープライズ：300万円〜',
        '成果物・期間保証付き'
      ],
      highlight: '固定費で安心',
      color: 'border-orange-200 bg-orange-50'
    },
    {
      title: '運用サポート',
      subtitle: '月額制',
      description: 'システム運用と継続改善',
      features: [
        'ベーシック：20万円/月',
        'スタンダード：50万円/月',
        'プレミアム：100万円/月',
        '24時間監視・保守対応'
      ],
      highlight: '運用定着まで',
      color: 'border-green-200 bg-green-50'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1F2A44] mb-6">
            料金・契約例
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            透明性の高い料金体系で、コストを明確化
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {pricingModels.map((model, index) => (
            <div key={index} className={`border-2 ${model.color} p-8 rounded-2xl`}>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-[#1F2A44] mb-2">{model.title}</h3>
                <p className="text-[#F49B28] font-medium text-lg">{model.subtitle}</p>
                <div className="bg-[#F49B28] text-white px-4 py-2 rounded-full text-sm font-medium mt-4 inline-block">
                  {model.highlight}
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 text-center">{model.description}</p>
              
              <ul className="space-y-4">
                {model.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#F49B28] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-[#1F2A44] mb-6 text-center">
              コスト透明性への取り組み
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#F49B28]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-time-line text-2xl text-[#F49B28]"></i>
                </div>
                <h4 className="font-bold text-[#1F2A44] mb-2">稼働時間の可視化</h4>
                <p className="text-gray-600 text-sm">日次・週次でタイムレポートを提供</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#F49B28]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-file-text-line text-2xl text-[#F49B28]"></i>
                </div>
                <h4 className="font-bold text-[#1F2A44] mb-2">成果物の明確化</h4>
                <p className="text-gray-600 text-sm">納品物と品質基準を事前に合意</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#F49B28]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-calculator-line text-2xl text-[#F49B28]"></i>
                </div>
                <h4 className="font-bold text-[#1F2A44] mb-2">ROI追跡</h4>
                <p className="text-gray-600 text-sm">投資対効果を定量的に測定</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
