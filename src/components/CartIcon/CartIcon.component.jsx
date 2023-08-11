import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import {
	selectIsCartOpen,
	selectCartCount,
} from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';
import './CartIcon.styles.scss';

const CartIcon = () => {
	const dispatch = useDispatch();
	const isCartOpen = useSelector(selectIsCartOpen);
	const count = useSelector(selectCartCount);

	const toggleHandler = () => dispatch(setIsCartOpen(!isCartOpen));

	return (
		<div
			className='cart-icon-container'
			onClick={toggleHandler}
		>
			<ShoppingIcon className='shopping-icon' />
			<span className='item-count'>{count}</span>
		</div>
	);
};

export default CartIcon;
