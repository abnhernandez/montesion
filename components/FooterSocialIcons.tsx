import { FaFacebook, FaInstagram, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';

export function FooterSocialIcons() {
  return (
    <div className="flex justify-center gap-6 mt-8">
      <a
        href="https://facebook.com/montesionoaxaca"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook Monte Sion"
        className="text-muted-foreground hover:text-blue-600 transition-colors text-2xl"
      >
        <FaFacebook />
      </a>
      <a
        href="https://instagram.com/montesionaxaca"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram Monte Sion"
        className="text-muted-foreground hover:text-pink-500 transition-colors text-2xl"
      >
        <FaInstagram />
      </a>
      <a
        href="https://wa.me/525586449993?text=Hola!%20Quiero%20saber%20más%20de%20Monte%20Sion"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Monte Sion"
        className="text-muted-foreground hover:text-green-500 transition-colors text-2xl"
      >
        <FaWhatsapp />
      </a>
      <a
        href="https://maps.app.goo.gl/q8Xx7PWoRdmZYtGE8"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Google Maps Monte Sion"
        className="text-muted-foreground hover:text-red-600 transition-colors text-2xl"
      >
        <FaMapMarkerAlt />
      </a>
    </div>
  );
}
