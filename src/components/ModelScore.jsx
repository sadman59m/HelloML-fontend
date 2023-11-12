/* eslint-disable react/prop-types */
import classes from './ModelScore.module.css';

const ModelScore = ({scoreObjectData, scoreObjectLength}) => {
    return (
        <div className={classes.scoreContainer}>
            {scoreObjectLength > 0 && 
            <div className={classes.scoreListContainer}>
                <ul className={classes.scoreList}>
                    <li className={classes.scoreListHead}>
                        <p>Regression Model</p>
                        <p>R2 Score</p>
                    </li>
                    {Object.keys(scoreObjectData).map(key => (
                        <li className={classes.scoreListValues} key={key}>
                            <p>{key}</p>
                            <p>{scoreObjectData[key]}</p>
                        </li>
                    ))}
                </ul>
            </div>
            }
            {scoreObjectLength <= 0 && 
            <div className={classes.emptyModelList}>
                <h3>No models were selected</h3>
            </div>}
        </div>
    );
}

export default ModelScore;