import categories from '../../categories.json';
import Directory from '../../components/Directory/Directory.component';

const Home = () => {
	return <Directory categories={categories} />;
};

export default Home;
