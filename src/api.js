
export function login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "admin@admin.com" && password === "1234") {
          resolve({ token: "fake-jwt-token" });
        } else {
          reject(new Error("Nieprawidłowe dane logowania"));
        }
      }, 1000);
    });
  }
  
  export function register(name, email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password && name) {
          resolve({ message: "Rejestracja udana!" });
        } else {
          reject(new Error("Wszystkie pola są wymagane"));
        }
      }, 1000);
    });
  }
  