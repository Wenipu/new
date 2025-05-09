// src/utils/storage.js

import initialListingsData from '../data/listings';

export const getListings = () => {
  try {
    const storedListings = JSON.parse(localStorage.getItem('listings')) || [];
    const listingsWithMetadata = storedListings.map(listing => ({
        ...listing,
        id: listing.id || Date.now() + Math.random(),
        timestamp: listing.timestamp || Date.now(),
        // Dodaj domyślny status, jeśli jeszcze go nie ma
        status: listing.status || 'active', // <-- DODANE POLE STATUS
    }));

    const allListings = listingsWithMetadata.length > 0 ? listingsWithMetadata : initialListingsData.map(listing => ({
         ...listing,
         id: listing.id || Date.now() + Math.random(),
         timestamp: listing.timestamp || Date.now(),
         status: 'active', // <-- DODANE POLE STATUS DO DANYCH POCZĄTKOWYCH
    }));

    return allListings;
  } catch (error) {
    console.error("Błąd podczas pobierania ogłoszeń z localStorage:", error);
    return initialListingsData.map(listing => ({
         ...listing,
         id: listing.id || Date.now() + Math.random(),
         timestamp: listing.timestamp || Date.now(),
         status: 'active', // <-- DODANE POLE STATUS DO DANYCH POCZĄTKOWYCH W PRZYPADKU BŁĘDU
    }));
  }
};

export const saveListings = (listings) => {
  try {
    localStorage.setItem('listings', JSON.stringify(listings));
  } catch (error) {
    console.error("Błąd podczas zapisywania ogłoszeń do localStorage:", error);
  }
};

export const getUsers = () => {
   try {
     const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
     // Upewnij się, że użytkownicy mają nowe pola (z wartościami domyślnymi, jeśli ich brak)
     const usersWithNewFields = storedUsers.map(user => ({
         ...user,
         email: user.email || '', // <-- DODANE POLE EMAIL
         phoneNumber: user.phoneNumber || '', // <-- DODANE POLE PHONE NUMBER
         location: user.location || '', // <-- DODANE POLE LOCATION
         // Możesz dodać inne pola, np. profilePictureUrl
     }));
     return usersWithNewFields;
   } catch (error) {
     console.error("Błąd podczas pobierania użytkowników z localStorage:", error);
     return [];
   }
};

export const saveUsers = (users) => {
   try {
     localStorage.setItem('users', JSON.stringify(users));
   } catch (error) {
     console.error("Błąd podczas zapisywania użytkowników do localStorage:", error);
   }
};

export const getLoggedInUserId = () => {
    try {
        return localStorage.getItem('loggedInUserId');
    } catch (error) {
        console.error("Błąd podczas pobierania loggedInUserId z localStorage:", error);
        return null;
    }
};

export const setLoggedInUserId = (userId) => {
    try {
        localStorage.setItem('loggedInUserId', userId);
    } catch (error) {
         console.error("Błąd podczas zapisywania loggedInUserId do localStorage:", error);
    }
};

export const removeLoggedInUserId = () => {
     try {
        localStorage.removeItem('loggedInUserId');
     } catch (error) {
         console.error("Błąd podczas usuwania loggedInUserId z localStorage:", error);
     }
};

// Funkcja do pobierania listy obserwowanych ogłoszeń dla konkretnego użytkownika
export const getFavorites = (userId) => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
  return favorites[userId] || [];
};

// Funkcja do zapisywania listy obserwowanych ogłoszeń dla konkretnego użytkownika
const saveFavorites = (favorites) => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

// Funkcja do dodawania ogłoszenia do listy obserwowanych dla użytkownika
export const addFavorite = (userId, listingId) => {
  const favorites = getFavorites(userId);
  if (!favorites.includes(listingId)) {
    favorites.push(listingId);
    const allFavorites = JSON.parse(localStorage.getItem('favorites') || '{}');
    allFavorites[userId] = favorites;
    saveFavorites(allFavorites);
  }
};

// Funkcja do usuwania ogłoszenia z listy obserwowanych dla użytkownika
export const removeFavorite = (userId, listingId) => {
  const favorites = getFavorites(userId);
  const updatedFavorites = favorites.filter(id => id !== listingId);
  const allFavorites = JSON.parse(localStorage.getItem('favorites') || '{}');
  allFavorites[userId] = updatedFavorites;
  saveFavorites(allFavorites);
};

// Nowa funkcja do aktualizacji danych użytkownika
export const updateUser = (updatedUser) => {
    try {
        const users = getUsers(); // Pobierz wszystkich użytkowników
        const userIndex = users.findIndex(user => user.id === updatedUser.id); // Znajdź indeks edytowanego użytkownika

        if (userIndex !== -1) {
            users[userIndex] = updatedUser; // Zaktualizuj dane użytkownika w tablicy
            saveUsers(users); // Zapisz zaktualizowaną tablicę do localStorage
            console.log("Dane użytkownika zaktualizowane:", updatedUser);
        } else {
            console.error("Użytkownik o podanym ID nie znaleziono:", updatedUser.id);
        }
    } catch (error) {
        console.error("Błąd podczas aktualizacji użytkownika w localStorage:", error);
    }
};
