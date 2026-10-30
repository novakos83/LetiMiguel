import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Smile, Music, Star, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/sound';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  icon: string;
  speed: number;
  popped: boolean;
}

export const KidsSection: React.FC = () => {
  const [kidMode, setKidMode] = useState<'nico' | 'noel'>('nico');
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [poppedCount, setPoppedCount] = useState(0);

  // Floating bubbles loop for toddlers
  useEffect(() => {
    const emojis = ['🎈', '⭐', '🛸', '🧸', '🌈', '🍭', '🚗', '🐱', '✨', '🍼'];
    const colors = [
      'from-pink-400 to-rose-500',
      'from-cyan-400 to-blue-500',
      'from-amber-300 to-yellow-500',
      'from-emerald-400 to-teal-500',
      'from-purple-400 to-indigo-500',
    ];

    const interval = setInterval(() => {
      setBubbles((prev) => {
        if (prev.length > 14) return prev; // Keep screen smooth
        const newBubble: Bubble = {
          id: Date.now() + Math.random(),
          x: 10 + Math.random() * 80, // %
          y: 110, // Start below bottom
          size: 55 + Math.random() * 35,
          color: colors[Math.floor(Math.random() * colors.length)],
          icon: emojis[Math.floor(Math.random() * emojis.length)],
          speed: 0.6 + Math.random() * 0.8,
          popped: false,
        };
        return [...prev, newBubble];
      });
    }, 900);

    return () => clearInterval(interval);
  }, []);

  // Float animation tick
  useEffect(() => {
    const anim = setInterval(() => {
      setBubbles((prev) =>
        prev
          .map((b) => ({ ...b, y: b.y - b.speed }))
          .filter((b) => b.y > -20 && !b.popped)
      );
    }, 40);
    return () => clearInterval(anim);
  }, []);

  // Pop a bubble
  const handlePopBubble = (id: number, icon: string, event: React.PointerEvent) => {
    sounds.playBubblePop();
    const note = Math.floor(Math.random() * 8);
    sounds.playXylophone(note);

    setPoppedCount((c) => c + 1);

    // Confetti at pointer
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 18,
      spread: 45,
      startVelocity: 18,
      origin: { x, y },
      colors: ['#38bdf8', '#f472b6', '#fbbf24', '#34d399'],
    });

    setBubbles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );
  };

  // Sound board cards for Nico (3) & Noel (1-2)
  const soundCards = [
    { title: 'El Dron de Papá', emoji: '🛸', sound: 'BZZZZ VOLANDO', note: 0, bg: 'bg-cyan-500/20 border-cyan-400' },
    { title: 'Cámara Fotográfica', emoji: '📸', sound: '¡CLIC CLAC!', note: 1, bg: 'bg-amber-500/20 border-amber-400' },
    { title: 'Perrito Juguetón', emoji: '🐶', sound: '¡GUAU GUAU!', note: 2, bg: 'bg-orange-500/20 border-orange-400' },
    { title: 'Gatito Suave', emoji: '🐱', sound: '¡MIAU MIAU!', note: 3, bg: 'bg-pink-500/20 border-pink-400' },
    { title: 'Coche de Carreras', emoji: '🚗', sound: '¡BRUUM BRUUM!', note: 4, bg: 'bg-red-500/20 border-red-400' },
    { title: 'Biberón & Risa', emoji: '🍼', sound: '¡ÑAAM ÑAAM!', note: 5, bg: 'bg-emerald-500/20 border-emerald-400' },
    { title: 'Estrellita Mágica', emoji: '⭐', sound: '¡CHIN CHIN!', note: 6, bg: 'bg-yellow-500/20 border-yellow-400' },
    { title: 'Corazón de Mamá', emoji: '💖', sound: '¡TIKI TIKI!', note: 7, bg: 'bg-rose-500/20 border-rose-400' },
  ];

  const [activeSpeech, setActiveSpeech] = useState<string | null>(null);

  const handleCardPress = (card: typeof soundCards[0]) => {
    sounds.playXylophone(card.note);
    sounds.playBubblePop();
    setActiveSpeech(card.sound);
    confetti({ particleCount: 15, spread: 50 });
    setTimeout(() => setActiveSpeech(null), 1200);
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner Kids */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-emerald-950/70 via-teal-950/50 to-slate-900 border border-emerald-500/30 shadow-xl shadow-emerald-500/10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-2">
              <Sparkles size={14} className="text-emerald-400" /> Zona Pequeques • Nico (3) & Noel (1-2)
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
              El Parque de Juegos Mágico
            </h2>
            <p className="text-sm text-emerald-200/80 max-w-xl mt-1">
              Burbujas sensoriales para tocar con los deditos, xilófono pentatónico y sonidos divertidos.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { sounds.playDing(); setKidMode('nico'); }}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                kidMode === 'nico'
                  ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/30 font-black'
                  : 'bg-slate-800 text-emerald-200'
              }`}
            >
              👑 Nico (3 años)
            </button>
            <button
              onClick={() => { sounds.playDing(); setKidMode('noel'); }}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                kidMode === 'noel'
                  ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-slate-950 shadow-lg shadow-pink-500/30 font-black'
                  : 'bg-slate-800 text-pink-200'
              }`}
            >
              🍼 Noel (1 año)
            </button>
          </div>
        </div>
      </div>

      {/* SENSORY BUBBLES PLAYGROUND (Interactive Pop Game) */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/30 bg-gradient-to-b from-slate-950 via-slate-900 to-teal-950/40 p-4 min-h-[380px] shadow-2xl select-none touch-tap">
        {/* Top scoreboard & instructions */}
        <div className="flex items-center justify-between z-20 relative bg-slate-900/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-700/80">
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-bounce-slow">🫧</span>
            <div>
              <div className="text-xs font-bold text-white">
                {kidMode === 'nico' ? '¡Nico, explota todas las burbujas!' : '¡Toca la pantalla, Noel!'}
              </div>
              <div className="text-[10px] text-emerald-400 font-medium">Sonido musical afinado con cada toque</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-300 font-semibold">Explotadas:</span>
            <span className="text-lg font-black text-amber-400 bg-amber-400/20 px-2.5 py-0.5 rounded-xl border border-amber-400/30">
              {poppedCount} ⭐
            </span>
          </div>
        </div>

        {/* Speech popup if any card pressed */}
        {activeSpeech && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 pointer-events-none bg-yellow-400 text-slate-950 font-black text-xl px-6 py-2 rounded-full shadow-2xl animate-bounce border-2 border-white">
            {activeSpeech}
          </div>
        )}

        {/* Floating Interactive Bubbles */}
        <div className="relative w-full h-[280px] sm:h-[320px] overflow-hidden">
          {bubbles.map((b) => (
            <div
              key={b.id}
              onPointerDown={(e) => handlePopBubble(b.id, b.icon, e)}
              className="absolute cursor-pointer transition-transform active:scale-125 select-none touch-tap"
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                width: `${b.size}px`,
                height: `${b.size}px`,
              }}
            >
              <div
                className={`w-full h-full rounded-full bg-gradient-to-tr ${b.color} shadow-lg shadow-white/10 flex items-center justify-center border-2 border-white/60 animate-pulse-slow backdrop-blur-xs`}
              >
                <span className="text-2xl filter drop-shadow-sm pointer-events-none">{b.icon}</span>
              </div>
            </div>
          ))}

          {/* Gentle background decorative elements */}
          <div className="absolute bottom-2 left-4 text-xs text-slate-500 pointer-events-none">
            👶 Diseñado con cariño para manitas de 1 a 3 años
          </div>
        </div>
      </div>

      {/* CHUNKY SOUNDBOARD / ANIMAL & GADGET PIANO */}
      <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="text-emerald-400" size={20} />
            <h3 className="font-extrabold text-white text-base">
              Botones Mágicos de Sonidos (Toca y escucha)
            </h3>
          </div>
          <span className="text-xs text-slate-400">Escala pentatónica dulce</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {soundCards.map((card, idx) => (
            <button
              key={idx}
              onClick={() => handleCardPress(card)}
              className={`p-4 rounded-3xl border-2 flex flex-col items-center justify-center gap-2 transition-all active:scale-95 shadow-md hover:brightness-110 ${card.bg}`}
            >
              <span className="text-4xl filter drop-shadow-md">{card.emoji}</span>
              <span className="text-xs font-black text-white text-center leading-tight">
                {card.title}
              </span>
              <span className="text-[10px] font-bold text-slate-300 opacity-80">
                {card.sound}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
