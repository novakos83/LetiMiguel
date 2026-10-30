import React, { useState } from 'react';
import { Heart, Sparkles, Trophy, RotateCcw, ThumbsUp, Users, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/sound';

interface Question {
  id: number;
  question: string;
  context: string;
  letiEmoji: string;
  miguelEmoji: string;
}

export const CoupleQuizSection: React.FC = () => {
  const questions: Question[] = [
    {
      id: 1,
      question: '¿Quién es más probable que compre algo en el móvil a las 2:00 AM?',
      context: '¿Leti con un vestido rebajado o Miguel con un sensor para el dron?',
      letiEmoji: '👗',
      miguelEmoji: '📦',
    },
    {
      id: 2,
      question: '¿Quién tarda más en estar listo cuando hay que salir corriendo con Nico y Noel?',
      context: 'El debate eterno antes de cruzar la puerta de casa',
      letiEmoji: '💄',
      miguelEmoji: '🔋',
    },
    {
      id: 3,
      question: '¿Quién tiene más paciencia montando muebles de Ikea o desenredando cables?',
      context: 'Tornillos sobrantes vs llaves Allen de precisión',
      letiEmoji: '📐',
      miguelEmoji: '🛠️',
    },
    {
      id: 4,
      question: '¿Quién se compraría un gadget carísimo con la excusa de "es para hacer recuerdos de los niños"?',
      context: 'Cámara 4K, lente 50mm f/1.2 o dron FPV estabilizado',
      letiEmoji: '📱',
      miguelEmoji: '📷',
    },
    {
      id: 5,
      question: '¿Quién se levanta más rápido como un resorte si Noel llora por la noche?',
      context: 'El superpoder de padres ninja en la madrugada',
      letiEmoji: '🤱',
      miguelEmoji: '🍼',
    },
    {
      id: 6,
      question: '¿Quién tiene mejor ojo para la decoración y estética de la casa?',
      context: 'Guerra entre minimalismo chic o poner estanterías llenas de cacharros',
      letiEmoji: '✨',
      miguelEmoji: '🤖',
    },
    {
      id: 7,
      question: '¿Quién pierde más a menudo las llaves de casa o el mando de la tele?',
      context: 'El misterio de los objetos desaparecidos en el sofá',
      letiEmoji: '👜',
      miguelEmoji: '🔍',
    },
    {
      id: 8,
      question: '¿Quién es el anfitrión más detallista cuando vienen amigos de visita?',
      context: '¡Como la visita que tenéis en casa hoy!',
      letiEmoji: '🥂',
      miguelEmoji: '🍕',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [votes, setVotes] = useState<{ [key: number]: { letiVote?: string; miguelVote?: string } }>({});
  const [revealed, setRevealed] = useState(false);
  const [agreementCount, setAgreementCount] = useState(0);

  const currentQ = questions[currentIndex];

  const handleVote = (voter: 'leti' | 'miguel', choice: 'leti' | 'miguel') => {
    sounds.playBubblePop();
    setVotes((prev) => {
      const current = prev[currentQ.id] || {};
      const updated = voter === 'leti' ? { ...current, letiVote: choice } : { ...current, miguelVote: choice };
      return { ...prev, [currentQ.id]: updated };
    });
  };

  const currentVote = votes[currentQ.id] || {};
  const bothVoted = Boolean(currentVote.letiVote && currentVote.miguelVote);

  const handleReveal = () => {
    sounds.playSparkle();
    setRevealed(true);
    if (currentVote.letiVote === currentVote.miguelVote) {
      sounds.playVictory();
      setAgreementCount((c) => c + 1);
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#ec4899', '#06b6d4', '#eab308'],
      });
    }
  };

  const handleNext = () => {
    sounds.playDing();
    setRevealed(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      // Completed!
      sounds.playVictory();
      confetti({ particleCount: 120, spread: 100 });
      setCurrentIndex(questions.length); // trigger end screen
    }
  };

  const handleReset = () => {
    sounds.playDing();
    setCurrentIndex(0);
    setVotes({});
    setRevealed(false);
    setAgreementCount(0);
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner Quiz */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-purple-950/70 via-indigo-950/50 to-slate-900 border border-purple-500/30 shadow-xl shadow-purple-500/10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-2">
              <Users size={14} className="text-purple-400" /> Duelo Divertido en el Salón
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
              ¿Quién es quién? • Leti vs Miguel
            </h2>
            <p className="text-sm text-purple-200/80 max-w-xl mt-1">
              Pon el móvil en medio del salón. Cada uno vota en secreto quién de los dos encaja mejor con cada situación.
            </p>
          </div>

          <div className="bg-slate-900/80 px-4 py-2 rounded-2xl border border-purple-500/30 flex items-center gap-3">
            <span className="text-2xl">🥂</span>
            <div className="text-right">
              <div className="text-[10px] text-purple-300 uppercase font-bold">Afinidad de Pareja</div>
              <div className="text-lg font-black text-white">{agreementCount} Coincidencias</div>
            </div>
          </div>
        </div>
      </div>

      {/* QUIZ INTERACTIVE CARD */}
      {currentIndex < questions.length ? (
        <div className="bg-slate-900/95 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
          {/* Progress bar */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-purple-400">Pregunta {currentIndex + 1} de {questions.length}</span>
            <div className="w-32 sm:w-48 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Text */}
          <div className="text-center py-4 space-y-2">
            <h3 className="text-xl sm:text-3xl font-extrabold text-white font-display leading-tight max-w-2xl mx-auto">
              “{currentQ.question}”
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 italic">
              {currentQ.context}
            </p>
          </div>

          {/* Voting Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* LETI VOTE COLUMN */}
            <div className="bg-pink-950/20 border-2 border-pink-500/30 rounded-3xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💖</span>
                  <span className="font-extrabold text-white text-base">Voto de Leti</span>
                </div>
                {currentVote.letiVote ? (
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    ¡Votado!
                  </span>
                ) : (
                  <span className="text-xs text-pink-300 animate-pulse">Esperando a Leti...</span>
                )}
              </div>

              {!revealed && (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleVote('leti', 'leti')}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      currentVote.letiVote === 'leti'
                        ? 'bg-pink-500 text-white font-extrabold border-pink-400 shadow-md'
                        : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700'
                    }`}
                  >
                    <div className="text-2xl mb-1">{currentQ.letiEmoji}</div>
                    <div className="text-xs font-bold">¡Soy Yo (Leti)!</div>
                  </button>

                  <button
                    onClick={() => handleVote('leti', 'miguel')}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      currentVote.letiVote === 'miguel'
                        ? 'bg-cyan-500 text-slate-950 font-extrabold border-cyan-400 shadow-md'
                        : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700'
                    }`}
                  >
                    <div className="text-2xl mb-1">{currentQ.miguelEmoji}</div>
                    <div className="text-xs font-bold">¡Es Miguel!</div>
                  </button>
                </div>
              )}
            </div>

            {/* MIGUEL VOTE COLUMN */}
            <div className="bg-cyan-950/20 border-2 border-cyan-500/30 rounded-3xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🛸</span>
                  <span className="font-extrabold text-white text-base">Voto de Miguel</span>
                </div>
                {currentVote.miguelVote ? (
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    ¡Votado!
                  </span>
                ) : (
                  <span className="text-xs text-cyan-300 animate-pulse">Esperando a Miguel...</span>
                )}
              </div>

              {!revealed && (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleVote('miguel', 'leti')}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      currentVote.miguelVote === 'leti'
                        ? 'bg-pink-500 text-white font-extrabold border-pink-400 shadow-md'
                        : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700'
                    }`}
                  >
                    <div className="text-2xl mb-1">{currentQ.letiEmoji}</div>
                    <div className="text-xs font-bold">¡Es Leti!</div>
                  </button>

                  <button
                    onClick={() => handleVote('miguel', 'miguel')}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      currentVote.miguelVote === 'miguel'
                        ? 'bg-cyan-500 text-slate-950 font-extrabold border-cyan-400 shadow-md'
                        : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700'
                    }`}
                  >
                    <div className="text-2xl mb-1">{currentQ.miguelEmoji}</div>
                    <div className="text-xs font-bold">¡Soy Yo (Miguel)!</div>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Reveal & Resolution Area */}
          <div className="pt-2 text-center">
            {!revealed ? (
              <button
                disabled={!bothVoted}
                onClick={handleReveal}
                className={`px-8 py-3.5 rounded-2xl text-sm font-extrabold shadow-xl transition-all ${
                  bothVoted
                    ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 text-white hover:scale-105 cursor-pointer shadow-purple-500/30 animate-pulse'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                {bothVoted ? '✨ ¡DESCUBRIR Veredicto de la Pareja!' : 'Ambos deben votar para revelar'}
              </button>
            ) : (
              <div className="space-y-4 animate-fade-in">
                <div className={`p-5 rounded-3xl border-2 ${
                  currentVote.letiVote === currentVote.miguelVote
                    ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                    : 'bg-amber-950/40 border-amber-500/60 text-amber-200'
                }`}>
                  <div className="text-4xl mb-2">
                    {currentVote.letiVote === currentVote.miguelVote ? '🎉 🥂 💖' : '😂 🤔 💥'}
                  </div>
                  <h4 className="text-xl font-black font-display">
                    {currentVote.letiVote === currentVote.miguelVote
                      ? `¡COINCIDENCIA TOTAL! Ambos han votado a ${currentVote.letiVote?.toUpperCase()}`
                      : `¡DISCREPANCIA CON RISAS! Leti votó a ${currentVote.letiVote?.toUpperCase()} y Miguel a ${currentVote.miguelVote?.toUpperCase()}`}
                  </h4>
                  <p className="text-xs mt-1 text-slate-300">
                    {currentVote.letiVote === currentVote.miguelVote
                      ? 'No hay dudas en esta casa: ¡sincronización absoluta de pareja!'
                      : '¡El invitado tiene que actuar de juez imparcial ahora mismo!'}
                  </p>
                </div>

                <button
                  onClick={handleNext}
                  className="px-8 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-sm shadow-xl shadow-purple-500/20 hover:scale-105 transition-all inline-flex items-center gap-2"
                >
                  <span>Siguiente Pregunta</span> <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* QUIZ SUMMARY SCREEN */
        <div className="bg-slate-900/95 rounded-3xl p-8 border border-purple-500/30 shadow-2xl text-center space-y-6">
          <div className="text-6xl animate-bounce-slow">🏆</div>
          <h3 className="text-3xl font-black text-white font-display">
            ¡Test de Salón Completado!
          </h3>
          <p className="text-slate-300 max-w-md mx-auto text-sm">
            Habéis coincidido en <span className="font-extrabold text-purple-400">{agreementCount} de {questions.length}</span> situaciones cotidianas con Nico y Noel.
          </p>

          <div className="bg-slate-800/60 p-4 rounded-2xl max-w-xs mx-auto border border-slate-700 text-center">
            <div className="text-xs text-slate-400 uppercase font-semibold">Diagnóstico del Amigo Visitante:</div>
            <div className="text-base font-bold text-pink-300 mt-1">
              {agreementCount >= 5 ? '¡Pareja 10/10 en perfecta armonía!' : '¡Mucho salseo y risas aseguradas en esta casa!'}
            </div>
          </div>

          <button
            onClick={handleReset}
            className="px-6 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition-all inline-flex items-center gap-2"
          >
            <RotateCcw size={15} /> Jugar otra ronda
          </button>
        </div>
      )}
    </div>
  );
};
