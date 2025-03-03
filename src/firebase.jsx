import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRxbk_LtXFeDZZyld74tUE7inAM2G5qTI",
  authDomain: "neflix-clone-c8d45.firebaseapp.com",
  projectId: "neflix-clone-c8d45",
  storageBucket: "neflix-clone-c8d45.firebasestorage.app",
  messagingSenderId: "403541254365",
  appId: "1:403541254365:web:f1a13d2ecac6ea38713b34",
  measurementId: "G-Q8YKYLJN94"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
        return user;
    } catch (error) {
        console.error(error);
        alert(error);
    }
};   

const login = async (email, password) => {
    try {
         await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        alert (error);
    }
};

const logout =  () => {
     signOut(auth);
};

export { auth, db, login, signup, logout };