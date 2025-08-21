export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <section className="text-center px-6 py-20 max-w-3xl">
        <h1 className="text-5xl font-extrabold leading-tight mb-6">
          Welcome to <span className="text-purple-500">CodedByAI</span>
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Build smarter, faster, and cleaner with AI-powered code generation.
          Your ideas, instantly transformed into production-ready apps.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#get-started"
            className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition font-medium"
          >
            Get Started
          </a>
          <a
            href="#learn-more"
            className="px-6 py-3 rounded-lg border border-gray-600 hover:border-purple-500 transition font-medium"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="learn-more"
        className="grid md:grid-cols-3 gap-8 px-6 py-20 max-w-6xl"
      >
        <div className="p-6 rounded-lg bg-gray-800 shadow-lg hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-3">AI-Powered</h2>
          <p className="text-gray-400">
            Generate modern, scalable code instantly with AI that understands
            your vision.
          </p>
        </div>
        <div className="p-6 rounded-lg bg-gray-800 shadow-lg hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-3">Developer Friendly</h2>
          <p className="text-gray-400">
            Simple, extensible, and clean templates so you can focus on
            building, not boilerplate.
          </p>
        </div>
        <div className="p-6 rounded-lg bg-gray-800 shadow-lg hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-3">Lightning Fast</h2>
          <p className="text-gray-400">
            Deploy in minutes, iterate quickly, and scale effortlessly with
            Next.js at the core.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section
        id="get-started"
        className="text-center px-6 py-16 max-w-3xl border-t border-gray-700"
      >
        <h2 className="text-3xl font-bold mb-4">
          Ready to build with <span className="text-purple-500">CodedByAI</span>
          ?
        </h2>
        <p className="text-gray-400 mb-8">
          Start your next project today and experience the future of coding.
        </p>
        <a
          href="#"
          className="px-8 py-4 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-lg font-semibold"
        >
          Launch Now 🚀
        </a>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 text-center border-t border-gray-800 text-gray-500 text-sm">
        © {new Date().getFullYear()} CodedByAI. All rights reserved.
      </footer>
    </main>
  );
}
