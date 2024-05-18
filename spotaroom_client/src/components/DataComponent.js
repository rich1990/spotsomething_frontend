import React, { useState, useEffect } from 'react';
import {
  Grid,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Button,
  TextField,
  Box,
} from '@mui/material';

function DataComponent() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, [currentPage, sortBy, sortOrder, searchQuery]);

  const fetchData = () => {
    fetch(`/api/flats?page=${currentPage}&limit=${itemsPerPage}&sortBy=${sortBy}&sortOrder=${sortOrder}&search=${searchQuery}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSort = (columnName) => {
    const isAsc = sortBy === columnName && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(columnName);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  return (
    <Container>
       <Box display="flex" justifyContent="flex-end" marginBottom="20px">
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          style={{ marginLeft: 'auto' }}

        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'id'}
                  direction={sortBy === 'id' ? sortOrder : 'asc'}
                  onClick={() => handleSort('id')}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                Image
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'name'}
                  direction={sortBy === 'name' ? sortOrder : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'city'}
                  direction={sortBy === 'city' ? sortOrder : 'asc'}
                  onClick={() => handleSort('city')}
                >
                  City
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'description'}
                  direction={sortBy === 'description' ? sortOrder : 'asc'}
                  onClick={() => handleSort('description')}
                >
                  Description
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>
                  <img src={item.img} alt={item.name} style={{ width: '50px', height: '50px' }} />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.city}</TableCell>
                <TableCell>{item.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <Button onClick={prevPage} disabled={currentPage === 1} variant="contained">
          Prev
        </Button>
        <span>{currentPage}</span>
        <Button onClick={nextPage} variant="contained">
          Next
        </Button>
      </div>
    </Container>
  );
}

export default DataComponent;