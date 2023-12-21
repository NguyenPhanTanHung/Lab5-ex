import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import firebaseStore from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDX-C_YRj-kyZNpIrHL9P9-trKS9LZYPkk",
  authDomain: "lab4-5-1f725.firebaseapp.com",
  projectId: "lab4-5-1f725",
  storageBucket: "lab4-5-1f725.appspot.com",
  messagingSenderId: "411416187067",
  appId: "1:411416187067:web:f9f1f8b1f6dfeba187599e"
};
export { firebaseStore };
export const FIRE_BASE_EXPO_APP = initializeApp(firebaseConfig);
export const FIRE_BASE_AUTH = getAuth(FIRE_BASE_EXPO_APP);
