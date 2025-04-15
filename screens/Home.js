import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import colors from '../colors';

const LogoImage = require('../assets/fire.png');

const Home = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <FontAwesome
          name="search"
          size={24}
          color={colors.gray}
          style={{ marginLeft: 15 }}
        />
      ),
      headerRight: () => (
        <Image
          source={LogoImage}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            marginRight: 15,
          }}
        />
      ),
    });
  }, [navigation]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
     
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Chat Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Chat')}
        style={styles.chatButton}
      >
        <Entypo name="chat" size={24} color={colors.lightGray} />
      </TouchableOpacity>

    
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.signOutButton}
      >
        <FontAwesome name="sign-out" size={22} color={colors.lightGray} />
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
  },
  chatButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: colors.primary,
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  signOutButton: {
    position: 'absolute',
    bottom: 30,
    right: 95, 
    backgroundColor: colors.primary,
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

/*- 

import { doc, setDoc } from 'firebase/firestore';

import { collection, getDocs } from 'firebase/firestore';
import { database } from '../config/firebase';
import { FlatList, Text } from 'react-native';
import { auth } from '../config/firebase';


await setDoc(doc(database, 'users', user.email), {
  email: user.email,
  displayName: user.displayName || '',
});

const [users, setUsers] = useState([]);

useEffect(() => {
  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(database, 'users'));
    const allUsers = [];
    querySnapshot.forEach(doc => {
      if (doc.id !== auth.currentUser.email) {
        allUsers.push(doc.data());
      }
    });
    setUsers(allUsers);
  };

  fetchUsers();
}, []);


-*/