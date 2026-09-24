// src/pages/Login.jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import './Auth.css'

const providers = [
    { name: 'Facebrick', color: '#3a5fcf' },
    { name: 'Xitter', color: '#0a0a0a' },
    { name: 'Goggle', color: '#d9421a' },
    { name: 'Applet', color: '#8a8a8a' },
]

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(true)
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSubmitting(true)
        try {
            await login(username, password)
            navigate('/home')
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid username or password')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="auth-grid" style={{ gridTemplateColumns: '1.1fr 1fr' }}>
            {/* ---------- LEFT: art ---------- */}
            <div className="auth-art-side" style={{ background: '#0a0a0a' }}>
                <div
                    className="auth-art-bg"
                    aria-hidden="true"
                    style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1410 40%, #2a1810 70%, #0a0a0a 100%)', backgroundSize: '200% 200%' }}
                />

                <Link to="/" className="auth-logo">
                    <div className="auth-logo-mark on-dark"><div className="auth-logo-mark-inner" /><span className="auth-logo-dot" /></div>
                    <span className="auth-wordmark">FunStaKilo</span>
                </Link>

                <div
                    className="auth-floater bubble"
                    aria-hidden="true"
                    style={{ '--r': '-8deg', top: 120, right: 80, width: 180, height: 180, background: '#d9421a', color: '#0a0a0a', fontSize: 26 }}
                >
                    welcome<br />back,<br />i guess.
                </div>
                <div
                    className="auth-floater drift note"
                    aria-hidden="true"
                    style={{ '--r': '6deg', bottom: 180, left: 60, width: 140, height: 180, background: '#f2ede2', color: '#0a0a0a', fontSize: 11, lineHeight: 1.4, padding: 18, borderRadius: 20 }}
                >
                    [ your feed ]<br />0 new posts<br />everyone is busy<br />living their lives<br /><br />
                    <span style={{ color: '#d9421a' }}>— healthy —</span>
                </div>
                <div
                    className="auth-floater slow square"
                    aria-hidden="true"
                    style={{ '--r': '22deg', top: '45%', left: '30%', width: 70, height: 70, border: '2px solid #f2ede2' }}
                />

                <div className="auth-art-block">
                    <div className="auth-eyebrow" style={{ opacity: 0.5 }}><span className="auth-eyebrow-dot" />LOG IN — page 2 of 3</div>
                    <h1 className="auth-art-h" style={{ fontSize: 'clamp(34px, 5vw, 64px)', lineHeight: 0.95 }}>
                        Oh.<br /><em>You again.</em>
                    </h1>
                    <p style={{ opacity: 0.7, fontSize: 15, lineHeight: 1.5, maxWidth: 380, margin: '18px 0 0' }}>
                        Nothing has changed since you left. That's kind of the whole point.
                    </p>
                </div>

                <div className="auth-art-meta" style={{ opacity: 0.4 }}>
                    <span>© nobody</span>
                    <span>still not for sale</span>
                </div>
            </div>

            {/* ---------- RIGHT: form ---------- */}
            <div className="auth-form-side centered">
                <div className="auth-form-body">
                    <div className="auth-eyebrow">// authenticating a real person</div>
                    <h2 className="auth-h1">Log in.</h2>
                    <p className="auth-sub">No 2FA. No captchas. Please don't be a bot. We're on the honor system.</p>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <label className="auth-label">
                            <span className="auth-label-text">Username</span>
                            <input
                                type="text"
                                placeholder="@gremlin.jpg"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="username"
                                className="auth-input"
                            />
                        </label>

                        <label className="auth-label">
                            <span className="auth-label-text" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Password</span><span style={{ opacity: 0.7 }}>forgot? same.</span>
                            </span>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                className="auth-input"
                            />
                        </label>

                        <label className="auth-check" style={{ alignItems: 'center' }}>
                            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} style={{ marginTop: 0 }} />
                            Keep me logged in (I have nothing to hide from myself)
                        </label>

                        {error && <p className="auth-error">{error}</p>}

                        <button type="submit" className="auth-submit" disabled={submitting}>
                            {submitting ? 'Checking…' : 'Let me in →'}
                        </button>
                    </form>

                    <div className="auth-divider">
                        <div className="auth-divider-line" /><span>or, sell your soul via</span><div className="auth-divider-line" />
                    </div>

                    <div className="auth-providers">
                        {providers.map((p) => (
                            <button key={p.name} type="button" className="auth-provider-btn">
                                <span className="auth-provider-dot" style={{ background: p.color }} />{p.name}
                            </button>
                        ))}
                    </div>

                    <p className="auth-footer-link">No account? <Link to="/signup">Regret one now →</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login
