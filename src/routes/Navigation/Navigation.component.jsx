import { useContext } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import Button from '../../components/Button/Button.component';
import { CartContext } from '../../contexts/cart-context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/CartIcon/CartIcon.component';
import CartDropdown from '../../components/CartDropdown/CartDropdown.component';
import { selectCurrentUser } from '../../store/user/user.selector';
import './Navigation.styles.scss';

const Navigation = () => {
	const currentUser = useSelector(selectCurrentUser);

	const { isCartOpen } = useContext(CartContext);

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
						{currentUser ? (
							<Button
								buttonType='rounded'
								onClick={signOutUser}
							>
								SIGN OUT
							</Button>
						) : (
							<li>
								<NavLink
									to='/auth'
									className={({ isActive }) =>
										isActive ? 'active' : undefined
									}
								>
									SIGN IN
								</NavLink>
							</li>
						)}
						<li>
							<CartIcon />
						</li>
					</ul>
				</nav>
				{isCartOpen && <CartDropdown />}
			</div>
			<Outlet />
		</>
	);
};

export default Navigation;
