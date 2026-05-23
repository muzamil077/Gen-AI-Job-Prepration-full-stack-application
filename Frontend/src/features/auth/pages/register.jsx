import { useState } from 'react'
import AuthShell from '../components/AuthShell'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'



export default function Register() {
    const { loading, handleRegister } = useAuth()
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handelSubmit = (e) => {
        e.preventDefault()
        handleRegister({ username, email, password })
        navigate("/")
    }

    if (loading) {
        return (<main><h1>loading...</h1></main>)
    }
    return (
        <AuthShell
            variant="register"
            badge="Join the beta"
            heroTitle="Ideas deserve a fast lane"
            heroSubtitle="Create an account to experiment with prompts, save runs, and collaborate without friction."
            cardTitle="Create account"
            cardSubtitle="Takes under a minute — no credit card required."
            footerText="Already have an account?"
            footerLinkText="Sign in"
            footerTo="/login"
        >
            <form
                onSubmit={handelSubmit}

            >
                <div className="auth-field">
                    <label htmlFor="register-name">Full name</label>
                    <input
                        id="register-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        onChange={(e) => { setUsername(e.target.value) }}
                        placeholder="Alex Morgan"
                        required
                    />
                </div>
                <div className="auth-field">
                    <label htmlFor="register-email">Work email</label>
                    <input
                        id="register-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        onChange={(e) => { setEmail(e.target.value) }}
                        placeholder="you@company.com"
                        required
                    />
                </div>
                <div className="auth-field">
                    <label htmlFor="register-password">Password</label>
                    <input
                        id="register-password"
                        name="password"
                        type="password"
                        onChange={(e) => { setPassword(e.target.value) }}
                        autoComplete="new-password"
                        placeholder="At least 8 characters"
                        minLength={8}
                        required
                    />
                </div>
                <div className="auth-field">
                    <label htmlFor="register-password2">Confirm password</label>
                    <input
                        id="register-password2"
                        name="password2"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Repeat password"
                        minLength={8}
                        required
                    />
                </div>
                <div className="auth-row">
                    <label className="auth-check">
                        <input type="checkbox" name="terms" required />
                        I agree to the Terms &amp; Privacy
                    </label>
                </div>
                <button type="submit" className="auth-submit">
                    Create account
                </button>
            </form>
            <div className="auth-divider">Or sign up with</div>
            <div className="auth-social">
                <button type="button">Google</button>
                <button type="button">GitHub</button>
            </div>
        </AuthShell>
    )
}
