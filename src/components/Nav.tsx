import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'

const Nav = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`} id="mainNav">
        <Link className="nav-logo" to="/">
          Shree Durga Interior
          <span className="nav-logo-sub">Est. 1999 · Duliajan, Assam</span>
        </Link>
        <ul className="nav-center">
          <li><Link to="/" className="active">Home</Link></li>
          <li><a href="#about">About</a></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="nav-right">
          <a href="tel:+919435754461" className="nav-tel">+91 94357 54461</a>
          <a href="#contact" className="nav-btn">Book Consultation</a>
        </div>
        <button 
          className="nav-hamburger" 
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Menu"
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <button className="absolute top-6 right-6 text-text" onClick={() => setMobileMenuOpen(false)}>
          <X size={32} />
        </button>
        <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
        <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
        <Link to="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
        <Link to="/projects" onClick={() => setMobileMenuOpen(false)}>Projects</Link>
        <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
        <a href="tel:+919435754461" className="mm-cta" onClick={() => setMobileMenuOpen(false)}>
          +91 94357 54461
        </a>
      </div>
    </>
  )
}

export default Nav
