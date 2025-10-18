// auth.firebase.js
(function(){
  // ⚠️ Replace with your own Firebase project config
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAyByi1Wzze-zlcfS6OpK0gMa36rlF1BFs",
    authDomain: "cv-builder-14ae9.firebaseapp.com",
    projectId: "cv-builder-14ae9",
    storageBucket: "cv-builder-14ae9.firebasestorage.app",
    messagingSenderId: "769809338403",
    appId: "1:769809338403:web:44a6234446b3780e38a196",
    measurementId: "G-9GBMHWR9HM"
  };

  try{ firebase.initializeApp(firebaseConfig); }catch(e){ /* already initialized or missing */ }

  const auth = firebase.apps.length? firebase.auth() : null;

  const listeners = new Set();
  if(auth){
    auth.onAuthStateChanged(u=>{
      const user = u? {uid:u.uid, email:u.email, displayName:u.displayName} : null;
      listeners.forEach(fn=>fn(user));
    });
  }

  function onAuthChange(fn){ listeners.add(fn); fn(auth?.currentUser||null); return ()=>listeners.delete(fn); }
  async function signInWithGoogle(){
    if(!auth){ alert('Firebase not configured. Using local storage.'); return; }
    const p = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(p);
  }
  async function signInWithApple(){
    if(!auth){ alert('Firebase not configured. Using local storage.'); return; }
    const p = new firebase.auth.OAuthProvider('apple.com');
    await auth.signInWithPopup(p);
  }
  async function signOut(){ if(!auth) return; await auth.signOut(); }

  window.Auth = { onAuthChange, signInWithGoogle, signInWithApple, signOut };
})();