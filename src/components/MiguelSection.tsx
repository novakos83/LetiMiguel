import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Camera, Play, RotateCcw, Zap, Sparkles, Award, Sliders, Eye, RefreshCw, Download, SlidersHorizontal, Image } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/sound';

export const MiguelSection: React.FC = () => {
  const [subTab, setSubTab] = useState<'drone' | 'tinker' | 'camera'>('drone');

  // ==================== DRONE GAME STATE ====================
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [battery, setBattery] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('miguel_drone_highscore') || '0', 10);
  });

  const keys = useRef<{ left: boolean; right: boolean; up: boolean }>({
    left: false,
    right: false,
    up: false
  });

  useEffect(() => {
    if (!gameActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let localBattery = 100;
    let localScore = 0;

    const drone = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: 0,
      vy: 0,
      angle: 0,
      width: 44,
      height: 24,
      thrust: 0.28,
      gravity: 0.12,
      friction: 0.96,
    };

    interface Collectible {
      x: number;
      y: number;
      type: 'lens' | 'battery' | 'camera';
      radius: number;
      bob: number;
    }

    const items: Collectible[] = [];
    const spawnItem = () => {
      const types: ('lens' | 'battery' | 'camera')[] = ['lens', 'lens', 'camera', 'battery'];
      const chosenType = types[Math.floor(Math.random() * types.length)];
      items.push({
        x: 40 + Math.random() * (canvas.width - 80),
        y: 40 + Math.random() * (canvas.height - 100),
        type: chosenType,
        radius: 16,
        bob: Math.random() * Math.PI * 2,
      });
    };

    for (let i = 0; i < 4; i++) spawnItem();

    const clouds = [
      { x: 50, y: 70, speed: 0.4, r: 24 },
      { x: 220, y: 150, speed: -0.5, r: 30 },
      { x: 380, y: 90, speed: 0.3, r: 20 },
    ];

    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (keys.current.up) {
        drone.vy -= drone.thrust;
        drone.angle = Math.max(-0.25, Math.min(0.25, drone.angle));
        sounds.startDroneSound(1.3);
        localBattery = Math.max(0, localBattery - dt * 2.2);
      } else {
        sounds.startDroneSound(0.7);
      }

      if (keys.current.left) {
        drone.vx -= 0.2;
        drone.angle = -0.3;
      } else if (keys.current.right) {
        drone.vx += 0.2;
        drone.angle = 0.3;
      } else {
        drone.angle *= 0.9;
      }

      drone.vy += drone.gravity;
      drone.vx *= drone.friction;
      drone.vy *= drone.friction;
      drone.x += drone.vx;
      drone.y += drone.vy;

      if (drone.x < 24) { drone.x = 24; drone.vx *= -0.5; }
      if (drone.x > canvas.width - 24) { drone.x = canvas.width - 24; drone.vx *= -0.5; }
      if (drone.y < 24) { drone.y = 24; drone.vy = 0; }
      if (drone.y > canvas.height - 24) {
        drone.y = canvas.height - 24;
        drone.vy = -drone.vy * 0.4;
      }

      localBattery = Math.max(0, localBattery - dt * 0.8);
      setBattery(Math.round(localBattery));

      if (localBattery <= 0) {
        setGameOver(true);
        setGameActive(false);
        sounds.stopDroneSound();
        if (localScore > highScore) {
          setHighScore(localScore);
          localStorage.setItem('miguel_drone_highscore', String(localScore));
          confetti({ particleCount: 70, spread: 80 });
        }
        return;
      }

      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      ctx.fillStyle = 'rgba(148, 163, 184, 0.25)';
      clouds.forEach(c => {
        c.x += c.speed;
        if (c.x > canvas.width + 40) c.x = -40;
        if (c.x < -40) c.x = canvas.width + 40;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.arc(c.x + 15, c.y - 5, c.r * 0.8, 0, Math.PI * 2);
        ctx.arc(c.x - 15, c.y + 2, c.r * 0.7, 0, Math.PI * 2);
        ctx.fill();
      });

      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        item.bob += 0.05;
        const drawY = item.y + Math.sin(item.bob) * 4;

        const dist = Math.hypot(drone.x - item.x, drone.y - drawY);
        if (dist < item.radius + 18) {
          sounds.playBubblePop();
          if (item.type === 'battery') {
            localBattery = Math.min(100, localBattery + 30);
            localScore += 50;
          } else if (item.type === 'camera') {
            sounds.playCameraShutter();
            localScore += 150;
          } else {
            localScore += 100;
          }
          setScore(localScore);
          items.splice(i, 1);
          spawnItem();
          continue;
        }

        ctx.save();
        ctx.translate(item.x, drawY);
        if (item.type === 'battery') {
          ctx.fillStyle = '#22c55e';
          ctx.beginPath();
          ctx.arc(0, 0, 14, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = '14px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('⚡', 0, 0);
        } else if (item.type === 'camera') {
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath();
          ctx.arc(0, 0, 15, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = '15px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('📷', 0, 0);
        } else {
          ctx.fillStyle = '#06b6d4';
          ctx.beginPath();
          ctx.arc(0, 0, 14, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = '14px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('🔍', 0, 0);
        }
        ctx.restore();
      }

      ctx.save();
      ctx.translate(drone.x, drone.y);
      ctx.rotate(drone.angle);

      ctx.fillStyle = '#334155';
      ctx.fillRect(-14, -6, 28, 12);
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(-4, -4, 8, 8);

      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-18, -12);
      ctx.lineTo(18, 12);
      ctx.moveTo(-18, 12);
      ctx.lineTo(18, -12);
      ctx.stroke();

      const propTime = currentTime * 0.05;
      const propWidth = 14 * Math.abs(Math.sin(propTime));
      ctx.strokeStyle = keys.current.up ? '#22d3ee' : '#94a3b8';
      ctx.lineWidth = 2;

      [-18, 18].forEach(px => {
        [-12, 12].forEach(py => {
          ctx.beginPath();
          ctx.moveTo(px - propWidth, py);
          ctx.lineTo(px + propWidth, py);
          ctx.stroke();
        });
      });

      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(14, 0, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationId);
      sounds.stopDroneSound();
    };
  }, [gameActive]);

  const startGame = () => {
    sounds.playDing();
    setScore(0);
    setBattery(100);
    setGameOver(false);
    setGameActive(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'KeyW', 'Space'].includes(e.code)) keys.current.up = true;
      if (['ArrowLeft', 'KeyA'].includes(e.code)) keys.current.left = true;
      if (['ArrowRight', 'KeyD'].includes(e.code)) keys.current.right = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (['ArrowUp', 'KeyW', 'Space'].includes(e.code)) keys.current.up = false;
      if (['ArrowLeft', 'KeyA'].includes(e.code)) keys.current.left = false;
      if (['ArrowRight', 'KeyD'].includes(e.code)) keys.current.right = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // ==================== TINKER / INVENTIONS GENERATOR ====================
  const componentsList = [
    'ESP32 con Antena WiFi de Alta Ganancia',
    'Chasis de Dron 5 Pulgadas de Fibra de Carbono',
    'Cámara Sony con Sensor Full Frame',
    'Sensor LiDAR de Detección 360°',
    'Batería LiPo 6S de 1800mAh',
    'Brazo Servomotor de Alta Precisión',
    'Microcontrolador Raspberry Pi 5 con IA Local',
    'Gafas FPV Digitales de Baja Latencia'
  ];

  const targetList = [
    'Vigilar si Noel (1 año) ha tirado el chupete fuera de la cuna y avisar por Telegram',
    'Llevarle a Leti el labial o un café caliente volando directamente al salón',
    'Jugar con Nico (3 años) a esquivar láseres inofensivos de juguete en el pasillo',
    'Hacer un timelapse automático en 4K mientras Miguel cacharrea en su mesa de trabajo',
    'Detectar en tiempo real a qué amigo le queda menos de un 10% de cerveza en el vaso'
  ];

  const [tinkerIdea, setTinkerIdea] = useState({
    title: 'Dron Biberón-Express con Sensor Térmico',
    components: ['ESP32 con WiFi', 'Chasis de Dron Fibra Carbono', 'Cámara Térmica'],
    purpose: 'Enfría el biberón de Noel mientras sobrevuela la mesa y mide la temperatura exacta para que no queme.',
    status: 'Listo para soldar con estaño'
  });

  const generateInvention = () => {
    sounds.playSparkle();
    const c1 = componentsList[Math.floor(Math.random() * componentsList.length)];
    let c2 = componentsList[Math.floor(Math.random() * componentsList.length)];
    while (c2 === c1) c2 = componentsList[Math.floor(Math.random() * componentsList.length)];
    const purp = targetList[Math.floor(Math.random() * targetList.length)];

    const titles = [
      'Giga-Cacharro Cuadricóptero v4.2',
      'Estación Base Anti-Caos Doméstico',
      'Dron Centinela de Juguetes Perdidos',
      'Cámara Robótica Asistente de Salón',
      'Prototipo Secreto con Firmware Custom'
    ];

    setTinkerIdea({
      title: titles[Math.floor(Math.random() * titles.length)],
      components: [c1, c2],
      purpose: purp,
      status: 'Aprobado por el Ministerio de Cacharrear'
    });

    confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
  };

  // ==================== CAMERA VIEWFINDER & FILM SIMULATIONS ====================
  const [aperture, setAperture] = useState('f/1.4');
  const [iso, setIso] = useState('400');
  const [shutter, setShutter] = useState('1/500s');
  const [filmSim, setFilmSim] = useState<'standard' | 'leica' | 'fuji' | 'cinestill' | 'vintage'>('fuji');

  const filmSimulations = [
    { id: 'standard', name: 'Color Natural (Standard)', filterCss: 'none', desc: 'Fiel a la realidad' },
    { id: 'leica', name: 'Leica Monochrom B&W', filterCss: 'grayscale(100%) contrast(140%) brightness(95%)', desc: 'Blanco y negro dramático' },
    { id: 'fuji', name: 'Fuji Classic Chrome', filterCss: 'sepia(15%) saturate(85%) contrast(110%)', desc: 'Tonos suaves de documental' },
    { id: 'cinestill', name: 'CineStill 800T (Cine)', filterCss: 'hue-rotate(-15deg) contrast(120%) saturate(125%)', desc: 'Estética cinematográfica' },
    { id: 'vintage', name: 'Vintage 35mm Warmth', filterCss: 'sepia(35%) contrast(105%) brightness(105%) saturate(120%)', desc: 'Calidez nostálgica' },
  ];

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [lastPhoto, setLastPhoto] = useState<string | null>(null);

  const startCameraStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch (err) {
      alert('Para usar el visor con tu cámara real, concede permiso a la cámara.');
    }
  };

  const stopCameraStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const snapPhoto = () => {
    sounds.playCameraShutter();
    const currentSim = filmSimulations.find(f => f.id === filmSim);

    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (currentSim && currentSim.filterCss !== 'none') {
      ctx.filter = currentSim.filterCss;
    }

    if (videoRef.current && cameraActive) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    } else {
      // Create a photographic test pattern for Miguel
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(40, 40, canvas.width - 80, canvas.height - 80);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 50px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('MIGUEL OPTICS & LAB', canvas.width / 2, canvas.height / 2 - 20);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '28px sans-serif';
      ctx.fillText(`Simulación: ${currentSim?.name}`, canvas.width / 2, canvas.height / 2 + 35);
    }

    // Reset filter for watermark text
    ctx.filter = 'none';
    ctx.fillStyle = '#06b6d4';
    ctx.font = 'bold 22px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`MIGUEL LAB • ${aperture} • ${shutter} • ISO ${iso} • [${currentSim?.name}]`, 40, canvas.height - 40);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    setLastPhoto(dataUrl);

    // Auto download prompt
    const link = document.createElement('a');
    link.download = `miguel-photo-${filmSim}.jpg`;
    link.href = dataUrl;
    link.click();

    confetti({ particleCount: 50, spread: 70 });
  };

  const currentSimConfig = filmSimulations.find(f => f.id === filmSim) || filmSimulations[0];

  return (
    <div className="space-y-6">
      {/* Hero Banner Miguel */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-cyan-950/70 via-blue-950/50 to-slate-900 border border-cyan-500/30 shadow-xl shadow-cyan-500/10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-2">
              <Zap size={14} className="text-cyan-400" /> El Laboratorio de Miguel • Tech, Drones & Optics
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
              Cacharrero Mayor & Piloto FPV
            </h2>
            <p className="text-sm text-cyan-200/80 max-w-xl mt-1">
              Pilota el dron de carreras, inventa gadgets imposibles y captura fotos con recetas de simulación de película.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => { sounds.playDing(); setSubTab('drone'); }}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                subTab === 'drone'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                  : 'bg-slate-800/80 text-cyan-200 hover:bg-slate-800'
              }`}
            >
              🛸 Dron Arcade
            </button>
            <button
              onClick={() => { sounds.playDing(); setSubTab('tinker'); }}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                subTab === 'tinker'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                  : 'bg-slate-800/80 text-cyan-200 hover:bg-slate-800'
              }`}
            >
              ⚡ Cacharrómetro
            </button>
            <button
              onClick={() => { sounds.playDing(); setSubTab('camera'); }}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                subTab === 'camera'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                  : 'bg-slate-800/80 text-cyan-200 hover:bg-slate-800'
              }`}
            >
              📷 Visor Réflex
            </button>
          </div>
        </div>
      </div>

      {/* SUBTAB 1: DRONE FLIGHT ARCADE */}
      {subTab === 'drone' && (
        <div className="bg-slate-900/95 rounded-3xl p-5 sm:p-7 border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>🛸</span> Simulador Dron FPV de Miguel
              </h3>
              <p className="text-xs text-slate-400">
                Usa los botones táctiles o las flechas del teclado (Arriba = Gas/Empuje, Izq/Der = Rotar)
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 text-right">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Puntos</div>
                <div className="text-base font-extrabold text-cyan-400">{score}</div>
              </div>

              <div className="bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 text-right">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Batería LiPo</div>
                <div className={`text-base font-extrabold ${battery < 25 ? 'text-rose-500 animate-pulse' : 'text-emerald-400'}`}>
                  {battery}%
                </div>
              </div>

              <div className="bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 text-right">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Récord</div>
                <div className="text-base font-extrabold text-amber-400">{highScore}</div>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-950 flex justify-center items-center">
            <canvas
              ref={canvasRef}
              width={640}
              height={360}
              className="w-full max-w-[640px] aspect-video object-contain"
            />

            {!gameActive && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-20">
                {gameOver ? (
                  <div className="space-y-3">
                    <div className="text-4xl">🪫</div>
                    <h4 className="text-xl font-black text-rose-400 font-display">¡BATERÍA AGOTADA!</h4>
                    <p className="text-sm text-slate-300">Has conseguido <span className="font-bold text-cyan-300">{score} puntos</span> recogiendo lentes y baterías.</p>
                    <button
                      onClick={startGame}
                      className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-lg shadow-cyan-500/30 hover:scale-105 transition-all flex items-center gap-2 mx-auto"
                    >
                      <RotateCcw size={16} /> Volar de nuevo
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 max-w-md">
                    <div className="text-5xl animate-bounce-slow">🛸</div>
                    <h4 className="text-2xl font-black text-white font-display">Vuelo de Reconocimiento</h4>
                    <p className="text-xs text-slate-300">
                      Recoge objetivos fotográficos (📷 +150 pts), lentes (🔍 +100 pts) y baterías LiPo (⚡ recarga 30%). ¡No dejes que se agote la energía!
                    </p>
                    <button
                      onClick={startGame}
                      className="px-8 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-sm shadow-xl shadow-cyan-500/30 hover:scale-105 transition-all flex items-center gap-2 mx-auto"
                    >
                      <Play size={18} /> Iniciar Vuelo FPV
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-3 select-none touch-tap">
            <div className="flex gap-2">
              <button
                onPointerDown={() => { keys.current.left = true; }}
                onPointerUp={() => { keys.current.left = false; }}
                onPointerLeave={() => { keys.current.left = false; }}
                className="w-16 h-14 rounded-2xl bg-slate-800 active:bg-cyan-600 text-white font-bold text-lg flex items-center justify-center border border-slate-700 shadow-md"
              >
                ◀
              </button>
              <button
                onPointerDown={() => { keys.current.right = true; }}
                onPointerUp={() => { keys.current.right = false; }}
                onPointerLeave={() => { keys.current.right = false; }}
                className="w-16 h-14 rounded-2xl bg-slate-800 active:bg-cyan-600 text-white font-bold text-lg flex items-center justify-center border border-slate-700 shadow-md"
              >
                ▶
              </button>
            </div>

            <button
              onPointerDown={() => { keys.current.up = true; }}
              onPointerUp={() => { keys.current.up = false; }}
              onPointerLeave={() => { keys.current.up = false; }}
              className="flex-1 max-w-[200px] h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 active:from-cyan-400 active:to-blue-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <span>🚀 GAS / EMPUJE</span>
            </button>
          </div>
        </div>
      )}

      {/* SUBTAB 2: TINKER GENERATOR */}
      {subTab === 'tinker' && (
        <div className="bg-slate-900/95 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Cpu className="text-cyan-400" size={22} />
                Generador de Cacharrear & Prototipos DIY
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                La IA combina los componentes del cajón desastre de Miguel para solucionar los problemas del hogar
              </p>
            </div>

            <button
              onClick={generateInvention}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold shadow-lg shadow-cyan-500/30 hover:scale-105 transition-all flex items-center gap-1.5 self-start"
            >
              <RefreshCw size={14} /> ⚡ Mezclar Componentes
            </button>
          </div>

          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 p-6 rounded-3xl border border-cyan-500/30 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                PROYECTO MIGUEL LAB #{Math.floor(Math.random() * 800) + 100}
              </span>
              <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> {tinkerIdea.status}
              </span>
            </div>

            <h4 className="text-2xl font-black text-white font-display">
              {tinkerIdea.title}
            </h4>

            <div>
              <div className="text-xs text-slate-400 uppercase font-semibold mb-2">BOM (Lista de Materiales):</div>
              <div className="flex flex-wrap gap-2">
                {tinkerIdea.components.map((comp, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-medium text-cyan-200 flex items-center gap-1.5">
                    <span>🔌</span> {comp}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 space-y-1">
              <div className="text-xs text-cyan-300 font-bold uppercase tracking-wider">Misión Doméstica:</div>
              <p className="text-sm text-slate-200">{tinkerIdea.purpose}</p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => {
                  sounds.playVictory();
                  alert('¡Enlace simulado enviado a AliExpress y Amazon! Miguel ya tiene 12 carritos pendientes.');
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-all flex items-center gap-1.5"
              >
                🛒 Añadir al carrito de AliExpress
              </button>
              <button
                onClick={() => {
                  sounds.playSparkle();
                  alert('Leti ha visto el presupuesto del invento: "¿Miguel, otra placa base más?" 😂');
                }}
                className="px-4 py-2 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 text-xs font-semibold text-pink-300 transition-all flex items-center gap-1.5"
              >
                💬 Pedir aprobación presupuestaria a Leti
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: CAMERA VIEWFINDER & FILM SIMULATIONS */}
      {subTab === 'camera' && (
        <div className="bg-slate-900/95 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Camera className="text-cyan-400" size={22} />
                Visor Réflex & Recetas de Simulación de Película
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Ajusta parámetros profesionales y aplica perfiles fotográficos (Leica, Fuji Classic Chrome, CineStill)
              </p>
            </div>

            <div className="flex gap-2">
              {!cameraActive ? (
                <button
                  onClick={startCameraStream}
                  className="px-4 py-2 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold hover:bg-cyan-500/30 transition-all flex items-center gap-1.5"
                >
                  <Eye size={15} /> Activar Cámara Real
                </button>
              ) : (
                <button
                  onClick={stopCameraStream}
                  className="px-4 py-2 rounded-2xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold hover:bg-rose-500/30 transition-all"
                >
                  Detener Cámara
                </button>
              )}
            </div>
          </div>

          {/* Film simulation selector pills */}
          <div className="space-y-2">
            <div className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">
              Receta de Color / Simulación:
            </div>
            <div className="flex flex-wrap gap-2">
              {filmSimulations.map((sim) => (
                <button
                  key={sim.id}
                  onClick={() => { sounds.playDing(); setFilmSim(sim.id as any); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    filmSim === sim.id
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 scale-105'
                      : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-600'
                  }`}
                >
                  {sim.name}
                </button>
              ))}
            </div>
          </div>

          {/* Camera Viewfinder Frame */}
          <div className="relative rounded-3xl overflow-hidden bg-black border-2 border-slate-700 aspect-video flex items-center justify-center max-w-2xl mx-auto shadow-2xl">
            {cameraActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{ filter: currentSimConfig.filterCss }}
                className="w-full h-full object-cover transition-all duration-300"
              />
            ) : (
              <div
                style={{ filter: currentSimConfig.filterCss }}
                className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-2 bg-slate-950 transition-all duration-300"
              >
                <div className="text-6xl text-slate-600">📷</div>
                <div className="text-sm font-semibold text-slate-300">Modo Visor Réflex • {currentSimConfig.name}</div>
                <div className="text-xs text-slate-500">Pulsa 'Activar Cámara Real' o haz un disparo de prueba</div>
              </div>
            )}

            {/* Viewfinder Overlays (Rule of thirds grid + HUD) */}
            <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
              <div className="flex justify-between items-center text-[11px] font-mono font-bold text-cyan-400 bg-black/60 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-cyan-500/30 max-w-fit mx-auto shadow-sm">
                <span className="mr-3 text-emerald-400">AF-C [99 PTS]</span>
                <span className="mr-3 text-white">{aperture}</span>
                <span className="mr-3 text-white">{shutter}</span>
                <span className="mr-3 text-amber-300">ISO {iso}</span>
                <span className="text-cyan-300">[{filmSim.toUpperCase()}]</span>
              </div>

              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-20">
                <div className="border-r border-b border-white"></div>
                <div className="border-r border-b border-white"></div>
                <div className="border-b border-white"></div>
                <div className="border-r border-b border-white"></div>
                <div className="border-r border-b border-white flex items-center justify-center">
                  <div className="w-8 h-8 border border-cyan-400 rounded-sm"></div>
                </div>
                <div className="border-b border-white"></div>
                <div className="border-r border-white"></div>
                <div className="border-r border-white"></div>
                <div></div>
              </div>

              <div className="flex justify-between items-end text-[10px] font-mono text-slate-400">
                <span>SENSOR FULL-FRAME • 4K 60P</span>
                <span className="text-rose-400 font-bold">● STANDBY READY</span>
              </div>
            </div>

            {/* Shutter button */}
            <button
              onClick={snapPhoto}
              className="absolute bottom-5 right-5 pointer-events-auto w-14 h-14 rounded-full bg-white/95 hover:bg-white active:scale-95 transition-all shadow-2xl flex items-center justify-center border-4 border-slate-900 group"
              title="Disparar foto con filtro aplicado"
            >
              <div className="w-10 h-10 rounded-full bg-slate-900 group-hover:scale-90 transition-transform"></div>
            </button>
          </div>

          {/* Controls Bar for Lens Parameters */}
          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
            <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Apertura</div>
              <select
                value={aperture}
                onChange={(e) => { sounds.playDing(); setAperture(e.target.value); }}
                className="bg-transparent text-sm font-bold text-cyan-300 w-full text-center mt-1 outline-hidden"
              >
                <option value="f/1.2" className="bg-slate-900">f/1.2 (Bokeh Total)</option>
                <option value="f/1.4" className="bg-slate-900">f/1.4 (Retrato Leti)</option>
                <option value="f/2.8" className="bg-slate-900">f/2.8 (Objetivo Zoom)</option>
                <option value="f/8.0" className="bg-slate-900">f/8.0 (Paisaje Dron)</option>
              </select>
            </div>

            <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Velocidad</div>
              <select
                value={shutter}
                onChange={(e) => { sounds.playDing(); setShutter(e.target.value); }}
                className="bg-transparent text-sm font-bold text-cyan-300 w-full text-center mt-1 outline-hidden"
              >
                <option value="1/1000s" className="bg-slate-900">1/1000s (Congela a Nico)</option>
                <option value="1/500s" className="bg-slate-900">1/500s (Dron)</option>
                <option value="1/125s" className="bg-slate-900">1/125s (Estándar)</option>
                <option value="1/30s" className="bg-slate-900">1/30s (Noche)</option>
              </select>
            </div>

            <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Sensibilidad</div>
              <select
                value={iso}
                onChange={(e) => { sounds.playDing(); setIso(e.target.value); }}
                className="bg-transparent text-sm font-bold text-cyan-300 w-full text-center mt-1 outline-hidden"
              >
                <option value="100" className="bg-slate-900">ISO 100 (Luz día)</option>
                <option value="400" className="bg-slate-900">ISO 400 (Salón)</option>
                <option value="1600" className="bg-slate-900">ISO 1600 (Atardecer)</option>
                <option value="6400" className="bg-slate-900">ISO 6400 (Cacharrear de noche)</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
