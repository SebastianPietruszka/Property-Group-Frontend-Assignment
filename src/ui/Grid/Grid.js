import React from 'react';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function Grid({ rows, columns }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(({ columnName }, index) => (
              <TableCell key={columnName} align={index === 0 ? 'left' : 'right'}>
                {columnName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.key}>
              {columns.map(({ columnId }, index) => (
                <TableCell key={columnId} align={index === 0 ? 'left' : 'right'}>
                  {row[columnId]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

Grid.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      columnId: PropTypes.string.isRequired,
      columnName: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Grid;
