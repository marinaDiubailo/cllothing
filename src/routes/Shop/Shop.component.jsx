import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../CategoriesPreview/CategoriesPreview.component';
import Category from '../Category/Category.component';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { setCategoriesMap } from '../../store/categories/categories.action';

const Shop = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			const categoryMap = await getCategoriesAndDocuments();
			dispatch(setCategoriesMap(categoryMap));
		})();
	}, []);

	return (
		<Routes>
			<Route
				index
				element={<CategoriesPreview />}
			/>
			<Route
				path=':category'
				element={<Category />}
			/>
		</Routes>
	);
};

export default Shop;
