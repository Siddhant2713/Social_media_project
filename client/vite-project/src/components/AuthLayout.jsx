import { Link } from 'react-router-dom'
import './AuthLayout.css'

const DOT_COUNT = 18

// Deterministic pseudo-random scatter so the flock doesn't line up in a grid.
const dotPosition = (i) => ({
  '--i': i,
  '--x': `${8 + ((i * 53) % 84)}%`,
  '--y': `${6 + ((i * 31) % 88)}%`,
})

function AuthLayout({ eyebrow, title, subtitle, children }) {
  return (
    <div className="flex min-h-svh w-full flex-col lg:flex-row">
      <div className="relative hidden overflow-hidden bg-linear-to-br from-ink to-ink-2 lg:flex lg:w-[42%] lg:flex-col lg:justify-between lg:p-12">
        <div className="murmuration" aria-hidden="true">
          {Array.from({ length: DOT_COUNT }).map((_, i) => (
            <span key={i} className="murmur-dot" style={dotPosition(i)} />
          ))}
        </div>

        <Link
          to="/"
          className="relative font-display text-2xl font-medium text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Murmur
        </Link>

        <div className="relative">
          <p className="font-display text-4xl leading-[1.15] text-paper">
            Where conversations
            <br />
            flock together.
          </p>
          <p className="mt-4 max-w-xs text-sm text-paper/60">
            Join the threads your friends are already flying through.
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-start bg-paper px-6 py-12 sm:px-12 lg:justify-center lg:px-20">
        <div className="mx-auto w-full max-w-sm">
          <Link
            to="/"
            className="font-display text-xl font-medium text-ink lg:hidden"
          >
            Murmur
          </Link>

          {eyebrow && (
            <p className="mt-8 text-xs font-semibold tracking-[0.2em] text-accent uppercase lg:mt-0">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-2 font-display text-3xl text-ink">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-muted">{subtitle}</p>}

          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
