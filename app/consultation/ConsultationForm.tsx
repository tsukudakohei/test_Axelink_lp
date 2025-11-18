
'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ConsultationForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    content: ''
  });
  const [agreed, setAgreed] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const companyInputRef = useRef<HTMLInputElement>(null);

  // ichisan.jpがサジェストから選択した時にstateを更新
  useEffect(() => {
    const companyInput = companyInputRef.current;
    if (!companyInput) return;

    const handleCompanyChange = () => {
      setFormData(prev => ({
        ...prev,
        company: companyInput.value
      }));
    };

    // ichisan.jpはjQuery UIのautocompleteを使用しているため、inputイベントを監視
    companyInput.addEventListener('input', handleCompanyChange);
    // autocompleteの選択イベントも監視
    companyInput.addEventListener('autocompleteselect', handleCompanyChange);

    return () => {
      companyInput.removeEventListener('input', handleCompanyChange);
      companyInput.removeEventListener('autocompleteselect', handleCompanyChange);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // 電話番号のバリデーション
    if (name === 'phone') {
      const phoneRegex = /^[0-9\-]*$/;
      setPhoneError(value !== '' && !phoneRegex.test(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // フォームから全データを取得（ichisan.jpが自動入力した会社情報も含む）
      const form = formRef.current;
      if (!form) return;

      const formDataToSend = new FormData(form);
      const params = new URLSearchParams();
      const slackData: Record<string, string> = {};

      formDataToSend.forEach((value, key) => {
        if (key !== 'agree') { // チェックボックスは除外
          params.append(key, value.toString());
          slackData[key] = value.toString();
        }
      });

      console.log('送信データ:', Object.fromEntries(params));

      // Slack通知を送信
      const slackMessage = `📩 *Axelink LP新規問い合わせ*

*【会社情報】*
*会社名:* ${slackData.company || '未入力'}
*法人番号:* ${slackData.company_id || '未取得'}
*郵便番号:* ${slackData.location_zipcode || '未取得'}
*所在地:* ${slackData.location_full || '未取得'}
*従業員数:* ${slackData.employee_num || '未取得'}
*インボイス番号:* ${slackData.invoice_id || '未取得'}

*【お客様情報】*
*お名前:* ${slackData.name}
*メールアドレス:* ${slackData.email}
*電話番号:* ${slackData.phone}

*【ご相談内容】*
${slackData.content}`;

      try {
        await fetch('https://script.google.com/macros/s/AKfycbwHYIZtNmpN_7mXrTbs2QEtFE0lKtaB5p1llnqbenpfPu9HELfyB1XQupduGV22Avg_/exec', {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
          },
          mode: 'no-cors',
          body: JSON.stringify({
            message: slackMessage,
            channelId: 'C08TZEWNRJL' // TODO: 実際のチャンネルIDに変更してください
          })
        });
        console.log('Slack通知送信完了');
      } catch (slackError) {
        console.error('Slack通知エラー:', slackError);
        throw slackError; // エラーを投げてアラートを表示
      }

      // サンクスページにリダイレクト
      router.push('/consultation/thanks');
    } catch (error) {
      console.error('送信エラー:', error);
      alert('送信に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1F2A44] mb-3">
          無料相談のお申し込み
        </h2>
        <p className="text-sm text-gray-600">
          専門スタッフが3営業日以内にご連絡いたします
        </p>
      </div>

      <form id="consultation" ref={formRef} onSubmit={handleSubmit} data-readdy-form>
        <div className="space-y-6">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
              会社名
            </label>
            <input
              type="text"
              id="company"
              name="company"
              ref={companyInputRef}
              value={formData.company}
              onChange={handleInputChange}
              className="company_name w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F49B28] focus:border-transparent outline-none transition-colors text-sm"
              placeholder="株式会社〇〇"
              autoComplete="off"
            />
            {/* ichisan.jpが自動入力する会社情報のhiddenフィールド */}
            <input type="hidden" name="company_id" className="company_id" />
            <input type="hidden" name="location_zipcode" className="location_zipcode" />
            <input type="hidden" name="location_full" className="location_full" />
            <input type="hidden" name="employee_num" className="employee_num" />
            <input type="hidden" name="invoice_id" className="invoice_id" />
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
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              電話番号 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#F49B28] focus:border-transparent outline-none transition-colors text-sm ${phoneError ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="03-1234-5678"
            />
            {phoneError && (
              <p className="text-red-500 text-xs mt-1">電話番号を正しく入力してください。</p>
            )}
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

          {/* 個人情報の取り扱いについて */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              個人情報のお取扱いに関する同意事項 <span className="text-red-500">*</span>
            </label>
            <div className="w-full h-48 overflow-y-auto border border-gray-300 rounded-lg p-4 text-xs text-gray-600 bg-gray-50">
              <p className="font-bold mb-2">1.事業者の氏名又は名称</p>
              <p className="mb-4">株式会社ビズリンク</p>

              <p className="font-bold mb-2">2.個人情報保護管理者の氏名又は職名、所属及び連絡先</p>
              <p className="mb-4">個人情報保護管理者<br />取締役 エグゼクティブ・マネージャー<br />TEL：03-6722-6028</p>

              <p className="font-bold mb-2">3.取得した個人情報の利用目的</p>
              <p className="mb-2">当社がWeb入力フォームで取得した個人情報は、以下の利用目的の範囲内で利用し、目的外の利用はいたしません。</p>
              <p className="mb-4">お問い合わせ項目・内容<br />利用目的当社へのお問合せ等で取得した個人情報<br />・お客様から当社サービスに関するご質問等への適切な対応及びご案内のため<br />・お客様から当社に関するお問い合わせ等への適切な対応及びご案内のため</p>

              <p className="font-bold mb-2">4.当社が取得した個人情報の第三者への委託について</p>
              <p className="mb-4">当社は、上記の利用目的の達成に必要な範囲内において、個人情報の取扱いの全部または一部を委託する場合があります。</p>

              <p className="font-bold mb-2">5.当社が取得した個人情報の第三者への提供について</p>
              <p className="mb-2">当社は、次の場合を除いて、取得した個人情報を第三者に提供することはありません。</p>
              <p className="mb-4">
                1) 本人が事前に同意された場合<br />
                2) 法令に基づく場合<br />
                3) 人の生命、身体又は財産の保護のために必要がある場合であり、本人の同意を得ることが困難であるとき<br />
                4) 公衆衛生の向上又は児童の健全な育成の推進のために特に必要がある場合であり、本人の同意を得ることが困難であるとき<br />
                5) 国の機関若しくは地方公共団体又はその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であり、本人の同意を得ることが困難であるとき
              </p>

              <p className="font-bold mb-2">6.個人情報保護のための安全管理</p>
              <p className="mb-4">当社は、ご本人の個人情報を保護するための規程類を定め、従業者全員に周知・徹底と啓発・教育を図るとともに、その遵守状況の監査を定期的に実施いたします。また、ご本人の個人情報を保護するために必要な安全管理措置の維持・向上に努めてまいります。</p>

              <p className="font-bold mb-2">7.個人情報の開示・訂正・利用停止等の手続</p>
              <p className="mb-4">ご本人が、当社が保有するご自身の個人情報の、利用目的の通知、開示、内容の訂正、追加又は削除、利用の停止、消去及び第三者への提供の停止を求める場合には、下記に連絡を頂くことで、対応致します。<br />＜個人情報お問合せ窓口＞<br />株式会社ビズリンク 個人情報お問合せ窓口<br />TEL：03-6722-6028</p>

              <p className="font-bold mb-2">8.ご提供いただく情報の任意性</p>
              <p className="mb-4">個人情報のご提供は任意ですが、同意を頂けない場合には、第3項にあります利用目的が達成できない事をご了承いただくこととなります。</p>

              <p className="font-bold mb-2">9.当社Ｗｅｂサイトの運営について</p>
              <p>当社サイトでは、ご本人が当社Ｗｅｂサイトを再度訪問されたときなどに、より便利に閲覧して頂けるよう「クッキー（Cookie）」という技術を使用することがあります。これは、ご本人のコンピュータが当社Ｗｅｂサイトのどのページに訪れたかを記録しますが、ご本人が当社Ｗｅｂサイトにおいてご自身の個人情報を入力されない限りご本人ご自身を特定、識別することはできません。クッキーの使用を希望されない場合は、ご本人のブラウザの設定を変更することにより、クッキーの使用を拒否することができます。その場合、一部または全部のサービスがご利用できなくなることがあります。</p>
            </div>
          </div>

          {/* 同意チェックボックス */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-4 h-4 text-[#F49B28] border-gray-300 rounded focus:ring-[#F49B28]"
            />
            <label htmlFor="agree" className="text-sm text-gray-700 cursor-pointer">
              同意する <span className="text-red-500">*</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || formData.content.length > 500 || !agreed || phoneError}
            className="w-full bg-[#F49B28] text-white py-4 rounded-lg font-medium text-lg hover:bg-[#e8912a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isSubmitting ? '送信中...' : '送信'}
          </button>
        </div>
      </form>

    </div>
  );
}
