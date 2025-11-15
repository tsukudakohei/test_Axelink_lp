
'use client';

export default function ProblemSection() {
  const problems = [
    '何から始めたらいいか分からない',
    'SaaS導入が進みすぎてデータがサイロ化している',
    '社内にAI人材やスキルがない',
    '外部ベンダー任せでブラックボックス化',
    '現場に運用が定着しない'
  ];

  const imageUrl = "https://static.readdy.ai/image/079662e86cc1d0cda5f94cae0351bd2c/8b1a2fe0af4411265b51bd6d29764454.png";

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1F2A44] mb-16">
            AI導入で、こんなお悩みは<br className="md:hidden" />ありませんか？
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* 左側：お悩みリスト */}
            <div className="space-y-6">
              {problems.map((problem, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 text-left p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 border-2 border-red-400 rounded flex items-center justify-center bg-red-50">
                      <div className="w-3 h-3 bg-red-400 rounded-sm"></div>
                    </div>
                  </div>
                  <p className="text-lg text-gray-800 leading-relaxed font-medium">{problem}</p>
                </div>
              ))}
            </div>
            
            {/* 右側：悩んでいる人のイラスト */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md">
                <img 
                  src={imageUrl}
                  alt="AI導入で悩む人のイラスト"
                  className="w-full h-auto object-cover rounded-lg shadow-sm"
                  suppressHydrationWarning={true}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* スムーズな遷移セクション */}
        <div className="text-center mb-16">
          <div className="max-w-3xl mx-auto">
            <div className="w-1 h-16 bg-gradient-to-b from-red-400 to-[#F49B28] mx-auto mb-8"></div>
          </div>
        </div>
        
        {/* 解決メッセージ */}
        <div className="text-center max-w-5xl mx-auto">
          <div className="bg-white p-12 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#F49B28] to-orange-300"></div>
            <h3 className="text-4xl md:text-5xl font-bold text-[#1F2A44] mb-6">
              その悩み、<span className="text-[#F49B28]">Axelink</span>が解決します
            </h3>
            <p className="text-xl text-gray-600 font-medium leading-relaxed">
              「人材×実装×定着」で、AI導入の課題を根本から解決
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}