import React, { useState } from 'react';
import { Sparkles, Palette, Home, Heart, RefreshCw, Check, Flame, Search, Newspaper, Baby, ShoppingBag } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/sound';

interface RoomConfig {
  roomType: string;
  wallColor: string;
  furniture: string;
  art: string;
  plant: string;
  lighting: string;
  rug: string;
}

export const LetiSection: React.FC = () => {
  const [subTab, setSubTab] = useState<'decor' | 'velas' | 'truecrime' | 'noticias' | 'fashion' | 'peques'>('velas');

  // ==================== CANDLE STUDIO STATE ====================
  const [candleWax, setCandleWax] = useState('Cera de Soja 100% Natural & Sostenible');
  const [candleWick, setCandleWick] = useState('Mecha de Madera que Crepita (Efecto Chimenea)');
  const [candleScent, setCandleScent] = useState('Higo Negro, Ámbar & Cedro Silvestre');
  const [candleJar, setCandleJar] = useState('Cerámica Artesanal Estriada Blanco Mate');
  const [isCandleLit, setIsCandleLit] = useState(true);

  const candleScents = [
    { name: 'Higo Negro, Ámbar & Cedro', desc: 'Cálido, amaderado y sofisticado', vibe: 'Noche de relax' },
    { name: 'Vainilla de Madagascar & Tabaco Dulce', desc: 'Dulce envolvente con carácter', vibe: 'Tarde de sofá' },
    { name: 'Lino Blanco & Flores de Algodón', desc: 'Sensación de casa limpia y pura', vibe: 'Mañanas de domingo' },
    { name: 'Eucalipto, Salvia & Bergamota', desc: 'Fresco, balsámico y purificante', vibe: 'Desconexión total' },
    { name: 'Jazmín Nocturno & Sándalo', desc: 'Elegancia floral hipnótica', vibe: 'Ambiente chic' },
  ];

  const candleJars = [
    { name: 'Cerámica Artesanal Estriada', color: '#F1EDE6' },
    { name: 'Cristal Ámbar Acanalado Vintage', color: '#B46536' },
    { name: 'Mármol Blanco Calacatta', color: '#E2E8F0' },
    { name: 'Terracota Orgánica Cocida', color: '#C86D51' },
  ];

  const handleLightCandle = () => {
    sounds.playBubblePop();
    setIsCandleLit(!isCandleLit);
    if (!isCandleLit) {
      sounds.playSparkle();
      confetti({ particleCount: 20, spread: 40 });
    }
  };

  // ==================== TRUE CRIME INVESTIGATION STATE ====================
  const [currentMystery, setCurrentMystery] = useState({
    title: 'El Enigma de las Galletas Desaparecidas',
    suspects: ['Nico (3 años) - Visto cerca de la despensa', 'Miguel - Sospechoso habitual de picoteo nocturno', 'Noel (1 año) - Coartada: Estaba jugando con sonajeros'],
    clue: 'Se hallaron migajas microscópicas en la alfombra bereber de Leti y una huella de zapatilla tamaño 24.',
    verdict: 'Nico ejecutó la operación con destreza ninja mientras Miguel distraía al equipo hablando de drones.',
    status: 'CASO RESUELTO POR DETECTIVE LETI'
  });

  const mysteries = [
    {
      title: 'El Misterio del Mando a Distancia Teletransportado',
      suspects: ['El hueco misterioso del sofá', 'Noel (1 año) escondiéndolo en el cesto de peluches', 'Miguel que jura que lo dejó en la mesa'],
      clue: 'Una señal infrarroja residual apunta hacia debajo de la cuna.',
      verdict: 'Noel lo usó como sonajero de alta tecnología y lo dejó bajo su mantita favorita.',
      status: 'RESUELTO POR LA EXPERTA LETI'
    },
    {
      title: 'El Extraño Caso de la Vela que Nadie Encendió',
      suspects: ['Leti buscando paz mental tras bañar a los niños', 'Una corriente de aire fantasma', 'Miguel buscando ambiente para editar fotos'],
      clue: 'Aroma inconfundible a higo y vainilla por todo el pasillo.',
      verdict: 'Leti activó el protocolo de autocuidado: 15 minutos de silencio con vela encendida.',
      status: 'PLENAMENTE JUSTIFICADO'
    },
    {
      title: 'La Conspiración de las Piezas de Dron en la Mesa de Centro',
      suspects: ['Miguel "solo eran 5 minutos para soldar"', 'Invasión extraterrestre', 'Nico queriendo construir un cohete espacial'],
      clue: 'Un soldador de estaño apagado y tres hélices de repuesto ocupando el espacio del jarrón deco.',
      verdict: 'Miguel fue interceptado por la mirada inquisitiva de Leti y evacuó el salón en 45 segundos.',
      status: 'SENTENCIA CONDICIONAL'
    }
  ];

  const handleNewMystery = () => {
    sounds.playMysteryChime();
    const next = mysteries[Math.floor(Math.random() * mysteries.length)];
    setCurrentMystery(next);
  };

  const trueCrimeDocs = [
    { title: 'Making a Murderer', tag: 'Clásico Imprescindible', platform: 'Netflix' },
    { title: 'The Jinx (El Gafe)', tag: 'Giro de Guion Brutal', platform: 'Max' },
    { title: 'El Caso Asunta / Guardia Urbana', tag: 'Análisis Psicológico', platform: 'Docu' },
    { title: 'The Staircase (La Escalera)', tag: 'Debate de Pruebas', platform: 'True Crime' },
  ];

  // ==================== NOTICIAS & POLÍTICA FAMILIAR ====================
  const newsHeadlines = [
    {
      badge: 'URGENTE POLÍTICA',
      title: 'El Consejo de Ministros de Casa decreta que la hora de dormir de Nico y Noel no se negocia hoy',
      source: 'Leti News Agency',
      time: 'Hace 12 min'
    },
    {
      badge: 'DEBATE PARLAMENTARIO',
      title: 'Dura sesión en el salón: Leti defiende el presupuesto para 2 velas más frente a la enmienda de Miguel para comprar otra batería LiPo',
      source: 'Boletín Oficial del Hogar',
      time: 'Hace 35 min'
    },
    {
      badge: 'ECONOMÍA & SOCIEDAD',
      title: 'Sondeo oficial de intención de voto para la cena de mañana con la visita: la Pizza Artesana lidera las encuestas con un 78%',
      source: 'CIS Familiar',
      time: 'Hace 1 hora'
    },
    {
      badge: 'INTERNACIONAL',
      title: 'Leti se mantiene informada de la actualidad global mientras bate el récord de doblar ropa y atender a dos peques a la vez',
      source: 'Supermamá Press',
      time: 'Hace 2 horas'
    }
  ];

  // ==================== ROOM DESIGNER STATE ====================
  const [room, setRoom] = useState<RoomConfig>({
    roomType: 'Salón Principal',
    wallColor: '#F5EBE6',
    furniture: 'Sofá Bouclé Curvo Blanco',
    art: 'Galería Abstracta Orgánica Minimal',
    plant: 'Monstera Deliciosa XXL',
    lighting: 'Lámpara de Arco Dorado Mate',
    rug: 'Alfombra Bereber Nube Mullida'
  });

  const wallColors = [
    { name: 'Lino Cálido', hex: '#F5EBE6' },
    { name: 'Verde Salvia', hex: '#D6E2D5' },
    { name: 'Terracota Suave', hex: '#EAC8B9' },
    { name: 'Rosa Empolvado', hex: '#F3D9DF' },
    { name: 'Azul Noche', hex: '#1E293B' },
  ];

  const furnitureOptions = [
    { id: 'boucle', name: 'Sofá Bouclé Curvo Blanco', style: 'Nordic Glam' },
    { id: 'velvet', name: 'Sofá Terciopelo Rosa Vintage', style: 'Boho Chic' },
    { id: 'leather', name: 'Chaise Longue Cuero Caramelo', style: 'Mid-Century Modern' },
  ];

  // ==================== FASHION STATE (MODERNA & TRENDY) ====================
  const [fashionLook, setFashionLook] = useState('moderna');

  const modernOutfits = {
    moderna: {
      title: 'Street-Style Chic & Moderno (Look Diario Leti)',
      top: 'Blazer estructurada oversize en tono camel sobre camiseta blanca básica de algodón prémium',
      bottom: 'Pantalones sastre wide-leg con caída impecable o vaqueros rectos tiro alto',
      shoes: 'Sneakers de diseñador trendy (estilo Samba/Gazelle limpias)',
      accessories: 'Gafas de sol carey ovaladas, collar de eslabones dorados y bolso cruzado de piel acolchada',
      vibe: 'Moderna, cosmopolita, juvenil y con un estilazo que llama la atención.'
    },
    noche: {
      title: 'Cena con Amigos & Noche Fuera',
      top: 'Top lencero satinado negro bajo americana fluida desabrochada',
      bottom: 'Falda midi satinada con corte al bies o pantalón palazzo fluido',
      shoes: 'Mules destalonadas de tacón cómodo o sandalias de tiras finas',
      accessories: 'Pendientes dorados geométricos y mini bolso baguette',
      vibe: 'Sofisticada, femenina y ultra elegante sin perder la comodidad.'
    },
    mama: {
      title: 'Mamá Cool con Nico (3) & Noel (1)',
      top: 'Cárdigan de punto grueso suave con botones joya o sudadera chic',
      bottom: 'Leggings de tiro alto de compresión prémium o vaqueros cropped cómodos',
      shoes: 'Deportivas ergonómicas ultraligeras para correr detrás de Nico',
      accessories: 'Tote bag de lona gruesa donde caben toallitas, juguetes y la agenda',
      vibe: 'Comodidad absoluta con un toque chic impecable.'
    }
  };

  const currentLook = modernOutfits[fashionLook as keyof typeof modernOutfits] || modernOutfits.moderna;

  return (
    <div className="space-y-6">
      {/* Hero Banner Leti */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-pink-950/70 via-rose-950/40 to-slate-900 border border-pink-500/30 shadow-xl shadow-pink-500/10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-semibold mb-2">
              <Sparkles size={14} className="text-pink-400" /> El Universo de Leti • Estilo, Velas & True Crime
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
              Leti: Pasión, Hogar & Mente Inquieta
            </h2>
            <p className="text-sm text-pink-200/80 max-w-xl mt-1">
              Amante de la moda moderna, las velas que huelen a gloria, los documentales de crímenes reales, la actualidad y sus dos tesoros: Nico y Noel.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'velas', label: '🕯️ Velas & Aroma' },
              { id: 'truecrime', label: '🔍 True Crime' },
              { id: 'noticias', label: '📰 Noticias & Política' },
              { id: 'fashion', label: '👗 Moda Moderna' },
              { id: 'decor', label: '🏠 Estudio Deco' },
              { id: 'peques', label: '👶 Nico & Noel' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { sounds.playDing(); setSubTab(tab.id as any); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  subTab === tab.id
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/30 scale-105'
                    : 'bg-slate-800/80 text-pink-200 hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SUBTAB 1: VELAS & CANDLE STUDIO */}
      {subTab === 'velas' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 bg-slate-900/95 rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Flame className={isCandleLit ? 'text-amber-400 animate-pulse' : 'text-slate-500'} size={22} />
                  El Rincón de las Velas de Lujo de Leti
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Diseña tu vela artesanal con cera natural y mecha crepitante</p>
              </div>

              <button
                onClick={handleLightCandle}
                className={`px-3.5 py-2 rounded-2xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-md ${
                  isCandleLit
                    ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-amber-500/20'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Flame size={15} />
                <span>{isCandleLit ? 'Apagar Vela' : 'Encender Vela'}</span>
              </button>
            </div>

            {/* Visual Candle Card with warm glow */}
            <div className={`relative rounded-3xl p-8 border transition-all duration-700 overflow-hidden text-center flex flex-col items-center justify-center min-h-[260px] ${
              isCandleLit
                ? 'bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 border-amber-500/40 shadow-2xl shadow-amber-500/10'
                : 'bg-slate-950 border-slate-800'
            }`}>
              {/* Flame animation */}
              <div className="relative mb-4">
                {isCandleLit ? (
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-10 rounded-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 animate-pulse shadow-lg shadow-amber-400/50 filter drop-shadow-md"></div>
                    <div className="w-1.5 h-3 bg-stone-800 rounded-xs"></div>
                  </div>
                ) : (
                  <div className="w-1.5 h-4 bg-stone-700 rounded-xs mx-auto mb-1"></div>
                )}
                {/* Candle jar vessel */}
                <div
                  className="w-32 h-28 rounded-2xl shadow-2xl border-2 border-white/20 flex flex-col items-center justify-center p-3 relative mx-auto transition-colors"
                  style={{ backgroundColor: candleJars.find(j => j.name === candleJar)?.color || '#F1EDE6' }}
                >
                  <div className="bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-md shadow-xs border border-stone-200">
                    <div className="text-[8px] font-black uppercase text-stone-900 tracking-widest">LETI CANDLES</div>
                    <div className="text-[7px] text-stone-600 font-serif italic truncate max-w-[80px]">{candleScent.split(',')[0]}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                  {isCandleLit ? '🔥 CREPITANDO SUAVEMENTE • AMBIENTE ZEN' : 'APAGADA'}
                </span>
                <h4 className="text-lg font-bold text-white mt-1">{candleScent}</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">{candleWax} • {candleWick}</p>
              </div>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60 text-xs text-amber-200/90 italic text-center">
              “Nada mejor que encender una vela con olor a higo o vainilla cuando los peques ya duermen y empieza un capítulo de True Crime.” 🕯️✨
            </div>
          </div>

          {/* Candle Customizer Controls */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/95 rounded-3xl p-5 border border-slate-800 space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                1. Fragancia & Esencia Principal
              </label>
              <div className="space-y-2">
                {candleScents.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => { sounds.playDing(); setCandleScent(s.name); }}
                    className={`w-full p-2.5 rounded-xl border text-left transition-all ${
                      candleScent === s.name
                        ? 'bg-amber-500/10 border-amber-500 text-amber-200 font-bold'
                        : 'bg-slate-800/40 border-slate-700 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs">{s.name}</span>
                      <span className="text-[10px] text-amber-400 font-normal">{s.vibe}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/95 rounded-3xl p-5 border border-slate-800 space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                2. Recipiente / Estética Deco
              </label>
              <div className="grid grid-cols-2 gap-2">
                {candleJars.map((jar) => (
                  <button
                    key={jar.name}
                    onClick={() => { sounds.playDing(); setCandleJar(jar.name); }}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      candleJar === jar.name
                        ? 'bg-amber-500/10 border-amber-500 text-amber-200 font-bold'
                        : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full border border-black/20 mb-1" style={{ backgroundColor: jar.color }}></div>
                    <div className="text-[11px] leading-tight">{jar.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: TRUE CRIME CLUB */}
      {subTab === 'truecrime' && (
        <div className="bg-slate-900/95 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Search className="text-rose-400" size={22} />
                Club de True Crime & Misterios de Leti
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Para la mayor investigadora del sofá: resuelve casos domésticos o descubre nuevas series documentales
              </p>
            </div>

            <button
              onClick={handleNewMystery}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-bold shadow-md hover:scale-105 transition-all flex items-center gap-1.5 self-start"
            >
              <RefreshCw size={14} /> 🔍 Nuevo Caso del Salón
            </button>
          </div>

          {/* Active Mystery Case File */}
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950/30 p-6 rounded-3xl border border-rose-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
                EXPEDIENTE LETI #00{Math.floor(Math.random() * 80) + 10}
              </span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                {currentMystery.status}
              </span>
            </div>

            <h4 className="text-2xl font-black text-white font-display">
              “{currentMystery.title}”
            </h4>

            <div>
              <div className="text-xs text-slate-400 uppercase font-semibold mb-2">Sospechosos bajo interrogatorio:</div>
              <div className="space-y-1.5">
                {currentMystery.suspects.map((s, idx) => (
                  <div key={idx} className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60 text-xs text-slate-300 flex items-center gap-2">
                    <span>🕵️‍♀️</span> {s}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/40 p-3.5 rounded-2xl border border-slate-700/40 space-y-1">
              <div className="text-[11px] font-bold uppercase text-amber-400 tracking-wider">Evidencia Forense:</div>
              <p className="text-xs text-slate-300">{currentMystery.clue}</p>
            </div>

            <div className="bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-transparent p-4 rounded-2xl border-l-4 border-rose-500 text-xs text-rose-200">
              <span className="font-bold">Dictamen Final de Leti: </span>
              {currentMystery.verdict}
            </div>
          </div>

          {/* Recommended True Crime Series */}
          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>📺</span> Recomendaciones Top para Noches de True Crime & Manta
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {trueCrimeDocs.map((doc, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700 text-center space-y-1 hover:border-slate-500 transition-colors">
                  <div className="text-base font-bold text-white">{doc.title}</div>
                  <div className="text-[10px] text-pink-300 font-semibold">{doc.tag}</div>
                  <div className="text-[9px] text-slate-400 uppercase tracking-widest">{doc.platform}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: NOTICIAS & POLÍTICA FAMILIAR */}
      {subTab === 'noticias' && (
        <div className="bg-slate-900/95 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Newspaper className="text-cyan-400" size={22} />
                El Informativo de Leti • Actualidad & Política Doméstica
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Siempre al día de lo que pasa en el mundo... ¡y en el salón de casa!
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              Edición en Directo
            </span>
          </div>

          <div className="space-y-3">
            {newsHeadlines.map((news, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 hover:border-slate-600 transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {news.badge}
                  </span>
                  <span className="text-[11px] text-slate-400">{news.time}</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                  {news.title}
                </h4>
                <div className="text-[10px] text-slate-400 font-medium">Fuente: {news.source}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 4: MODA MODERNA & TRENDY */}
      {subTab === 'fashion' && (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'moderna', label: '🕶️ Street-Style Moderno' },
              { id: 'noche', label: '🍸 Noche Chic & Cena' },
              { id: 'mama', label: '👟 Mamá Cool Activa' },
            ].map((look) => (
              <button
                key={look.id}
                onClick={() => { sounds.playSparkle(); setFashionLook(look.id); }}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  fashionLook === look.id
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/20 scale-105'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {look.label}
              </button>
            ))}
          </div>

          <div className="bg-slate-900/95 rounded-3xl p-6 sm:p-8 border border-pink-500/20 shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-pink-400">Tendencias 2024 / 2026</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">{currentLook.title}</h3>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/30 font-medium">
                100% Leti Trend
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60 space-y-1">
                <div className="text-xs text-pink-300 font-bold flex items-center gap-1.5">
                  <span>🧥</span> Prenda Superior
                </div>
                <p className="text-sm text-slate-200 font-medium">{currentLook.top}</p>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60 space-y-1">
                <div className="text-xs text-pink-300 font-bold flex items-center gap-1.5">
                  <span>👖</span> Parte Inferior
                </div>
                <p className="text-sm text-slate-200 font-medium">{currentLook.bottom}</p>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60 space-y-1">
                <div className="text-xs text-pink-300 font-bold flex items-center gap-1.5">
                  <span>👟</span> Calzado Trendy
                </div>
                <p className="text-sm text-slate-200 font-medium">{currentLook.shoes}</p>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60 space-y-1">
                <div className="text-xs text-pink-300 font-bold flex items-center gap-1.5">
                  <span>🕶️</span> Accesorios & Joyas
                </div>
                <p className="text-sm text-slate-200 font-medium">{currentLook.accessories}</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-transparent p-4 rounded-2xl border-l-4 border-pink-500 text-xs sm:text-sm text-pink-200 italic">
              “{currentLook.vibe}”
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 5: DECOR STUDIO */}
      {subTab === 'decor' && (
        <div className="bg-slate-900/95 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Home className="text-pink-400" size={20} />
                Estudio de Interiorismo & Paletas del Salón
              </h3>
              <p className="text-xs text-slate-400">El estilo soñado para la casa familiar</p>
            </div>
          </div>

          <div 
            className="rounded-2xl p-6 transition-all duration-500 shadow-inner overflow-hidden border border-white/20 min-h-[220px] flex items-center justify-around"
            style={{ backgroundColor: room.wallColor }}
          >
            <div className="text-center group cursor-pointer transition-transform hover:scale-110">
              <div className="text-5xl filter drop-shadow-lg">🪴</div>
              <div className="text-[10px] font-bold text-slate-800 bg-white/70 px-2 py-0.5 rounded-full mt-1">Monstera XXL</div>
            </div>
            <div className="text-center group cursor-pointer transition-transform hover:scale-105">
              <div className="text-6xl filter drop-shadow-xl animate-float">🛋️</div>
              <div className="text-xs font-extrabold text-slate-900 bg-white/90 px-3 py-1 rounded-full mt-1.5">Sofá Bouclé Curvo</div>
            </div>
            <div className="text-center group cursor-pointer transition-transform hover:scale-110">
              <div className="text-5xl filter drop-shadow-lg">🕯️</div>
              <div className="text-[10px] font-bold text-slate-800 bg-white/70 px-2 py-0.5 rounded-full mt-1">Velas & Jarrones</div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <span className="text-xs text-slate-400 font-semibold">Tono de pared:</span>
            {wallColors.map((color) => (
              <button
                key={color.hex}
                onClick={() => { sounds.playDing(); setRoom(prev => ({ ...prev, wallColor: color.hex })); }}
                className={`w-7 h-7 rounded-full border-2 transition-all ${room.wallColor === color.hex ? 'border-pink-500 scale-110 shadow-md' : 'border-slate-700'}`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 6: PEQUES (NICO & NOEL) */}
      {subTab === 'peques' && (
        <div className="bg-slate-900/95 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Baby className="text-pink-400" size={22} />
              El Amor Más Grande de Leti: Nico & Noel
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Los dos motores de su vida que llenan la casa de alegría</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl bg-emerald-950/20 border-2 border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-3xl">👑</span>
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">3 años</span>
              </div>
              <h4 className="text-lg font-bold text-white">Nico, el Pequeño Aventurero</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Curioso, ocurrente y lleno de energía. Siempre haciendo reír a mamá y corriendo por los pasillos con sus juguetes.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-pink-950/20 border-2 border-pink-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-3xl">🍼</span>
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300">1-2 años</span>
              </div>
              <h4 className="text-lg font-bold text-white">Noel, el Rey de la Casa</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                El benjamín de la familia. Sus sonrisas deshacen a Leti al instante y sus abrazos son la mejor recarga de batería del día.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
