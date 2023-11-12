/* eslint-disable react/prop-types */
import DfTable from './DfTable';
import classes from './Instructions.module.css';

const tableDataHead = [{
    "Country": "Country",
    "Age": "Age",
    "Salary": "Salary",
    "Purchased": "Purchased",
}]
const tableData = [
    {
        "Country": "France",
        "Age": 44,
        "Salary": 72000,
        "Purchased": "No",
    },
    {
        "Country": "Sapin",
        "Age": 27,
        "Salary": 48000,
        "Purchased": "Yes",
    },
    {
        "Country": "Germany",
        "Age": 30,
        "Salary": 54000,
        "Purchased": "No",
    },
]

const tableDataHead2 = [
    {
        "R&D Spend": "R&D Spend",
        "Administration": "Administration",
        "Marketing Spend": "Marketing Spend",
        "State": "State",
        "Profit": "Profit",
    },
]

const tableData2 = [
    {
        "R&D Spend": 165367.2,
        "Administration": 134938.3,
        "Marketing Spend": 4764335.7,
        "State": "New York",
        "Profit": 3506534.67,
    },
    {
        "R&D Spend": 2244567.2,
        "Administration": 4623234.35,
        "Marketing Spend": 643424.7,
        "State": "California",
        "Profit": 3642142.67,
    },
]

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
            <DfTable serial="1" dataHead={tableDataHead} data={tableData}/>
            <p>We will try to predict if the person will buy the product or not.</p>
            <DfTable serial="2" dataHead={tableDataHead2} data={tableData2} />
            <p>We will try to predict the Profit based on these features.</p>
        </div>
        </>
    )
}

export default Instructions;