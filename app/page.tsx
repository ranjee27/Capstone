import { SettingsForm } from '@/components/SettingsForm';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Capstone demo
          </p>
          <h1 className="text-3xl font-semibold sm:text-4xl">Settings form</h1>
          <p className="max-w-2xl text-base text-slate-600">
            A responsive, accessible settings experience with blur validation and a persistent success state.
          </p>
        </header>

        <SettingsForm />
      </div>
    </main>
  );
}
