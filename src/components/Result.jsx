/* eslint-disable react/prop-types */
import axios from 'axios';
import classes from './Result.module.css';
import { useState } from 'react';

const Result = ({data}) => {
    // const [csvContent, setCsvContent] = useState(null);
    const [isError, setIsError] = useState(false);
    const successStatus = data.preprocessSuccess;
    const fileName = successStatus ? data.fileInfo.fileName : undefined;
    console.log(fileName);

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
        }
    }


    return (
        <div className={classes.resultContainer}>
            {successStatus && 
            <div>
                <p>Operation Successful</p>
                <div className={classes.actionContainer}>
                    <button className={classes.downloadBtn} onClick={handleFileDownload}>
                        Download Preprocessed File
                    </button>
                    {isError && <p className={classes.errorMsg}>Trouble Downloading File. Try again Later.</p>}
                </div>
                
                {/* {csvContent && (
                <div>
                    <pre>{csvContent}</pre>
                </div>
                )} */}
            </div>
            }
        </div>
    );
}

export default Result;