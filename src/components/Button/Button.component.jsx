import { Loader } from '../Loader/Loader';
import './Button.styles.scss';

export const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted',
    rounded: 'rounded',
};

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
    return (
        <button
            disabled={isLoading}
            className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
            {...otherProps}
        >
            {isLoading ? <Loader /> : children}
        </button>
    );
};

export default Button;
