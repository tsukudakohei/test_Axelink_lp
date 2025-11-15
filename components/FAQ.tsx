
'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: '相談は無料ですか？',
      answer: 'はい、初回相談は完全無料です。30-45分程度で、お客様の課題をお伺いし、最適なAI活用方法をご提案いたします。無理な営業は一切行いませんので、お気軽にご相談ください。'
    },
    {
      question: '最短でいつから開始できますか？',
      answer: '無料相談後、最短2週間程度で実際のプロジェクトを開始できます。お客様の課題の複雑さや規模によって異なりますが、スピード重視での対応が可能です。'
    },
    {
      question: '小規模な相談でも対応可能ですか？',
      answer: 'はい、週1日からの小規模なご相談にも対応しています。企業規模や予算に関わらず、お客様のニーズに合わせた柔軟なサポートを提供いたします。'
    },
    {
      question: 'データが散在していても大丈夫ですか？',
      answer: 'はい、データの統合から支援可能です。散在したデータの整理・統合・クレンジングから始めて、AI活用できる状態まで一貫してサポートいたします。'
    },
    {
      question: 'セキュリティ面は大丈夫ですか？',
      answer: 'セキュリティには万全の対策を講じています。NDA（秘密保持契約）の締結、適切な権限管理、監査ログの取得など、お客様の機密情報を厳重に保護いたします。'
    },
    {
      question: 'どのような業界に対応していますか？',
      answer: '製造業、小売業、サービス業、金融業、ヘルスケアなど、幅広い業界での実績があります。業界特有の課題やニーズに合わせたカスタマイズした解決策を提供いたします。'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1F2A44] mb-6">
            よくあるご質問
          </h2>
          <p className="text-xl text-gray-600">
            お客様からよくいただくご質問にお答えします
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <h3 className="text-lg font-medium text-[#1F2A44] pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  <i className={`ri-${openIndex === index ? 'subtract' : 'add'}-line text-xl text-[#F49B28]`}></i>
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <div className="border-t pt-4">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-[#1F2A44] mb-4">
            その他のご質問がございましたら
          </h3>
          <p className="text-gray-600 mb-6">
            お気軽にお問い合わせください。専門スタッフが丁寧にお答えいたします。
          </p>
          <a 
            href="/consultation"
            className="bg-[#F49B28] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#e8912a] transition-colors cursor-pointer whitespace-nowrap inline-block"
          >
            無料相談で質問する
          </a>
        </div>
      </div>
    </section>
  );
}
