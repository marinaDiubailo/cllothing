import { useDispatch, useSelector } from 'react-redux';
import {
	addItemToCart,
	deleteItemFromCart,
	clearItemFromCart,
} from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import './CheckoutItem.styles.scss';

const CheckoutItem = ({ cartItem }) => {
	const { name, imageUrl, quantity, price } = cartItem;
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);

	const clearItemHandler = () =>
		dispatch(clearItemFromCart(cartItems, cartItem));
	const addItemHandler = () => {
		dispatch(addItemToCart(cartItems, cartItem));
	};
	const deleteItemHandler = () =>
		dispatch(deleteItemFromCart(cartItems, cartItem));

	return (
		<div className='checkout-item-container'>
			<div className='image-container'>
				<img
					src={imageUrl}
					alt={`${name}`}
				/>
			</div>
			<span className='name'>{name}</span>
			<div className='quantity'>
				<button
					onClick={deleteItemHandler}
					className='arrow'
				>
					&#10094;
				</button>
				<span className='value'>{quantity}</span>
				<button
					onClick={addItemHandler}
					className='arrow'
				>
					&#10095;
				</button>
			</div>
			<span className='price'>&#36;{price}</span>
			<div className='remove-button-container'>
				<button
					onClick={clearItemHandler}
					className='cross-button'
				></button>
			</div>
		</div>
	);
};

export default CheckoutItem;
