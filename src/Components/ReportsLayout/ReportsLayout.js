// src/components/ReportsLayout/ReportsLayout.js
import React from 'react';
import './ReportsLayout.css';

const ReportsLayout = () => {
    const reports = [
        { id: 1, name: "Dr. John Doe", specialty: "Cardiology" },
        { id: 2, name: "Dr. Jane Smith", specialty: "Dermatology" },
    ];

    return (
        <div className="reports-layout">
            <h1>Reports</h1>
            <table>
                <thead>
                    <tr>
                        <th>Serial Number</th>
                        <th>Doctor Name</th>
                        <th>Doctor Specialty</th>
                        <th>View Report</th>
                        <th>Download Report</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map(report => (
                        <tr key={report.id}>
                            <td>{report.id}</td>
                            <td>{report.name}</td>
                            <td>{report.specialty}</td>
                            <td>
                                <a href={`/reports/${report.id}`} target="_blank" rel="noreferrer">View</a>
                            </td>
                            <td>
                                <a href={`/reports/${report.id}.pdf`} download>Download</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReportsLayout;