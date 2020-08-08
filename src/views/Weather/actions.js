import { getApiElements } from 'Helpers/api';
import { GET_WEATHER_FOR_CITY, GET_CITY_ID } from './constants';
import { API_KEY } from '../../../globalConsts';

export const getWeatherByIdCity = (idCity, cityName) =>
  getApiElements(
    `forecasts/v1/daily/5day/${idCity}?apikey=${API_KEY}&language=pl&details=true&metric=true`,
    GET_WEATHER_FOR_CITY,
    { idCity, cityName }
  );

export const getCityId = cityName =>
  getApiElements(
    `locations/v1/cities/search?apikey=${API_KEY}&q=${cityName}&language=pl`,
    GET_CITY_ID
  );
