/* eslint-disable react/prop-types */

import classes from './Instructions.module.css';

const Instructions = ({instructions}) => {
    return (
        <>
        <div className={classes["instruction-container"]}>
            <h2>DATASET INSTRUCTIONS</h2>
            <div className={classes["instruction-body"]}>
                <ul className={classes["instruction-list"]}>
                {instructions.map((instruction, index) => {
                    return <li key={index}>{instruction}</li>
                })}
                </ul>
            </div>
        </div>
        </>
    )
}

export default Instructions;