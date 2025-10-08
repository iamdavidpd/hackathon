import { ProgressChallenge } from '@/components/progress/ProgressChallenge';
import { TimerChallenge } from '@/components/timer/TimerChallenge';
import { UserFormChallenge } from '@/components/user-form/UserFormChallenge';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center text-neutral-900">
      <header className="flex w-full max-w-5xl flex-col gap-3 text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Hackathon</h1>
      </header>

      <main className="mt-10 flex flex-col items-center gap-8 pb-16">
        <ProgressChallenge />
        <UserFormChallenge />
        <TimerChallenge />
      </main>

    </div>
  );
}
