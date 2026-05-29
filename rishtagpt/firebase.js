/* Firebase initialization and Authentication wrapper for Google Login */

(function () {
  const firebaseConfig = {
    apiKey: "AIzaSyCAuHw0kR6mLV382Qz9dAo3P8ID_Wg1Tic",
    authDomain: "rishtagpt-15ab6.firebaseapp.com",
    projectId: "rishtagpt-15ab6",
    storageBucket: "rishtagpt-15ab6.firebasestorage.app",
    messagingSenderId: "1000733149485",
    appId: "1:1000733149485:web:c8d69fbb5f5540614aba4",
    measurementId: "G-RSQKBQKT54"
  };

  // Initialize Firebase app safely
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const auth = firebase.auth();
  const db = firebase.firestore();
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  // Custom styling to force standard Google Account chooser
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  window.RG_Firebase = {
    auth,
    db,
    loginWithGoogle: async () => {
      try {
        const result = await auth.signInWithPopup(googleProvider);
        return result.user;
      } catch (error) {
        console.error("Firebase Auth Google Popup Error:", error);
        throw error;
      }
    },
    logout: () => auth.signOut(),
    getCurrentUser: () => auth.currentUser,
    onAuthStateChanged: (callback) => auth.onAuthStateChanged(callback)
  };
})();
