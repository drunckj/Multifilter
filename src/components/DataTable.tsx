import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';

type FilterComponentProps = {
  filterText: string;
  onFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
};

const FilterComponent: React.FC<FilterComponentProps> = ({
  filterText,
  onFilter,
  onClear,
}) => (
  <>
    <div>
      <input
        className="rounded-sm border"
        id="search"
        type="text"
        placeholder="Filter By Number"
        aria-label="Search Input"
        value={filterText}
        onChange={onFilter}
      />
      <button
        className="bg-red-500 p-1 text-white rounded-xl"
        type="button"
        onClick={onClear}
      >
        Clear
      </button>
    </div>
  </>
);

export const Filtering = (props: { data: any[]; columns: any[] }) => {
  const customStyles = {
    headCells: {
      style: {
        color: '#202124',
        fontSize: '13px',
        fontWeight: '900',
        letterSpacing: '2px',
      },
    },
  };

  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  const filteredItems = props.data.filter((item: { number: number }) =>
    item.number && item.number.toString().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <FilterComponent
        onFilter={(e: { target: { value: React.SetStateAction<string> } }) =>
          setFilterText(e.target.value)
        }
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <div style={{ maxHeight: '1000px', overflow: 'auto' }}>
      <DataTable
        columns={props.columns}
        data={filteredItems}
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        persistTableHead
        customStyles={customStyles}
        paginationPerPage={100} // Show 20 rows per page
      />
    </div>
  );
};
