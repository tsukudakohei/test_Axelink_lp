
'use client';

export default function ValueProposition() {
  const services = [
    {
      title: 'AI人材アサイン',
      description: '必要な時に必要な強度で即戦力を投入',
      icon: 'ri-user-star-line',
      details: [
        'データサイエンティスト',
        'AIエンジニア',
        'プロジェクトマネージャー',
        'スポット〜常駐まで柔軟対応'
      ]
    },
    {
      title: 'AI戦略コンサルティング',
      description: '業務診断からAI活用戦略の策定まで',
      icon: 'ri-lightbulb-line',
      details: [
        '現状業務の可視化・分析',
        'AI活用ポイントの特定',
        'ROI試算とロードマップ策定',
        'プロジェクト推進支援'
      ]
    },
    {
      title: 'システム開発・実装',
      description: 'AIを活用したシステム開発を技術面で支援',
      icon: 'ri-code-box-line',
      details: [
        'カスタムAIソリューション開発',
        '既存システムとの連携',
        'データパイプライン構築',
        '運用保守体制の構築'
      ]
    },
    {
      title: '教育・研修',
      description: '組織全体のAIリテラシー向上を支援',
      icon: 'ri-graduation-cap-line',
      details: [
        '経営層向けAI戦略研修',
        '現場スタッフ向け実践研修',
        'ハンズオン型ワークショップ',
        '継続的なスキルアップ支援'
      ]
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1F2A44] mb-6">
            Axelinkがご提供できること
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI導入から定着まで、ワンストップでサポートします
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#F49B28]/30">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#F49B28] rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className={`${service.icon} text-2xl text-white`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#1F2A44] mb-3">{service.title}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-[#F49B28] rounded-full flex-shrink-0"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center max-w-5xl mx-auto mt-20">
          <div className="bg-gray-50 p-10 rounded-xl border border-gray-200 relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#F49B28] rounded-l-xl"></div>
            <h3 className="text-3xl font-bold text-[#1F2A44] mb-4">
              AI活用の出発点は、<span className="text-[#F49B28]">AX（業務変革）</span>から
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              AI導入は単なるツール導入ではなく業務変革です。AxelConsultingが診断から開発、運用定着まで一貫して支援し、
              真の意味でのデジタルトランスフォーメーションを実現します。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
