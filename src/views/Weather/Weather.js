import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from 'UI/Grid';

import { getFormattedDiff } from 'Helpers';

import WeatherCard from './components/WeatherCard';

import { DIFF_PHRASE, UNITS } from '../../constants';
import { CITIES_IDS } from './constants';
import {
  getWeatherByCityId as getWeatherByCityIdAction,
  getCityId as getCityIdAction,
} from './actions';

import './Weather.scss';

const getRows = (cities, selectedCity) =>
  Object.values(cities)
    .filter(({ idCity }) => idCity !== selectedCity)
    .map(({ cityName, today: { minTemperature, maxTemperature, rainProbability, windSpeed } }) => ({
      key: cityName,
      cityName,
      minTemperature: getFormattedDiff(
        minTemperature,
        cities[selectedCity].today.minTemperature,
        DIFF_PHRASE.TEMPERATURE
      ),
      maxTemperature: getFormattedDiff(
        maxTemperature,
        cities[selectedCity].today.maxTemperature,
        DIFF_PHRASE.TEMPERATURE
      ),
      rainProbability: getFormattedDiff(
        rainProbability,
        cities[selectedCity].today.rainProbability,
        DIFF_PHRASE.PERCENTAGE,
        UNITS.PERCENTAGE_POINTS
      ),
      windSpeed: getFormattedDiff(
        windSpeed,
        cities[selectedCity].today.windSpeed,
        DIFF_PHRASE.WIND
      ),
    }));

const columns = [
  { columnName: 'Miasto', columnId: 'cityName' },
  { columnName: 'Minimalna Temperatura (°C)', columnId: 'minTemperature' },
  { columnName: 'Maksymalna Temperatura (°C)', columnId: 'maxTemperature' },
  { columnName: 'Prawdopodobieństwo opadów (%)', columnId: 'rainProbability' },
  { columnName: 'Wiatr (km/h)', columnId: 'windSpeed' },
];

function Weather({
  cities,
  idCity,
  cityDetails,
  getWeatherByCityId,
  weatherFetching,
  getCityId,
  idCityFetch,
}) {
  const { selectedCity } = useParams();
  const history = useHistory();

  useEffect(() => {
    getCityId(selectedCity)
      .then(res => {
        const cityKey = res[0]?.Key;
        if (!res.length) return history.push(`/404`);
        if (!cities[cityKey]) getWeatherByCityId(cityKey, selectedCity);

        return Object.keys(CITIES_IDS).forEach(city => {
          const { ID: id, NAME: name } = CITIES_IDS[city];

          if (!cities[id]) getWeatherByCityId(id, name);
        });
      })
      .catch(() => {
        alert(
          'Ups... przekroczono dzienny limit zapytań do AccuWeather. \nAby móc testować dalej, możesz zmienić klucz w pliku globalConsts.js'
        );
        history.push(`/404`);
      });
  }, [selectedCity]);

  if (!cities || !cities[idCity] || weatherFetching || idCityFetch)
    return (
      <div className="Weather__spinner">
        <CircularProgress />
      </div>
    );

  return (
    <>
      <h2>{cityDetails}</h2>
      <div className="Weather__cards">
        <WeatherCard {...cities[idCity].today} />
        <WeatherCard {...cities[idCity].tomorrow} />
      </div>
      <Grid rows={getRows(cities, idCity)} columns={columns} />
    </>
  );
}

const mapStateToProps = ({ cities, idCity, cityDetails, weatherFetching, idCityFetch }) => {
  return { cities, idCity, cityDetails, weatherFetching, idCityFetch };
};

const mapDispatchToProps = {
  getWeatherByCityId: getWeatherByCityIdAction,
  getCityId: getCityIdAction,
};

Weather.defaultProps = {
  cities: {},
  idCity: '',
  cityDetails: '',
};

Weather.propTypes = {
  cities: PropTypes.objectOf(
    PropTypes.shape({
      cityName: PropTypes.string,
      today: PropTypes.shape({
        date: PropTypes.string.isRequired,
        maxTemperature: PropTypes.number.isRequired,
        minTemperature: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        rainProbability: PropTypes.number.isRequired,
        windSpeed: PropTypes.number.isRequired,
        icon: PropTypes.number.isRequired,
      }),
      tomorrow: PropTypes.shape({
        date: PropTypes.string.isRequired,
        maxTemperature: PropTypes.number.isRequired,
        minTemperature: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        rainProbability: PropTypes.number.isRequired,
        windSpeed: PropTypes.number.isRequired,
        icon: PropTypes.number.isRequired,
      }),
    })
  ),
  idCityFetch: PropTypes.bool.isRequired,
  idCity: PropTypes.string,
  cityDetails: PropTypes.string,
  weatherFetching: PropTypes.bool.isRequired,
  getWeatherByCityId: PropTypes.func.isRequired,
  getCityId: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
