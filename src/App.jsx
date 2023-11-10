import {QueryClientProvider, QueryClient} from 'react-query';
import './App.css'
import Instructions from './components/Instructions';
import Form from './components/Form';
import Intro from './components/Intro';
import Result from './components/Result';
import { useState } from 'react';

const dataset_instructions = [
  "The dataset must be in the csv format",
  "The dependent / target variable must in the last column of the dataset",
  "Currently this preprocessor is not configured for Datetime category. Don't use dataset if it contains datatime feature.",
  "Currently this predictor is suited for the target varibale to have tow categories ex(yes/no) (high/low) or numerical values"
];

const queryClient = new QueryClient();

function App() {
  const [preprocessedData, setPreprocessedData] = useState();
  const [hasResult, setHasResult] = useState(false);

  const fetchPreprocessedData = (data) => {
    // console.log(data.data);
    if(data.error) {
      setHasResult(false);
      return;
    }
    setPreprocessedData(data);
    setHasResult(true);
  }
  console.log(preprocessedData);

  return (
    <QueryClientProvider client = {queryClient}>
      <>
        <Intro/>
        <Instructions instructions={dataset_instructions} />
        <Form getData = {fetchPreprocessedData}/>
        {hasResult && preprocessedData && <Result data={preprocessedData}/>}
      </>
    </QueryClientProvider>
  )
}

export default App
