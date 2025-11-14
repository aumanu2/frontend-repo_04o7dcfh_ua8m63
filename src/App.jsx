import { useEffect, useMemo, useState } from 'react'

function useCountdown(targetDate) {
  const target = useMemo(() => new Date(targetDate).getTime(), [targetDate])
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(interval)
  }, [])

  const diff = Math.max(target - now, 0)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds, completed: diff === 0 }
}

function Stat({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl md:text-5xl font-bold text-brand-dark">{value}</div>
      <div className="mt-1 text-sm uppercase tracking-wider text-brand-dark/70">{label}</div>
    </div>
  )
}

function App() {
  // Target: 1 Desember (Soft Launching)
  const currentYear = new Date().getFullYear()
  const targetDate = `${currentYear}-12-01T00:00:00`
  const { days, hours, minutes, seconds } = useCountdown(targetDate)

  return (
    <div className="min-h-screen bg-brand-ghost text-brand-dark flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-green/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-brand-dark/5 blur-3xl" />
      </div>

      <div className="w-full max-w-3xl mx-auto px-6 py-16">
        <div className="flex items-center justify-center mb-8">
          <img
            src="/logo.svg"
            alt="Fulla Skin Care"
            className="h-12 md:h-14 object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>

        <div className="text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-sm border border-brand-dark/10 text-sm text-brand-dark/70">
            <span className="inline-block h-2 w-2 rounded-full bg-brand-green" />
            Soft Launching • 1 Desember
          </span>

          <h1 className="mt-6 text-3xl md:text-5xl font-extrabold leading-tight text-brand-dark">
            Situs Kami Sedang Dipersiapkan
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg text-brand-dark/70">
            Fulla Skin Care akan hadir segera. Pantau hitung mundur menuju peluncuran perdana kami.
          </p>

          <div className="mt-8 md:mt-10 grid grid-cols-4 gap-4 md:gap-6">
            <Stat value={String(days).padStart(2, '0')} label="Hari" />
            <Stat value={String(hours).padStart(2, '0')} label="Jam" />
            <Stat value={String(minutes).padStart(2, '0')} label="Menit" />
            <Stat value={String(seconds).padStart(2, '0')} label="Detik" />
          </div>

          <div className="mt-10 md:mt-12 max-w-xl mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const form = e.currentTarget
                const email = new FormData(form).get('email')
                alert(`Terima kasih! Kami akan mengabari: ${email}`)
                form.reset()
              }}
              className="flex gap-2 md:gap-3 items-center"
            >
              <input
                type="email"
                required
                name="email"
                placeholder="Masukkan email Anda untuk kabar terbaru"
                className="flex-1 px-4 py-3 rounded-lg border border-brand-dark/15 bg-white text-brand-dark placeholder-brand-dark/40 focus:outline-none focus:ring-2 focus:ring-brand-green/40 focus:border-brand-green/60"
              />
              <button
                type="submit"
                className="px-4 md:px-6 py-3 rounded-lg font-semibold text-white bg-brand-green hover:bg-brand-green/90 active:scale-[.98] transition"
              >
                Beri Tahu Saya
              </button>
            </form>
            <p className="mt-3 text-xs text-brand-dark/60">Dengan menekan tombol, Anda menyetujui menerima update seputar peluncuran.</p>
          </div>
        </div>

        <footer className="mt-14 md:mt-16 text-center text-sm text-brand-dark/60">
          <div className="flex items-center justify-center gap-3 mb-2">
            <img src="/favicon.svg" alt="" className="h-5 w-5" />
            <span className="font-semibold" style={{ color: '#95AD3F' }}>Fulla</span> Skin Care
          </div>
          <div>
            © {new Date().getFullYear()} Fulla Skin Care • Semua hak dilindungi
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
