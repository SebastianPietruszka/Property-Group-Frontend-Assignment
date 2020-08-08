import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './SearchLocation.scss';

function SearchLocation() {
  const { selectedCity } = useParams();
  const [searchPhrase, setSearchPhrase] = useState('');
  const history = useHistory();

  return (
    <div className="SearchLocation">
      <TextField
        className="SearchLocation__search-field"
        label="Lokalizacja"
        type="search"
        defaultValue={selectedCity}
        onChange={({ target: { value } }) => setSearchPhrase(value)}
      />
      <Button
        variant="contained"
        color="primary"
        className="SearchLocation__search-button"
        disabled={!searchPhrase && !selectedCity}
        onClick={() => history.push(`/${searchPhrase}`)}
      >
        Szukaj
      </Button>
    </div>
  );
}

export default SearchLocation;
