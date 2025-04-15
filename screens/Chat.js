import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Platform,
  View,
  Image,
} from 'react-native';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { auth, database } from '../config/firebase';
import { Ionicons } from '@expo/vector-icons';

// Fire assets
const backgroundImage = require('../assets/fire-bg.jpg');
const fireLogo = require('../assets/fire.png');

export default function Chat({ navigation }) {
  const [messages, setMessages] = useState([]);

  // Show fire icon in header
  useEffect(() => {
    navigation.setOptions({
      title: '🔥 FireChat',
      headerRight: () => (
        <Image
          source={fireLogo}
          style={{ width: 50, height: 40, marginRight: 15 }}
          resizeMode="contain"
        />
      ),
      headerStyle: { backgroundColor: '#fff' },
      headerTitleStyle: { color: '#1f1c2c' }, // fixed hex
    });
  }, [navigation]);

  // Load messages from Firebase
  useEffect(() => {
    const chatRef = collection(database, 'chats');
    const q = query(chatRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedMessages = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          _id: doc.id,
          text: data.text || '',
          createdAt: data.createdAt?.toDate?.() || new Date(),
          user: data.user || {},
        };
      });
      setMessages(loadedMessages);
    });

    return unsubscribe;
  }, []);

  const onSend = useCallback((newMessages = []) => {
    setMessages(previous => GiftedChat.append(previous, newMessages));

    const { _id, createdAt, text, user } = newMessages[0];

    addDoc(collection(database, 'chats'), {
      _id,
      createdAt: new Date(),
      text,
      user,
    }).catch(console.log);
  }, []);

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#ff5722',
          padding: 6,
          borderRadius: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
          elevation: 4,
        },
        left: {
          backgroundColor: '#ffe0b2',
          padding: 6,
          borderRadius: 12,
        },
      }}
      textStyle={{
        right: {
          color: '#fff',
        },
        left: {
          color: '#000',
        },
      }}
    />
  );

  const renderInputToolbar = (props) => (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: '#fff',
        borderTopColor: '#ff9800',
        borderTopWidth: 1,
        padding: 6,
      }}
      primaryStyle={{ alignItems: 'center' }}
    />
  );

  const renderSend = (props) => (
    <Send {...props}>
      <View style={styles.sendButton}>
        <Ionicons name="send" size={24} color="#ff5722" />
      </View>
    </Send>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        style={styles.background}
        imageStyle={{ opacity: 0.3 }}
        resizeMode="cover"
      >
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: auth?.currentUser?.email || 'anonymous',
          }}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          renderSend={renderSend}
          messagesContainerStyle={styles.messagesContainer}
          placeholder="Type a fiery message 🔥"
          alwaysShowSend
        />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    flex: 1,
  },
  messagesContainer: {
    backgroundColor: 'transparent',
    paddingBottom: Platform.OS === 'android' ? 30 : 20,
  },
  sendButton: {
    marginRight: 15,
    marginBottom: 5,
    marginTop: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
});


/*-
  
  addDoc(collection(database, 'chats'), {
  text,
  createdAt: new Date(),
  senderId: auth.currentUser.email,
  receiverId: selectedUser.email, // This is the person I’m chatting with
});


const q = query(
  collection(database, 'chats'),
  where('senderId', 'in', [currentUser, selectedUser]),
  where('receiverId', 'in', [currentUser, selectedUser]),
  orderBy('createdAt', 'desc')
);

-*/