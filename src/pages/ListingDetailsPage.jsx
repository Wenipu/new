import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// Importuj nowe funkcje pomocnicze do zarządzania obserwowanymi
import { getListings, getLoggedInUserId, getFavorites, addFavorite, removeFavorite } from '../utils/storage';

const ListingDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false); // Nowy stan do śledzenia, czy ogłoszenie jest obserwowane
  const [loggedInUserId, setLoggedInUserId] = useState(null); // Stan do przechowywania ID zalogowanego użytkownika

  useEffect(() => {
    const currentUserId = getLoggedInUserId();
    setLoggedInUserId(currentUserId); // Zapisz ID zalogowanego użytkownika w stanie

    const allListings = getListings();
    const foundListing = allListings.find(item => item.id === parseInt(id));

    if (foundListing) {
      // Dodaj pole phoneNumber do danych ogłoszenia (na potrzeby przykładu)
      // W rzeczywistości powinno to pochodzić z Twojego źródła danych
      if (!foundListing.phoneNumber) {
        foundListing.phoneNumber = '123-456-789'; // Przykładowy numer
      }
      setListing(foundListing);

      // Sprawdź, czy ogłoszenie jest już na liście obserwowanych dla zalogowanego użytkownika
      if (currentUserId) { // Sprawdź, czy użytkownik jest zalogowany
        const userFavorites = getFavorites(currentUserId);
        setIsFavorite(userFavorites.includes(parseInt(id)));
      }

    } else {
      toast.error('Ogłoszenie nie znaleziono.');
      navigate('/listings');
    }
    setLoading(false);
  }, [id, navigate]); // Dodaj navigate do zależności useEffect

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Ładowanie...</div>;
  }

  if (!listing) {
    return null;
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleContactSellerClick = () => {
    setShowPhoneNumber(!showPhoneNumber);
  };

  const handleBuyNowClick = () => {
    navigate(`/payment/blik/${listing.id}`);
  };

  // Nowa funkcja do obsługi dodawania/usuwania z listy obserwowanych
  const handleToggleFavorite = () => {
    if (!loggedInUserId) {
      toast.info('Musisz być zalogowany, aby dodać ogłoszenie do ulubionych.');
      navigate('/login'); // Przekieruj do strony logowania
      return;
    }

    const listingId = parseInt(id); // Upewnij się, że ID jest liczbą

    if (isFavorite) {
      removeFavorite(loggedInUserId, listingId);
      toast.success('Ogłoszenie usunięte z ulubionych.');
    } else {
      addFavorite(loggedInUserId, listingId);
      toast.success('Ogłoszenie dodane do ulubionych.');
    }
    setIsFavorite(!isFavorite); // Przełącz stan isFavorite
  };


  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {listing.image && (
          <img src={listing.image} alt={listing.title} className="w-full h-96 object-cover" />
        )}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
          <p className="text-3xl font-bold text-olx-orange mb-4">{listing.price.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PLN</p>

          {listing.timestamp && (
             <p className="text-gray-600 mb-4 text-sm">Dodano: {formatDate(listing.timestamp)}</p>
          )}

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Opis:</h2>
            <p className="text-gray-700">{listing.description}</p>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Szczegóły:</h2>
            <p className="text-gray-700"><strong>Kategoria:</strong> {listing.category}</p>
            <p className="text-gray-700"><strong>Lokalizacja:</strong> {listing.location}</p>
             <p className="text-gray-700"><strong>Sprzedawca:</strong> Użytkownik {listing.userId}</p>
          </div>

          {/* Kontener dla przycisków */}
          <div className="flex items-center">
            <button
              onClick={handleContactSellerClick}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out mr-4"
            >
              Skontaktuj się ze sprzedawcą
            </button>

            <button
              onClick={handleBuyNowClick}
              className="bg-olx-orange text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out mr-4" // Dodaj margines po prawej
            >
              Kup Teraz
            </button>

            {/* Przycisk "Dodaj do obserwowanych" */}
            <button
              onClick={handleToggleFavorite}
              // Zmień kolor i tekst w zależności od stanu isFavorite
              className={`${isFavorite ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out`}
            >
              {isFavorite ? 'Usuń z obserwowanych' : 'Dodaj do obserwowanych'}
            </button>
          </div>


          {/* Warunkowe wyświetlanie numeru telefonu */}
          {showPhoneNumber && (
            <p className="text-gray-800 font-semibold mt-2">Numer telefonu: {listing.phoneNumber}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingDetailsPage;