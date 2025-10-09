import { Generador } from '@/components/generadorContrasenia/page';
import { BarraProgreso } from '@/components/barraProgreso/page';
import { Timer } from '@/components/timer/page';
import { Formulario } from '@/components/formulario/page';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center text-neutral-900">
      <header className="flex w-full max-w-5xl flex-col gap-3 text-center">
       <h1 className="text-4xl font-bold text-orange-600">Hackathon</h1>
      </header>

      <main className="mt-10 flex flex-col items-center gap-8 pb-16">
        <BarraProgreso />
        <Formulario />
        <Timer />
        <Generador />

      </main>

    </div>
  );
}
