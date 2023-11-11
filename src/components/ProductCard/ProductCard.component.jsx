import { useDispatch } from 'react-redux';
import Button from '../Button/Button.component';
// import { addItemToCart } from '../../store/cart/cart.action';
import { addItemToCart } from '../../store/cart/cart.reducer';
//import { selectCartItems } from '../../store/cart/cart.selector';
import './ProductCard.styles.scss';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const { name, price, imageUrl } = product;
    // const cartItems = useSelector(selectCartItems);
    const onAddProductToCartHandler = () => dispatch(addItemToCart(product));

    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button buttonType="inverted" onClick={onAddProductToCartHandler}>
                Add to cart
            </Button>
        </div>
    );
};

export default ProductCard;
