// src/pages/Signup.jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import './Auth.css'

const fields = [
    { key: 'name', label: 'Name', hint: 'the real one', type: 'text', placeholder: 'you, presumably', autoComplete: 'name' },
    { key: 'username', label: 'Username', hint: 'be honest', type: 'text', placeholder: '@gremlin.jpg', autoComplete: 'username' },
    { key: 'email', label: 'Email', hint: 'we will not email you', type: 'email', placeholder: 'you@somewhere.fake', autoComplete: 'email' },
    { key: 'password', label: 'Password', hint: '6+ chars, please', type: 'password', placeholder: '••••••••', autoComplete: 'new-password' },
]

const providers = [
    { name: 'Facebrick', color: '#3a5fcf' },
    { name: 'Xitter', color: '#0a0a0a' },
    { name: 'Goggle', color: '#f2ede2' },
    { name: 'Applet', color: '#8a8a8a' },
]

const stats = [
    { n: '0', label: 'ads shown' },
    { n: '0', label: 'trackers' },
    { n: '∞', label: 'chill' },
]

const Signup = () => {
    const [values, setValues] = useState({ name: '', username: '', email: '', password: '' })
    const [agreed, setAgreed] = useState(false)
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const { register } = useAuth()
    const navigate = useNavigate()

    const handleChange = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (!agreed) {
            setError('You have to tick the box. It is four sentences.')
            return
        }
        setSubmitting(true)
        try {
            await register(values.name, values.email, values.username, values.password)
            navigate('/home')
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="auth-grid" style={{ gridTemplateColumns: '1fr 1.1fr' }}>
            {/* ---------- LEFT: form ---------- */}
            <div className="auth-form-side">
                <Link to="/" className="auth-logo">
                    <div className="auth-logo-mark"><div className="auth-logo-mark-inner" /><span className="auth-logo-dot" /></div>
                    <span className="auth-wordmark">FunStaKilo</span>
                </Link>

                <div className="auth-form-body">
                    <div className="auth-eyebrow"><span className="auth-eyebrow-dot" />SIGN UP — step 1 of 1 (we hate multistep)</div>
                    <h1 className="auth-h1">Create the <em>account.</em></h1>
                    <p className="auth-sub">
                        We ask for four things. That's the whole form. If a website ever asks you for more, run.
                    </p>

                    <form onSubmit={handleSubmit} className="auth-form" style={{ gap: 24 }}>
                        {fields.map((f) => (
                            <label key={f.key} className="auth-label">
                                <span className="auth-label-text" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{f.label}</span><span style={{ opacity: 0.6 }}>{f.hint}</span>
                                </span>
                                <input
                                    type={f.type}
                                    placeholder={f.placeholder}
                                    value={values[f.key]}
                                    onChange={handleChange(f.key)}
                                    autoComplete={f.autoComplete}
                                    className="auth-input"
                                />
                            </label>
                        ))}

                        <label className="auth-check" style={{ marginTop: 8 }}>
                            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                            <span>
                                I agree to the <a href="#terms">Terms</a> (four sentences long) and understand that this is a parody,
                                that FunStaKilo cannot and will not monetize me, and that if I get bored, that is a me problem.
                            </span>
                        </label>

                        {error && <p className="auth-error">{error}</p>}

                        <button type="submit" className="auth-submit" disabled={submitting}>
                            {submitting ? 'Creating…' : 'Sign me up (fine) →'}
                        </button>
                    </form>

                    <div className="auth-divider">
                        <div className="auth-divider-line" /><span>or let a corporation vouch for you</span><div className="auth-divider-line" />
                    </div>

                    <div className="auth-providers cols-4">
                        {providers.map((p) => (
                            <button key={p.name} type="button" className="auth-provider-btn" title={p.name}>
                                <span className="auth-provider-dot" style={{ background: p.color }} />{p.name}
                            </button>
                        ))}
                    </div>

                    <p className="auth-footer-link">Already regret it? <Link to="/login">Log in →</Link></p>
                </div>
            </div>

            {/* ---------- RIGHT: art ---------- */}
            <div className="auth-art-side on-accent" style={{ background: '#d9421a' }}>
                <div
                    className="auth-art-bg"
                    aria-hidden="true"
                    style={{ background: 'linear-gradient(135deg, #d9421a 0%, #e85b30 40%, #c93911 80%, #d9421a 100%)', backgroundSize: '200% 200%' }}
                />

                <div
                    className="auth-floater note"
                    aria-hidden="true"
                    style={{ '--r': '-6deg', top: 80, right: 60, width: 200, height: 200, background: '#0a0a0a', color: '#f2ede2' }}
                >
                    <div className="auth-floater-title">// data we collect</div>
                    name<br />username<br />email<br />password<br /><br />
                    <span style={{ color: '#d9421a' }}>that's it.</span><br />that's the list.
                </div>
                <div
                    className="auth-floater drift bubble"
                    aria-hidden="true"
                    style={{ '--r': '8deg', bottom: 180, left: 60, width: 160, height: 160, background: '#f2ede2', color: '#0a0a0a', fontSize: 28 }}
                >
                    no<br />onboarding<br />tour.
                </div>
                <div
                    className="auth-floater slow square"
                    aria-hidden="true"
                    style={{ '--r': '24deg', top: '40%', right: '35%', width: 70, height: 70, border: '2px solid #0a0a0a' }}
                />

                <div className="auth-art-meta" style={{ opacity: 0.7, justifyContent: 'flex-start' }}>
                    // welcome to the mess
                </div>

                <div className="auth-art-block">
                    <div className="auth-eyebrow" style={{ opacity: 0.7 }}>the deal</div>
                    <h2 className="auth-art-h" style={{ fontSize: 'clamp(30px, 4.2vw, 56px)' }}>
                        You post.<br />We host.<br /><em>Nobody profits.</em>
                    </h2>
                    <div className="auth-stats">
                        {stats.map((s) => (
                            <div key={s.label}>
                                <div className="auth-stat-n">{s.n}</div>
                                <div className="auth-stat-label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="auth-art-meta">
                    <span>© nobody · 2026</span>
                    <span>coded at 2am</span>
                </div>
            </div>
        </div>
    )
}

export default Signup
