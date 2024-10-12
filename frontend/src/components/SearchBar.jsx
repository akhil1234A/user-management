import React, { useState, useEffect } from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    const [inputValue, setInputValue] = useState(searchTerm);
    
    useEffect(() => {
        setInputValue(searchTerm); // Sync input value with searchTerm prop
    }, [searchTerm]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
    };

    const handleSearch = () => {
        setSearchTerm(inputValue);
    };

    // Debouncing to limit the number of calls to setSearchTerm
    useEffect(() => {
        const handler = setTimeout(() => {
            handleSearch();
        }, 300); // Adjust delay as needed

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue]); // Only call when inputValue changes

    const clearSearch = () => {
        setInputValue('');
        setSearchTerm('');
    };

    return (
        <div className="form-inline mb-3">
            <input
                type="text"
                className="form-control mr-2"
                placeholder="Search users..."
                value={inputValue}
                onChange={handleInputChange}
                aria-label="Search users" // Accessibility improvement
            />
            <button 
                className="btn btn-secondary" 
                onClick={clearSearch} 
                aria-label="Clear search"
            >
                Clear
            </button>
        </div>
    );
};

export default SearchBar;
