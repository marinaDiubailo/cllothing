import { Outlet, NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import './Navigation.styles.scss';

const Navigation = () => {
	return (
		<>
			<div className='navigation-container'>
				<nav className='navigation'>
					<NavLink
						to='/'
						className='logo-container'
					>
						<Logo className='logo' />
					</NavLink>

					<ul className='nav-links-container'>
						<li>
							<NavLink
								to='/shop'
								className={({ isActive }) => (isActive ? 'active' : undefined)}
							>
								{' '}
								SHOP
							</NavLink>
						</li>
						<li>
							<NavLink
								to='/contacts'
								className={({ isActive }) => (isActive ? 'active' : undefined)}
							>
								{' '}
								CONTACTS
							</NavLink>
						</li>
						<li>
							<NavLink
								to='/auth'
								className={({ isActive }) => (isActive ? 'active' : undefined)}
							>
								SIGN IN
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
			<Outlet />
		</>
	);
};

export default Navigation;
