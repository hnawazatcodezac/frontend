import Link from "next/link";

const features = [
  {
    title: "Create & organize",
    description: "Add tasks in seconds and keep everything in one tidy list.",
    icon: "✦",
  },
  {
    title: "Track progress",
    description: "Mark items complete and watch your to-do list shrink.",
    icon: "◷",
  },
  {
    title: "Edit & delete",
    description: "Full CRUD — update or remove tasks whenever plans change.",
    icon: "⤺",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center">
      {/* Hero */}
      <section className="relative flex w-full max-w-3xl flex-1 flex-col items-center justify-center overflow-hidden px-6 py-28 text-center">
        {/* soft radial accent glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-72 w-160 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl"
        />

        <span className="animate-in mb-5 inline-flex items-center gap-2 rounded-full border border-(--border) bg-card px-3.5 py-1.5 text-xs font-medium text-muted shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Next.js + Express
        </span>
        <h1 className="animate-in max-w-2xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
          Stay on top of everything with Taskly
        </h1>
        <p className="animate-in mt-6 max-w-md text-lg leading-8 text-muted">
          A simple, fast todo app. Plan your day, check things off, and keep
          your work moving — all backed by a REST API.
        </p>
        <div className="animate-in mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/todos"
            className="group flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-8 text-sm font-medium text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/30 active:scale-[0.98]"
          >
            Open the app
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="w-full border-t border-[var(--border)] bg-card/50">
        <div className="mx-auto grid w-full max-w-5xl gap-5 px-6 py-16 sm:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-(--border) bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-lg text-accent transition-colors group-hover:bg-accent/15">
                {f.icon}
              </div>
              <h3 className="text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
