
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth'; 
import React from 'react';
import { FIRE_BASE_AUTH } from '../context/firebaseconfig'; 

export default function useAuth() {
  const [user, setUser] = React.useState();
  const getLocalUser = async () => {
    try {
      const userJSON = await AsyncStorage.getItem('@user');
      const userData = userJSON ? JSON.parse(userJSON) : null;
      setUser(userData);
    } catch (e) {
      console.log(e, 'Error getting local user');
    } 
  }; 
  React.useEffect(() => {
    getLocalUser();
    const unsub = onAuthStateChanged(FIRE_BASE_AUTH, async (user) => {
      if (user) {
        await AsyncStorage.setItem('@user', JSON.stringify(user));
        setUser(user);
        console.log('got user:', user);
      } else {
        setUser(null);
        console.log('got user:', user);
      }
    });
    return unsub;
  }, []);
  return { user }; 
} 