
import './App.css'
import Instructions from './components/Instructions';
import Form from './components/Form';
import Intro from './components/Intro';

const dataset_instructions = [
  "The dataset must be in the csv format",
  "The dependent variable must in the last column of the dataset",
];

function App() {

  return (
    <>
      <Intro/>
      <Instructions instructions={dataset_instructions} />
      <Form/>
    </>
  )
}

export default App
