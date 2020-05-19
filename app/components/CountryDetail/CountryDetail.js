import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './CountryDetail.style';

const CountryDetail = ({data, onPress}) => {
  const handlePress = () => {
    onPress(data.capital);
  };
  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Text style={[styles.text, styles.textBold]}>{data.nativeName}</Text>
      <Text style={styles.text}>{data.capital}</Text>
      <Text style={styles.text}>{data.region}</Text>
      <Text style={styles.text}>{data.population}</Text>
    </TouchableOpacity>
  );
};

export default CountryDetail;
