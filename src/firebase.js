import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyCdAWpYcudhY0D4RV-w12lMiU7gmldOU2I",
  authDomain: "aqua-water-e86ef.firebaseapp.com",
  projectId: "aqua-water-e86ef",
  storageBucket: "aqua-water-e86ef.firebasestorage.app",
  messagingSenderId: "801574740295",
  appId: "1:801574740295:web:cf253eb2364cb385356c62",
  measurementId: "G-PGJZZ9T83F"
};

const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;

