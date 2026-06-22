import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taskly — Simple Todo App",
  description: "A minimal Next.js + Express todo application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <header className="sticky top-0 z-50 border-b border-(--border) bg-(--background)/70 backdrop-blur-xl">
          <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold tracking-tight transition-opacity hover:opacity-70"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white">
                T
              </span>
              Taskly
            </Link>
            <div className="flex items-center gap-1 text-sm font-medium">
              <Link
                href="/"
                className="rounded-lg px-3 py-1.5 text-muted transition-colors hover:bg-black/[.04] hover:text-foreground dark:hover:bg-white/[.06]"
              >
                Home
              </Link>
              <Link
                href="/todos"
                className="rounded-lg px-3 py-1.5 text-muted transition-colors hover:bg-black/[.04] hover:text-foreground dark:hover:bg-white/[.06]"
              >
                Todos
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex flex-1 flex-col">{children}</main>
      </body>
    </html>
  );
}
