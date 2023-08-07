import { useContext } from 'react';
import { CartContext } from '../../contexts/cart-context';
import './CheckoutItem.styles.scss';

const CheckoutItem = ({ cartItem }) => {
	const { name, imageUrl, quantity, price } = cartItem;
	const { addItemToCart, deleteItemFromCart, clearItemFromCart } =
		useContext(CartContext);

	const clearItemHandler = () => clearItemFromCart(cartItem);
	const addItemHandler = () => {
		addItemToCart(cartItem);
	};
	const deleteItemHandler = () => deleteItemFromCart(cartItem);

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
