import {QueryClientProvider, QueryClient} from 'react-query';
import './App.css'
import Instructions from './components/Instructions';
import Form from './components/Form';
import Intro from './components/Intro';

const dataset_instructions = [
  "The dataset must be in the csv format",
  "The dependent / target variable must in the last column of the dataset",
];

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client = {queryClient}>
      <>
        <Intro/>
        <Instructions instructions={dataset_instructions} />
        <Form/>
      </>
    </QueryClientProvider>
  )
}

export default App
