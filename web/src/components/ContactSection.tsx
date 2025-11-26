export function ContactSection() {
  return (
    <section
      id="contact"
      className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-10 text-white"
    >
      <p className="text-xs uppercase tracking-[0.4em] text-cyan-200">Contacts</p>
      <h3 className="mt-4 text-3xl font-semibold">Stay connected with the architect</h3>
      <p className="mt-3 text-white/70">
        Share the secured Vercel link or reach out for a guided walkthrough of the AI-powered BI
        stack.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
          <p className="text-sm uppercase tracking-wide text-white/60">Email</p>
          <a
            href="mailto:kumarsund3@gmail.com"
            className="mt-2 block text-xl font-semibold text-cyan-200"
          >
            kumarsund3@gmail.com
          </a>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
          <p className="text-sm uppercase tracking-wide text-white/60">WhatsApp</p>
          <a
            href="https://wa.me/4915221481291"
            target="_blank"
            rel="noreferrer"
            className="mt-2 block text-xl font-semibold text-cyan-200"
          >
            +49 1522 1481291
          </a>
        </div>
      </div>
    </section>
  );
}


