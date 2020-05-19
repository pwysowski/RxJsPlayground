import React, {Component} from 'react';
import {Text, View, TextInput, FlatList, SafeAreaView} from 'react-native';
import {
  fetchWeatherForCountriesOrder,
  fetchWeatherForCountriesRandomOrder,
} from 'services/CountryService';
import {CountryWeather} from 'components';
import styles from './CountriesWithWeather.style';

export class CountriesWithWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherInfo: [],
      error: false,
    };
  }
  componentDidMount() {
    this.weather = fetchWeatherForCountriesRandomOrder().subscribe(
      this.handleFetchedData,
    );
  }
  componentWillUnmount() {
    this.weather.unsubscribe();
  }
  handleFetchedData = (result) => {
    const prevState = this.state;
    let state;
    if (result.error) {
      state = {error: true};
    } else {
      state = {error: false, weatherInfo: [...prevState.weatherInfo, result]};
    }
    console.log(state);
    this.setState(state);
  };
  render() {
    const {weatherInfo, error} = this.state;
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={{flex: 1}}>
          {!error && (
            <FlatList
              data={weatherInfo}
              renderItem={({item}) => (
                <CountryWeather
                  capital={item.name}
                  description={item.weather[0].description}
                />
              )}
            />
          )}
          {error && <Text>Not found</Text>}
        </View>
      </SafeAreaView>
    );
  }
}

export default CountriesWithWeather;
