import React from 'react';
import {Text, View} from 'react-native';
import styles from './CountryWeather.style';

const CountryDetail = ({capital, description}) => {
  return (
    <View style={styles.card}>
      <Text style={[styles.text, styles.textBold]}>{capital}</Text>
      <Text style={styles.text}>{description}</Text>
    </View>
  );
};

export default CountryDetail;
