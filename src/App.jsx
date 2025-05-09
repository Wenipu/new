// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import ListingDetailsPage from './pages/ListingDetailsPage';
import AddListingPage from './pages/AddListingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboardPage from './pages/UserDashboardPage';
import BlikPaymentPage from './pages/BlikPaymentPage';
import EditListingPage from './pages/EditListingPage';
import AboutPage from './pages/AboutPage';
import FavoritesPage from './pages/FavoritesPage';
import EditProfilePage from './pages/EditProfilePage'; // <-- Importuj nowy komponent

import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
             <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/listings" element={<ListingsPage />} />
                <Route path="/listings/:id" element={<ListingDetailsPage />} />
                <Route path="/add-listing" element={<AddListingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<UserDashboardPage />} />
                <Route path="/payment/blik/:listingId" element={<BlikPaymentPage />} />
                <Route path="/edit-listing/:id" element={<EditListingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/edit-profile" element={<EditProfilePage />} /> {/* <-- Nowa trasa */}
             </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;