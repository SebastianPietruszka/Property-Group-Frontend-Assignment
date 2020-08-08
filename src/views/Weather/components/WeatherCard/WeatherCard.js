import React from 'react';
import PropTypes from 'prop-types';

import { getValueWithUnit, getFormattedDate } from 'Helpers';
import { UNITS } from '../../../../constants';

import './WeatherCard.scss';

function WeatherCard({
  date,
  maxTemperature,
  minTemperature,
  description,
  rainProbability,
  windSpeed,
  icon,
}) {
  return (
    <div className="WeatherCard">
      <div className="WeatherCard__date">{getFormattedDate(date)}</div>
      <div className="WeatherCard__main-info">
        <img
          className="WeatherCard__weather-image"
          src={`https://www.accuweather.com/images/weathericons/${icon}.svg`}
          alt={description}
        />
        <div>
          <div>Maksymalna temperatura: {getValueWithUnit(maxTemperature, UNITS.TEMPERATURE)}</div>
          <div>Minimalna temperatura: {getValueWithUnit(minTemperature, UNITS.TEMPERATURE)}</div>
          <div>
            Prawdopodobmieństwo opadów: {getValueWithUnit(rainProbability, UNITS.PERCENTAGE)}
          </div>
          <div>Wiatr: {getValueWithUnit(windSpeed, UNITS.WIND)}</div>
        </div>
      </div>

      <div className="WeatherCard__description">{description}</div>
    </div>
  );
}

WeatherCard.propTypes = {
  date: PropTypes.string.isRequired,
  maxTemperature: PropTypes.number.isRequired,
  minTemperature: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  rainProbability: PropTypes.number.isRequired,
  windSpeed: PropTypes.number.isRequired,
  icon: PropTypes.number.isRequired,
};

export default WeatherCard;
