import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Heart, Smile, Music, Star, Volume2, Lock, Unlock } from 'lucide-react';
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
  const [toddlerLock, setToddlerLock] = useState(false);
  const [unlockProgress, setUnlockProgress] = useState(0);
  const unlockTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Floating bubbles loop for toddlers
  useEffect(() => {
    const emojis = ['🎈', '⭐', '🛸', '🧸', '🌈', '🍭', '🚗', '🐱', '✨', '🍼', '🐶', '🍦'];
    const colors = [
      'from-pink-400 to-rose-500',
      'from-cyan-400 to-blue-500',
      'from-amber-300 to-yellow-500',
      'from-emerald-400 to-teal-500',
      'from-purple-400 to-indigo-500',
    ];

    const interval = setInterval(() => {
      setBubbles((prev) => {
        if (prev.length > (toddlerLock ? 18 : 12)) return prev;
        const newBubble: Bubble = {
          id: Date.now() + Math.random(),
          x: 10 + Math.random() * 80,
          y: 110,
          size: toddlerLock ? 70 + Math.random() * 40 : 55 + Math.random() * 35,
          color: colors[Math.floor(Math.random() * colors.length)],
          icon: emojis[Math.floor(Math.random() * emojis.length)],
          speed: 0.6 + Math.random() * 0.8,
          popped: false,
        };
        return [...prev, newBubble];
      });
    }, 800);

    return () => clearInterval(interval);
  }, [toddlerLock]);

  // Float animation tick
  useEffect(() => {
    const anim = setInterval(() => {
      setBubbles((prev) =>
        prev
          .map((b) => ({ ...b, y: b.y - b.speed }))
          .filter((b) => b.y > -25 && !b.popped)
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

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 22,
      spread: 55,
      startVelocity: 20,
      origin: { x, y },
      colors: ['#38bdf8', '#f472b6', '#fbbf24', '#34d399', '#a855f7'],
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

  // Hold-to-unlock mechanism for parents
  const startUnlock = () => {
    let p = 0;
    unlockTimerRef.current = setInterval(() => {
      p += 10;
      setUnlockProgress(p);
      if (p >= 100) {
        if (unlockTimerRef.current) clearInterval(unlockTimerRef.current);
        setToddlerLock(false);
        setUnlockProgress(0);
        sounds.playVictory();
      }
    }, 120);
  };

  const cancelUnlock = () => {
    if (unlockTimerRef.current) {
      clearInterval(unlockTimerRef.current);
      unlockTimerRef.current = null;
    }
    setUnlockProgress(0);
  };

  // FULLSCREEN TODDLER LOCK MODE
  if (toddlerLock) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col justify-between p-4 overflow-hidden select-none touch-tap">
        {/* Top bar with safety unlock */}
        <div className="flex items-center justify-between bg-slate-900/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-2">
            <span className="text-xl">👶</span>
            <span className="text-xs font-bold text-emerald-400">
              Modo Bebé Activo • {kidMode === 'nico' ? 'Nico (3 años)' : 'Noel (1 año)'}
            </span>
          </div>

          {/* Hold to unlock */}
          <div className="relative">
            <button
              onPointerDown={startUnlock}
              onPointerUp={cancelUnlock}
              onPointerLeave={cancelUnlock}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 border border-slate-600 text-xs font-bold flex items-center gap-1.5 active:bg-slate-700"
            >
              <Lock size={13} className="text-amber-400" />
              <span>Mantén pulsado para salir ({unlockProgress}%)</span>
            </button>
            {unlockProgress > 0 && (
              <div
                className="absolute bottom-0 left-0 h-1 bg-amber-400 rounded-full transition-all"
                style={{ width: `${unlockProgress}%` }}
              ></div>
            )}
          </div>
        </div>

        {/* Sensory touch play area */}
        <div className="relative flex-1 w-full overflow-hidden">
          {bubbles.map((b) => (
            <div
              key={b.id}
              onPointerDown={(e) => handlePopBubble(b.id, b.icon, e)}
              className="absolute cursor-pointer select-none active:scale-125 transition-transform touch-tap"
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                width: `${b.size}px`,
                height: `${b.size}px`,
              }}
            >
              <div
                className={`w-full h-full rounded-full bg-gradient-to-tr ${b.color} shadow-2xl flex items-center justify-center border-4 border-white/80 animate-pulse-slow`}
              >
                <span className="text-4xl filter drop-shadow-md pointer-events-none">{b.icon}</span>
              </div>
            </div>
          ))}

          {activeSpeech && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none bg-yellow-400 text-slate-950 font-black text-3xl px-8 py-3 rounded-full shadow-2xl animate-bounce border-4 border-white">
              {activeSpeech}
            </div>
          )}
        </div>

        {/* Chunky Bottom Sound Bar */}
        <div className="grid grid-cols-4 gap-2">
          {soundCards.slice(0, 4).map((card, idx) => (
            <button
              key={idx}
              onPointerDown={() => handleCardPress(card)}
              className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform ${card.bg}`}
            >
              <span className="text-3xl">{card.emoji}</span>
              <span className="text-[11px] font-black text-white truncate max-w-full">{card.title}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

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

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => { sounds.playDing(); setKidMode('nico'); }}
              className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                kidMode === 'nico'
                  ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/30 font-black'
                  : 'bg-slate-800 text-emerald-200'
              }`}
            >
              👑 Nico (3 años)
            </button>
            <button
              onClick={() => { sounds.playDing(); setKidMode('noel'); }}
              className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                kidMode === 'noel'
                  ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-slate-950 shadow-lg shadow-pink-500/30 font-black'
                  : 'bg-slate-800 text-pink-200'
              }`}
            >
              🍼 Noel (1 año)
            </button>
            <button
              onClick={() => {
                sounds.playVictory();
                setToddlerLock(true);
              }}
              className="px-3.5 py-2 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold hover:bg-amber-500/30 transition-all flex items-center gap-1.5"
              title="Bloquea la pantalla para que los peques jueguen sin salir de la app"
            >
              <Lock size={14} /> Modo Bebé Lock
            </button>
          </div>
        </div>
      </div>

      {/* SENSORY BUBBLES PLAYGROUND */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/30 bg-gradient-to-b from-slate-950 via-slate-900 to-teal-950/40 p-4 min-h-[380px] shadow-2xl select-none touch-tap">
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

        {activeSpeech && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 pointer-events-none bg-yellow-400 text-slate-950 font-black text-xl px-6 py-2 rounded-full shadow-2xl animate-bounce border-2 border-white">
            {activeSpeech}
          </div>
        )}

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
