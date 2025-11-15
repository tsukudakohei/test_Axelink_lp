
'use client';

import { useState } from 'react';

export default function ConsultationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    content: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://readdy.ai/api/store/forms/4jrEXJbQeGbMRhSJ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData)
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ company: '', name: '', email: '', content: '' });
      } else {
        alert('送信に失敗しました。もう一度お試しください。');
      }
    } catch (error) {
      alert('送信に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="ri-check-line text-2xl text-green-600"></i>
        </div>
        <h2 className="text-2xl font-bold text-[#1F2A44] mb-4">
          お申し込みありがとうございます
        </h2>
        <p className="text-gray-600 mb-6">
          担当者より3営業日以内にご連絡いたします。<br />
          お急ぎの場合は、お電話でもお問い合わせいただけます。
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">
            TEL: 03-6722-6028<br />
            受付時間: 平日 9:00-18:00
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#1F2A44] mb-4">
          無料相談お申し込み
        </h2>
        <p className="text-gray-600">
          30-45分で課題整理と最短の進め方をご提案します
        </p>
      </div>

      <form id="consultation" onSubmit={handleSubmit} data-readdy-form>
        <div className="space-y-6">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
              会社名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F49B28] focus:border-transparent outline-none transition-colors text-sm"
              placeholder="株式会社〇〇"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              お名前 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F49B28] focus:border-transparent outline-none transition-colors text-sm"
              placeholder="山田 太郎"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              メールアドレス <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F49B28] focus:border-transparent outline-none transition-colors text-sm"
              placeholder="example@company.com"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              ご相談内容 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
              rows={6}
              maxLength={500}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F49B28] focus:border-transparent outline-none transition-colors text-sm resize-vertical"
              placeholder="現在の課題や実現したいことなど、お気軽にご相談ください（500文字以内）"
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {formData.content.length}/500文字
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-2">相談内容の例</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• AI導入を検討しているが、何から始めればよいか分からない</li>
              <li>• データが分散しており、統合したい</li>
              <li>• 業務効率化のためのAIツールを探している</li>
              <li>• 社内のAIリテラシー向上のための研修を実施したい</li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || formData.content.length > 500}
            className="w-full bg-[#F49B28] text-white py-4 rounded-lg font-medium text-lg hover:bg-[#e8912a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isSubmitting ? '送信中...' : '無料相談を申し込む'}
          </button>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="grid md:grid-cols-1 gap-6 text-center text-sm text-gray-600">
          <div>
            <i className="ri-shield-check-line text-xl text-[#F49B28] mb-2 block"></i>
            <p>完全無料</p>
          </div>
        </div>
      </div>
    </div>
  );
}
