// PokemonContext.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { PokemonProvider, PokemonContext } from './PokemonContext';

test('PokemonProvider renders children and provides context', () => {
  const TestComponent = () => {
    const context = React.useContext(PokemonContext);

    return (
      <div>
        {context ? 'Context is available' : 'Context is not available'}
      </div>
    );
  };

  const { getByText } = render(
    <PokemonProvider>
      <TestComponent />
    </PokemonProvider>
  );

  expect(getByText('Context is available')).toBeInTheDocument();
});
