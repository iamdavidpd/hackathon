'use client';
import { useState } from 'react';

export function Generador() {
  const [longitud, setLongitud] = useState(12);
  const [uMinus, setUMinus] = useState(true);
  const [uMayus, setUMayus] = useState(true);
  const [uNums, setUNums] = useState(true);
  const [uSimbs, setUSimbs] = useState(false);
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const generarPassword = () => {
    const minus = 'abcdefghijklmnopqrstuvwxyz';
    const mayus = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const simbs = '!@#$%^&*()-_=+[]{};:,.?';

    let base = '';
    if (uMinus) base += minus;
    if (uMayus) base += mayus;
    if (uNums) base += nums;
    if (uSimbs) base += simbs;

    if (!base) {
      setMensaje('Selecciona al menos un tipo de carácter.');
      setPassword('');
      return;
    }

    let result = '';
    for (let i = 0; i < longitud; i++) {
      const rand = Math.floor(Math.random() * base.length);
      result += base[rand];
    }

    setPassword(result);
    setMensaje('');
  };

  const copiar = async () => {
    if (!password) return setMensaje('No hay contraseña para copiar.');
    try {
      await navigator.clipboard.writeText(password);
      setMensaje('Copiada al portapapeles.');
    } catch {
      setMensaje('No se pudo copiar.');
    }
  };

  return (
    <section className="max-w-md mx-auto p-4 rounded-xl shadow bg-white text-sm">
      <h2 className="text-base font-semibold mb-3">RETO #5: Generador de contraseñas</h2>

      <div className="mb-3 flex items-center gap-2">
        <input
          className="w-full border rounded px-2 py-1"
          value={password}
          readOnly
          aria-label="Contraseña generada"
        />
        <button onClick={copiar} className="border px-3 py-1 rounded">
          Copiar
        </button>
      </div>

      <div className="space-y-2 mb-4">
        <label className="flex items-center gap-2">
          <span>Longitud:</span>
          <input
            type="number"
            min={4}
            max={40}
            value={longitud}
            onChange={(e) => setLongitud(Number(e.target.value))}
            className="w-20 border rounded px-2 py-1 text-right"
          />
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={uMinus} onChange={() => setUMinus(!uMinus)} />
          <span>Minúsculas</span>
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={uMayus} onChange={() => setUMayus(!uMayus)} />
          <span>Mayúsculas</span>
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={uNums} onChange={() => setUNums(!uNums)} />
          <span>Números</span>
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={uSimbs} onChange={() => setUSimbs(!uSimbs)} />
          <span>Símbolos</span>
        </label>
      </div>

      <button onClick={generarPassword} className="border px-4 py-2 rounded font-semibold">
        Generar
      </button>

      {mensaje && <p className="mt-3 text-xs text-neutral-700">{mensaje}</p>}
    </section>
  );
}
