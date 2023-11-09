import {QueryClientProvider, QueryClient} from 'react-query';
import axios from 'axios';
import './App.css'
import Instructions from './components/Instructions';
import Form from './components/Form';
import Intro from './components/Intro';
import { useEffect } from 'react';

const dataset_instructions = [
  "The dataset must be in the csv format",
  "The dependent / target variable must in the last column of the dataset",
];

const queryClient = new QueryClient();

function App() {

  // useEffect(() => {
  //   axios.get("http://127.0.0.1:8000/api/regressions/")
  //   .then(res => {
  //     console.log(res);
  //   })
  //   .catch(err => console.log(err));
  // }, []);

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
