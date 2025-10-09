import { Generador } from '@/components/generadorContrasenia/page';
import { BarraProgreso } from '@/components/barraProgreso/page';
import { Timer } from '@/components/timer/page';
import { Formulario } from '@/components/formulario/page';
import { Header } from '@/components/Header';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center text-neutral-900">
      <Header />

      <main className="mt-10 flex flex-col items-center gap-8 pb-16">
        <BarraProgreso />
        <Formulario />
        <Timer />
        <Generador />

      </main>

    </div>
  );
}
