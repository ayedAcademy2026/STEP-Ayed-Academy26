
/* Support page helpers */
(function(){
  'use strict';
  const App = window.App;
  if(!App) return;

  function initSupport(){
    const root = document;
    const page = App.$('#supportRoot', root);
    if(!page) return;

    const form = App.$('#supportForm', root);
    const send = App.$('#supportSend', root);

    const onSend = (e)=>{
      e.preventDefault();
      const name = (App.$('#s_name', root)?.value || '').trim();
      const msg = (App.$('#s_msg', root)?.value || '').trim();

      if(!msg){
        App.toast('اكتب استفسارك أولاً', 'تنبيه');
        return;
      }

      const text = [
        '**استفسار — أكاديمية عايد**',
        name ? `**الاسم:** ${name}` : null,
        `**الرسالة:** ${msg}`,
        '',
        'تم الإرسال من داخل موقع الدورة.'
      ].filter(Boolean).join('\n');

      App.openTelegram(text);
      App.toast('تم فتح تيليجرام ✅', 'تواصل');
    };

    form && form.addEventListener('submit', onSend);
    send && send.addEventListener('click', onSend);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initSupport);
  }else{
    initSupport();
  }
  window.addEventListener('app:navigated', initSupport);
})();
