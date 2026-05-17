import { Facebook, MessageCircle } from 'lucide-react'
import { Link } from '@tanstack/react-router'

const Footer = () => {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">Shree Durga Interior</div>
            <p className="footer-tagline">Premium interior design studio transforming spaces across Assam since 1999.</p>
            <div className="footer-socials">
              <a href="https://facebook.com/shreedurgainterior" className="fsoc" target="_blank" rel="noopener noreferrer">
                <Facebook size={15} />
              </a>
              <a href="https://wa.me/+919435754461" className="fsoc" target="_blank" rel="noopener noreferrer">
                <MessageCircle size={15} />
              </a>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Studio</div>
            <ul className="footer-links">
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/projects">Recent Projects</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Services</div>
            <ul className="footer-links">
              <li><Link to="/services">Modular Kitchen</Link></li>
              <li><Link to="/services">Office Design</Link></li>
              <li><Link to="/services">Home Interior</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Support</div>
            <ul className="footer-links">
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/help">Help Center</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© {new Date().getFullYear()} Shree Durga Interior. All rights reserved.</p>
          <p className="footer-made">Made with ♥ in Assam</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
