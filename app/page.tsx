export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-4">
          Welcome to Ari and Jorge Starter
        </h1>
        <p className="text-center text-lg mb-8">
          Next.js 14 with TypeScript, Supabase, and Tailwind CSS
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">📚 Documentation</h2>
            <p className="text-sm">
              Check out CLAUDE.md for workflow guidelines and project structure.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">🚀 Get Started</h2>
            <p className="text-sm">
              Configure your .env.local file with Supabase credentials to begin.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">🔐 Supabase</h2>
            <p className="text-sm">
              Database, authentication, and real-time features ready to go.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">⚡ Vercel</h2>
            <p className="text-sm">
              Auto-deploy from GitHub with preview deployments for every PR.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
