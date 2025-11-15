
'use client';

export default function ProcessFlow() {
  const steps = [
    {
      number: '01',
      title: '無料相談',
      description: '現状の課題やご要望をヒアリング',
      duration: '30-45分',
      icon: 'ri-chat-1-line'
    },
    {
      number: '02',
      title: '業務診断',
      description: '業務プロセスとデータ状況を詳細分析',
      duration: '1-2週間',
      icon: 'ri-search-line'
    },
    {
      number: '03',
      title: '設計・開発',
      description: 'AI活用戦略の設計と開発準備',
      duration: '2-4週間',
      icon: 'ri-draft-line'
    },
    {
      number: '04',
      title: '実装',
      description: 'AIツール・システムの実装と検証',
      duration: '4-8週間',
      icon: 'ri-tools-line'
    },
    {
      number: '05',
      title: '運用定着',
      description: '現場への定着と継続的な改善',
      duration: '継続',
      icon: 'ri-rocket-line'
    }
  ];

  return (
    <section id="process" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1F2A44] mb-6">
            導入フロー
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            最短2週間で着手可能
          </p>
          <div className="inline-flex items-center gap-2 bg-[#F49B28] text-white px-4 py-2 rounded-full text-sm font-medium">
            <i className="ri-time-line"></i>
            <span>スピード重視の導入プロセス</span>
          </div>
        </div>
        
        <div className="relative">
          {/* 線の位置を調整 */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gray-300 z-0"></div>
          
          <div className="grid md:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-white border-4 border-[#F49B28] rounded-full flex items-center justify-center mx-auto relative z-10">
                      <i className={`${step.icon} text-xl text-[#F49B28]`}></i>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#1F2A44] text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.number}
                    </div>
                  </div>
                  
                  {/* コンテンツエリアを統一 */}
                  <div className="h-40 flex flex-col">
                    <h3 className="text-lg font-bold text-[#1F2A44] mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-1">{step.description}</p>
                    <div className="mt-auto">
                      <div className="inline-block bg-[#F49B28]/10 text-[#F49B28] px-3 py-1 rounded-full text-xs font-medium">
                        {step.duration}
                      </div>
                    </div>
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center mt-6 mb-2">
                    <div className="w-0.5 h-8 bg-gray-300"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-[#1F2A44] mb-4">
              まずはお気軽にご相談ください
            </h3>
            <p className="text-gray-600 mb-6 flex items-center justify-center gap-2">
              <i className="ri-lightbulb-line text-[#F49B28]"></i>
              無料相談では、お客様の現状をお伺いし、最適なAI活用方法をご提案いたします
            </p>
            <a 
              href="/consultation"
              className="bg-[#F49B28] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#e8912a] transition-colors cursor-pointer whitespace-nowrap inline-block"
            >
              無料相談を予約する
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
