/* eslint-disable react/prop-types */
import classes from './Result.module.css';

const Result = ({data}) => {
    const successStatus = data.preprocessSuccess;
    console.log(successStatus);
    return (
        <div>
            {successStatus && <h1>Success</h1>}
        </div>
    );
}

export default Result;