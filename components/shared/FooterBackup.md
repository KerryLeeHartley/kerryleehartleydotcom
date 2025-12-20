export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-luxury-black text-luxury-white py-12 border-t border-luxury-gray/10">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Kerry Lee Hartly</h3>
            <p className="text-luxury-gray text-sm">
              Licensed Real Estate Professional<br />
              Serving the Atlanta Metro Area
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-luxury-gray">
              <li>
                <a href="#video" className="hover:text-luxury-gold transition-colors">
                  Watch Video
                </a>
              </li>
              <li>
                <a href="#video" className="hover:text-luxury-gold transition-colors">
                  Get Started
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <p className="text-luxury-gray text-sm mb-2">
              Licensed in Georgia
            </p>
            <p className="text-luxury-gray text-sm">
              © {currentYear} Kerry Lee Hartly.<br />All rights reserved.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-luxury-gray/10 text-center">
          <p className="text-luxury-gray text-sm">
            This is a lead qualification resource. Not a paid course or service.
          </p>
        </div>
      </div>
    </footer>
  )
}
