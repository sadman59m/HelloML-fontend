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
    const [splitRationInput, setSplitRationInput] = useState(0.2);
    const [rationError, setRationError] = useState(false);
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

    const handleSplitRationInput = e => {
        const rationValue = e.target.value;
        if(!rationValue) {
            setRationError(false);
            return;
        }
        if(rationValue <= 0.0 || rationValue >= 1.0) {
            setRationError(true);
            return;
        }
        setSplitRationInput(rationValue);
        setRationError(false);
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
        if(rationError) {
            return;
        }
        if(!splitRationInput) {
            setSplitRationInput(0.2);
            return;
        }
        const regressionData = [
            [...models],
            {
                splitRatio: splitRationInput
            }
        ];
        console.log(regressionData);

        formData.append('selectedModels', JSON.stringify(regressionData));

        // Declaring the muatation fuction
        performRegressions(formData);

        getData({error: true});
        const updatedModels = [...models];
        updatedModels.forEach(models => models.checked = false);
        setModels(updatedModels);
        // setSplitRationInput(0.2);
        setFileError(false);
    }

    // seeting css classes
    let submitBtnClasses = classes.submitBtn;
    if(isDone) {
        submitBtnClasses = classes.isDone;
    }
    // console.log(models);
    console.log(splitRationInput);
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
                    {fileError &&
                    <div className={classes.inputErrorMsg}>
                        <p>Must provide a csv file</p>
                    </div>
                    }
                </div>
                <div className={classes.splitRatioContainer}>
                    <h3>Enter Split Ration between 0 - 1</h3>
                    <p>For Example, 0.2, there will 80% data for training data, 20% for testing data.</p>
                    <p>It is advised to enter a value between 0.5 to 0.9.</p>
                    <input 
                    className={classes.ratioInput}
                    type="number" 
                    step="0.01"
                    placeholder='default is set to 0.2'
                    onChange={handleSplitRationInput}
                    />
                    {rationError &&
                    <div className={classes.inputErrorMsg}>
                        <p>Split Ration must be between 0 and 1</p>
                    </div>}
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