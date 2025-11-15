
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ConsultationForm from './ConsultationForm';

export default function ConsultationPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        <div className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-[#1F2A44] mb-6">
                無料相談のお申し込み
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                30〜45分でAI活用の課題を整理し、最短の進め方をご提案いたします
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-[#1F2A44] mb-6">
                  相談内容の例
                </h2>
                <div className="space-y-4 mb-8">
                  {[
                    'AI導入の進め方がわからない',
                    'PoCで何から始めればいいか',
                    'AI専門人材の確保方法',
                    'コストと効果の見積もり',
                    '競合他社の事例を知りたい',
                    '自社に最適なAIソリューション'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#F49B28] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="font-bold text-[#1F2A44] mb-4">相談の流れ</h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-3">
                      <span className="bg-[#F49B28] text-white w-6 h-6 rounded-full text-xs flex items-center justify-center">1</span>
                      <span>現状の課題をヒアリング</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-[#F49B28] text-white w-6 h-6 rounded-full text-xs flex items-center justify-center">2</span>
                      <span>AI活用の可能性を診断</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-[#F49B28] text-white w-6 h-6 rounded-full text-xs flex items-center justify-center">3</span>
                      <span>最適なソリューションを提案</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <ConsultationForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
