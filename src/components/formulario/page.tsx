'use client';
import { useState } from 'react';

export function Formulario() {
  const [usuario, setUsuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [resultado, setResultado] = useState<{ usuario: string; nombre: string; edad: string } | null>(null);

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    setResultado({ usuario: usuario.toUpperCase(), nombre: nombre.toUpperCase(), edad });
  };

  return (
    <section className="max-w-md mx-auto p-4 rounded-xl shadow bg-white">
      <h2 className="text-base font-semibold mb-3">Reto #3: Formulario Completo</h2>

      <form onSubmit={manejarEnvio} className="flex flex-col gap-2 text-sm">
        <label>
          <span className="font-medium">Usuario:</span>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </label>

        <label>
          <span className="font-medium">Nombre completo:</span>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </label>

        <label>
          <span className="font-medium">Edad:</span>
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </label>

        <button type="submit" className="mt-2 px-4 py-1 rounded bg-black text-white w-fit">
          Enviar
        </button>
      </form>

      {resultado && (
        <ul className="mt-4 list-disc pl-5 text-sm">
          <li>Usuario: {resultado.usuario}</li>
          <li>Nombre completo: {resultado.nombre}</li>
          <li>Edad: {resultado.edad}</li>
        </ul>
      )}
    </section>
  );
}
