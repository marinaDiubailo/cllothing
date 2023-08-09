import categories from '../../categories.json';
import DirectoryItem from '../DirectoryItem/DirectoryItem.component';
import './Directory.styles.scss';

const Directory = () => {
	const categoriesMap = categories;

	return (
		<div className='directory-container'>
			{categoriesMap.map(category => (
				<DirectoryItem
					key={category.id}
					category={category}
				/>
			))}
		</div>
	);
};

export default Directory;
