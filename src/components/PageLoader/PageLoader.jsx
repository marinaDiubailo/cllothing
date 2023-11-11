import { memo } from 'react';
import { Loader } from '../Loader/Loader';
import './PageLoader.style.scss';

export const PageLoader = memo(() => {
    return (
        <div className="overlay">
            <Loader />
        </div>
    );
});
