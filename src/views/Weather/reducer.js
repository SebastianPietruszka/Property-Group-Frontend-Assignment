import { GET_WEATHER_FOR_CITY, GET_CITY_ID } from './constants';

const initialState = {
  weatherFetching: false,
  idCityFetch: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case `${GET_WEATHER_FOR_CITY}_START`:
      return { ...state, weatherFetching: true };
    case `${GET_WEATHER_FOR_CITY}_FULFILLED`:
      return {
        ...state,
        weatherFetching: false,
        cities: {
          ...state.cities,
          [action.additionalPayload.idCity]: {
            cityName: action.additionalPayload.cityName,
            idCity: action.additionalPayload.idCity,
            today: {
              date: action.payload.DailyForecasts[0].Date,
              maxTemperature: action.payload.DailyForecasts[0].Temperature.Maximum.Value,
              minTemperature: action.payload.DailyForecasts[0].Temperature.Minimum.Value,
              description: action.payload.DailyForecasts[0].Day.ShortPhrase,
              rainProbability: action.payload.DailyForecasts[0].Day.RainProbability,
              windSpeed: action.payload.DailyForecasts[0].Day.Wind.Speed.Value,
              icon: action.payload.DailyForecasts[0].Day.Icon,
            },
            tomorrow: {
              date: action.payload.DailyForecasts[1].Date,
              maxTemperature: action.payload.DailyForecasts[1].Temperature.Maximum.Value,
              minTemperature: action.payload.DailyForecasts[1].Temperature.Minimum.Value,
              description: action.payload.DailyForecasts[1].Day.ShortPhrase,
              rainProbability: action.payload.DailyForecasts[1].Day.RainProbability,
              windSpeed: action.payload.DailyForecasts[1].Day.Wind.Speed.Value,
              icon: action.payload.DailyForecasts[1].Day.Icon,
            },
          },
        },
      };
    case `${GET_WEATHER_FOR_CITY}_FAILED`:
      return { ...state, weatherFetching: false };

    case `${GET_CITY_ID}_START`:
      return { ...state, idCityFetch: true };
    case `${GET_CITY_ID}_FULFILLED`: {
      if (!action.payload[0]) {
        return {
          ...state,
          idCityFetch: false,
        };
      }

      const {
        LocalizedName: city,
        AdministrativeArea: { LocalizedName: district },
        Country: { LocalizedName: country },
        Key,
      } = action.payload[0];

      return {
        ...state,
        idCityFetch: false,
        idCity: Key,
        cityDetails: `${city}, ${district} (${country})`,
      };
    }

    case `${GET_CITY_ID}_FAILED`:
      return { ...state, weatherFetching: false };

    default:
      return state;
  }
};

export default reducer;
