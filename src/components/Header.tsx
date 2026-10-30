import React, { useState } from 'react';
import { Volume2, VolumeX, QrCode, Sparkles, Heart } from 'lucide-react';
import { sounds } from '../utils/sound';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenQr: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenQr }) => {
  const [soundOn, setSoundOn] = useState(sounds.enabled);

  const handleToggleSound = () => {
    const newState = sounds.toggle();
    setSoundOn(newState);
  };

  const tabs = [
    { id: 'home', label: 'Inicio', icon: '🏠', color: 'from-amber-400 to-orange-500' },
    { id: 'leti', label: 'Leti', sub: 'Velas & True Crime', icon: '🕯️', color: 'from-pink-500 to-rose-400' },
    { id: 'miguel', label: 'Miguel', sub: 'Tech & Drones', icon: '🛸', color: 'from-cyan-500 to-blue-500' },
    { id: 'kids', label: 'Nico & Noel', sub: 'Zona Peques', icon: '🎈', color: 'from-emerald-400 to-teal-500' },
    { id: 'quiz', label: 'Pareja', sub: 'Duelo Leti & Miguel', icon: '❤️', color: 'from-purple-500 to-indigo-500' },
    { id: 'visita', label: 'La Visita', sub: '¡Mañana!', icon: '📸', color: 'from-yellow-400 to-amber-500' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Logo / Brand */}
        <div 
          onClick={() => { setActiveTab('home'); sounds.playDing(); }}
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 p-[2px] shadow-lg shadow-pink-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
              <span className="text-xl">✨</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                Leti & Miguel
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 font-medium">
                Family
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              + Nico (3) & Noel (1) • Especial Visita
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleSound}
            className={`p-2.5 rounded-xl border transition-all ${
              soundOn
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
            }`}
            title={soundOn ? 'Desactivar sonido' : 'Activar sonido'}
            aria-label="Sonido"
          >
            {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          <button
            onClick={() => { sounds.playDing(); onOpenQr(); }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 transition-all text-xs font-semibold shadow-sm"
            title="Compartir o abrir en el móvil"
          >
            <QrCode size={16} />
            <span className="hidden xs:inline">Móvil / QR</span>
          </button>
        </div>
      </div>

      {/* Tabs navigation bar */}
      <div className="max-w-5xl mx-auto px-2 pb-2 overflow-x-auto no-scrollbar">
        <nav className="flex space-x-1 sm:space-x-2 min-w-max px-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sounds.playDing();
                  setActiveTab(tab.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-slate-800 text-white shadow-md border border-slate-700 shadow-purple-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                <span className={isActive ? 'font-bold' : ''}>{tab.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse ml-0.5"></span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
