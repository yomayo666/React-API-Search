import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from './NotFound';

describe('NotFound Component', () => {
  it('renders the NotFound component with the correct text', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const headingElement = screen.getByRole('heading', { level: 2 });
    const linkElement = screen.getByRole('link', { name: /Homepage/i });

    expect(headingElement).toHaveTextContent(
      /Lorem ipsum, dolor sit amet consectetur adipisicing elit/i
    );
    expect(linkElement).toBeInTheDocument();
  });
});
