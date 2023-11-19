import React from 'react';

interface ItemsPerPageProps {
  itemsPerPage: number;
  handleItemsPerPageChange: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

const ItemsPerPage: React.FC<ItemsPerPageProps> = ({
  itemsPerPage,
  handleItemsPerPageChange,
}) => {
  return (
    <label>
      Number of Pokémon per page:{' '}
      <select
        value={itemsPerPage}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          handleItemsPerPageChange(event);
        }}
      >
        {Array.from({ length: 100 }, (_, i) => (
          <option value={i + 1} key={i}>
            {i + 1}
          </option>
        ))}
      </select>
    </label>
  );
};

export default ItemsPerPage;
