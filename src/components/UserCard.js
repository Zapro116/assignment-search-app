import React from 'react';

const UserCard = ({
	user,
	searchTerm,
	highlightedUser,
	setHighlightedUser,
}) => {
	const partialSearch = (text) => {
		if (!searchTerm || searchTerm === '') return text;
		const regex = new RegExp(`(${searchTerm})`, 'gi');
		return text.replace(regex, '<span class="text-found">$1</span>');
	};
	console.log('highlightedUser', highlightedUser);

	return (
		<div
			className={`card-box pb-1 p-2 ${
				highlightedUser == user.id ? 'selected-card-box' : ''
			}`}
			onMouseEnter={(e) => {
				e.preventDefault();
				setHighlightedUser(user.id);
			}}
		>
			<h5 className='mb-0'>
				<b dangerouslySetInnerHTML={{ __html: partialSearch(user.id) }}></b>
			</h5>
			<p
				className='mb-1'
				dangerouslySetInnerHTML={{ __html: partialSearch(user.name) }}
			></p>

			{user.items && user.items.includes(searchTerm) && (
				<div className='items-found'>
					<span class='dot my-auto mr-2'></span>
					<span>"{searchTerm}" found in items</span>
				</div>
			)}
			<p
				className='mb-0'
				dangerouslySetInnerHTML={{ __html: partialSearch(user.address) }}
			></p>
		</div>
	);
};

export default UserCard;
