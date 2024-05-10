import React, { useEffect, useState } from 'react';
import { fetchMonitors } from '../utils/api';

const MonitorTable = () => {
    const [monitors, setMonitors] = useState([]);
    let error;

    useEffect(() => {
        fetchMonitors()
            .then((data) => {
                if (data) {
                    setMonitors(data);
                }
                console.log(
                    "API called successfully. Returned data: " + JSON.stringify(data)
                );
            })
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <table className="table table-striped mt-3" style={{fontFamily: "Montserrat"}}>
            <thead className='table-dark'>
                <tr>
                    <th>Monitor Name</th>
                    <th>Monitor Type</th>
                    {/* <th>Status</th> */}
                    <th>Message</th>
                    <td>Query</td>
                </tr>
            </thead>
            <tbody>
                {monitors.map((monitor) => (
                    <tr key={monitor.id}>
                        <td>{monitor.name}</td>
                        <td>{monitor.type}</td>
                        {/* <td>{monitor.overall_state}</td> */}
                        <td>{monitor.message}</td>
                        <td>{monitor.query}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default MonitorTable;
