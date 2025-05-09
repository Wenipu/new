import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import categories from '../data/categories';
import { getListings, saveListings, getLoggedInUserId } from '../utils/storage'; // Importuj funkcje pomocnicze

const AddListingPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    location: '',
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({
        ...formData,
        image: null,
      });
      setImagePreview(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) {
      newErrors.title = 'Tytuł ogłoszenia jest wymagany.';
    }
    if (!formData.description) {
      newErrors.description = 'Opis jest wymagany.';
    }
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Podaj prawidłową cenę.';
    }
    if (!formData.category) {
      newErrors.category = 'Wybierz kategorię.';
    }
    if (!formData.location) {
      newErrors.location = 'Lokalizacja jest wymagana.';
    }
     if (formData.image && !formData.image.type.startsWith('image/')) {
       newErrors.image = 'Wybierz plik obrazu.';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error('Proszę popraw błędy w formularzu.');
      return;
    }

    const loggedInUserId = getLoggedInUserId(); // Użyj funkcji pomocniczej
    if (!loggedInUserId) {
       toast.error('Musisz być zalogowany, aby dodać ogłoszenie.');
       navigate('/login');
       return;
    }

    const processListing = (imageData) => {
       const newListing = {
        id: Date.now(),
        ...formData,
        price: parseFloat(formData.price),
        userId: parseInt(loggedInUserId),
        image: imageData, // Użyj base64 lub null
        timestamp: Date.now(), // Dodaj timestamp
      };

      const existingListings = getListings(); // Użyj funkcji pomocniczej
      saveListings([...existingListings, newListing]); // Użyj funkcji pomocniczej

      toast.success('Ogłoszenie zostało dodane!');
      navigate('/listings');
    };


    if (formData.image) {
      const reader = new FileReader();
      reader.onloadend = () => {
         processListing(reader.result); // Przekaż base64
      };
      reader.readAsDataURL(formData.image);
    } else {
       processListing(null); // Przekaż null, jeśli brak obrazka
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* ... (pozostały kod renderujący) */}
       <h1 className="text-2xl font-bold mb-6">Dodaj Nowe Ogłoszenie</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Tytuł Ogłoszenia:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.title ? 'border-red-500' : ''}`}
          />
          {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Opis:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 ${errors.description ? 'border-red-500' : ''}`}
          ></textarea>
          {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Cena (PLN):</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.price ? 'border-red-500' : ''}`}
          />
          {errors.price && <p className="text-red-500 text-xs italic">{errors.price}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Kategoria:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.category ? 'border-red-500' : ''}`}
          >
            <option value="">-- Wybierz kategorię --</option>
            {categories.map(category => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-xs italic">{errors.category}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 font-bold mb-2">Lokalizacja:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.location ? 'border-red-500' : ''}`}
          />
          {errors.location && <p className="text-red-500 text-xs italic">{errors.location}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Zdjęcie:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.image ? 'border-red-500' : ''}`}
          />
           {errors.image && <p className="text-red-500 text-xs italic">{errors.image}</p>}
        </div>

        {imagePreview && (
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Podgląd Zdjęcia:</label>
            <img src={imagePreview} alt="Podgląd" className="w-32 h-32 object-cover rounded-lg shadow-md" />
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-olx-orange hover:bg-olx-orange-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          >
            Dodaj Ogłoszenie
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddListingPage;