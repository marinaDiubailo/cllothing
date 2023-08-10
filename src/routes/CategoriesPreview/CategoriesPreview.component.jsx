import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/categories.selector';
import CategoryPreview from '../../components/CategoryPreview/CategoryPreview.component';
import './CategoriesPreview.styles.scss';

const CategoriesPreview = () => {
	const categoriesMap = useSelector(selectCategoriesMap);

	return (
		<div className='categories-preview-container'>
			{Object.keys(categoriesMap).map(title => {
				const products = categoriesMap[title];
				return (
					<CategoryPreview
						key={title}
						title={title}
						products={products}
					/>
				);
			})}
		</div>
	);
};

export default CategoriesPreview;
