'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const formatearTiempo = (totalSegundos: number) => {
  const minutos = Math.floor(totalSegundos / 60);
  const segundos = totalSegundos % 60;
  return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
};

export function Timer() {
  const [segundos, setSegundos] = useState(0);
  const [enMarcha, setEnMarcha] = useState(false);
  const referenciaIntervalo = useRef<ReturnType<typeof setInterval> | null>(null);

  const tiempoFormateado = useMemo(() => formatearTiempo(segundos), [segundos]);

  const limpiarTimer = () => {
    if (referenciaIntervalo.current) {
      clearInterval(referenciaIntervalo.current);
      referenciaIntervalo.current = null;
    }
  };

  const iniciar = useCallback(() => {
    if (enMarcha) return;
    setEnMarcha(true);
    referenciaIntervalo.current = setInterval(() => {
      setSegundos((prev) => prev + 1);
    }, 1000);
  }, [enMarcha]);

  const pausar = useCallback(() => {
    setEnMarcha(false);
    limpiarTimer();
  }, []);

  const reiniciar = useCallback(() => {
    setSegundos(0);
    setEnMarcha(false);
    limpiarTimer();
  }, []);

  useEffect(() => limpiarTimer, []);

  return (
    <section className="max-w-md mx-auto p-4 rounded-xl shadow bg-white text-center">
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold">Reto #4: Minutero Interactivo</h2>
      </header>

      <div className="mb-4">
        <p className="text-3xl font-mono">{tiempoFormateado}</p>
        <span className="text-sm text-neutral-500">min : seg</span>
      </div>

      <div className="flex justify-center gap-3">
        <button onClick={iniciar} className="px-3 py-1 squared bg-green-500 text-white">Iniciar</button>
        <button onClick={pausar} className="px-3 py-1 squared bg-yellow-500 text-white">Pausar</button>
        <button onClick={reiniciar} className="px-3 py-1 squared bg-red-500 text-white">Reiniciar</button>
      </div>
    </section>
  );
}
