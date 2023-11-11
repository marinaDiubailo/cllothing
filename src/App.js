import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    onAuthStateChangedListener,
    createUserDocFromAuth,
} from './utils/firebase/firebase.utils.js';
// import { setCurrentUser } from './store/user/user.action';
import { setCurrentUser } from './store/user/user.reducer';
import Navigation from './routes/Navigation/Navigation.component';
import Home from './routes/Home/Home.component';
import Shop from './routes/Shop/Shop.component';
import Authentication from './routes/Authentication/Authentication.component';
import Checkout from './routes/Checkout/Checkout.component';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) createUserDocFromAuth(user);

            const pickedUser =
                user &&
                (({ accessToken, email }) => ({ accessToken, email }))(user);
            console.log(setCurrentUser(pickedUser));
            dispatch(setCurrentUser(pickedUser));
        });
        return unsubscribe;
    }, [dispatch]);

    return (
        <Routes>
            <Route path="/" element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path="shop/*" element={<Shop />} />
                <Route path="auth" element={<Authentication />} />
                <Route path="checkout" element={<Checkout />} />
            </Route>
        </Routes>
    );
};

export default App;
