export const dynamic = "force-dynamic";

export default function ContactsPage() {
  return (
    <div className="relative mt-6">
      <main className="relative space-y-12">
        <section className="space-y-8 rounded-3xl border border-white/10 bg-black/40 p-10 text-white backdrop-blur-3xl">
          <header>
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-200">Contacts</p>
            <h1 className="mt-2 text-4xl font-bold">Get In Touch</h1>
            <p className="mt-4 text-lg text-white/70">
              For inquiries about this Business Intelligence platform or to discuss collaboration opportunities,
              please reach out through any of the channels below.
            </p>
          </header>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Email Contact */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-transparent p-8">
              <div className="mb-4 inline-block rounded-full bg-cyan-500/20 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-cyan-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">Email</h2>
              <p className="text-white/60 mb-4">
                For technical discussions, demos, or project inquiries
              </p>
              <a
                href="mailto:kumarsund3@gmail.com"
                className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition"
              >
                <span className="text-lg font-medium">kumarsund3@gmail.com</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              </a>
            </div>

            {/* WhatsApp Contact */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-transparent p-8">
              <div className="mb-4 inline-block rounded-full bg-emerald-500/20 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-emerald-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">WhatsApp</h2>
              <p className="text-white/60 mb-4">
                Quick communication for urgent matters or live demos
              </p>
              <a
                href="https://wa.me/4915221481291"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition"
              >
                <span className="text-lg font-medium">+49 152 21481291</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Additional Information */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-xl font-semibold text-white mb-4">About This Project</h3>
            <div className="space-y-4 text-white/80">
              <p>
                This Business Intelligence platform demonstrates a complete end-to-end solution for automotive
                parts manufacturing analytics, featuring:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start">
                  <span className="mr-2 text-cyan-400">•</span>
                  <span>Next.js 14+ with App Router for optimal performance</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-cyan-400">•</span>
                  <span>InstantDB for real-time data synchronization</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-cyan-400">•</span>
                  <span>FastAPI + Pydantic backend with synthetic data generation</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-cyan-400">•</span>
                  <span>AI-powered insights with 95%+ confidence thresholds</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-cyan-400">•</span>
                  <span>Executive-grade dark UI with stunning visualizations</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-emerald-500/10 p-8 text-center">
            <h3 className="text-2xl font-semibold text-white mb-3">Let's Connect</h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Interested in discussing Chief Data Architect roles, BI architecture, or collaboration
              opportunities? I'd love to hear from you.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="mailto:kumarsund3@gmail.com"
                className="rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 px-8 py-3 font-semibold text-black shadow-lg shadow-cyan-500/30 transition hover:shadow-cyan-500/50 hover:scale-105"
              >
                Send Email
              </a>
              <a
                href="https://wa.me/4915221481291"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 px-8 py-3 font-semibold text-black shadow-lg shadow-emerald-500/30 transition hover:shadow-emerald-500/50 hover:scale-105"
              >
                WhatsApp Chat
              </a>
            </div>
          </div>

          {/* Response Time */}
          <div className="text-center text-sm text-white/60">
            <p>📧 Typical response time: Within 24 hours</p>
            <p className="mt-1">💬 For urgent matters, WhatsApp is the fastest channel</p>
          </div>
        </section>
      </main>
    </div>
  );
}

