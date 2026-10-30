import React, { useState } from 'react';
import { Header } from './components/Header';
import { HomeSection } from './components/HomeSection';
import { LetiSection } from './components/LetiSection';
import { MiguelSection } from './components/MiguelSection';
import { KidsSection } from './components/KidsSection';
import { CoupleQuizSection } from './components/CoupleQuizSection';
import { VisitorSection } from './components/VisitorSection';
import { ShareModal } from './components/ShareModal';
import { Heart, Sparkles, QrCode } from 'lucide-react';
import { sounds } from './utils/sound';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isQrOpen, setIsQrOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-pink-500 selection:text-white">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQr={() => setIsQrOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 sm:py-8">
        {activeTab === 'home' && <HomeSection onNavigate={setActiveTab} />}
        {activeTab === 'leti' && <LetiSection />}
        {activeTab === 'miguel' && <MiguelSection />}
        {activeTab === 'kids' && <KidsSection />}
        {activeTab === 'quiz' && <CoupleQuizSection />}
        {activeTab === 'visita' && <VisitorSection />}
      </main>

      {/* Floating Bottom Quick Bar for Mobile */}
      <div className="fixed bottom-4 right-4 z-30 sm:hidden">
        <button
          onClick={() => { sounds.playDing(); setIsQrOpen(true); }}
          className="p-3.5 rounded-full bg-gradient-to-r from-pink-500 to-cyan-500 text-white shadow-xl shadow-purple-500/30 flex items-center justify-center active:scale-95 transition-transform"
          title="Compartir con QR"
        >
          <QrCode size={20} />
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500 space-y-2">
        <div className="flex items-center justify-center gap-1.5 text-slate-400">
          <span>Hecho con</span>
          <Heart size={14} className="text-pink-500 fill-pink-500 animate-pulse" />
          <span>para Leti, Miguel, Nico y Noel • Especial Visita</span>
        </div>
        <p className="text-[11px] text-slate-600">
          Instálala como PWA desde tu navegador favorito • 100% Offline & Mobile Friendly
        </p>
      </footer>

      {/* QR & Share Modal */}
      <ShareModal isOpen={isQrOpen} onClose={() => setIsQrOpen(false)} />
    </div>
  );
}

export default App;
