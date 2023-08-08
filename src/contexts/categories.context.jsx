import { createContext, useState, useEffect } from 'react';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';
// import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
	categoriesMap: {},
	setCategoriesMap: () => {},
});

export const CategoriesProvider = ({ children }) => {
	const [categoriesMap, setCategoriesMap] = useState({});

	useEffect(() => {
		(async () => {
			const categoryMap = await getCategoriesAndDocuments();
			setCategoriesMap(categoryMap);
		})();
	}, []);

	const value = { categoriesMap, setCategoriesMap };

	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	);
};
