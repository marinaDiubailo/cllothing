import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button.component';
import CartItem from '../CartItem/CartItem.compoment';
import { CartContext } from '../../contexts/cart-context';
import './CartDropdown.styles.scss';

const CartDropdown = () => {
	const { cartItems } = useContext(CartContext);

	const navigate = useNavigate();

	const goToCheckoutHandler = () => {
		navigate('/checkout');
	};

	return (
		<div className='cart-dropdown-container'>
			<div className='cart-items'>
				{cartItems.length ? (
					cartItems.map(item => (
						<CartItem
							key={item.id}
							cartItem={item}
						/>
					))
				) : (
					<span>Your cart is empty</span>
				)}
			</div>
			<Button onClick={goToCheckoutHandler}>Go to checkout</Button>
		</div>
	);
};

export default CartDropdown;
