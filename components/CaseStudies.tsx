
'use client';

export default function CaseStudies() {
  const cases = [
    {
      industry: '製造業',
      title: 'AI予測モデル導入による在庫最適化',
      challenge: 'AI導入の最初の一歩が踏み出せない',
      solution: '業務診断→AI人材アサイン→予測モデル導入',
      result: '在庫コストを20%削減',
      resultIcon: 'ri-arrow-down-line',
      image: 'https://readdy.ai/api/search-image?query=Modern%20manufacturing%20facility%20with%20AI%20technology%20integration%2C%20clean%20industrial%20environment%2C%20automated%20systems%2C%20data%20analytics%20displays%2C%20efficiency%20and%20optimization%2C%20professional%20industrial%20setting%2C%20blue%20and%20orange%20accent%20colors&width=400&height=250&seq=case1&orientation=landscape'
    },
    {
      industry: '小売業',
      title: 'データ統合ダッシュボード構築',
      challenge: 'SaaS乱立で顧客データが分散',
      solution: 'データ統合ダッシュボード構築',
      result: 'マーケROIが30%改善',
      resultIcon: 'ri-arrow-up-line',
      image: 'https://readdy.ai/api/search-image?query=Modern%20retail%20analytics%20dashboard%20with%20data%20visualization%2C%20customer%20insights%2C%20marketing%20ROI%20metrics%2C%20clean%20professional%20interface%2C%20digital%20transformation%20in%20retail%2C%20blue%20and%20orange%20color%20scheme&width=400&height=250&seq=case2&orientation=landscape'
    },
    {
      industry: 'サービス業',
      title: 'AIチャットツール開発',
      challenge: '問い合わせ対応の属人化',
      solution: 'AIチャットツールを開発',
      result: '対応時間を70%削減',
      resultIcon: 'ri-time-line',
      image: 'https://readdy.ai/api/search-image?query=AI%20chatbot%20customer%20service%20interface%2C%20modern%20business%20communication%2C%20automated%20support%20system%2C%20professional%20service%20environment%2C%20efficiency%20improvement%2C%20clean%20design%20with%20blue%20and%20orange%20accents&width=400&height=250&seq=case3&orientation=landscape'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1F2A44] mb-6">
            導入事例
          </h2>
          <p className="text-xl text-gray-600">
            様々な業界でAI活用を成功に導いています
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((caseStudy, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={caseStudy.image}
                  alt={caseStudy.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              
              <div className="p-6">
                <div className="inline-block bg-[#F49B28]/10 text-[#F49B28] px-3 py-1 rounded-full text-sm font-medium mb-3">
                  {caseStudy.industry}
                </div>
                
                <h3 className="text-lg font-bold text-[#1F2A44] mb-3 leading-tight">
                  {caseStudy.title}
                </h3>
                
                <div className="space-y-3 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">課題</h4>
                    <p className="text-sm text-gray-700">{caseStudy.challenge}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">解決策</h4>
                    <p className="text-sm text-gray-700">{caseStudy.solution}</p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <i className={`${caseStudy.resultIcon} text-green-600 text-sm`}></i>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">成果</h4>
                      <p className="text-lg font-bold text-[#1F2A44]">{caseStudy.result}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            あなたの事業にも、同様の成果をもたらします
          </p>
          <a 
            href="/consultation"
            className="bg-[#F49B28] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#e8912a] transition-colors cursor-pointer whitespace-nowrap inline-block"
          >
            無料相談で事例詳細を聞く
          </a>
        </div>
      </div>
    </section>
  );
}
