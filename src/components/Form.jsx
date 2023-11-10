/* eslint-disable react/prop-types */

import { useState } from 'react';
import { usePerformRegressions } from '../hooks/useRrgressions';
import classes from './Form.module.css';
import LoadingWheel from './UI/LoadingWheel';

const mlModels = [
    {
        name: 'Linear Regression',
        checked: false,
    },
    {
        name: 'Polynomial Linear Regression',
        checked: false,
    }, 
    {
        name: "Support Vector Regression",
        checked: false,
    },
    {
        name: "Decision Tree Regression",
        checked: false,
    },
    {
        name: "Random Forest Regression",
        checked: false,
    }
]

const Form = ({getData}) => {
    const [models, setModels] = useState(mlModels);
    const [fileInput, setFileInput] = useState(null);
    const [fileError, setFileError] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const handleCheckbox = (e) => {
        // console.log(e.target.name);
        const {name, checked} = e.target;
        const updatedModels = models.map(model => model.name === name ? {...model, checked: checked} : model);
        setModels(updatedModels);
    }

    const fileInputHandler = e => {
        setFileInput(e.target.files[0]);
        // console.log(e.target.files[0]);
        setFileError(false);
    }

    const getPreprocessedData = (data) => {
        getData(data.data);
        setIsDone(true)
        setTimeout(()=>{
            setIsDone(false)
        }, 2000);
    }

    const {mutate: performRegressions, isLoading, error} = usePerformRegressions(getPreprocessedData);

    let badRequestMsg;
    if(error) {
        console.log(error);
        if(error.response) {
            badRequestMsg = error.response.data.errorMessage;
        }
        // badRequestMsg = error.response.data.errorMessage;
        getData({error: true});
    }

    const formSubmissionHandler = e => {
        e.preventDefault();
        const formData = new FormData();
        if(!fileInput) {
            setFileError(true);
            return; 
        }
        formData.append('csvFile', fileInput);
        formData.append('selectedModels', JSON.stringify(models));

        // Declaring the muatation fuction
        performRegressions(formData);

        const updatedModels = [...models];
        updatedModels.forEach(models => models.checked = false);
        setModels(updatedModels);
        setFileError(false);
    }

    // seeting css classes
    let submitBtnClasses = classes.submitBtn;
    if(isDone) {
        submitBtnClasses = classes.isDone;
    }
    // console.log(models);
    return (
        <>
            <form className={classes.form} onSubmit={formSubmissionHandler}>
                <div className={classes.fileUploadContainer}>
                    <h3>Choose Your Csv File</h3>
                    <input type="file" 
                    accept='.csv' 
                    id='csvFileInput' 
                    className={classes["file-upload-box"]}
                    onChange={fileInputHandler}
                    />
                    {fileError ? <p className={classes.errorMsg}>Please, provide a csv file</p> : null}
                </div>
                <div className={classes["form-checkbox-container"]}>
                    <h3>Select Models</h3>
                    <div className={classes["form-checkbox-list"]}>
                        {
                            models.map((model, index) => {
                                return (
                                <div className={classes['form-checkbox']} key = {index}>
                                <input 
                                type="checkbox" 
                                name = {model.name} 
                                onChange={handleCheckbox}
                                checked={model.checked? true : false}
                                />
                                <label>{model.name}</label>
                                </div>)
                            })
                        }
                    </div>
                </div>
                <div className={classes.actionContainer}>
                {!isLoading && !error && 
                <button className={submitBtnClasses}>
                    {isDone ? "Completed" : "Perform Actions"}
                </button>}
                {isLoading && !error && <div className={classes.loadingBox}><LoadingWheel/></div>}
                {error && <button className={classes.hasFailed}>
                    Operation Failed. Retry?
                </button>}
                </div>
                {error && 
                <div className={classes.errorMessageBox}>
                    {badRequestMsg && <p>{badRequestMsg}</p>}
                    <p>{error.message}</p>
                </div>}
            </form>
        </>
    )
}

export default Form;