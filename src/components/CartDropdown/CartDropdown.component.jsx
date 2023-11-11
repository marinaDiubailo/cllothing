import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    selectCartItems,
    selectIsCartOpen,
} from '../../store/cart/cart.selector';
// import { setIsCartOpen } from '../../store/cart/cart.action';
import { setIsCartOpen } from '../../store/cart/cart.reducer';
import Button from '../Button/Button.component';
import CartItem from '../CartItem/CartItem.compoment';
import './CartDropdown.styles.scss';

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const cartIsOpen = useSelector(selectIsCartOpen);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
        dispatch(setIsCartOpen(!cartIsOpen));
    };

    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.length ? (
                    cartItems.map((item) => (
                        <CartItem key={item.id} cartItem={item} />
                    ))
                ) : (
                    <span className="empty-message ">Your cart is empty</span>
                )}
            </div>
            <Button onClick={goToCheckoutHandler}>Go to checkout</Button>
        </div>
    );
};

export default CartDropdown;
