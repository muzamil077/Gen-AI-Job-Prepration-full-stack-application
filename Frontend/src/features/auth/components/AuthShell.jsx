import { Link } from 'react-router'
import '../auth-pages.css'


export default function AuthShell({
  variant = 'login',
  badge,
  heroTitle,
  heroSubtitle,
  cardTitle,
  cardSubtitle,
  children,
  footerText,
  footerLinkText,
  footerTo,
}) {
  return (
    <div className={`auth-page auth-page--${variant}`}>
      <div className="auth-page__mesh" aria-hidden />
      <div className="auth-page__noise" aria-hidden />
      <div className="auth-page__grid">
        <section className="auth-page__hero" aria-labelledby="auth-hero-heading">
          <div className="auth-page__dots" aria-hidden />
          <div className="auth-page__hero-inner">
            {badge ? <p className="auth-page__badge">{badge}</p> : null}
            <h1 id="auth-hero-heading">{heroTitle}</h1>
            <p>{heroSubtitle}</p>
          </div>
        </section>
        <section className="auth-page__panel" aria-label="Account form">
          <div className="auth-card">
            <header className="auth-card__head">
              <h2>{cardTitle}</h2>
              <p>{cardSubtitle}</p>
            </header>
            {children}
            <p className="auth-footer">
              {footerText}{' '}
              <Link to={footerTo}>{footerLinkText}</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
