import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DataComponent from './DataComponent';

describe('DataComponent', () => {
  it('allows sorting data', async () => {
    // Mocking fetch API to return sample data
    global.fetch = jest.fn().mockResolvedValue({
      json: () =>
        Promise.resolve([
          { id: 1, name: 'Flat 1', city: 'City 1', description: 'Description 1', img: 'image1.jpg' },
          { id: 2, name: 'Flat 2', city: 'City 2', description: 'Description 2', img: 'image2.jpg' },
          // Add more sample data as needed
        ]),
    });

    render(<DataComponent />);

    // Wait for data to be fetched and rendered
    await waitFor(() => expect(screen.getByText('Flat 1')).toBeInTheDocument());

    // Click on the column header to sort by name
    const nameColumnHeader = screen.getByText('Name');
    fireEvent.click(nameColumnHeader);

    // Wait for the component to update with sorted data
    await waitFor(() => expect(screen.getByText('Flat 1')).toBeInTheDocument());

    // Verify that the data is sorted correctly
    const rows = screen.getAllByRole('row');
    const rowData = rows.map(row => row.textContent.trim());
    console.log(rowData);
    const sortedData = [
      'IDImageNameCityDescription',
      '1Flat 1City 1Description 1',
      '2Flat 2City 2Description 2'
    ];
    expect(rowData).toEqual(sortedData);
  });
});