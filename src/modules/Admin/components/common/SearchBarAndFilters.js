import React from 'react';
import SearchBar from './SearchBar';
import FilterDropdown from './FilterDropdown';

const SearchBarAndFilters = ({ filterConditions = [], onSearch, onFilterChange }) => {
    return (
        <div className="flex items-center gap-3 flex-wrap">
            <SearchBar onSearch={onSearch} />
            <div className="flex items-center gap-2 flex-wrap">
                {filterConditions.map((condition, index) => (
                    <FilterDropdown
                        key={index}
                        condition={condition}
                        onFilterChange={(selectedOption) => onFilterChange(condition, selectedOption)}
                    />
                ))}
            </div>
        </div>
    );
};

export default SearchBarAndFilters;
