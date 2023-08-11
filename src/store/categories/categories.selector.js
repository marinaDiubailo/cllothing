import { createSelector } from 'reselect';

const selectcategoryReducer = state => state.categoriesReducer;

export const selectCategories = createSelector(
	[selectcategoryReducer],
	categoriesSlice => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
	[selectCategories],
	categories =>
		categories.reduce((acc, category) => {
			const { title, items } = category;
			acc[title.toLowerCase()] = items;
			return acc;
		}, {})
);
