import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './Style';

const ErrorScreen = ({onRetry}) => {
  return (
    <View style={styles.container}>
      {/* ↙︎ ALWAYS A STRING */}
      <Text style={styles.title}>{String('Oops, something went wrong')}</Text>

      <Text style={styles.subtitle}>
        {String('But don\u2019t worry – it\u2019s not your fault.')}
      </Text>

      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <Text style={styles.retryText}>{String('Retry')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorScreen;
