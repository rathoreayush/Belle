// File: src/screens/ComingSoonScreen.js

import React from 'react';
import {SafeAreaView, View, Text, StyleSheet, Image} from 'react-native';

const ComingSoonScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* <Image
          source={ComingSoonImage}
          style={styles.image}
          resizeMode="contain"
        /> */}
        <Text style={styles.title}>Coming Soon</Text>
        <Text style={styles.subtitle}>
          We’re working hard to bring you this feature. Stay tuned!
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6B7280',
  },
});

export default ComingSoonScreen;
