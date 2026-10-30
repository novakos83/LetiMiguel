import React, { useState, useRef } from 'react';
import { Camera, Sparkles, Heart, Gift, Download, RefreshCw, Upload, Utensils, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/sound';

export const VisitorSection: React.FC = () => {
  // Plan / Dinner Roulette
  const plans = [
    { title: '🍕 Pedir Pizzas Artesanas', desc: 'Cena rápida, sin ensuciar la cocina y a Nico le encanta' },
    { title: '🍣 Noche de Sushi & Delicatessen', desc: 'Un capricho sofisticado digno del estilo de Leti' },
    { title: '🍔 Hamburguesas Gourmet con Patatas', desc: 'Para chuparse los dedos charlando en el sofá' },
    { title: '🥘 Lo que cocine Miguel a su manera', desc: 'Con precisión milimétrica de ingeniero y cacharreo' },
    { title: '☕ Café, Dulces & Sesión de Cháchara', desc: 'Tarde relajada de sobremesa mientras juegan Nico y Noel' },
    { title: '🍟 Menú Especial que elija Nico (3 años)', desc: '¡El jefe de la casa manda!' },
  ];

  const [spinning, setSpinning] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);

  const spinRoulette = () => {
    if (spinning) return;
    setSpinning(true);
    setSelectedPlan(null);

    let count = 0;
    const maxTicks = 18;
    const interval = setInterval(() => {
      sounds.playDing();
      const randomPlan = plans[Math.floor(Math.random() * plans.length)];
      setSelectedPlan(randomPlan);
      count++;
      if (count >= maxTicks) {
        clearInterval(interval);
        setSpinning(false);
        sounds.playVictory();
        confetti({ particleCount: 70, spread: 80 });
      }
    }, 100);
  };

  // Photo Booth / Frame State
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [activeFrame, setActiveFrame] = useState<'polaroid' | 'cyber' | 'chic'>('polaroid');
  const [caption, setCaption] = useState('¡Visita inolvidable en casa de Leti & Miguel!');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      sounds.playCameraShutter();
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setUserPhoto(ev.target.result as string);
          confetti({ particleCount: 30, spread: 50 });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadSouvenir = () => {
    sounds.playVictory();
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1000;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Polaroid style
    ctx.fillStyle = activeFrame === 'cyber' ? '#0f172a' : activeFrame === 'chic' ? '#fdf2f8' : '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = activeFrame === 'cyber' ? '#06b6d4' : activeFrame === 'chic' ? '#f472b6' : '#e2e8f0';
    ctx.lineWidth = 12;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

    const renderTextAndDownload = () => {
      // Bottom text
      ctx.fillStyle = activeFrame === 'cyber' ? '#38bdf8' : '#1e293b';
      ctx.font = 'bold 30px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(caption, canvas.width / 2, 880);

      ctx.fillStyle = '#64748b';
      ctx.font = '20px sans-serif';
      ctx.fillText('Leti • Miguel • Nico (3) • Noel (1) & Amigos', canvas.width / 2, 925);

      // Trigger download
      const link = document.createElement('a');
      link.download = 'recuerdo-visita-leti-miguel.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    };

    if (userPhoto) {
      const img = new Image();
      img.onload = () => {
        // Draw image inside photo area
        ctx.drawImage(img, 50, 50, 700, 760);
        renderTextAndDownload();
      };
      img.src = userPhoto;
    } else {
      // Default illustration if no photo uploaded
      ctx.fillStyle = '#f1f5f9';
      ctx.fillRect(50, 50, 700, 760);
      ctx.fillStyle = '#0f172a';
      ctx.font = '80px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('✨ 📸 🛸 🎈', canvas.width / 2, 420);
      renderTextAndDownload();
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner Visitor */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-amber-950/70 via-orange-950/50 to-slate-900 border border-amber-500/30 shadow-xl shadow-amber-500/10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
              <Gift size={14} className="text-amber-400" /> Encuentro Especial • ¡Nos vemos mañana!
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
              La Visita a Casa de Leti & Miguel
            </h2>
            <p className="text-sm text-amber-200/80 max-w-xl mt-1">
              Un detalle hecho con cariño antes de cruzar la puerta. Ruleta de planes y fotomatón de recuerdo.
            </p>
          </div>

          <div className="bg-amber-400/20 px-4 py-2 rounded-2xl border border-amber-400/40 text-amber-200 text-xs font-bold flex items-center gap-2">
            <span>🎉</span> ¡Todo preparado para mañana!
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* ROULETTE / DINNER DECIDER */}
        <div className="bg-slate-900/95 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Utensils className="text-amber-400" size={20} />
                La Ruleta: “¿Qué pedimos o cenamos hoy?”
              </h3>
              <p className="text-xs text-slate-400">Resuelve el dilema sin discusiones con un solo toque</p>
            </div>
          </div>

          <div className="bg-slate-950/80 rounded-3xl p-6 border border-amber-500/20 text-center min-h-[180px] flex flex-col items-center justify-center space-y-2">
            {selectedPlan ? (
              <div className="space-y-2 animate-fade-in">
                <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400">Resultado Oficial:</span>
                <div className="text-2xl font-black text-white font-display">{selectedPlan.title}</div>
                <div className="text-xs text-slate-300 italic max-w-sm mx-auto">{selectedPlan.desc}</div>
              </div>
            ) : (
              <div className="space-y-1">
                <span className="text-4xl animate-bounce-slow">🎯</span>
                <div className="text-sm font-semibold text-slate-300">¿Qué comeremos mañana?</div>
                <div className="text-xs text-slate-500">Pulsa el botón para hacer girar la ruleta</div>
              </div>
            )}
          </div>

          <button
            disabled={spinning}
            onClick={spinRoulette}
            className={`w-full py-3.5 rounded-2xl font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-2 ${
              spinning
                ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-amber-500/20 hover:scale-[1.02]'
            }`}
          >
            <RefreshCw size={18} className={spinning ? 'animate-spin' : ''} />
            {spinning ? 'Girando ruleta...' : '🎲 Girar Ruleta Gastronómica'}
          </button>
        </div>

        {/* PHOTO BOOTH & SOUVENIR FRAME */}
        <div className="bg-slate-900/95 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Camera className="text-amber-400" size={20} />
                Fotomatón Familiar de la Visita
              </h3>
              <p className="text-xs text-slate-400">Sube una foto de mañana y descárgate la tarjeta con marco</p>
            </div>
          </div>

          {/* Photo Preview / Upload Box */}
          <div className="relative rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950/60 p-4 text-center overflow-hidden min-h-[220px] flex flex-col items-center justify-center">
            {userPhoto ? (
              <div className="space-y-3 w-full">
                <img src={userPhoto} alt="Foto Visita" className="max-h-48 rounded-xl mx-auto object-cover shadow-lg" />
                <div className="text-xs text-emerald-400 font-bold">¡Foto cargada con éxito!</div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-4xl text-slate-600">🖼️</div>
                <div className="text-xs font-semibold text-slate-300">Sube una foto vuestra de la visita</div>
                <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white cursor-pointer border border-slate-700 shadow-sm transition-all">
                  <Upload size={14} /> Seleccionar Foto
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
              </div>
            )}
          </div>

          {/* Caption Input */}
          <div>
            <label className="text-xs text-slate-400 font-semibold block mb-1">Dedicatoria / Pie de foto:</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-hidden focus:border-amber-400"
            />
          </div>

          {/* Download button */}
          <button
            onClick={downloadSouvenir}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-400/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-1.5"
          >
            <Download size={16} /> Descargar Postal de Recuerdo
          </button>
        </div>
      </div>

      {/* FRIEND'S DEDICATION CARD */}
      <div className="bg-gradient-to-r from-pink-950/40 via-purple-950/40 to-cyan-950/40 rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl text-center space-y-3">
        <div className="text-3xl">🥂 💖 🛸</div>
        <h4 className="text-xl sm:text-2xl font-black text-white font-display">
          “¡Ganas inmensas de veros mañana!”
        </h4>
        <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Para Leti, la reina del estilo y la deco; para Miguel, el rey de las placas y los drones; y para Nico y Noel, los auténticos terremotos de la casa. ¡Mañana lo pasamos en grande!
        </p>
      </div>
    </div>
  );
};
