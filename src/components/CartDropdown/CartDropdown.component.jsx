import { useContext } from 'react';
import Button from '../Button/Button.component';
import CartItem from '../CartItem/CartItem.compoment';
import { CartContext } from '../../contexts/cart-context';
import './CartDropdown.styles.scss';

const CartDropdown = () => {
	const { cartItems } = useContext(CartContext);

	return (
		<div className='cart-dropdown-container'>
			<div className='cart-items'>
				{cartItems.map(item => (
					<CartItem
						key={item.id}
						cartItem={item}
					/>
				))}
			</div>
			<Button>Go to checkout</Button>
		</div>
	);
};

export default CartDropdown;
