/* eslint-disable react/prop-types */
import axios from 'axios';
import classes from './Result.module.css';
import { useState } from 'react';
import ModelScore from './ModelScore';

const Result = ({data}) => {
    // const [csvContent, setCsvContent] = useState(null);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const successStatus = data.preprocessSuccess;
    const fileName = successStatus ? data.fileInfo.fileName : undefined;
    console.log(data);

    let modelResultsObject;
    let resultObjectLength;

    if(successStatus) {
        modelResultsObject = data.model_results;
        resultObjectLength = Object.entries(modelResultsObject).length;
    }

    const handleFileDownload = async () => {
        try {
            const fileInfo = JSON.stringify({fileName: fileName})
            const response = await axios.post(
                "http://127.0.0.1:8000/api/regressions/download/",
                fileInfo,
                {responseType: "blob"}
            );
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setIsError(false);
            // if we want to show the file
            // const fileReader = new FileReader();
            // fileReader.onload = function (event) {
            //     setCsvContent(event.target.result);
            // };
            // fileReader.readAsText(response.data, 'UTF-8');
        } 
        catch(err) {
            console.log(err);
            setIsError(true);
            setErrorMsg(err.message);
        }
    }

    return (
        <div className={classes.resultContainer}>
            {successStatus && 
            <div>
                <p className={classes.successMessage}>Operation Successful</p>
                <div className={classes.modelScoreContainer}>
                    {resultObjectLength > 0 && 
                    <>
                     <p>Provided Split Ratio is {data.splitRatio}.</p>
                     <p>Data was splitted as {Math.floor(data.splitRatio*100)}% test data, {Math.floor((1 - data.splitRatio)*100)}% trainig data.</p>
                    </>}
                    <ModelScore scoreObjectData = {modelResultsObject} 
                    scoreObjectLength = {resultObjectLength} />
                    {resultObjectLength > 0 && <p>R<sup>2</sup> between 0.7 and 1 is considered good. 0.5 and 0.7 acceptable. Below 0.5 might not be useful for predictions.</p>}
                </div>
                <div className={classes.actionContainer}>
                    <p>You can download the preprocessed csv file to use in your models</p>
                    <button className={classes.downloadBtn} onClick={handleFileDownload}>
                        Download File
                    </button>
                    {isError &&
                    <div  className={classes.errorMsg}>
                        <p>Trouble Downloading File. Try again Later</p>
                        <p>{errorMsg}</p>
                    </div>
                    }
                </div>
                
                {/* {csvContent && (
                <div>
                    <pre>{csvContent}</pre>
                </div>
                )} */}
            </div>
            }
            {!successStatus && 
                <div className={classes.operationFailed}>
                    <h3>Operation Failed.</h3>
                    <p>{data.errorMessage}.</p>
                </div>
            }
        </div>
    );
}

export default Result;