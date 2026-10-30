import React from 'react';
import { Sparkles, Heart, Zap, Baby, Users, ArrowRight, Camera, Home as HomeIcon, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/sound';

interface HomeSectionProps {
  onNavigate: (tab: string) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate }) => {
  const triggerCelebration = () => {
    sounds.playVictory();
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#ec4899', '#06b6d4', '#10b981', '#f59e0b'],
    });
  };

  const familyMembers = [
    {
      name: 'Leti',
      role: 'Estilo, Glamour & Interiorismo',
      icon: '✨',
      badge: 'Moda & Deco',
      color: 'from-pink-500 to-rose-400',
      tab: 'leti',
      desc: 'Diseñadora de la casa de sus sueños, amante de los vestidos elegantes y el maquillaje impecable.'
    },
    {
      name: 'Miguel',
      role: 'Piloto FPV & Tech Master',
      icon: '🛸',
      badge: 'Drones & Cacharreo',
      color: 'from-cyan-500 to-blue-500',
      tab: 'miguel',
      desc: 'Manitas informático, apasionado de las cámaras, el soldador de estaño y los inventos locos.'
    },
    {
      name: 'Nico',
      role: 'Aventurero Mayor (3 años)',
      icon: '👑',
      badge: 'Jefe del Salón',
      color: 'from-emerald-400 to-teal-500',
      tab: 'kids',
      desc: 'Corre a la velocidad de la luz, explota burbujas y persigue los drones de papá.'
    },
    {
      name: 'Noel',
      role: 'El Rey de la Casa (1-2 años)',
      icon: '🍼',
      badge: 'Puro Amor',
      color: 'from-amber-400 to-orange-500',
      tab: 'kids',
      desc: 'El más pequeño de la familia, maestro de las sonrisas y de tirar juguetes al suelo.'
    },
  ];

  const features = [
    {
      tab: 'leti',
      title: 'El Rincón de Leti',
      sub: 'Estudio de Interiorismo 3D & Probador de Looks',
      icon: '🏠',
      gradient: 'from-pink-900/40 to-slate-900 border-pink-500/30 text-pink-300'
    },
    {
      tab: 'miguel',
      title: 'El Laboratorio de Miguel',
      sub: 'Vuelo de Dron FPV, Cacharreo & Visor Réflex',
      icon: '🛸',
      gradient: 'from-cyan-900/40 to-slate-900 border-cyan-500/30 text-cyan-300'
    },
    {
      tab: 'kids',
      title: 'Zona Sensorial Peques',
      sub: 'Explota-Burbujas & Piano de Animalitos para Nico y Noel',
      icon: '🎈',
      gradient: 'from-emerald-900/40 to-slate-900 border-emerald-500/30 text-emerald-300'
    },
    {
      tab: 'quiz',
      title: 'Duelo Leti vs Miguel',
      sub: '¿Quién es más probable? El juego de pareja para el salón',
      icon: '❤️',
      gradient: 'from-purple-900/40 to-slate-900 border-purple-500/30 text-purple-300'
    },
    {
      tab: 'visita',
      title: 'La Visita Especial',
      sub: 'Fotomatón con marcos descargables & Ruleta de cena',
      icon: '📸',
      gradient: 'from-amber-900/40 to-slate-900 border-amber-500/30 text-amber-300'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Welcome Card */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-950 border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-500/10 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-300 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            ¡Bienvenida a Casa de Leti & Miguel!
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-display leading-tight">
            El Universo Familiar de <span className="bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">Leti, Miguel</span> & Peques
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Una app creada a medida para celebrar la visita de mañana. Moda chic, drones, cacharreo, juegos sensoriales para Nico (3) y Noel (1-2), y risas aseguradas.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={triggerCelebration}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-extrabold text-sm shadow-xl shadow-pink-500/20 hover:scale-105 transition-all flex items-center gap-2"
            >
              <Sparkles size={16} /> ¡Celebrar la Visita! 🎉
            </button>
            <button
              onClick={() => { sounds.playDing(); onNavigate('quiz'); }}
              className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 transition-all flex items-center gap-2"
            >
              <span>Jugar al Test de Pareja</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Family Members Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <span>👨‍👩‍👧‍👦</span> La Familia al Completo
          </h2>
          <span className="text-xs text-slate-400">Toca para ir a su rincón</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {familyMembers.map((member) => (
            <div
              key={member.name}
              onClick={() => { sounds.playDing(); onNavigate(member.tab); }}
              className="bg-slate-900/90 rounded-3xl p-5 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all hover:scale-[1.02] shadow-lg group space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${member.color} flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform`}>
                    {member.icon}
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {member.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <div className="text-xs font-semibold text-slate-400 mt-0.5">{member.role}</div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {member.desc}
                </p>
              </div>

              <div className="pt-2 flex items-center text-xs font-bold text-slate-300 group-hover:text-white transition-colors">
                <span>Entrar a su espacio</span>
                <ArrowRight size={13} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Navigation Highlights */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span>✨</span> Experiencias Interactivas para Mañana
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feat) => (
            <div
              key={feat.tab}
              onClick={() => { sounds.playDing(); onNavigate(feat.tab); }}
              className={`p-5 rounded-3xl border bg-gradient-to-br ${feat.gradient} cursor-pointer hover:scale-[1.02] transition-all shadow-md flex items-start gap-4`}
            >
              <span className="text-3xl filter drop-shadow-sm">{feat.icon}</span>
              <div>
                <h3 className="text-base font-bold text-white">{feat.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{feat.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fun Family Live Counter Box */}
      <div className="bg-slate-900/60 rounded-3xl p-6 border border-slate-800 text-center space-y-4">
        <h3 className="text-xs uppercase font-extrabold tracking-widest text-slate-400">
          Estadísticas Oficiales del Hogar
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3 bg-slate-800/40 rounded-2xl border border-slate-700/60">
            <div className="text-2xl font-black text-pink-400">128 🪴</div>
            <div className="text-[11px] text-slate-400 font-medium">Plantas & Cojines Chic</div>
          </div>
          <div className="p-3 bg-slate-800/40 rounded-2xl border border-slate-700/60">
            <div className="text-2xl font-black text-cyan-400">47 🛸</div>
            <div className="text-[11px] text-slate-400 font-medium">Drones & Cacharros</div>
          </div>
          <div className="p-3 bg-slate-800/40 rounded-2xl border border-slate-700/60">
            <div className="text-2xl font-black text-emerald-400">∞ 🫧</div>
            <div className="text-[11px] text-slate-400 font-medium">Risas de Nico & Noel</div>
          </div>
          <div className="p-3 bg-slate-800/40 rounded-2xl border border-slate-700/60">
            <div className="text-2xl font-black text-amber-400">100% 🔥</div>
            <div className="text-[11px] text-slate-400 font-medium">Ganas de la Visita</div>
          </div>
        </div>
      </div>
    </div>
  );
};
