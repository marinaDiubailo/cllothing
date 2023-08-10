import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/categories.selector';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard.component';
import './Category.styles.scss';

const Category = () => {
	const { category } = useParams();
	const categoriesMap = useSelector(selectCategoriesMap);
	const [products, setProducts] = useState(categoriesMap[category]);

	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [categoriesMap, category]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className='category-page-container'>
			<h2 className='category-title'>{category.toUpperCase()}</h2>
			<div className='category-container'>
				{products &&
					products.map(product => (
						<ProductCard
							key={product.id}
							product={product}
						/>
					))}
			</div>
		</div>
	);
};

export default Category;
