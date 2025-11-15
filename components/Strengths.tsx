
'use client';

export default function Strengths() {
  const strengths = [
    {
      title: 'ワンストップ解決が可能',
      description: '課題整理から人材アサイン、システム開発、データ整備、教育まで一気通貫で対応',
      details: '部分最適にとどまらず、成果につながるプロセス全体を伴走'
    },
    {
      title: '専門家人材が多数在籍',
      description: '登録人材15,000名以上／専門家4,000名以上',
      details: 'AI・データ・PM・デザインなど多様な即戦力を柔軟にアサイン\nスポット〜常駐まで、必要なタイミングで必要なリソースを提供'
    },
    {
      title: 'データ基盤から支える対応力',
      description: 'Google Workspace、kintone、BigQueryなどの散在データを統合',
      details: 'データパイプライン整備からAI活用可能な状態まで支援\n基盤づくりとAI活用を一貫してサポート'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1F2A44] mb-6">
            Axelinkの3つの強み
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI導入から運用まで、確実な成果を生み出すための3つの力
          </p>
        </div>
        
        <div className="space-y-8">
          {strengths.map((strength, index) => (
            <div key={index} className="bg-white border border-gray-200 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 hover:border-[#F49B28]/30 min-h-[200px]">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-[#F49B28] rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl font-bold text-white">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#1F2A44] mb-4">{strength.title}</h3>
                  
                  <p className="text-gray-700 font-medium mb-4 leading-relaxed text-lg">
                    {strength.description}
                  </p>
                  
                  <div className="text-gray-600 leading-relaxed">
                    {strength.details.split('\n').map((line, idx) => (
                      <div key={idx} className="flex items-start gap-3 mb-2">
                        <div className="w-1.5 h-1.5 bg-[#F49B28] rounded-full flex-shrink-0 mt-2"></div>
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
