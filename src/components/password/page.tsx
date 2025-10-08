'use client';

import { useCallback, useMemo, useState } from 'react';

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()-_=+[]{};:,.?';

type GeneratorConfig = {
  length: number;
  lowercase: boolean;
  uppercase: boolean;
  numbers: boolean;
  symbols: boolean;
};

const MIN_LENGTH = 4;
const MAX_LENGTH = 40;

const getRandomInt = (max: number) => {
  if (max <= 0) return 0;

  if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
    const buffer = new Uint32Array(1);
    window.crypto.getRandomValues(buffer);
    return buffer[0] % max;
  }

  return Math.floor(Math.random() * max);
};

const shuffleChars = (chars: string[]) => {
  for (let index = chars.length - 1; index > 0; index -= 1) {
    const randomIndex = getRandomInt(index + 1);
    const temp = chars[index];
    chars[index] = chars[randomIndex];
    chars[randomIndex] = temp;
  }

  return chars;
};

const collectSets = (config: GeneratorConfig) => {
  const sets: string[] = [];
  if (config.lowercase) sets.push(LOWERCASE);
  if (config.uppercase) sets.push(UPPERCASE);
  if (config.numbers) sets.push(NUMBERS);
  if (config.symbols) sets.push(SYMBOLS);
  return sets;
};

const buildPassword = (config: GeneratorConfig) => {
  const sets = collectSets(config);

  if (sets.length === 0) {
    return '';
  }

  const available = sets.join('');
  const chars: string[] = [];

  sets.forEach((set) => {
    chars.push(set[getRandomInt(set.length)]);
  });

  while (chars.length < config.length) {
    chars.push(available[getRandomInt(available.length)]);
  }

  return shuffleChars(chars).join('').slice(0, config.length);
};

export function PasswordChallenge() {
  const [config, setConfig] = useState<GeneratorConfig>({
    length: 12,
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: false,
  });
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

  const activeSets = useMemo(() => collectSets(config).length, [config]);

  const handleLengthChange = (rawValue: string) => {
    const numeric = Number(rawValue);
    if (Number.isNaN(numeric)) return;
    const clamped = Math.max(MIN_LENGTH, Math.min(MAX_LENGTH, numeric));
    setConfig((prev) => ({ ...prev, length: clamped }));
  };

  const handleToggle = (field: keyof GeneratorConfig) => {
    setConfig((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleGenerate = useCallback(() => {
    if (activeSets === 0) {
      setPassword('');
      setError('Elige al menos una opcion de caracteres.');
      return;
    }

    setError('');
    setCopyMessage('');
    setPassword(buildPassword(config));
  }, [activeSets, config]);

  const handleCopy = useCallback(async () => {
    if (!password) {
      setCopyMessage('No hay contrasena para copiar.');
      return;
    }

    try {
      await navigator.clipboard.writeText(password);
      setCopyMessage('Copiada al portapapeles.');
    } catch {
      setCopyMessage('No se pudo copiar.');
    }
  }, [password]);

  return (
    <section className="w-full max-w-xl border border-neutral-500 bg-white p-4 text-sm text-neutral-900">
      <h2 className="mb-3 text-base font-bold uppercase">Reto 5 - Generador de Contraseñas</h2>

      <div className="mb-3 flex items-center gap-2">
        <input
          aria-label="Contrasena generada"
          className="w-full border border-neutral-500 px-2 py-1"
          readOnly
          value={password}
        />
        <button className="border border-neutral-700 px-2 py-1" onClick={handleCopy} type="button">
          Copiar
        </button>
      </div>

      <div className="mb-4 flex flex-col gap-2">
        <label className="flex items-center gap-2">
          <span>Longitud</span>
          <input
            className="w-20 border border-neutral-500 px-1 py-1 text-right"
            max={MAX_LENGTH}
            min={MIN_LENGTH}
            onChange={(event) => handleLengthChange(event.target.value)}
            type="number"
            value={config.length}
          />
          <span className="text-xs text-neutral-600">(entre {MIN_LENGTH} y {MAX_LENGTH})</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            checked={config.lowercase}
            onChange={() => handleToggle('lowercase')}
            type="checkbox"
          />
          <span>Minusculas</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            checked={config.uppercase}
            onChange={() => handleToggle('uppercase')}
            type="checkbox"
          />
          <span>Mayusculas</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            checked={config.numbers}
            onChange={() => handleToggle('numbers')}
            type="checkbox"
          />
          <span>Numeros</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            checked={config.symbols}
            onChange={() => handleToggle('symbols')}
            type="checkbox"
          />
          <span>Simbolos</span>
        </label>
      </div>

      <button className="border border-neutral-700 px-4 py-2 font-semibold" onClick={handleGenerate} type="button">
        Generar
      </button>

      <div className="mt-3 space-y-1 text-xs">
        {error ? <p className="text-red-600">{error}</p> : null}
        {copyMessage ? <p>{copyMessage}</p> : null}
      </div>
    </section>
  );
}
