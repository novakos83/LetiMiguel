import React, { useState } from 'react';
import { Sparkles, Palette, Home, Heart, RefreshCw, Check, Share2, Compass, Layers, ShoppingBag } from 'lucide-react';
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
  const [subTab, setSubTab] = useState<'decor' | 'fashion' | 'wishlist'>('decor');

  // Room Designer State
  const [room, setRoom] = useState<RoomConfig>({
    roomType: 'Salón Principal',
    wallColor: '#F5EBE6', // Warm linen
    furniture: 'Sofá Bouclé Curvo Blanco',
    art: 'Galería Abstracta Orgánica Minimal',
    plant: 'Monstera Deliciosa XXL',
    lighting: 'Lámpara de Arco Dorado Mate',
    rug: 'Alfombra Bereber Nube Mullida'
  });

  const wallColors = [
    { name: 'Lino Cálido', hex: '#F5EBE6', textColor: 'text-stone-800' },
    { name: 'Verde Salvia', hex: '#D6E2D5', textColor: 'text-emerald-950' },
    { name: 'Terracota Suave', hex: '#EAC8B9', textColor: 'text-amber-950' },
    { name: 'Rosa Empolvado', hex: '#F3D9DF', textColor: 'text-pink-950' },
    { name: 'Gris Cemento Chic', hex: '#E2E8F0', textColor: 'text-slate-900' },
    { name: 'Azul Noche Profundo', hex: '#1E293B', textColor: 'text-white' },
  ];

  const furnitureOptions = [
    { id: 'boucle', name: 'Sofá Bouclé Curvo Blanco', style: 'Nordic Glam', icon: '🛋️' },
    { id: 'velvet', name: 'Sofá Terciopelo Rosa Vintage', style: 'Boho Chic', icon: '🛋️' },
    { id: 'leather', name: 'Chaise Longue Cuero Caramelo', style: 'Mid-Century Modern', icon: '🛋️' },
    { id: 'linen', name: 'Rinconera Modular Lino Beige', style: 'Wabi-Sabi Natural', icon: '🛋️' },
  ];

  const artOptions = [
    { name: 'Galería Abstracta Orgánica Minimal', icon: '🖼️' },
    { name: 'Díptico Botánico con Marco Dorado', icon: '🌿' },
    { name: 'Espejo Ondulado Ultrafragola Vibes', icon: '🪞' },
    { name: 'Fotografía Arquitectura en B/N (obra de Miguel)', icon: '📷' },
  ];

  const plantOptions = [
    { name: 'Monstera Deliciosa XXL', icon: '🪴' },
    { name: 'Olivo Silvestre en Maceta de Barro', icon: '🫒' },
    { name: 'Ficus Lyrata con Hojas de Violín', icon: '🌱' },
    { name: 'Palmera Kentia Escultural', icon: '🌴' },
  ];

  const lightingOptions = [
    { name: 'Lámpara de Arco Dorado Mate', icon: '✨' },
    { name: 'Colgante de Ratán Artesanal', icon: '🏮' },
    { name: 'Globo de Cristal Opalino Mid-Century', icon: '💡' },
    { name: 'Apliques de Pared con Luz Indirecta Cálida', icon: '🕯️' },
  ];

  // Random preset generator
  const handleRandomRoom = () => {
    sounds.playSparkle();
    const randomColor = wallColors[Math.floor(Math.random() * wallColors.length)];
    const randomFurn = furnitureOptions[Math.floor(Math.random() * furnitureOptions.length)];
    const randomArt = artOptions[Math.floor(Math.random() * artOptions.length)];
    const randomPlant = plantOptions[Math.floor(Math.random() * plantOptions.length)];
    const randomLight = lightingOptions[Math.floor(Math.random() * lightingOptions.length)];

    setRoom({
      roomType: 'Espacio Soñado de Leti',
      wallColor: randomColor.hex,
      furniture: randomFurn.name,
      art: randomArt.name,
      plant: randomPlant.name,
      lighting: randomLight.name,
      rug: 'Alfombra Bereber Nube Mullida'
    });

    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#fb7185', '#fbbf24']
    });
  };

  // Fashion look generator state
  const [occasion, setOccasion] = useState('visita');
  const outfits: Record<string, { title: string; dress: string; shoes: string; bag: string; makeup: string; vibe: string }> = {
    visita: {
      title: 'Anfitriona Casual Chic (Para la visita de mañana)',
      dress: 'Vestido midi fluido de punto acanalado en tono arena o lino con caída perfecta',
      shoes: 'Mules destalonadas de piel suave o zapatillas blancas impecables',
      bag: 'Tote bag estructurado de diseño minimalista',
      makeup: 'Piel efecto glow ' + '“glazed donut”',
      vibe: 'Elegante sin esfuerzo, cómoda para estar con los peques y recibir con estilo.'
    },
    evento: {
      title: 'Noche Glam & Cena Romántica con Miguel',
      dress: 'Vestido satinado de tirantes en tono verde esmeralda o borgoña',
      shoes: 'Sandalias de tiras finas doradas de tacón sensato',
      bag: 'Clutch joya nacarado',
      makeup: 'Labio rojo aterciopelado clásico y delineado felino preciso',
      vibe: 'Impacto total, sofisticación y glamour de alfombra roja.'
    },
    parque: {
      title: 'Tarde Activa con Nico & Noel',
      dress: 'Mono camisero de algodón orgánico o vestido camisero con cinturón ancho',
      shoes: 'Sneakers ergonómicas de diseño trendy',
      bag: 'Mochila maternal de piel prémium (donde cabe de todo con estilazo)',
      makeup: 'Bálsamo labial con color frambuesa, máscara de pestañas waterproof y colorete en crema',
      vibe: 'Mamá todoterreno con porte de revista de moda.'
    },
    brunch: {
      title: 'Brunch de Domingo & Tiendas Deco',
      dress: 'Vestido camisero boho con bordados y mangas abullonadas',
      shoes: 'Botines cowboy de ante camel',
      bag: 'Capazo de palma con detalles de cuero trenzado',
      makeup: 'Sombras en tonos cálidos melocotón y mejillas bronceadas',
      vibe: 'Vibra relajada, fresca y súper fotogénica para las cámaras de Miguel.'
    }
  };

  const currentOutfit = outfits[occasion] || outfits.visita;

  // Leti's wishlist state
  const [wishlist, setWishlist] = useState([
    { id: 1, text: 'Espejo de cuerpo entero con marco dorado estilo vintage', checked: true, tag: 'Deco' },
    { id: 2, text: 'Vestido de lino fresco para las próximas vacaciones', checked: false, tag: 'Moda' },
    { id: 3, text: 'Jarrón de cerámica artesanal con forma orgánica', checked: true, tag: 'Deco' },
    { id: 4, text: 'Labial mate de larga duración que aguante besos a los peques', checked: false, tag: 'Beauty' },
    { id: 5, text: 'Que Miguel monte ya la balda flotante que compramos hace 2 meses 😉', checked: false, tag: 'Miguel Fix' },
  ]);

  const toggleWish = (id: number) => {
    sounds.playBubblePop();
    setWishlist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner Leti */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-pink-900/60 via-purple-900/40 to-slate-900 border border-pink-500/30 shadow-xl shadow-pink-500/10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-semibold mb-2">
              <Sparkles size={14} className="animate-spin" /> El Rincón de Leti • Haute Design & Deco
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
              Estilo, Hogar & Sofisticación
            </h2>
            <p className="text-sm text-pink-200/80 max-w-xl mt-1">
              Diseña la casa de ensueño para la familia, descubre combinaciones de estilo y haz volar la imaginación deco.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => { sounds.playDing(); setSubTab('decor'); }}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                subTab === 'decor'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30'
                  : 'bg-slate-800/80 text-pink-200 hover:bg-slate-800'
              }`}
            >
              🏠 Estudio Deco
            </button>
            <button
              onClick={() => { sounds.playDing(); setSubTab('fashion'); }}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                subTab === 'fashion'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30'
                  : 'bg-slate-800/80 text-pink-200 hover:bg-slate-800'
              }`}
            >
              👗 Style & Outfits
            </button>
            <button
              onClick={() => { sounds.playDing(); setSubTab('wishlist'); }}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                subTab === 'wishlist'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30'
                  : 'bg-slate-800/80 text-pink-200 hover:bg-slate-800'
              }`}
            >
              📋 Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* SUBTAB 1: DECOR STUDIO */}
      {subTab === 'decor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Visual Staging Preview */}
          <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-5 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="text-pink-400" size={18} />
                <h3 className="font-bold text-white text-base">Maqueta Visual de Estancia</h3>
              </div>
              <button
                onClick={handleRandomRoom}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-500/20 text-pink-300 hover:bg-pink-500/30 border border-pink-500/30 text-xs font-semibold transition-all"
              >
                <RefreshCw size={13} /> Aleatorio Chic
              </button>
            </div>

            {/* Room canvas representation */}
            <div 
              className="relative rounded-2xl p-6 transition-all duration-500 shadow-inner overflow-hidden border border-white/20 min-h-[320px] flex flex-col justify-between"
              style={{ backgroundColor: room.wallColor }}
            >
              {/* Floor base line */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-stone-400/40 to-transparent pointer-events-none border-b-8 border-stone-600/30"></div>

              {/* Upper Wall Art & Lamp */}
              <div className="relative z-10 flex justify-between items-start">
                <div className="bg-white/85 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-md border border-white/40 max-w-[200px]">
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Cuadro / Arte</div>
                  <div className="text-xs font-bold text-slate-800 truncate">{room.art}</div>
                </div>

                <div className="bg-white/85 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-md border border-white/40 max-w-[190px] text-right">
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Iluminación</div>
                  <div className="text-xs font-bold text-slate-800 truncate">{room.lighting}</div>
                </div>
              </div>

              {/* Center Scene Icons / Composition */}
              <div className="relative z-10 my-4 flex items-end justify-around py-4">
                {/* Plant */}
                <div className="text-center group cursor-pointer transition-transform hover:scale-110">
                  <div className="text-5xl filter drop-shadow-lg">🪴</div>
                  <div className="text-[10px] font-bold text-slate-800 bg-white/70 px-2 py-0.5 rounded-full mt-1 backdrop-blur-xs max-w-[90px] truncate mx-auto">
                    {room.plant}
                  </div>
                </div>

                {/* Furniture Main Piece */}
                <div className="text-center group cursor-pointer transition-transform hover:scale-105">
                  <div className="text-7xl filter drop-shadow-xl animate-float">🛋️</div>
                  <div className="text-xs font-extrabold text-slate-900 bg-white/90 px-3 py-1 rounded-full mt-1.5 shadow-sm border border-stone-200">
                    {room.furniture}
                  </div>
                </div>

                {/* Decor Accent */}
                <div className="text-center group cursor-pointer transition-transform hover:scale-110">
                  <div className="text-5xl filter drop-shadow-lg">🌾</div>
                  <div className="text-[10px] font-bold text-slate-800 bg-white/70 px-2 py-0.5 rounded-full mt-1 backdrop-blur-xs max-w-[90px] truncate mx-auto">
                    Velas & Jarrones
                  </div>
                </div>
              </div>

              {/* Rug Bottom */}
              <div className="relative z-10 bg-white/85 backdrop-blur-md px-4 py-2 rounded-xl text-center shadow-sm border border-white/40 max-w-sm mx-auto">
                <span className="text-xs font-semibold text-slate-700">Base: {room.rug}</span>
              </div>
            </div>

            {/* Room specs summary card */}
            <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Paleta seleccionada:</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-4 h-4 rounded-full border border-white/30" style={{ backgroundColor: room.wallColor }}></span>
                  <span className="text-sm font-bold text-white">
                    {wallColors.find(c => c.hex === room.wallColor)?.name || 'Personalizado'}
                  </span>
                  <span className="text-xs text-pink-400 font-medium">({room.wallColor})</span>
                </div>
              </div>
              <button
                onClick={() => {
                  sounds.playVictory();
                  confetti({ particleCount: 50, spread: 70 });
                  alert('¡Diseño guardado en la memoria de la app! Miguel ya tiene la lista de la compra de Ikea/Zara Home 🛍️');
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold shadow-md hover:brightness-110 transition-all"
              >
                <Heart size={14} className="fill-white" /> Guardar Favorito
              </button>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="lg:col-span-5 space-y-4">
            {/* Wall Color selector */}
            <div className="bg-slate-900/90 rounded-3xl p-5 border border-slate-800 space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                1. Tono de Pared / Pintura
              </label>
              <div className="grid grid-cols-3 gap-2">
                {wallColors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => {
                      sounds.playDing();
                      setRoom(prev => ({ ...prev, wallColor: color.hex }));
                    }}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                      room.wallColor === color.hex
                        ? 'border-pink-500 ring-2 ring-pink-500/30 shadow-md'
                        : 'border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full border border-black/20 shadow-sm" style={{ backgroundColor: color.hex }}></span>
                    <span className="text-[11px] font-medium text-slate-300 truncate w-full text-center">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Furniture selector */}
            <div className="bg-slate-900/90 rounded-3xl p-5 border border-slate-800 space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                2. Pieza Central / Sofá
              </label>
              <div className="space-y-2">
                {furnitureOptions.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      sounds.playDing();
                      setRoom(prev => ({ ...prev, furniture: f.name }));
                    }}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                      room.furniture === f.name
                        ? 'bg-pink-500/10 border-pink-500 text-pink-200'
                        : 'bg-slate-800/40 border-slate-700 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{f.icon}</span>
                      <div>
                        <div className="text-xs font-bold">{f.name}</div>
                        <div className="text-[10px] text-slate-400">{f.style}</div>
                      </div>
                    </div>
                    {room.furniture === f.name && <Check size={16} className="text-pink-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Accents selector */}
            <div className="bg-slate-900/90 rounded-3xl p-5 border border-slate-800 space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                3. Vegetación & Arte
              </label>
              <div className="grid grid-cols-2 gap-2">
                {plantOptions.slice(0, 4).map((p) => (
                  <button
                    key={p.name}
                    onClick={() => {
                      sounds.playDing();
                      setRoom(prev => ({ ...prev, plant: p.name }));
                    }}
                    className={`p-2 rounded-xl border text-left text-xs transition-all ${
                      room.plant === p.name
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-200 font-bold'
                        : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="mr-1">{p.icon}</span> {p.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: FASHION & OUTFITS */}
      {subTab === 'fashion' && (
        <div className="space-y-6">
          {/* Occasion selector tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'visita', label: '👋 Visita Amigos Mañana', emoji: '🥂' },
              { id: 'evento', label: '💃 Noche Romántica', emoji: '✨' },
              { id: 'parque', label: '👶 Tarde con Nico & Noel', emoji: '🧸' },
              { id: 'brunch', label: '🥐 Brunch & Deco Shopping', emoji: '🌿' },
            ].map((occ) => (
              <button
                key={occ.id}
                onClick={() => {
                  sounds.playSparkle();
                  setOccasion(occ.id);
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                  occasion === occ.id
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/20 scale-105'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>{occ.emoji}</span>
                <span>{occ.label}</span>
              </button>
            ))}
          </div>

          {/* Outfit breakdown card */}
          <div className="bg-slate-900/95 rounded-3xl p-6 sm:p-8 border border-pink-500/20 shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-pink-400">Propuesta de Estilo</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">{currentOutfit.title}</h3>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/30 font-medium">
                100% Leti Style
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60 space-y-1">
                <div className="text-xs text-pink-300 font-bold flex items-center gap-1.5">
                  <span>👗</span> Prenda Principal
                </div>
                <p className="text-sm text-slate-200 font-medium">{currentOutfit.dress}</p>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60 space-y-1">
                <div className="text-xs text-pink-300 font-bold flex items-center gap-1.5">
                  <span>👠</span> Calzado
                </div>
                <p className="text-sm text-slate-200 font-medium">{currentOutfit.shoes}</p>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60 space-y-1">
                <div className="text-xs text-pink-300 font-bold flex items-center gap-1.5">
                  <span>👜</span> Bolso & Accesorios
                </div>
                <p className="text-sm text-slate-200 font-medium">{currentOutfit.bag}</p>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60 space-y-1">
                <div className="text-xs text-pink-300 font-bold flex items-center gap-1.5">
                  <span>💄</span> Beauty & Makeup
                </div>
                <p className="text-sm text-slate-200 font-medium">{currentOutfit.makeup}</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-transparent p-4 rounded-2xl border-l-4 border-pink-500 text-xs sm:text-sm text-pink-200 italic">
              “{currentOutfit.vibe}”
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: WISHLIST */}
      {subTab === 'wishlist' && (
        <div className="bg-slate-900/95 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShoppingBag className="text-pink-400" size={20} />
                Lista de Deseos & Proyectos de Leti
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Toca para marcar lo que ya está conseguido o en marcha</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-300">
              {wishlist.filter(w => w.checked).length} / {wishlist.length} Listos
            </span>
          </div>

          <div className="space-y-2.5">
            {wishlist.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleWish(item.id)}
                className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  item.checked
                    ? 'bg-pink-500/10 border-pink-500/40 text-pink-200 line-through opacity-75'
                    : 'bg-slate-800/60 border-slate-700/80 text-slate-200 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all ${
                    item.checked ? 'bg-pink-500 border-pink-500 text-white' : 'border-slate-500'
                  }`}>
                    {item.checked && <Check size={14} />}
                  </div>
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  item.tag === 'Miguel Fix' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-slate-700 text-slate-300'
                }`}>
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
