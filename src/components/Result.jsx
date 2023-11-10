/* eslint-disable react/prop-types */
import axios from 'axios';
import classes from './Result.module.css';

const Result = ({data}) => {
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
        } 
        catch(err) {
            console.log(err);
        }
    }


    return (
        <div className={classes.resultContainer}>
            {successStatus && 
            <div>
                <p>Operation Successful</p>
                <button onClick={handleFileDownload}>Download Preprocessed File</button>
            </div>}
        </div>
    );
}

export default Result;