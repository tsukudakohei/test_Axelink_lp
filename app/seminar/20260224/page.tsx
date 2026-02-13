'use client';

import { useEffect, useRef, useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import Script from 'next/script';

interface SeminarConfig {
  seminar_name: string;
  event_date: string;
  event_date_display: string;
  event_datetime: string;
  seminar_type: string;
  event_format: string;
  seminar_url: string;
  title: string;
  description: string;
  image: string;
  schedule: {
    date: string;
    format: string;
    note: string;
  };
  target_audience: string[];
  overview: {
    name: string;
    date: string;
    format: string;
    organizer: string;
  };
}

export default function SeminarPage() {
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [seminarConfig, setSeminarConfig] = useState<SeminarConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const turnstileRef = useRef<any>(null);

  // セミナー設定を取得
  useEffect(() => {
    const fetchSeminarConfig = async () => {
      try {
        const response = await fetch('/api/seminar/config/20260224');
        const result = await response.json();
        if (result.success) {
          setSeminarConfig(result.data);
        } else {
          console.error('Failed to fetch seminar config');
        }
      } catch (error) {
        console.error('Error fetching seminar config:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeminarConfig();
  }, []);

  useEffect(() => {
    // モバイルCTA：フォームが見えたら非表示
    const ctaBar = document.querySelector('.mobile-cta-bar');
    const formSection = document.querySelector('.sub-col');
    if (ctaBar && formSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              ctaBar.classList.add('hidden');
            } else {
              ctaBar.classList.remove('hidden');
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(formSection);
    }

    // フッター：左カラムが最下部までスクロールしたら表示
    const mainCol = document.querySelector('.main-col');
    const footer = document.querySelector('.site-footer');
    if (mainCol && footer) {
      const checkScroll = () => {
        const el = window.innerWidth <= 860 ? document.documentElement : mainCol;
        const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 20;
        footer.classList.toggle('visible', atBottom);
      };

      mainCol.addEventListener('scroll', checkScroll);
      window.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);

      return () => {
        mainCol.removeEventListener('scroll', checkScroll);
        window.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  function mapEmployeeScale(num: string) {
    const n = parseInt(num, 10);
    if (isNaN(n) || n <= 0) return '';
    if (n <= 10) return '1-10名';
    if (n <= 50) return '11-50名';
    if (n <= 100) return '51-100名';
    if (n <= 300) return '101-300名';
    if (n <= 1000) return '301-1000名';
    return '1001名以上';
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!seminarConfig) {
      alert('セミナー情報の読み込みに失敗しました。');
      return;
    }

    if (!turnstileToken) {
      alert('キャプチャを完了してください。');
      return;
    }

    setIsSubmitting(true);

    const form = e.currentTarget;
    const urlParams = new URLSearchParams(window.location.search);

    const formData = {
      seminar_name: seminarConfig.seminar_name,
      event_date: seminarConfig.event_date,
      seminar_type: seminarConfig.seminar_type,
      event_format: seminarConfig.event_format,
      event_datetime: seminarConfig.event_datetime,
      event_date_display: seminarConfig.event_date_display,
      seminar_url: seminarConfig.seminar_url,
      company_name: (form.elements.namedItem('company_name') as HTMLInputElement).value,
      company_id: (form.elements.namedItem('company_id') as HTMLInputElement).value,
      location_zipcode: (form.elements.namedItem('location_zipcode') as HTMLInputElement).value,
      location_pref: (form.elements.namedItem('location_pref') as HTMLInputElement).value,
      location_city: (form.elements.namedItem('location_city') as HTMLInputElement).value,
      location_town: (form.elements.namedItem('location_town') as HTMLInputElement).value,
      location_street: (form.elements.namedItem('location_street') as HTMLInputElement).value,
      location_full: (form.elements.namedItem('location_full') as HTMLInputElement).value,
      employee_num: (form.elements.namedItem('employee_num') as HTMLInputElement).value,
      employee_scale:
        (form.elements.namedItem('employee_scale_manual') as HTMLSelectElement).value ||
        mapEmployeeScale((form.elements.namedItem('employee_num') as HTMLInputElement).value),
      position: (form.elements.namedItem('position') as HTMLSelectElement).value,
      department: (form.elements.namedItem('department') as HTMLInputElement).value,
      last_name: (form.elements.namedItem('last_name') as HTMLInputElement).value,
      first_name: (form.elements.namedItem('first_name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      industry: (form.elements.namedItem('industry') as HTMLSelectElement).value,
      interest_area: (form.elements.namedItem('interest_area') as HTMLSelectElement).value,
      utm_source: urlParams.get('utm_source') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || '',
      turnstileToken,
    };

    console.log('送信データ:', formData);

    try {
      const response = await fetch('/api/seminar/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // 成功時の処理
        const formPanel = document.querySelector('.form-panel');
        if (formPanel) {
          formPanel.innerHTML =
            '<div style="text-align:center; padding:40px 20px;">' +
            '<h2 style="color:#2c5282; font-size:20px; margin-bottom:16px;">お申し込みありがとうございます</h2>' +
            '<p style="font-size:15px; line-height:1.8; color:#333;">ご登録のメールアドレスに<br>セミナー参加URLをお送りいたします。</p>' +
            '</div>';
        }
        const ctaBar = document.querySelector('.mobile-cta-bar') as HTMLElement;
        if (ctaBar) ctaBar.style.display = 'none';
      } else {
        // エラー時の処理
        alert(result.message || '送信に失敗しました。もう一度お試しください。');
        // Turnstileをリセット
        turnstileRef.current?.reset();
        setTurnstileToken('');
      }
    } catch (error) {
      console.error('送信エラー:', error);
      alert('送信に失敗しました。もう一度お試しください。');
      // Turnstileをリセット
      turnstileRef.current?.reset();
      setTurnstileToken('');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ローディング中
  if (isLoading || !seminarConfig) {
    return (
      <div className="page-layout">
        <header className="site-header">
          <div className="header-inner">
            <div className="logo-area">
              <img src="/bizlink_group.png" alt="ビズリンクグループ" />
            </div>
          </div>
        </header>
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <p>読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script src="https://ichisan.jp/form/lib/ichisanForm.min.js" strategy="lazyOnload" />
      <div className="page-layout">
        {/* ヘッダー */}
        <header className="site-header">
        <div className="header-inner">
          <div className="logo-area">
            <img src="/bizlink_group.png" alt="ビズリンクグループ" />
          </div>
        </div>
      </header>

      {/* 2カラム */}
      <div className="two-col-wrapper">
        {/* 左カラム：スクロール */}
        <div className="main-col">
          <div className="main-col-inner">
            {/* メイン画像 */}
            <div className="main-image">
              <img src={seminarConfig.image} alt={seminarConfig.title} />
            </div>

            {/* タイトル */}
            <h1 className="event-title">{seminarConfig.title}</h1>

            {/* セミナー説明 */}
            <p className="event-description">{seminarConfig.description}</p>

            {/* 開催日 */}
            <div className="content-section">
              <h2 className="section-heading">開催日</h2>
              <div className="section-body">
                <p>
                  {seminarConfig.schedule.date}　{seminarConfig.schedule.format}
                </p>
                <p className="note">{seminarConfig.schedule.note}</p>
              </div>
            </div>

            {/* こんな方におすすめ */}
            <div className="content-section">
              <h2 className="section-heading">こんな方におすすめ</h2>
              <div className="section-body">
                <ul className="target-list">
                  {seminarConfig.target_audience.map((item, index) => (
                    <li key={index}>・{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* セミナー概要 */}
            <div className="content-section">
              <h2 className="section-heading">セミナー概要</h2>
              <div className="overview-table">
                <div className="overview-row">
                  <div className="overview-label">セミナー名</div>
                  <div className="overview-value">{seminarConfig.overview.name}</div>
                </div>
                <div className="overview-row">
                  <div className="overview-label">日時</div>
                  <div className="overview-value">{seminarConfig.overview.date}</div>
                </div>
                <div className="overview-row">
                  <div className="overview-label">開催形式</div>
                  <div className="overview-value">{seminarConfig.overview.format}</div>
                </div>
                <div className="overview-row">
                  <div className="overview-label">主催者</div>
                  <div className="overview-value">{seminarConfig.overview.organizer}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右カラム：固定フォーム */}
        <div className="sub-col">
          <div className="form-panel">
            <h2 className="form-section-title">お申し込み</h2>
            <p className="required-note">* 必須項目</p>

            <form id="seminar-form" onSubmit={handleSubmit}>
              {/* 会社名（イチサンフォーム連携） */}
              <div className="form-group">
                <label className="form-label">
                  会社名 <span className="required">必須</span>
                </label>
                <input
                  type="text"
                  className="form-input company_name"
                  name="company_name"
                  placeholder="例：株式会社ビズリンク"
                  autoComplete="off"
                  required
                />
                <input type="hidden" className="company_id" name="company_id" />
                <input type="hidden" className="location_zipcode" name="location_zipcode" />
                <input type="hidden" className="location_pref" name="location_pref" />
                <input type="hidden" className="location_city" name="location_city" />
                <input type="hidden" className="location_town" name="location_town" />
                <input type="hidden" className="location_street" name="location_street" />
                <input type="hidden" className="location_full" name="location_full" />
                <input type="hidden" className="employee_num" name="employee_num" />
              </div>

              {/* 役職 */}
              <div className="form-group">
                <label className="form-label">
                  役職 <span className="required">必須</span>
                </label>
                <div className="form-select-wrapper">
                  <select className="form-select" name="position" required defaultValue="">
                    <option value="" disabled>
                      選択してください
                    </option>
                    <option value="経営者/役員">経営者/役員</option>
                    <option value="部長">部長</option>
                    <option value="課長・マネージャー">課長・マネージャー</option>
                    <option value="係長・リーダー">係長・リーダー</option>
                    <option value="一般社員">一般社員</option>
                    <option value="その他">その他</option>
                  </select>
                </div>
              </div>

              {/* 部署名 */}
              <div className="form-group">
                <label className="form-label">部署名</label>
                <input type="text" className="form-input" name="department" placeholder="例：営業部" />
              </div>

              {/* お名前（姓・名） */}
              <div className="form-group">
                <label className="form-label">
                  お名前 <span className="required">必須</span>
                </label>
                <div className="name-row">
                  <div className="name-field">
                    <div className="name-field-label">姓</div>
                    <input type="text" className="form-input" name="last_name" placeholder="山田" required />
                  </div>
                  <div className="name-field">
                    <div className="name-field-label">名</div>
                    <input type="text" className="form-input" name="first_name" placeholder="太郎" required />
                  </div>
                </div>
              </div>

              {/* メールアドレス */}
              <div className="form-group">
                <label className="form-label">
                  メールアドレス <span className="required">必須</span>
                </label>
                <input
                  type="email"
                  className="form-input"
                  name="email"
                  placeholder="yamada@example.co.jp"
                  required
                />
              </div>

              {/* 電話番号 */}
              <div className="form-group">
                <label className="form-label">
                  電話番号 <span className="required">必須</span>
                </label>
                <input
                  type="tel"
                  className="form-input"
                  name="phone"
                  placeholder="03-1234-5678"
                  pattern="[0-9]{2,4}-[0-9]{2,4}-[0-9]{3,4}"
                  title="ハイフン付きで入力してください（例：03-1234-5678）"
                  required
                />
                <span style={{ fontSize: '11px', color: '#888', marginTop: '2px', display: 'block' }}>
                  ※ハイフンありで入力してください
                </span>
              </div>

              {/* 従業員規模 */}
              <div className="form-group">
                <label className="form-label">従業員規模</label>
                <div className="form-select-wrapper">
                  <select className="form-select" name="employee_scale_manual" defaultValue="">
                    <option value="" disabled>
                      選択してください
                    </option>
                    <option value="1-10名">1-10名</option>
                    <option value="11-50名">11-50名</option>
                    <option value="51-100名">51-100名</option>
                    <option value="101-300名">101-300名</option>
                    <option value="301-1000名">301-1000名</option>
                    <option value="1001名以上">1001名以上</option>
                  </select>
                </div>
              </div>

              {/* 業種 */}
              <div className="form-group">
                <label className="form-label">業種</label>
                <div className="form-select-wrapper">
                  <select className="form-select" name="industry" defaultValue="">
                    <option value="" disabled>
                      選択してください
                    </option>
                    <option value="IT・通信">IT・通信</option>
                    <option value="製造業">製造業</option>
                    <option value="金融・保険">金融・保険</option>
                    <option value="商社・卸売">商社・卸売</option>
                    <option value="小売・流通">小売・流通</option>
                    <option value="建設・不動産">建設・不動産</option>
                    <option value="サービス業">サービス業</option>
                    <option value="コンサルティング">コンサルティング</option>
                    <option value="医療・福祉">医療・福祉</option>
                    <option value="教育・研究">教育・研究</option>
                    <option value="広告・メディア">広告・メディア</option>
                    <option value="士業・法律・会計">士業・法律・会計</option>
                    <option value="官公庁・団体">官公庁・団体</option>
                    <option value="その他">その他</option>
                  </select>
                </div>
              </div>

              {/* 興味分野 */}
              <div className="form-group">
                <label className="form-label">興味分野</label>
                <div className="form-select-wrapper">
                  <select className="form-select" name="interest_area" defaultValue="">
                    <option value="" disabled>
                      選択してください
                    </option>
                    <option value="業務効率化・自動化">業務効率化・自動化</option>
                    <option value="資料・文書作成">資料・文書作成</option>
                    <option value="データ分析・レポート">データ分析・レポート</option>
                    <option value="営業・マーケティング支援">営業・マーケティング支援</option>
                    <option value="社内ナレッジ管理">社内ナレッジ管理</option>
                    <option value="カスタマーサポート">カスタマーサポート</option>
                    <option value="組織へのAI導入・推進">組織へのAI導入・推進</option>
                    <option value="その他">その他</option>
                  </select>
                </div>
              </div>

              {/* Cloudflare Turnstile */}
              <div className="form-group" style={{ marginTop: '20px' }}>
                <Turnstile
                  ref={turnstileRef}
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
                  onSuccess={(token) => setTurnstileToken(token)}
                  onError={() => setTurnstileToken('')}
                  onExpire={() => setTurnstileToken('')}
                />
              </div>

              {/* 同意チェックボックス */}
              <div className="consent-area">
                <label className="consent-label">
                  <input type="checkbox" id="consent-check" required />
                  <span className="consent-text">
                    <a href="https://freelance.bizlink.io/privacy" target="_blank" rel="noopener">
                      プライバシーポリシー
                    </a>
                    に同意する
                  </span>
                </label>
              </div>

              {/* 送信ボタン */}
              <div className="submit-area">
                <button type="submit" className="submit-btn" disabled={isSubmitting || !turnstileToken}>
                  {isSubmitting ? '送信中...' : 'セミナーに申し込む（無料）'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* フッター（全幅） */}
      <footer className="site-footer">
        <ul className="footer-nav">
          <li>
            <a href="https://corp.bizlink.io/" target="_blank" rel="noopener">
              運営会社情報
            </a>
          </li>
          <li>
            <a href="https://freelance.bizlink.io/terms" target="_blank" rel="noopener">
              利用規約
            </a>
          </li>
          <li>
            <a href="https://freelance.bizlink.io/privacy" target="_blank" rel="noopener">
              プライバシーポリシー
            </a>
          </li>
          <li>
            <a href="https://freelance.bizlink.io/contact" target="_blank" rel="noopener">
              お問い合わせ
            </a>
          </li>
        </ul>
        <p className="footer-copyright">&copy; 2026 Bizlink Inc. All rights reserved.</p>
      </footer>

        {/* モバイル固定CTAバー */}
        <div className="mobile-cta-bar">
          <a href="#seminar-form">セミナーに申し込む（無料）</a>
        </div>
      </div>
    </>
  );
}
