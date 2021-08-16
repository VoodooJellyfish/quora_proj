import Navigation from '../Navigation/index.js';
import QuestionsContainer from '../../components/QuestionsContainer';

const MainPage = () => {
  return (
    <>
      <h2>List of Questions</h2>
      <Navigation/>
      <QuestionsContainer/>
    </>
  );
};

export default MainPage;