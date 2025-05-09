import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p>&copy; {new Date().getFullYear()} OLX Clone. Wszelkie prawa zastrzeżone (Symulacja).</p>
        </div>
        <div>
          <Link to="/about" className="mr-4 hover:underline">O Nas</Link>
          {/* Dodaj inne linki, np. do strony kontaktowej */}
          <Link to="/contact" className="hover:underline">Kontakt</Link> {/* Utwórz stronę kontaktową podobnie jak AboutPage */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;