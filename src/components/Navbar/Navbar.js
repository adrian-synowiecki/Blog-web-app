import React, { useState } from 'react';

import './hamburgers.css';
import * as S from './Navbar.style';

function Navbar({ currentUserData, isAuth, fetchArticlesByMostRecentRequest, setCurrentPageNumberToFirst }) {
	const [ isOpenHamburgerMenu, toggleHamburgerMenu ] = useState(false);
	const { username } = currentUserData || {};

	const handleClick = (toggle) => {
		if (toggle) {
			toggleHamburgerMenu(!isOpenHamburgerMenu);
		}
		fetchArticlesByMostRecentRequest();
		setCurrentPageNumberToFirst();
	};

	return (
		<S.NavbarContainer isOpenHamburgerMenu={isOpenHamburgerMenu}>
			{!isOpenHamburgerMenu && (
				<S.NavbarBrand onClick={() => handleClick()} to="/">
					conduit
				</S.NavbarBrand>
			)}
			{isOpenHamburgerMenu && (
				<S.NavLinksWrapper>
					<S.NavLinkItem exact to="/" onClick={() => handleClick('toggle')}>
						<S.HomeIcon /> Home
					</S.NavLinkItem>
					{!isAuth && (
						<S.NavLinkItem to="/login" onClick={() => toggleHamburgerMenu(!isOpenHamburgerMenu)}>
							Log in
						</S.NavLinkItem>
					)}
					{!isAuth && (
						<S.NavLinkItem to="/signUp" onClick={() => toggleHamburgerMenu(!isOpenHamburgerMenu)}>
							Sign up
						</S.NavLinkItem>
					)}
					{isAuth && (
						<S.NavLinkItem to="/createNewArticle" onClick={() => toggleHamburgerMenu(!isOpenHamburgerMenu)}>
							<S.NewPostIcon /> New Post
						</S.NavLinkItem>
					)}
					{isAuth && (
						<S.NavLinkItem to="/userSettings" onClick={() => toggleHamburgerMenu(!isOpenHamburgerMenu)}>
							<S.SettingsIcon /> Settings
						</S.NavLinkItem>
					)}
					{isAuth && (
						<S.NavLinkItem
							to={`/userProfile/${username}`}
							onClick={() => toggleHamburgerMenu(!isOpenHamburgerMenu)}
						>
							<S.UserIcon /> {username}
						</S.NavLinkItem>
					)}
				</S.NavLinksWrapper>
			)}
			<button
				className={`hamburger ${isOpenHamburgerMenu ? 'hamburger--elastic is-active' : ''}`}
				type="button"
				onClick={() => toggleHamburgerMenu(!isOpenHamburgerMenu)}
			>
				<span class="hamburger-box">
					<span class="hamburger-inner" />
				</span>
			</button>
		</S.NavbarContainer>
	);
}

export default Navbar;
