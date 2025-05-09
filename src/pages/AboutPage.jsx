import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">O Nas</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-4">
          Witaj na naszym klonie OLX! To projekt demonstracyjny stworzony w celu zaprezentowania podstawowych funkcjonalności platformy ogłoszeniowej przy użyciu React i Tailwind CSS.
        </p>
        <p className="mb-4">
          Naszym celem było stworzenie prostego interfejsu użytkownika, który pozwoli na przeglądanie, dodawanie, edytowanie i usuwanie ogłoszeń (symulacja po stronie frontendowej).
        </p>
        <h2 className="text-xl font-semibold mb-2">Technologie użyte w projekcie:</h2>
        <ul className="list-disc list-inside mb-4">
          <li>React</li>
          <li>React Router DOM</li>
          <li>Tailwind CSS</li>
          <li>react-toastify</li>
        </ul>
        <p>
          Pamiętaj, że jest to uproszczona wersja i nie zawiera pełnej funkcjonalności prawdziwej platformy, takiej jak baza danych, system płatności (poza prostą symulacją BLIK), uwierzytelnianie po stronie serwera czy zaawansowane wyszukiwanie.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;