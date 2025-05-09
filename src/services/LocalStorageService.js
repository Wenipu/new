// src/services/localStorageService.js

// Existing functions (getAds, getAdById, saveAds, getUsers, getUserById, saveUsers, getLoggedInUser, setLoggedInUser)

// --- New functions ---

export const updateAd = (adId, updatedFields) => {
    const ads = getAds();
    const adIndex = ads.findIndex(ad => ad.id === adId);

    if (adIndex === -1) {
        console.error("Ad not found with ID:", adId);
        return false;
    }

    ads[adIndex] = { ...ads[adIndex], ...updatedFields };
    saveAds(ads);
    return true;
};

export const addMessageToUser = (userId, message) => {
    const users = getUsers();
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
        console.error("User not found with ID:", userId);
        return false;
    }

    if (!users[userIndex].receivedMessages) {
        users[userIndex].receivedMessages = [];
    }

    users[userIndex].receivedMessages.push({
        id: Date.now(), // Simple unique ID
        ...message,
        timestamp: new Date().toISOString()
    });

    saveUsers(users);
    return true;
};

// You might also want a function to get messages for a user
export const getUserMessages = (userId) => {
    const user = getUserById(userId);
    return user ? (user.receivedMessages || []) : [];
};

// And potentially a function to mark messages as read (optional)
// export const markMessageAsRead = (userId, messageId) => { ... }
