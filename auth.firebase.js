// auth.firebase.js
(function(){
  // ⚠️ Replace with your own Firebase project config
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID",
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