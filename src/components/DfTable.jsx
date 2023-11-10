/* eslint-disable react/prop-types */
import classes from './DfTable.module.css';

const DfTable = ({serial, dataHead, data}) => {

    return (
        <div className={classes.tableContainer}>
            <p>Example Datasaet {serial}</p>
            <table className={classes.table}>
                <thead>
                    {dataHead.map((row, index) => {
                        return (
                            <tr key={index}>
                                {Object.keys(row).map(key => (
                                    <th key={key}>{row[key]}</th>
                                ))}
                            </tr>
                        )
                    })}
                </thead>
                <tbody>
                    {data.map((row, index) => {
                        return (
                            <tr key={index}>
                                {Object.keys(row).map(key => (
                                        <td key={key}>{row[key]}</td>
                                    ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        );
}

export default DfTable;