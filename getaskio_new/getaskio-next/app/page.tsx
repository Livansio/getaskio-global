"use client";

import React, { useState } from 'react';
import { 
  Menu, X, BrainCircuit, Network, ShieldCheck, 
  ArrowRight, CheckCircle2, Lock, Server, 
  Terminal, MessageCircle, AlertCircle
} from 'lucide-react';

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Состояния для формы демо
  const [formData, setFormData] = useState({ email: '', phone: '', tracker: '', comment: '' });
  const [formErrors, setFormErrors] = useState({ email: '', phone: '' });
  const [status, setStatus] = useState('idle');

  // Скролл к секциям
  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Строгая валидация и форматирование телефона для СНГ: +7 (XXX) XXX-XX-XX
  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, ''); // Удаляем все нецифровые символы
    
    // Если пользователь стирает всё
    if (!input) {
      setFormData({ ...formData, phone: '' });
      return;
    }

    // Если начинается с 7 или 8, отбрасываем первую цифру для маски
    if (['7', '8'].includes(input[0])) {
      input = input.substring(1);
    }

    // Формируем маску
    let formatted = '+7';
    if (input.length > 0) formatted += ` (${input.substring(0, 3)}`;
    if (input.length >= 4) formatted += `) ${input.substring(3, 6)}`;
    if (input.length >= 7) formatted += `-${input.substring(6, 8)}`;
    if (input.length >= 9) formatted += `-${input.substring(8, 10)}`;

    setFormData({ ...formData, phone: formatted });
    
    // Снимаем ошибку при вводе
    if (formatted.length === 18) {
      setFormErrors({ ...formErrors, phone: '' });
    }
  };

  // Валидация Email
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Отправка формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Финальная проверка перед отправкой
    let hasErrors = false;
    const errors = { email: '', phone: '' };

    if (!validateEmail(formData.email)) {
      errors.email = 'Введите корректный рабочий email';
      hasErrors = true;
    }
    if (formData.phone.length < 18) {
      errors.phone = 'Введите полный номер телефона';
      hasErrors = true;
    }

    if (hasErrors) {
      setFormErrors(errors);
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ email: '', phone: '', tracker: '', comment: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans flex flex-col selection:bg-indigo-500/30">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap');
        body { font-family: 'Inter', sans-serif; background-color: #050505; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .glass { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.05); }
        .glow-text { text-shadow: 0 0 20px rgba(99, 102, 241, 0.5); }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]">
              <Network size={18} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Askio</span>
          </button>

          <nav className="hidden md:flex gap-8 text-sm font-semibold text-slate-400">
            <button onClick={() => scrollTo('features')} className="hover:text-white transition-colors">Архитектура</button>
            <button onClick={() => scrollTo('security')} className="hover:text-white transition-colors">Безопасность</button>
            <button onClick={() => scrollTo('roi')} className="hover:text-white transition-colors">Окупаемость</button>
            <button onClick={() => scrollTo('pricing')} className="hover:text-white transition-colors">Тарифы</button>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => scrollTo('demo')} className="px-5 py-2.5 bg-white text-black hover:bg-slate-200 text-sm font-bold rounded-lg transition-colors flex items-center gap-2">
              Оставить заявку <ArrowRight size={16} />
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden bg-[#0a0a0a] border-b border-white/10 p-4 absolute w-full shadow-2xl">
            <button onClick={() => scrollTo('features')} className="block w-full text-left py-3 text-slate-300 font-medium border-b border-white/5">Архитектура</button>
            <button onClick={() => scrollTo('security')} className="block w-full text-left py-3 text-slate-300 font-medium border-b border-white/5">Безопасность</button>
            <button onClick={() => scrollTo('roi')} className="block w-full text-left py-3 text-slate-300 font-medium border-b border-white/5">Окупаемость</button>
            <button onClick={() => scrollTo('pricing')} className="block w-full text-left py-3 text-slate-300 font-medium border-b border-white/5">Тарифы</button>
            <button onClick={() => scrollTo('demo')} className="block w-full mt-4 py-3 bg-white text-black text-center rounded-lg font-bold">Оставить заявку</button>
          </nav>
        )}
      </header>

      <main className="pt-16 flex-1 flex flex-col">
        
        {/* HERO SECTION */}
        <section className="pt-24 pb-20 md:pt-32 md:pb-24 px-6 max-w-7xl mx-auto text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 blur-[150px] rounded-full pointer-events-none -z-10" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-indigo-500/30 text-indigo-400 text-xs font-mono mb-8">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            System Online
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight mb-6 max-w-5xl mx-auto">
            Остановите хаос в коде. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 glow-text">
              Синхронизируйте логику.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            Семантический брандмауэр между бизнесом и разработкой. Мы перехватываем логические противоречия в требованиях до того, как они сожгут ваш бюджет на аутсорс или сорвут сроки релиза.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <button onClick={() => scrollTo('demo')} className="px-8 py-4 bg-white hover:bg-slate-200 text-black font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Обсудить проект <ArrowRight size={18} />
            </button>
            <button onClick={() => scrollTo('features')} className="px-8 py-4 glass text-white hover:bg-white/5 font-bold rounded-lg transition-all flex items-center justify-center gap-2">
              <Terminal size={18} className="text-indigo-400" /> Изучить архитектуру
            </button>
          </div>
        </section>

        {/* INTEGRATIONS */}
        <section className="py-10 border-y border-white/5 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              {['Jira', 'Bitrix24', 'Yandex Tracker', 'Kaiten', 'Telegram', 'Confluence'].map(logo => (
                 <span key={logo} className="text-xl font-extrabold text-white flex items-center gap-2">{logo}</span>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES / ARCHITECTURE */}
        <section id="features" className="py-24">
          <div className="max-w-5xl mx-auto px-6">
            <header className="mb-16 border-b border-white/10 pb-10 text-center md:text-left">
              <h2 className="text-4xl font-extrabold text-white mb-4">Техническая архитектура</h2>
              <p className="text-xl text-slate-400">Анатомия интеллектуального шлюза.</p>
            </header>

            <div className="space-y-24">
              <article className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 text-indigo-400 font-mono text-sm mb-4">
                    <BrainCircuit size={16} /> MODULE_01
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-6">Contradiction Engine</h3>
                  <p className="text-slate-400 leading-relaxed mb-6">
                    Ядро, анализирующее семантику задач. Не просто ищет ключевые слова, а строит граф зависимостей бизнес-логики, предотвращая ошибки на этапе планирования.
                  </p>
                  <ul className="space-y-3 text-slate-300 text-sm">
                    <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-indigo-500"/> Парсинг Markdown и прикрепленных документов.</li>
                    <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-indigo-500"/> Анализ полноты критериев приемки (DoD/DoR).</li>
                  </ul>
                </div>
                <div className="glass rounded-2xl p-6 aspect-video flex items-center justify-center border border-white/10">
                   <div className="w-full max-w-sm bg-[#050505] rounded-lg border border-white/10 p-5 shadow-2xl">
                      <div className="text-xs font-mono text-slate-500 mb-4 border-b border-white/5 pb-2">AST_GRAPH_ANALYSIS</div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-white">Node: Auth Module</span>
                        <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">VERIFIED</span>
                      </div>
                      <div className="flex justify-between items-center opacity-50">
                        <span className="text-sm text-white">Node: Guest Checkout</span>
                        <span className="text-xs text-red-400 bg-red-400/10 px-2 py-1 rounded">CONFLICT</span>
                      </div>
                   </div>
                </div>
              </article>

              <article className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 glass rounded-2xl p-6 aspect-video flex items-center justify-center border border-white/10">
                   <div className="flex items-center gap-4 z-10 w-full px-4">
                      <div className="flex-1 p-3 bg-white/5 border border-white/10 rounded text-center text-xs font-mono text-white">INTERNAL_TEAM</div>
                      <div className="w-12 h-0.5 bg-indigo-500/50 relative">
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-indigo-600 rounded-sm border border-indigo-400"></div>
                      </div>
                      <div className="flex-1 p-3 bg-indigo-600/10 border border-indigo-500/30 rounded text-center text-xs font-mono text-indigo-300">OUTSOURCE_VENDORS</div>
                   </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="inline-flex items-center gap-2 text-indigo-400 font-mono text-sm mb-4">
                    <Network size={16} /> MODULE_02
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-6">Transition Gateways</h3>
                  <p className="text-slate-400 leading-relaxed mb-6">
                    Строгий API-шлюз между инхаус-командой и внешними подрядчиками. Исключает оплату часов аутсорсерам за "уточнение" неполных требований.
                  </p>
                  <ul className="space-y-3 text-slate-300 text-sm">
                    <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-indigo-500"/> Блокировка задач без Acceptance Criteria.</li>
                    <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-indigo-500"/> Автоматический возврат тикета системному аналитику.</li>
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* SECURITY */}
        <section id="security" className="py-24 bg-[#0a0a0a] border-y border-white/5">
          <div className="max-w-5xl mx-auto px-6">
            <header className="text-center mb-16 border-b border-white/10 pb-10">
              <h2 className="text-4xl font-extrabold text-white mb-4">Безопасность</h2>
              <p className="text-xl text-slate-400">Защита вашего кода и требований: наш приоритет.</p>
            </header>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass p-8 rounded-2xl border border-white/10">
                 <Server className="text-indigo-400 mb-6" size={32} />
                 <h3 className="text-xl font-bold text-white mb-3">On-Premise Deployment</h3>
                 <p className="text-slate-400 text-sm leading-relaxed">
                   Для корпоративного сегмента доступна полная изоляция платформы на серверах клиента. Строгое соответствие законам РК о локализации данных.
                 </p>
              </div>
              <div className="glass p-8 rounded-2xl border border-white/10">
                 <Lock className="text-indigo-400 mb-6" size={32} />
                 <h3 className="text-xl font-bold text-white mb-3">Zero Data Retention</h3>
                 <p className="text-slate-400 text-sm leading-relaxed">
                   Мы гарантируем, что ваши коммерческие данные не используются для дообучения публичных ИИ-моделей. Анализ происходит изолированно.
                 </p>
              </div>
            </div>
          </div>
        </section>

        {/* B2B ROI CALCULATOR */}
        <ROICalculator />

        {/* PRICING */}
        <section id="pricing" className="py-24 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-6">
            <header className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-white mb-4">Инвестиции в предсказуемость</h2>
              <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">Платформа окупается при предотвращении одного логического противоречия в коде.</p>
            </header>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="glass p-10 rounded-2xl border border-white/10 flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-2">Growth</h3>
                <p className="text-sm text-slate-400 mb-8">Для технологических компаний среднего бизнеса.</p>
                <div className="text-5xl font-extrabold text-white mb-2">$399 <span className="text-lg font-normal text-slate-500">/ мес</span></div>
                <ul className="space-y-4 mb-8 flex-1 mt-6">
                  <li className="flex items-start gap-3"><CheckCircle2 size={18} className="text-indigo-400" /><span className="text-slate-300 text-sm">До 50 активных пользователей</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 size={18} className="text-indigo-400" /><span className="text-slate-300 text-sm">Интеграция Jira, Битрикс24, Yandex Tracker</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 size={18} className="text-indigo-400" /><span className="text-slate-300 text-sm">Архив контекста (12 месяцев)</span></li>
                </ul>
              </div>

              <div className="bg-indigo-600/10 p-10 rounded-2xl border border-indigo-500/50 flex flex-col relative">
                <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 rounded-bl-lg text-xs font-bold uppercase">Enterprise</div>
                <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                <p className="text-sm text-slate-400 mb-8">Для банков и распределенного аутсорсинга.</p>
                <div className="text-5xl font-extrabold text-white mb-2 mt-1">Custom</div>
                <ul className="space-y-4 mb-8 flex-1 mt-6">
                  <li className="flex items-start gap-3"><CheckCircle2 size={18} className="text-indigo-400" /><span className="text-white font-medium text-sm">Безлимитные пользователи</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 size={18} className="text-indigo-400" /><span className="text-white font-medium text-sm">Установка On-Premise (на ваши сервера)</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 size={18} className="text-indigo-400" /><span className="text-white font-medium text-sm">Выделенный аккаунт-инженер</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* DEMO FORM (LEAD CAPTURE) */}
        <section id="demo" className="py-24 border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6">
            <div className="glass p-10 md:p-16 rounded-3xl border border-white/10 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Оставьте заявку на аудит</h2>
              <p className="text-slate-400 mb-10 max-w-xl mx-auto">
                Наш инженер свяжется с вами для проведения технического аудита и демонстрации возможностей платформы.
              </p>
              
              <form className="max-w-md mx-auto space-y-5 text-left" onSubmit={handleSubmit} noValidate>
                {/* Email Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Ваш Email *</label>
                  <input 
                    required 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({...formData, email: e.target.value});
                      setFormErrors({...formErrors, email: ''});
                    }}
                    className={`w-full bg-[#0a0a0a] border ${formErrors.email ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors`}
                    placeholder="cto@company.kz" 
                  />
                  {formErrors.email && <div className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/> {formErrors.email}</div>}
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Телефон *</label>
                  <input 
                    required 
                    type="tel" 
                    value={formData.phone}
                    onChange={handlePhoneInput}
                    maxLength={18}
                    className={`w-full bg-[#0a0a0a] border ${formErrors.phone ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors font-mono`}
                    placeholder="+7 (___) ___-__-__" 
                  />
                  {formErrors.phone && <div className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/> {formErrors.phone}</div>}
                </div>

                {/* Tracker Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Основной таск-трекер *</label>
                  <select 
                    required 
                    value={formData.tracker}
                    onChange={(e) => setFormData({...formData, tracker: e.target.value})}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="" disabled>Выберите из списка...</option>
                    <option value="Jira">Jira</option>
                    <option value="Bitrix24">Битрикс24</option>
                    <option value="Yandex Tracker">Yandex Tracker</option>
                    <option value="Kaiten">Kaiten</option>
                    <option value="Trello">Trello</option>
                    <option value="Asana">Asana</option>
                    <option value="Своя разработка">Своя разработка (Custom)</option>
                    <option value="Другое">Другое</option>
                  </select>
                </div>

                {/* Optional Comment Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Комментарий (необязательно)</label>
                  <textarea 
                    rows={3}
                    value={formData.comment}
                    onChange={(e) => setFormData({...formData, comment: e.target.value})}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                    placeholder="Напишите, какую проблему вы хотите решить в первую очередь..."
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className={`w-full py-4 font-bold rounded-lg transition-colors mt-6 shadow-[0_0_20px_rgba(255,255,255,0.1)] flex justify-center items-center gap-2 ${status === 'loading' ? 'bg-slate-600 text-slate-300 cursor-not-allowed' : 'bg-white text-black hover:bg-slate-200'}`}
                >
                  {status === 'loading' ? 'Отправка данных...' : 'Отправить заявку'}
                </button>

                {status === 'success' && (
                  <div className="p-4 mt-4 bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center rounded-lg flex items-center justify-center gap-2">
                    <CheckCircle2 size={18} /> Заявка успешно отправлена! Инженер свяжется с вами.
                  </div>
                )}
                {status === 'error' && (
                  <div className="p-4 mt-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center rounded-lg">
                    Произошла ошибка при отправке. Пожалуйста, проверьте соединение.
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-[#020202] py-12 border-t border-white/5 mt-auto">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
               <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-white"><Network size={14} /></div>
               <span className="text-lg font-bold text-white">Askio</span>
            </div>
            <p className="text-sm max-w-sm mb-6 text-slate-500">
              Семантический брандмауэр для управления требованиями.
            </p>
          </div>
          <div>
            <h2 className="text-white font-bold mb-4 text-base">Контакты</h2>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2"><MessageCircle size={14} /> Отдел продаж</li>
              <li><a href="mailto:hello@askio.kz" className="hover:text-white transition-colors">hello@askio.kz</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-xs text-slate-600 flex justify-between">
          <span>© 2026 Askio. Республика Казахстан. Все права защищены.</span>
        </div>
      </footer>
    </div>
  );
}

// B2B ROI Calculator Component
const ROICalculator = () => {
  const [teamSize, setTeamSize] = useState(20);
  const [avgSalary, setAvgSalary] = useState(2500); 
  const [wastedPercent, setWastedPercent] = useState(20); 
  
  // Расчеты бюджета ФОТ
  const monthlyPayroll = teamSize * avgSalary;
  // Скрытые убытки (переделки и созвоны)
  const monthlyWaste = Math.round(monthlyPayroll * (wastedPercent / 100));
  // Упущенная выгода (Opportunity Cost - стандартный коэффициент х2.5 для IT)
  const opportunityCost = monthlyWaste * 2.5;

  return (
    <section id="roi" className="py-24 border-y border-white/5" style={{ background: 'radial-gradient(circle at center, #0a0a0a 0%, #050505 100%)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <header className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white mb-4">Математика скрытых убытков</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            В IT-разработке СНГ основная статья затрат: фонд оплаты труда (ФОТ). Посчитайте, сколько ФОТ сгорает на переделки из-за неточных технических заданий.
          </p>
        </header>
        
        <div className="glass border border-white/10 rounded-3xl p-8 md:p-12 grid lg:grid-cols-2 gap-16 shadow-2xl">
          {/* Controls */}
          <div className="space-y-10">
            <div>
              <div className="flex justify-between items-end mb-4">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Размер IT-команды</label>
                <span className="text-2xl font-extrabold text-white">{teamSize} чел.</span>
              </div>
              <input type="range" min="5" max="150" step="5" value={teamSize} onChange={(e) => setTeamSize(Number(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
            </div>

            <div>
              <div className="flex justify-between items-end mb-4">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Средняя ЗП разработчика</label>
                <span className="text-2xl font-extrabold text-white">${avgSalary.toLocaleString()} <span className="text-sm font-normal text-slate-500">/ мес</span></span>
              </div>
              <input type="range" min="1000" max="6000" step="250" value={avgSalary} onChange={(e) => setAvgSalary(Number(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
            </div>

            <div>
              <div className="flex justify-between items-end mb-4">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Время на уточнения и баги логики</label>
                <span className="text-2xl font-extrabold text-red-400">{wastedPercent}%</span>
              </div>
              <input type="range" min="5" max="40" step="1" value={wastedPercent} onChange={(e) => setWastedPercent(Number(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500" />
              <p className="text-xs text-slate-500 mt-3">Средний показатель по индустрии при отсутствии семантического контроля: 15-25%.</p>
            </div>
          </div>
          
          {/* Results Board */}
          <div className="bg-[#020202] rounded-2xl p-8 md:p-10 border border-white/5 flex flex-col justify-center relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-[80px] rounded-full pointer-events-none"></div>
            
            <div className="mb-10 relative z-10">
              <h3 className="text-xs text-slate-500 mb-3 font-mono uppercase tracking-widest">Прямые убытки (Сжигание ФОТ)</h3>
              <div className="text-5xl md:text-6xl font-extrabold text-red-400 glow-text mb-2">
                ${monthlyWaste.toLocaleString()}
              </div>
              <p className="text-sm text-slate-400">Сумма, которую вы ежемесячно платите команде за написание кода, который затем будет удален или переписан.</p>
            </div>

            <div className="pt-8 border-t border-white/10 relative z-10">
              <h3 className="text-xs text-slate-500 mb-3 font-mono uppercase tracking-widest">Упущенная выгода бизнеса</h3>
              <div className="text-3xl font-extrabold text-slate-300 mb-2">
                ~ ${(opportunityCost).toLocaleString()}
              </div>
              <p className="text-xs text-slate-500">Потенциальная ценность функционала, который команда могла бы разработать за это потраченное время.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};