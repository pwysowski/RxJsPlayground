import {of, Subject, Observable, forkJoin, from} from 'rxjs';
import {fromFetch} from 'rxjs/fetch';
import {
  switchMap,
  catchError,
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  concatMap,
  mergeMap,
} from 'rxjs/operators';
import {api, countries} from 'constants';

const fetchCountryByName = (name) => {
  return fromFetch(api.countryByName(name)).pipe(
    switchMap((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return of({error: true, message: response.status});
      }
    }),
    catchError((err) => {
      return of({error: true, message: err.message});
    }),
  );
};

// fork join
const fetchWeatherForCountriesOrder = () => {
  return forkJoin(
    fetchCountryByName('Poland').pipe(
      concatMap((country) => fetchCapitalWeather(country)),
    ),
    fetchCountryByName('Germany').pipe(
      concatMap((country) => fetchCapitalWeather(country)),
    ),
    fetchCountryByName('France').pipe(
      concatMap((country) => fetchCapitalWeather(country)),
    ),
  );
};

//merge map
const fetchWeatherForCountriesRandomOrder = () => {
  return from(countries).pipe(
    mergeMap((country) =>
      fetchCountryByName(country).pipe(
        concatMap((c) => fetchCapitalWeather(c)),
      ),
    ),
  );
};

const fetchCapitalWeather = (countriesArray) => {
  const capitalCity = countriesArray[0]?.capital;
  return fromFetch(api.capitalWeather(capitalCity)).pipe(
    switchMap((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return of({error: true, message: response.status});
      }
    }),
    catchError((err) => {
      return of({error: true, message: err.message});
    }),
  );
};

const countryInputSubject = () => {
  return new Subject().pipe(
    debounceTime(1000),
    map((e) => {
      return e;
    }),
    filter((text) => {
      return text.length > 2;
    }),
    distinctUntilChanged(),
  );
};

const concatWeatherAndCountry = (input) => {
  const countries = fetchCountryByName(input);
  return countries.pipe(concatMap((value) => fetchCapitalWeather(value)));
};

export {
  countryInputSubject,
  fetchCountryByName,
  concatWeatherAndCountry,
  fetchWeatherForCountriesOrder,
  fetchWeatherForCountriesRandomOrder,
};
