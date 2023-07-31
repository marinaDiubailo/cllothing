import categories from './categories.json';
import Directory from './components/Directory/Directory.component';

const App = () => {
	return <Directory categories={categories} />;
};

export default App;
