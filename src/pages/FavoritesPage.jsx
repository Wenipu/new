import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// Importuj funkcje do zarządzania obserwowanymi i ogłoszeniami
import { getLoggedInUserId, getFavorites, getListings } from '../utils/storage';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const [favoriteListings, setFavoriteListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  useEffect(() => {
    const currentUserId = getLoggedInUserId();
    setLoggedInUserId(currentUserId);

    if (!currentUserId) {
      toast.info('Musisz być zalogowany, aby zobaczyć swoje ulubione ogłoszenia.');
      navigate('/login');
      return;
    }

    // Pobierz listę ID obserwowanych ogłoszeń dla zalogowanego użytkownika
    const userFavoriteIds = getFavorites(currentUserId);

    // Pobierz wszystkie ogłoszenia
    const allListings = getListings();

    // Filtruj wszystkie ogłoszenia, aby znaleźć te, które są na liście obserwowanych ID
    const usersFavoriteListings = allListings.filter(listing => userFavoriteIds.includes(listing.id));

    setFavoriteListings(usersFavoriteListings);
    setLoading(false);

  }, [navigate]);

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Ładowanie...</div>;
  }

  if (!loggedInUserId) {
    // Nie renderuj niczego, jeśli użytkownik nie jest zalogowany i został przekierowany
    return null;
  }


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Twoje Obserwowane Ogłoszenia</h1>

      {favoriteListings.length === 0 ? (
        <p>Nie masz jeszcze żadnych obserwowanych ogłoszeń.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteListings.map(listing => (
            <div key={listing.id} className="bg-white rounded-lg shadow overflow-hidden">
              <img src={listing.image} alt={listing.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{listing.title}</h3>
                <p className="text-olx-orange font-bold mb-2">{listing.price.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PLN</p>
                <div className="flex justify-between">
                  <Link
                    to={`/listings/${listing.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Zobacz
                  </Link>
                  {/* Opcjonalnie możesz dodać przycisk "Usuń z obserwowanych" tutaj */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;