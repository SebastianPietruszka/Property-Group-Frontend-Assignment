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
  getWeatherByIdCity as getWeatherByIdCityAction,
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
  getWeatherByIdCity,
  weatherFetching,
  getCityId,
  idCityFetch,
}) {
  const { selectedCity } = useParams();
  const history = useHistory();

  useEffect(() => {
    getCityId(selectedCity).then(res => {
      if (!res.length) return history.push(`/404`);

      return Promise.all([
        getWeatherByIdCity(res[0].Key, selectedCity),
        getWeatherByIdCity(CITIES_IDS.WARSAW, 'Warszawa'),
        getWeatherByIdCity(CITIES_IDS.CRACOW, 'Kraków'),
      ]).catch(() => history.push(`/404`));
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
      <Grid
        rows={getRows(cities, idCity)}
        columns={columns}
        cities={cities}
        selectedCity={selectedCity}
      />
    </>
  );
}

const mapStateToProps = ({ cities, idCity, cityDetails, weatherFetching, idCityFetch }) => {
  return { cities, idCity, cityDetails, weatherFetching, idCityFetch };
};

const mapDispatchToProps = {
  getWeatherByIdCity: getWeatherByIdCityAction,
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
  getWeatherByIdCity: PropTypes.func.isRequired,
  getCityId: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
