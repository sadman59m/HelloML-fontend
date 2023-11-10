import classes from "./Intro.module.css";

const Intro = () => {
    return (
        <>
        <div className={classes["intro-container"]}>
            <div className={classes["intro-container_header"]}>
                <h1>Welcome to predictor</h1>
                <p>Upload your csv dataset to be preprocessed and to see the result of different regression models</p>
            </div>
            <div className={classes["intro-container_body"]}>
            <h2>WHAT WE WILL PERFORM</h2>
                <ul className={classes["intro-list"]}>
                    <li>The missing categorical data rows will be eliminated and cleaned.</li>
                    <li>The missing numerical data rows will be placed with mean value.</li>
                    <li>The categorical data will encoded to make the dataset suitable for regression models.</li>
                    <li>The preprocessed csv file will downloadable.</li>
                    <li>The preprocessor file can be imidiately applid to Regression Models</li>
                    <li>Build model and show R2 score for the selected Models.</li>
                </ul>
            </div>               
        </div>
        </>
    )
}

export default Intro;