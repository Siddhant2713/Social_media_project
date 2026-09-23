import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'

const fieldClasses =
    'w-full rounded-xl border border-transparent bg-ink/5 px-4 py-3 text-sm text-ink placeholder:text-muted/70 focus:border-accent focus:bg-paper focus:outline-none focus:ring-4 focus:ring-accent/15'

function Signup() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const res = await fetch('http://localhost:3000/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.message || 'Signup failed')
                return
            }

            navigate('/login')
        } catch {
            setError('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthLayout
            eyebrow="Join Murmur"
            title="Create your account"
            subtitle="Start following the conversations that matter to you."
        >
            <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
                {error && (
                    <div className="mb-4 rounded-xl border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
                        {error}
                    </div>
                )}

                <label htmlFor="name" className="mb-1.5 text-sm font-medium text-ink">
                    Name
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`mb-4 ${fieldClasses}`}
                />

                <label htmlFor="username" className="mb-1.5 text-sm font-medium text-ink">
                    Username
                </label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Choose a handle"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className={`mb-4 ${fieldClasses}`}
                />

                <label htmlFor="email" className="mb-1.5 text-sm font-medium text-ink">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`mb-4 ${fieldClasses}`}
                />

                <label htmlFor="password" className="mb-1.5 text-sm font-medium text-ink">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="At least 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    minLength={6}
                    required
                    className={`mb-6 ${fieldClasses}`}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full bg-accent px-4 py-3 text-sm font-semibold text-ink motion-safe:transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                    {loading ? 'Signing up…' : 'Sign up'}
                </button>

                <p className="mt-6 text-center text-sm text-muted">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="font-semibold text-ink hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                    >
                        Log in
                    </Link>
                </p>
            </form>
        </AuthLayout>
    )
}

export default Signup
