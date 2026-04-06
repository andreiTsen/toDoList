import type { FilterItem } from '../../types/types';

type FiltersProps = {
    filters: FilterItem[];
    activeFilter: string;
    onFilterChange: (filterName: string) => void;
};

function Filters({ filters, activeFilter, onFilterChange }: FiltersProps) {
    return (
        <nav className="filter-nav">
          <ul className="filter-list">
            {filters.map((filter) => {
                const isActive = filter.name === activeFilter;

                return (
                    <li key={filter.id}>
                        <button
                            className={`filter-btn ${isActive ? 'active' : ''}`}
                            type="button"
                            onClick={() => onFilterChange(filter.name)}
                        >
                            {filter.label}
                        </button>
                    </li>
                );
            })}
          </ul>
        </nav>
    );
}

export default Filters;
