// src/pages/Landing.jsx
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'

const tickerPhrases = [
    'no ads', 'no algorithm', 'no reels', 'no shopping', 'no metrics',
    'no growth hacks', 'no engagement bait', 'no influencers', 'no brand deals',
    'no dark patterns', 'no data brokers', 'no venture capital',
]
const ticker = [...tickerPhrases, ...tickerPhrases]

const manifestos = [
    { n: '01', title: 'We do not sell your data.', body: 'Because we do not have a sales team. Or a data team. Or, honestly, any team.' },
    { n: '02', title: 'We do not show you ads.', body: 'The only sponsored content is this sentence, sponsored by our regret.' },
    { n: '03', title: 'We do not run an algorithm.', body: 'Posts appear in the order they were posted. Like a calendar. Like life.' },
    { n: '04', title: 'We do not have influencers.', body: 'Everyone here has 12 followers and one is their mom.' },
    { n: '05', title: 'We do not have Stories.', body: 'If it disappears in 24 hours, maybe it was not worth posting.' },
    { n: '06', title: 'We do not have a shop tab.', body: 'This is a social app, not a mall. We keep forgetting that distinction is radical now.' },
]

const posts = [
    { user: 'gremlin.jpg', time: '3h', caption: 'ate cereal for dinner. no one asked. posting anyway.', bg: '#e8d5b0', bg2: '#dfc99f', slot: 'blurry cereal photo', tilt: '-1.5deg' },
    { user: 'noahh', time: '9h', caption: 'my plant died. rip steven. 2023–2026.', bg: '#c4d4b8', bg2: '#b3c5a5', slot: 'sad plant', tilt: '1deg' },
    { user: 'moss.enjoyer', time: '1d', caption: 'went outside. it was fine. would rate 6/10.', bg: '#d9421a', bg2: '#c93911', slot: 'the outdoors', tilt: '-1deg' },
]

const tiers = [
    {
        tag: 'FREE FOREVER', price: '$0', per: '/month, forever, actually', bg: '#f2ede2', fg: '#0a0a0a',
        features: ['Everything', 'Full feed', 'Post whatever', 'Zero ads, forever', 'No premium tier below this because there is none'],
    },
    {
        tag: 'PRO (fake)', price: '$0', per: 'we could not think of anything to charge for', bg: '#0a0a0a', fg: '#f2ede2',
        features: ['Same as free', 'A checkmark you draw yourself', 'The satisfaction of clicking this'],
    },
    {
        tag: 'ENTERPRISE', price: 'lol', per: 'please stop emailing us', bg: '#d9421a', fg: '#0a0a0a',
        features: ['We do not do this', 'There is no team plan', 'Your CEO cannot buy us', 'Go touch grass'],
    },
]

// follows the cursor with a bit of lag, so the glow feels heavy instead of glued on
const useCursorBlob = () => {
    const blobRef = useRef(null)

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const target = { x: -400, y: -400 }
        const pos = { x: -400, y: -400 }
        let raf = null

        const onMove = (e) => { target.x = e.clientX; target.y = e.clientY }
        window.addEventListener('mousemove', onMove)

        const tick = () => {
            pos.x += (target.x - pos.x) * 0.12
            pos.y += (target.y - pos.y) * 0.12
            if (blobRef.current) {
                blobRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%,-50%)`
            }
            raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)

        return () => {
            window.removeEventListener('mousemove', onMove)
            cancelAnimationFrame(raf)
        }
    }, [])

    return blobRef
}

// fades each section in the first time it scrolls into view
const useScrollReveal = () => {
    const rootRef = useRef(null)

    useEffect(() => {
        const nodes = rootRef.current?.querySelectorAll('[data-reveal]')
        if (!nodes?.length) return

        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return
                entry.target.style.animation = 'fadeUp 0.9s cubic-bezier(.2,.9,.3,1) both'
                io.unobserve(entry.target)
            })
        }, { threshold: 0.15 })

        nodes.forEach((n) => io.observe(n))
        return () => io.disconnect()
    }, [])

    return rootRef
}

const Landing = () => {
    const blobRef = useCursorBlob()
    const pageRef = useScrollReveal()

    return (
        <div className="landing-page" ref={pageRef}>
            <div className="landing-bg" />
            <div className="landing-grain" aria-hidden="true" />
            <div className="landing-blob" ref={blobRef} aria-hidden="true" />

            <nav className="landing-nav">
                <Link to="/" className="auth-logo">
                    <div className="auth-logo-mark"><div className="auth-logo-mark-inner" /><span className="auth-logo-dot" /></div>
                    <span className="auth-wordmark">FunStaKilo</span>
                </Link>
                <div className="landing-nav-links">
                    <a href="#manifesto">Manifesto</a>
                    <a href="#features">Feed?</a>
                    <a href="#pricing">Not for sale</a>
                    <Link to="/login">Login</Link>
                    <Link to="/signup" className="landing-nav-cta">Join the mess →</Link>
                </div>
            </nav>

            {/* ---------- HERO ---------- */}
            <section className="landing-hero">
                <div className="landing-floater landing-hero-card" aria-hidden="true">
                    <div>[ your post ]<br />0 likes<br />and that's<br /><span style={{ color: '#d9421a' }}>okay.</span></div>
                </div>
                <div className="landing-floater landing-floater-alt landing-hero-circle" aria-hidden="true">
                    No ads.<br />No algo.<br />No ads.
                </div>
                <div className="landing-floater landing-hero-square" aria-hidden="true" />

                <div className="landing-hero-inner">
                    <div className="landing-badge">
                        <span className="landing-badge-dot" />
                        NOW WITH 0% VENTURE CAPITAL
                    </div>

                    <h1 className="landing-hero-h1">
                        <span className="landing-hero-line" style={{ animationDelay: '0.05s' }}>The social app</span>
                        <span className="landing-hero-line" style={{ fontStyle: 'italic', animationDelay: '0.15s' }}>that won't</span>
                        <span className="landing-hero-line" style={{ animationDelay: '0.25s' }}>
                            <span className="landing-hero-underline">
                                sell you
                                <svg viewBox="0 0 400 20" preserveAspectRatio="none" aria-hidden="true">
                                    <path d="M2 10 Q 100 2, 200 10 T 398 10" />
                                </svg>
                            </span>
                            {' '}anything.
                        </span>
                    </h1>

                    <p className="landing-hero-sub">
                        FunStaKilo is a parody of every social network that turned your friends into a marketing funnel.
                        Post the ugly lunch. Ignore the metrics. There are no metrics.
                    </p>

                    <div className="landing-hero-actions">
                        <Link to="/signup" className="landing-cta-solid">Sign up (regret later) →</Link>
                        <Link to="/login" className="landing-cta-plain">Or log in, we guess</Link>
                    </div>
                </div>
            </section>

            {/* ---------- TICKER ---------- */}
            <div className="landing-ticker">
                <div className="landing-ticker-track">
                    {ticker.map((phrase, i) => (
                        <span key={i}>{phrase} <span style={{ color: '#d9421a' }}>✦</span></span>
                    ))}
                </div>
            </div>

            {/* ---------- MANIFESTO ---------- */}
            <section id="manifesto" className="landing-section">
                <div className="landing-manifesto-grid">
                    <div className="landing-manifesto-head">
                        <div className="landing-eyebrow">§ 01 — Manifesto</div>
                        <h2 className="landing-serif" style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', lineHeight: 0.95 }}>
                            Six things<br /><em>we don't do.</em>
                        </h2>
                    </div>
                    <div className="landing-manifesto-list">
                        {manifestos.map((item) => (
                            <div className="landing-manifesto-row" key={item.n} data-reveal>
                                <div className="landing-manifesto-n">{item.n}</div>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.body}</p>
                                </div>
                            </div>
                        ))}
                        <div style={{ borderTop: '1px solid rgba(10,10,10,0.15)' }} />
                    </div>
                </div>
            </section>

            {/* ---------- FEED PREVIEW ---------- */}
            <section id="features" className="landing-feed">
                <div style={{ maxWidth: 1400, margin: '0 auto' }}>
                    <div className="landing-feed-head">
                        <div>
                            <div className="landing-eyebrow" style={{ opacity: 0.5 }}>§ 02 — The feed</div>
                            <h2 className="landing-serif" style={{ fontSize: 'clamp(32px, 5vw, 58px)', lineHeight: 0.95, maxWidth: 700 }}>
                                Chronological. <em style={{ color: '#d9421a' }}>Boring.</em><br />Yours.
                            </h2>
                        </div>
                        <p className="landing-feed-note">
                            &gt; no reels<br />&gt; no stories<br />&gt; no shop tab<br />&gt; no "for you"<br />&gt; just the people you actually chose
                        </p>
                    </div>

                    <div className="landing-grid-3">
                        {posts.map((p) => (
                            <div className="landing-post" key={p.user} style={{ '--tilt': p.tilt }} data-reveal>
                                <div
                                    className="landing-post-art"
                                    style={{ background: `repeating-linear-gradient(45deg, ${p.bg} 0 14px, ${p.bg2} 14px 28px)` }}
                                >
                                    [{p.slot}]
                                </div>
                                <div className="landing-post-body">
                                    <div className="landing-post-meta"><span>@{p.user}</span><span>{p.time}</span></div>
                                    <p className="landing-post-caption">{p.caption}</p>
                                    <div className="landing-post-foot">no likes shown. on purpose.</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------- PRICING ---------- */}
            <section id="pricing" className="landing-section">
                <div className="landing-pricing-head">
                    <div className="landing-eyebrow">§ 03 — Pricing</div>
                    <h2 className="landing-serif" style={{ fontSize: 'clamp(38px, 7vw, 88px)', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
                        It's <em>free.</em><br />Suspicious, right?
                    </h2>
                    <p style={{ maxWidth: 480, margin: '24px auto 0', fontSize: 16.5, lineHeight: 1.5 }}>
                        We don't have investors. We don't have a growth team. We don't have a Series A.
                        We have one guy named Sid who codes at night.
                    </p>
                </div>

                <div className="landing-grid-3">
                    {tiers.map((t) => (
                        <div className="landing-tier" key={t.tag} style={{ background: t.bg, color: t.fg }} data-reveal>
                            <div className="landing-tier-tag">{t.tag}</div>
                            <div className="landing-tier-price">{t.price}</div>
                            <div className="landing-tier-per">{t.per}</div>
                            <ul>
                                {t.features.map((f) => (
                                    <li key={f}><span style={{ opacity: 0.5 }}>→</span>{f}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* ---------- CTA ---------- */}
            <section className="landing-cta">
                <div className="landing-cta-bg" aria-hidden="true" />
                <div style={{ position: 'relative', maxWidth: 1000, margin: '0 auto' }}>
                    <h2 className="landing-serif" style={{ fontSize: 'clamp(36px, 6vw, 80px)', lineHeight: 0.95, marginBottom: 36, letterSpacing: '-0.03em' }}>
                        Fine. <em>Join us.</em>
                    </h2>
                    <Link to="/signup" className="landing-cta-big">Create the account →</Link>
                </div>
            </section>

            {/* ---------- FOOTER ---------- */}
            <footer className="landing-footer">
                <div className="landing-footer-grid">
                    <div>
                        <div style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 'clamp(30px, 3.5vw, 40px)', letterSpacing: '-0.02em' }}>FunStaKilo</div>
                        <p style={{ maxWidth: 340, opacity: 0.6, fontSize: 14, lineHeight: 1.5, margin: '12px 0 0' }}>
                            A parody. Not affiliated with any billion-dollar photo-sharing app you might be thinking of.
                            Please don't sue us. We have no money.
                        </p>
                    </div>
                    <div>
                        <div className="landing-footer-title">Not the product</div>
                        <div className="landing-footer-col"><Link to="/home">Feed</Link><Link to="/home">Profile</Link><span style={{ opacity: 0.5 }}>Nothing else</span></div>
                    </div>
                    <div>
                        <div className="landing-footer-title">Legal-ish</div>
                        <div className="landing-footer-col"><a href="#manifesto">Terms (short)</a><a href="#manifesto">Privacy (real)</a><a href="#manifesto">Cookies (none)</a></div>
                    </div>
                    <div>
                        <div className="landing-footer-title">Yell at us</div>
                        <div className="landing-footer-col"><a href="mailto:kilo@funstakilo.fake">kilo@funstakilo.fake</a><span style={{ opacity: 0.5 }}>@funstakilo</span></div>
                    </div>
                </div>
                <div className="landing-footer-bar">
                    <span>© 2026 FunStaKilo. Nobody's brand. Nobody's asset.</span>
                    <span>coded at 2am by kilo</span>
                </div>
            </footer>
        </div>
    )
}

export default Landing
