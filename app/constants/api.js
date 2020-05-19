const api = {
  countryByName: (name) => 'https://restcountries.eu/rest/v2/name/' + name,
  capitalWeather: (city) =>
    `https:/api.openweathermap.org/data/2.5/weather?q=${city}&appid=3363621f5d03c03be5a4ce4bd6400cfe`,
};

export default api;
