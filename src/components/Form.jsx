
import { useState } from 'react';
import classes from './Form.module.css';

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

const Form = () => {
    const [fileInput, setFileInput] = useState();
    const [fileError, setFileError] = useState(false);
    const handleCheckbox = (e) => {
        const {name, checked} = e.target;
        mlModels.forEach(model => {
            model.name === name ? model.checked = checked : model.checked;
        });
        
        console.log(mlModels);
    }

    const fileInputHandler = e => {
        setFileInput(e.target.files[0]);
        setFileError(false);
    }

    const formSubmissionHandler = e => {
        e.preventDefault();
        const formData = new FormData();
        if(!fileInput) {
            setFileError(true);
            return; 
        }
        formData.append('csvFile', fileInput);
        formData.append('selectedModels', JSON.stringify(mlModels));
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }
    }
    return (
        <>
            <form className={classes.form} onSubmit={formSubmissionHandler}>
                <div className={classes.fileUploadContainer}>
                    <h3>Choose Your Csv File</h3>
                    <input type="file" 
                    accept='.csv' 
                    id='csvFileInput' 
                    className={classes["file-upload-box"]}
                    onChange={fileInputHandler} />
                    {fileError ? <p className={classes.errorMsg}>Please, provide a csv file</p> : null}
                </div>
                <div className={classes["form-checkbox-container"]}>
                    <h3>Select Models</h3>
                    <div className={classes["form-checkbox-list"]}>
                        {
                            mlModels.map((model, index) => {
                                return (
                                <div className={classes['form-checkbox']} key = {index}>
                                <input 
                                type="checkbox" 
                                name = {model.name} 
                                onChange={handleCheckbox}/>
                                <label>{model.name}</label>
                                </div>)
                            })
                        }
                    </div>
                </div>
                <button className={classes.submitBtn}>Perform Actions</button>
            </form>
        </>
    )
}

export default Form;