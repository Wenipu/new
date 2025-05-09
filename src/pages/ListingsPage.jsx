import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getListings } from '../utils/storage'; // Importuj funkcję pomocniczą

const ITEMS_PER_PAGE = 9;

const ListingsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const categoryFilter = searchParams.get('category');
  const searchTerm = searchParams.get('search');
  const page = parseInt(searchParams.get('page')) || 1;
  const sortBy = searchParams.get('sortBy') || 'dateDesc';

  const [allListings, setAllListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(page);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState(sortBy);

  useEffect(() => {
    setAllListings(getListings()); // Użyj funkcji pomocniczej
  }, []);

  useEffect(() => {
    // ... (pozostała logika filtrowania i sortowania)
    let currentListings = [...allListings];

    if (categoryFilter) {
      currentListings = currentListings.filter(listing => listing.category === categoryFilter);
    }

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      currentListings = currentListings.filter(listing =>
        listing.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        listing.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    if (sortOption === 'priceAsc') {
      currentListings.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceDesc') {
      currentListings.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'dateAsc') {
      currentListings.sort((a, b) => a.timestamp - b.timestamp);
    } else if (sortOption === 'dateDesc') {
      currentListings.sort((a, b) => b.timestamp - a.timestamp);
    }

    const totalItems = currentListings.length;
    setTotalPages(Math.ceil(totalItems / ITEMS_PER_PAGE));

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedListings = currentListings.slice(startIndex, endIndex);

    setFilteredListings(paginatedListings);

    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set('page', currentPage.toString());
    newSearchParams.set('sortBy', sortOption);
    navigate({ search: newSearchParams.toString() }, { replace: true });

  }, [categoryFilter, searchTerm, allListings, currentPage, sortOption, location.search, navigate]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto p-4">
      {/* ... (pozostały kod renderujący) */}
       <h1 className="text-2xl font-bold mb-6">
        {categoryFilter ? `Ogłoszenia w kategorii: ${categoryFilter}` : searchTerm ? `Wyniki wyszukiwania dla: "${searchTerm}"` : 'Wszystkie Ogłoszenia'}
      </h1>

      <div className="mb-4 flex items-center">
        <label htmlFor="sort" className="mr-2 text-gray-700 font-bold">Sortuj według:</label>
        <select
          id="sort"
          value={sortOption}
          onChange={handleSortChange}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="dateDesc">Najnowsze</option>
          <option value="dateAsc">Najstarsze</option>
          <option value="priceAsc">Cena: od najniższej</option>
          <option value="priceDesc">Cena: od najwyższej</option>
        </select>
      </div>


       {filteredListings.length === 0 && (
        <p className="text-center">Nie znaleziono ogłoszeń spełniających podane kryteria.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map(listing => (
          <Link
            key={listing.id}
            to={`/listings/${listing.id}`}
            className="bg-white rounded-lg shadow hover:shadow-md transition duration-300 ease-in-out overflow-hidden"
          >
            <img src={listing.image} alt={listing.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{listing.title}</h2>
              <p className="text-gray-600 mb-2">{listing.location}</p>
              <p className="text-olx-orange text-lg font-bold">{listing.price.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PLN</p>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Poprzednia
          </button>
          <span className="bg-gray-200 px-4 py-2 text-gray-800">Strona {currentPage} z {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Następna
          </button>
        </div>
      )}
    </div>
  );
};

export default ListingsPage;