'use client';
import { useMemo, useState } from 'react';


const mini = 0;
const maxi = 100;
const limitar = (v: number) => Math.min(maxi, Math.max(mini, v));

export function BarraProgreso() {
  const [porcentaje, setPorcentaje] = useState(25);
  const [valorEntrada, setValorEntrada] = useState('25');
  const [mensajeError, setMensajeError] = useState('');
  const etiquetaProgreso = useMemo(() => `${porcentaje}%`, [porcentaje]);

  const manejarCambio = (valor: string) => {
    setValorEntrada(valor);
    if (valor.trim() === '') { setMensajeError('Ingresa un número entre 0 y 100.'); return; }
    const num = Number(valor);
    if (Number.isNaN(num)) { setMensajeError('Solo se permiten números.'); return; }
    if (num < mini || num > maxi) { setMensajeError('El porcentaje debe estar entre 0 y 100.'); return; }
    setMensajeError('');
    setPorcentaje(limitar(Math.round(num)));
  };

  return (
    <section className="max-w-md mx-auto p-4 rounded-xl shadow bg-white">
      <header className="flex items-center justify-between">
        <h2 className="text-base font-semibold">RETO #2: Barra de progreso</h2>
      </header>

      <div className="mt-4 space-y-3">
        <div className="w-full h-3 bg-neutral-200 rounded-full overflow-hidden" aria-hidden>
          <div
            style={{ width: `${porcentaje}%`, backgroundColor: 'red', height: '100%', transition: 'width 0.2s ease' }}
            role="presentation"
          />
        </div>
        <p className="text-xs text-neutral-600">Progreso: {etiquetaProgreso}</p>

        <input
          className="w-full border rounded px-3 py-2 focus:outline-none"
          inputMode="numeric"
          min={mini}
          max={maxi}
          type="number"
          value={valorEntrada}
          onChange={(e) => manejarCambio(e.target.value)}
          aria-label="Porcentaje"
        />

        {mensajeError
          ? <p className="text-sm font-medium text-rose-600" role="alert">{mensajeError}</p>
          : <p className="text-sm text-neutral-600" role="status">Valor válido</p>}
      </div>
    </section>
  );
}
