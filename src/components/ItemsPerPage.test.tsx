import { render, screen, fireEvent } from '@testing-library/react';
import ItemsPerPage from './ItemsPerPageProps';

describe('ItemsPerPage Component', () => {
  it('renders with default props', () => {
    render(
      <ItemsPerPage itemsPerPage={5} handleItemsPerPageChange={() => {}} />
    );
    const selectElement = screen.getByLabelText(
      /Number of Pokémon per page/i
    ) as HTMLSelectElement;
    expect(selectElement).toBeInTheDocument();
    expect(selectElement.value).toBe('5');
  });

  it('calls handleItemsPerPageChange when the select value changes', () => {
    const handleItemsPerPageChangeMock = jest.fn();
    render(
      <ItemsPerPage
        itemsPerPage={5}
        handleItemsPerPageChange={handleItemsPerPageChangeMock}
      />
    );
    const selectElement = screen.getByLabelText(
      /Number of Pokémon per page/i
    ) as HTMLSelectElement;

    fireEvent.change(selectElement, { target: { value: '10' } });

    expect(handleItemsPerPageChangeMock).toHaveBeenCalledWith(
      expect.any(Object)
    );
  });

  it('renders options correctly', () => {
    render(
      <ItemsPerPage itemsPerPage={5} handleItemsPerPageChange={() => {}} />
    );
    const selectElement = screen.getByLabelText(
      /Number of Pokémon per page/i
    ) as HTMLSelectElement;

    expect(selectElement).toBeInTheDocument();
    expect(selectElement.children.length).toBe(100);
  });
});
