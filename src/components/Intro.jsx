import classes from "./Intro.module.css";

const Intro = () => {
    const creatorMessage = `
        This project is intended for newbies in the fields Machine Leaning. Currenty, This application only works with
        simple dataset containing only numerical and categorical values and Only for Regression Models.
        But we hope you have a good time palying around with it and introduce yourself in the world of 
        Machine Learning.
    `;
    return (
        <>
        <div className={classes["intro-container"]}>
            <div className={classes["intro-container_header"]}>
                <h1>Welcome to HelloML</h1>
                <p>{creatorMessage}</p>
            </div>
            <div className={classes["intro-container_body"]}>
            <h2>WHAT WE WILL PERFORM</h2>
                <ul className={classes["intro-list"]}>
                    <li>The missing categorical data rows will be eliminated and cleaned.</li>
                    <li>The missing numerical data rows will be placed with mean value.</li>
                    <li>The categorical data will encoded to make the dataset suitable for regression models.</li>
                    <li>Feature Scaling will be done using Standardisation Technique.</li>
                    <li>The preprocessed csv file will downloadable.</li>
                    <li>The preprocessor file can be imidiately applid to Regression Models</li>
                    <li>Build model on the preprocessed dataset and calculate R<sup>2</sup> Score for each selected Models</li>
                </ul>
            </div>               
        </div>
        </>
    )
}

export default Intro;