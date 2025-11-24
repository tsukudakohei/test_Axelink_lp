'use client';

import Script from 'next/script';

export default function IchisanFormScript() {
  return (
    <Script 
      src="https://ichisan.jp/form/lib/ichisanForm.min.js" 
      strategy="lazyOnload"
      onLoad={() => {
        // スクリプト読み込み完了をマーク
        if (typeof window !== 'undefined') {
          (window as any).__ichisanFormLoaded = true;
          
          // カスタムイベントを発火して、フォームコンポーネントに通知
          if (typeof document !== 'undefined') {
            document.dispatchEvent(new CustomEvent('ichisanFormLoaded'));
          }
          
          // 少し遅延を入れてDOMの準備を待つ
          setTimeout(() => {
            const forms = document.querySelectorAll('[data-readdy-form]');
            forms.forEach((form) => {
              // 既に初期化されている場合はスキップ
              if (form.hasAttribute('data-ichisan-initialized')) {
                return;
              }
              
              // 複数の初期化方法を試す
              if ((window as any).ichisanForm) {
                if (typeof (window as any).ichisanForm.init === 'function') {
                  try {
                    (window as any).ichisanForm.init(form);
                    form.setAttribute('data-ichisan-initialized', 'true');
                  } catch (error) {
                    console.error('ichisanフォーム初期化エラー:', error);
                  }
                }
              }
            });
          }, 200);
        }
      }}
    />
  );
}

