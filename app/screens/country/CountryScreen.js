import React, {Component} from 'react';
import {Text, View, TextInput, FlatList, SafeAreaView} from 'react-native';
import {countryInputSubject, fetchCountryByName} from 'services/CountryService';
import {CountryDetail} from 'components';
import styles from './CountryScreen.style';

export class CountryScreen extends Component {
  constructor(props) {
    super(props);
    this.searchResult = countryInputSubject();
    this.state = {
      countryInfo: '',
      capitalCityWeather: '',
      error: false,
    };
  }
  componentDidMount() {
    this.countryObservable = this.searchResult.subscribe({
      next: this.handleInput,
    });
  }
  componentWillUnmount() {
    this.countryObservable.unsubscribe();
  }
  handleInput = (value) => {
    fetchCountryByName(value).subscribe(this.handleFetchedData);
  };
  handleChangeText = (text) => {
    this.searchResult.next(text);
  };
  handleFetchedData = (result) => {
    let state;
    if (result.error) {
      state = {error: true};
    } else {
      state = {error: false, countryInfo: result};
      //state = {error: false, capitalCityWeather: result};
    }
    this.setState(state);
  };
  handleDetailsPressed = (capitalCity) => {
    // this.details = fetchCapitalWeather(capitalCity).subscribe({
    //   next: (result) => console.log(result),
    //   complete: this.unsubscribeFromDetail,
    // });
  };
  unsubscribeFromDetail = () => {
    this.details.unsubscribe();
  };

  render() {
    const {countryInfo, error} = this.state;
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={{flex: 1}}>
          <TextInput
            onChangeText={this.handleChangeText}
            style={styles.inputField}
            placeholder="Start typing country name..."
          />
          {!error && (
            <FlatList
              data={countryInfo}
              keyExtractor={(item, index) => item.alpha2Code}
              renderItem={({item}) => (
                <CountryDetail
                  data={item}
                  onPress={this.handleDetailsPressed}
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

export default CountryScreen;
