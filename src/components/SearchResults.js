import React from 'react';
import UserCard from './UserCard';

const SearchResults = ({
	results,
	searchTerm,
	highlightedUser,
	setHighlightedUser,
}) => {
	return (
		<div className='scroll-y'>
			{results.length > 0
				? results.map((user) => (
						<UserCard
							key={user.id}
							user={user}
							searchTerm={searchTerm}
							highlightedUser={highlightedUser}
							setHighlightedUser={setHighlightedUser}
						/>
				  ))
				: searchTerm.length > 0 && (
						<div className='d-flex justify-content-center align-items-center no-results'>
							No User Found
						</div>
				  )}
		</div>
	);
};

export default SearchResults;
