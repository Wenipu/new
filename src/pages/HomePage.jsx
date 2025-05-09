import React from 'react';
import { useNavigate } from 'react-router-dom';
import categories from '../data/categories';

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.elements.search.value;
    if (searchTerm) {
      navigate(`/listings?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/listings?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Sekcja baneru/wyszukiwania */}
      <div className="bg-gray-100 p-8 rounded-lg shadow-md text-center mb-8"> {/* Jasnoszare tło */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Znajdź coś dla siebie!</h1> {/* Ciemnoszary tekst */}
        <p className="text-gray-600 mb-6">Miliony ogłoszeń w całej Polsce.</p> {/* Szary tekst */}
        <form onSubmit={handleSearch} className="flex justify-center">
          <input
            type="text"
            name="search"
            placeholder="Czego szukasz?"
            className="w-full max-w-md p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-olx-orange" // Cienka szara ramka, focus na pomarańczowy
          />
          <button
            type="submit"
            className="bg-olx-orange hover:bg-olx-orange-dark text-white font-bold py-3 px-6 rounded-r-lg transition duration-300 ease-in-out" // Pomarańczowy przycisk
          >
            Szukaj
          </button>
        </form>
      </div>

      {/* Sekcja kategorii */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Popularne Kategorie</h2> {/* Ciemnoszary tekst */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map(category => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category.name)}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out cursor-pointer text-center border border-gray-200" // Białe tło, szara ramka, hover na większy cień
          >
            <img src={category.icon} alt={category.name} className="mx-auto mb-3 w-12 h-12" /> {/* Ikona kategorii */}
            <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3> {/* Ciemnoszary tekst */}
          </div>
        ))}
      </div>

      {/* Można dodać więcej sekcji, np. ostatnio dodane ogłoszenia */}
    </div>
  );
};

export default HomePage;