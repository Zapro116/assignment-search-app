import React, { useEffect, useRef, useState } from 'react';
import SearchInput from './components/SearchInput';
import SearchResults from './components/SearchResults';
import userData from './data';

import './App.css';

const App = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [searchResultIds, setSearchResultIds] = useState([]);
	const [highlightedUser, setHighlightedUser] = useState('');
	const cardRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (cardRef.current && !cardRef.current.contains(e.target)) {
				setHighlightedUser('');
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		setSearchResultIds(searchResults.map((elem) => elem.id));
		setHighlightedUser('');
		if (searchTerm.length === 0) setSearchResults('');
	}, [searchTerm]);

	const isElementVisibleInContainer = (element, container) => {
		// Checks if the element is visible inside container

		const elementRect = element.getBoundingClientRect();
		const containerRect = container.getBoundingClientRect();

		const isVisible =
			elementRect.top >= containerRect.top &&
			elementRect.bottom <= containerRect.bottom &&
			elementRect.left >= containerRect.left &&
			elementRect.right <= containerRect.right;

		return isVisible;
	};

	useEffect(() => {
		const element = document.querySelector('.selected-card-box');
		if (element) {
			!isElementVisibleInContainer(element, element.parentElement) &&
				element.scrollIntoView({
					behavior: 'smooth',
					block: 'nearest',
					inline: 'nearest',
				});
		}
	}, [highlightedUser]);

	const handleSearch = (value) => {
		setSearchTerm(value);

		const results = userData.filter((user) => {
			// g stands for global and i stand for case insensitive search
			const searchRegex = new RegExp(value, 'gi');
			return (
				user.name.match(searchRegex) ||
				user.id.match(searchRegex) ||
				user.address.match(searchRegex) ||
				user.pincode.match(searchRegex) ||
				user.items.some((item) => item.match(searchRegex))
			);
		});

		setSearchResults(results);
	};

	const handleKeyDown = (e) => {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			setHighlightedUser(
				searchResultIds[
					searchResultIds.indexOf(highlightedUser) + 1 < searchResultIds.length
						? searchResultIds.indexOf(highlightedUser) + 1
						: searchResultIds.indexOf(highlightedUser)
				]
			);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			setHighlightedUser(
				searchResultIds[
					searchResultIds.indexOf(highlightedUser) - 1 > -1
						? searchResultIds.indexOf(highlightedUser) - 1
						: searchResultIds.indexOf(highlightedUser)
				]
			);
		}
	};

	return (
		<div className='d-flex align-items-center flex-column mt-5'>
			<div className='card' ref={cardRef}>
				<SearchInput
					onSearch={handleSearch}
					handleKeyDown={handleKeyDown}
					searchTerm={searchTerm}
				/>
				<SearchResults
					results={searchResults}
					searchTerm={searchTerm}
					highlightedUser={highlightedUser}
					setHighlightedUser={setHighlightedUser}
				/>
			</div>
		</div>
	);
};

export default App;
