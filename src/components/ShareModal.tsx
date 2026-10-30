import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import { X, Copy, Check, Smartphone, Share2, Sparkles } from 'lucide-react';
import { sounds } from '../utils/sound';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = window.location.href;
      setCurrentUrl(url);
      QRCode.toDataURL(url, {
        width: 320,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
      }).then(setQrDataUrl).catch(console.error);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = () => {
    sounds.playBubblePop();
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-5 text-center">
        {/* Close Button */}
        <button
          onClick={() => { sounds.playDing(); onClose(); }}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-all"
        >
          <X size={18} />
        </button>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-2">
            <Smartphone size={13} /> Abrir en el Móvil
          </div>
          <h3 className="text-xl font-black text-white font-display">
            Escanear para Jugar
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Apunta con la cámara del móvil de Leti o Miguel para abrir la app al instante
          </p>
        </div>

        {/* QR Code Container */}
        <div className="bg-white p-4 rounded-2xl shadow-xl max-w-[240px] mx-auto border-4 border-slate-800">
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="QR Code" className="w-full aspect-square" />
          ) : (
            <div className="w-48 h-48 flex items-center justify-center text-slate-400 text-xs">
              Generando QR...
            </div>
          )}
        </div>

        {/* URL box + copy */}
        <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-2xl border border-slate-800">
          <input
            type="text"
            readOnly
            value={currentUrl}
            className="bg-transparent text-xs text-slate-300 px-2 flex-1 outline-hidden truncate"
          />
          <button
            onClick={handleCopy}
            className="px-3 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-all"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'Copiado' : 'Copiar'}</span>
          </button>
        </div>

        {/* PWA Install tip */}
        <div className="bg-slate-800/60 p-3.5 rounded-2xl text-left border border-slate-700/60 space-y-1 text-xs text-slate-300">
          <div className="font-bold text-pink-300 flex items-center gap-1.5">
            <Sparkles size={14} /> Cómo guardarla como App Nativa:
          </div>
          <p className="text-[11px] text-slate-400">
            • En iPhone (Safari): Pulsa el botón "Compartir" y luego "Añadir a pantalla de inicio".
          </p>
          <p className="text-[11px] text-slate-400">
            • En Android (Chrome): Pulsa los 3 puntos y "Instalar aplicación" o "Añadir a pantalla de inicio".
          </p>
        </div>
      </div>
    </div>
  );
};
