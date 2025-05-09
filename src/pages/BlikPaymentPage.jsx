import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlikPaymentPage = () => {
  const navigate = useNavigate();

  const handlePayment = () => {
    alert('Symulacja płatności BLIK zakończona sukcesem!');
    navigate('/'); // Przekieruj z powrotem na stronę główną po "płatności"
  };

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-6">Symulacja Płatności BLIK</h1>
      <p className="mb-4">Wprowadź kod BLIK (symulacja):</p>
      <input
        type="text"
        placeholder="Kod BLIK"
        className="border p-2 rounded mb-4"
      />
      <button
        onClick={handlePayment}
        className="bg-olx-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-olx-orange-dark transition duration-300 ease-in-out"
      >
        Zapłać
      </button>
    </div>
  );
};

export default BlikPaymentPage;