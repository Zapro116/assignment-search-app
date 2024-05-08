import React, { useState } from 'react';

const SearchInput = ({ onSearch, handleKeyDown, searchTerm }) => {
	const handleChange = (e) => {
		onSearch(e.target.value);
	};

	return (
		<div className='d-flex search-container p-1 pl-2'>
			<img src='/search.svg' height='24px' className='my-auto mr-1' />
			<input
				type='text'
				className='search-box'
				placeholder='Search users by ID, address, name, items, pincode'
				value={searchTerm}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
			/>
			{searchTerm.length > 0 && (
				<img
					src='/clear.svg'
					height='24px'
					className='my-auto mr-1 search-clear'
					onClick={(e) => {
						e.preventDefault();
						onSearch('');
					}}
				/>
			)}
		</div>
	);
};

export default SearchInput;
