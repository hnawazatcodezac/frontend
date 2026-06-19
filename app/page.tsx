import Link from "next/link";

const features = [
  {
    title: "Create & organize",
    description: "Add tasks in seconds and keep everything in one tidy list.",
  },
  {
    title: "Track progress",
    description: "Mark items complete and watch your to-do list shrink.",
  },
  {
    title: "Edit & delete",
    description: "Full CRUD — update or remove tasks whenever plans change.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 dark:bg-black">
      {/* Hero */}
      <section className="flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <span className="mb-4 rounded-full border border-black/[.08] px-3 py-1 text-xs font-medium text-zinc-600 dark:border-white/[.145] dark:text-zinc-400">
          Next.js + Express
        </span>
        <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-black sm:text-5xl dark:text-zinc-50">
          Stay on top of everything with Taskly
        </h1>
        <p className="mt-6 max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          A simple, fast todo app. Plan your day, check things off, and keep
          your work moving — all backed by a REST API.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/todos"
            className="flex h-12 items-center justify-center rounded-full bg-black px-8 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Open the app
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="w-full border-t border-black/[.08] bg-white dark:border-white/[.145] dark:bg-zinc-950">
        <div className="mx-auto grid w-full max-w-5xl gap-8 px-6 py-16 sm:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="flex flex-col gap-2">
              <h3 className="text-base font-semibold text-black dark:text-zinc-50">
                {f.title}
              </h3>
              <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
