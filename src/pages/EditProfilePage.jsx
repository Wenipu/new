// src/pages/EditProfilePage.jsx
import { Link } from 'react-router-dom'; // <-- Dodaj tę linię
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUsers, getLoggedInUserId, updateUser } from '../utils/storage'; // Importuj updateUser

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    location: '',
    // Możesz dodać więcej pól do edycji
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedInUserId = getLoggedInUserId();
    if (!loggedInUserId) {
      toast.error('Musisz być zalogowany, aby edytować profil.');
      navigate('/login');
      return;
    }

    const users = getUsers();
    const currentUser = users.find(user => user.id === parseInt(loggedInUserId));

    if (!currentUser) {
      toast.error('Nie znaleziono danych użytkownika.');
      navigate('/dashboard'); // Przekieruj do dashboardu, jeśli użytkownik nie znaleziono
      return;
    }

    setUser(currentUser);
    // Uzupełnij formularz danymi z Local Storage
    setFormData({
      username: currentUser.username || '',
      email: currentUser.email || '',
      phoneNumber: currentUser.phoneNumber || '',
      location: currentUser.location || '',
    });

    setLoading(false);

  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
        toast.error('Błąd: brak danych użytkownika.');
        return;
    }

    // Tutaj możesz dodać walidację formularza, np. czy email jest poprawny

    const updatedUser = {
        ...user, // Zachowaj istniejące dane (np. id, password)
        username: formData.username,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        location: formData.location,
        // Zaktualizuj inne pola
    };

    updateUser(updatedUser); // Zapisz zaktualizowane dane w Local Storage
    toast.success('Profil został zaktualizowany!');
    navigate('/dashboard'); // Przekieruj z powrotem do dashboardu

  };

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Ładowanie...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Edytuj Profil</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Nazwa użytkownika:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">
            Numer telefonu:
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
         <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
            Lokalizacja:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Możesz dodać pole do zmiany hasła, ale to wymagałoby dodatkowej logiki i walidacji */}
        {/* <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Nowe hasło:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div> */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          >
            Zapisz Zmiany
          </button>
           <Link
            to="/dashboard"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Anuluj
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;