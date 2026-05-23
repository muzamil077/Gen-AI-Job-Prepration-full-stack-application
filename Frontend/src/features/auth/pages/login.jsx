import { useState } from 'react'
import AuthShell from '../components/AuthShell'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'
export default function Login() {
  const { loading, handleLogin } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handelSubmit = async (e) => {
    e.preventDefault()
    await handleLogin({ email, password })
    navigate("/")
  }

  if (loading) {
    return (<main> <h1>Loading...</h1></main>)
  }

  return (
    <AuthShell
      variant="login"
      badge="Secure access"
      heroTitle="Welcome back"
      heroSubtitle="Sign in to pick up where you left off. Your workspace, models, and history stay in sync."
      cardTitle="Sign in"
      cardSubtitle="Use your email and password to continue."
      footerText="New here?"
      footerLinkText="Create an account"
      footerTo="/register"
    >
      <form
        onSubmit={handelSubmit}
      >
        <div className="auth-field">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            onChange={(e) => { setEmail(e.target.value) }}
            required
          />
        </div>
        <div className="auth-field">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            onChange={(e) => { setPassword(e.target.value) }}
            required
          />
        </div>
        <div className="auth-row">
          <label className="auth-check">
            <input type="checkbox" name="remember" defaultChecked />
            Remember me
          </label>
          <a className="auth-link" href="#forgot">
            Forgot password?
          </a>
        </div>
        <button type="submit" className="auth-submit">
          Sign in
        </button>
      </form>
      <div className="auth-divider">Or continue with</div>
      <div className="auth-social">
        <button type="button">Google</button>
        <button type="button">GitHub</button>
      </div>
    </AuthShell>
  )
}
