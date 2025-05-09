import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUsers, setLoggedInUserId } from '../utils/storage'; // Importuj funkcje pomocnicze

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email jest wymagany.';
    }
    if (!formData.password) {
      newErrors.password = 'Hasło jest wymagane.';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error('Proszę uzupełnij wymagane pola.');
      return;
    }

    const existingUsers = getUsers(); // Użyj funkcji pomocniczej
    const user = existingUsers.find(user => user.email === formData.email && user.password === formData.password);

    if (user) {
      setLoggedInUserId(user.id); // Użyj funkcji pomocniczej
      toast.success('Logowanie zakończone sukcesem!');
      navigate('/dashboard');
    } else {
      toast.error('Błędny email lub hasło.');
    }
  };

  return (
    <div className="container mx-auto p-4 flex justify-center">
      {/* ... (pozostały kod renderujący) */}
       <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Zaloguj się</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Hasło:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
            />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-olx-orange hover:bg-olx-orange-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out w-full"
            >
              Zaloguj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;