// src/components/CheckoutModal.js
import React, { useState } from 'react';
import './CheckoutModal.css'; // Stworzymy ten plik CSS

const CheckoutModal = ({ ad, onClose, onPaymentSuccess }) => {
    const [blikCode, setBlikCode] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handlePayment = () => {
        setError('');
        setIsLoading(true);

        // Basic validation: check if BLIK code is 6 digits
        if (!/^\d{6}$/.test(blikCode)) {
            setError("BLIK code must be 6 digits.");
            setIsLoading(false);
            return;
        }

        // Simulate a payment process delay
        setTimeout(() => {
            setIsLoading(false);
            // In a real app, you'd integrate with a payment gateway here.
            // For simulation, any 6 digits is considered success.
            onPaymentSuccess();
        }, 2000); // Simulate 2-second payment processing
    };

    if (!ad) {
        return null; // Don't render if no ad data
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Complete Purchase</h2>
                <p>You are about to buy: <strong>{ad.title}</strong></p>
                <p>Price: <strong>{ad.price} zł</strong></p>

                <div className="blik-input-group">
                    <label htmlFor="blikCode">Enter BLIK Code:</label>
                    <input
                        type="text"
                        id="blikCode"
                        value={blikCode}
                        onChange={(e) => setBlikCode(e.target.value)}
                        maxLength="6"
                        disabled={isLoading}
                    />
                </div>

                {error && <p className="error-message">{error}</p>}

                <button onClick={handlePayment} disabled={isLoading || blikCode.length !== 6}>
                    {isLoading ? 'Processing...' : 'Confirm Payment'}
                </button>
                <button onClick={onClose} disabled={isLoading}>Cancel</button>

                <p className="simulation-note">
                    <em>(This is a payment simulation. Any 6-digit code will be accepted.)</em>
                </p>
            </div>
        </div>
    );
};

export default CheckoutModal;