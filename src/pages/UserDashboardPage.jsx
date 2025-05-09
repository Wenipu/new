// src/pages/UserDashboardPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getListings, saveListings, getUsers, getLoggedInUserId, getFavorites } from '../utils/storage';

const UserDashboardPage = () => {
  const navigate = useNavigate();
  const [userListings, setUserListings] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    const loggedInUserId = getLoggedInUserId();
    if (!loggedInUserId) {
      toast.error('Musisz być zalogowany, aby zobaczyć ten panel.');
      navigate('/login');
      return;
    }

    const users = getUsers();
    const currentUser = users.find(user => user.id === parseInt(loggedInUserId));
    setLoggedInUser(currentUser);

    const allListings = getListings();
    const usersListings = allListings.filter(listing => listing.userId === parseInt(loggedInUserId));
    setUserListings(usersListings);

    const userFavorites = getFavorites(loggedInUserId);
    setFavoriteCount(userFavorites.length);


  }, [navigate]);

  const handleDeleteListing = (id) => {
    if (window.confirm('Czy na pewno chcesz usunąć to ogłoszenie?')) {
      const allListings = getListings();
      const updatedListings = allListings.filter(listing => listing.id !== id);
      saveListings(updatedListings);
      setUserListings(updatedListings.filter(listing => listing.userId === parseInt(getLoggedInUserId())));
      toast.success('Ogłoszenie zostało usunięte.');
    }
  };

  // Nowa funkcja do zmiany statusu ogłoszenia
  const handleChangeListingStatus = (id, newStatus) => {
      const allListings = getListings();
      const updatedListings = allListings.map(listing => {
          if (listing.id === id) {
              return { ...listing, status: newStatus };
          }
          return listing;
      });
      saveListings(updatedListings);
      setUserListings(updatedListings.filter(listing => listing.userId === parseInt(getLoggedInUserId()))); // Odśwież listę użytkownika
      toast.success(`Status ogłoszenia zmieniono na: ${newStatus}`);
  };


  if (!loggedInUser) {
    return <div className="container mx-auto p-4 text-center">Ładowanie...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Witaj, {loggedInUser.username}!</h1>

      {/* Sekcja z linkami do panelu użytkownika */}
      <div className="mb-6 flex space-x-4">
         <Link
            to="/favorites"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
         >
            Moje Obserwowane Ogłoszenia ({favoriteCount})
         </Link>

         {/* Dodaj link do strony edycji profilu */}
         <Link
            to="/edit-profile"
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
         >
            Edytuj Profil
         </Link>
      </div>


      <h2 className="text-xl font-semibold mb-4">Twoje Ogłoszenia:</h2>
      {userListings.length === 0 ? (
        <p>Nie masz jeszcze żadnych ogłoszeń.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userListings.map(listing => (
            <div key={listing.id} className="bg-white rounded-lg shadow overflow-hidden">
              {listing.image && (
                 <img src={listing.image} alt={listing.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{listing.title}</h3>
                 {/* Wyświetl status ogłoszenia */}
                <p className={`text-sm mb-2 ${listing.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                    Status: {listing.status === 'active' ? 'Aktywne' : 'Sprzedane'}
                </p>
                <p className="text-olx-orange font-bold mb-2">{listing.price.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PLN</p>
                <div className="flex flex-col space-y-2"> {/* Zmieniono na flex-col dla lepszego wyglądu przycisków */}
                  <Link
                    to={`/listings/${listing.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Zobacz
                  </Link>
                  <Link
                    to={`/edit-listing/${listing.id}`}
                    className="text-green-500 hover:underline"
                  >
                    Edytuj
                  </Link>
                   <button
                    onClick={() => handleDeleteListing(listing.id)}
                    className="text-red-500 hover:underline"
                  >
                    Usuń
                  </button>
                   {/* Przyciski do zmiany statusu */}
                   {listing.status === 'active' ? (
                       <button
                           onClick={() => handleChangeListingStatus(listing.id, 'sold')}
                           className="text-yellow-600 hover:underline"
                       >
                           Oznacz jako Sprzedane
                       </button>
                   ) : (
                       <button
                           onClick={() => handleChangeListingStatus(listing.id, 'active')}
                           className="text-green-600 hover:underline"
                       >
                           Wznów Ogłoszenie
                       </button>
                   )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default UserDashboardPage;