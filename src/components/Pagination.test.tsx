import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  it('renders Previous link when currentPage is greater than 1', () => {
    render(
      <MemoryRouter>
        <Pagination currentPage={2} totalPages={3} searchTerm="" />
      </MemoryRouter>
    );
    const previousLink = screen.getByText(/Previous/i);
    expect(previousLink).toBeInTheDocument();
  });

  it('renders Next link when currentPage is less than totalPages', () => {
    render(
      <MemoryRouter>
        <Pagination currentPage={2} totalPages={3} searchTerm="" />
      </MemoryRouter>
    );
    const nextLink = screen.getByText(/Next/i);
    expect(nextLink).toBeInTheDocument();
  });

  it('does not render Previous link when currentPage is 1', () => {
    render(
      <MemoryRouter>
        <Pagination currentPage={1} totalPages={3} searchTerm="" />
      </MemoryRouter>
    );
    const previousLink = screen.queryByText(/Previous/i);
    expect(previousLink).toBeNull();
  });

  it('does not render Next link when currentPage is equal to totalPages', () => {
    render(
      <MemoryRouter>
        <Pagination currentPage={3} totalPages={3} searchTerm="" />
      </MemoryRouter>
    );
    const nextLink = screen.queryByText(/Next/i);
    expect(nextLink).toBeNull();
  });
});
