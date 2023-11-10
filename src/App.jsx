import {QueryClientProvider, QueryClient} from 'react-query';
import './App.css'
import Instructions from './components/Instructions';
import Form from './components/Form';
import Intro from './components/Intro';

const dataset_instructions = [
  "The dataset must be in the csv format",
  "The dependent / target variable must in the last column of the dataset",
  "Currently this preprocessor is not configured for Datetime category. Don't use dataset if it contains datatime feature.",
  "Currently this predictor is suited for the target varibale to have tow categories ex(yes/no) (high/low) or numerical values"
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
