import React from "react";
import moment from "moment";


const TaskListTable = ({tableData}) => {
    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-700 border border-green-300';
            case 'Pending': return 'bg-pruple-100 text-purple-700 border border-purple-300';
            case 'In Progress': return 'bg-cyan-100 text-cyan-700 border border-cyan-300';
            default: return 'bg-gray-100 text-gray-700 border border-gray-300';
        }
    };


    const getPriorityBadgeColor = (priority) => {
        switch (priority) {
            case 'High': return 'bg-red-100 text-red-800 border border-red-300';
            case 'Medium': return 'bg-orange-100 text-orange-800 border border-orange-300';
            case 'Low': return 'bg-green-100 text-green-800 border border-green-300';
            default: return 'bg-gray-100 text-gray-700 border border-gray-300';
        }
    };
    
    return(
        <div className="overflow-x-auto p-4 rounded-lg mt-4">
            <table className="min-w-full">
                <thead>
                    <tr className="text-left">
                        <th className="py-3 px-4 text-gray-800 font-medium text-[16px]">Name</th>
                        <th className="py-3 px-4 text-gray-800 font-medium text-[16px]">Status</th>
                        <th className="py-3 px-4 text-gray-800 font-medium text-[16px]">Priority</th>
                        <th className="py-3 px-4 text-gray-800 font-medium text-[16px] hidden md:table-cell">Created On</th>
                    
                    </tr>
                </thead>
            
                <tbody>
                    {tableData.map((task) => (
                        <tr key = {task._id} className="border-t border-gray-800">
                            <td className="my-6 mx-4 text-gray-900 text-[16px] line-clamp-1 overflow-hidden">{task.title}</td>
                            <td className="py-4 px-4">
                                <span className={`px-2 py-1 text-xm rounded inline-block ${getStatusBadgeColor(task.status)}`}>{task.status}</span>
                            </td>
                            <td className="py-4 px-4">
                                <span className={`px-2 py-1 text-xm rounded inline-block ${getPriorityBadgeColor(task.priority)}`}>{task.priority}</span>
                            </td>
                            <td className="py-4 px-4 text-gray-1000 text-[16px] text-nowrp hidden md:table-cell">{task.createdAt ? moment(task.createdAt).format('Do MMM YYYY') : 'N/A'} </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
    )
};

export default TaskListTable;