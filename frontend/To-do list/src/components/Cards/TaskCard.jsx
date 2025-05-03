import React from "react";
import Progress from "../Progress";
import AvatarGroup from "../AvatarGroup";
import { LuPaperclip } from "react-icons/lu";
import moment from "moment";




const TaskCard = ({title,description,priority,status,progress,createdAt,dueDate,assignedTo,attachmentCount,completedTodoCount,todoChecklist,onClick}) => {
    const getStatusTagColor = () => {
        switch(status) {
            case "In Progress":
                return "text-cyan-800 bg-cyan-50 border border-cyan-500/60";

            case "Completed":
                return "text-lime-800 bg-lime-50 border border-lime-500/60";
            
            default:
                return "text-violet-800 bg-violet-50 border border-violet-500/60";
        }
    };

    const getPriorityTagColor = () => {
        switch(priority) {
            case "Low":
                return "text-emerald-700 bg-emerald-50 border border-emerald-500/40";

            case "Medium":
                return "text-amber-700 bg-amber-50 border border-amber-500/40";
            
            default:
                return "text-rose-700 bg-rose-50 border border-rose-500/40"

        }
    };

    return (
        <div 
           className="bg-white rounded-xl py-4 shadow-md shadow-gray-500 border border-gray-200/100 cursor-pointer"
           onClick={onClick}
        >
            <div className="flex items-end gap-3 px-4">
                <div
                  className={`text-[12px] font-medium ${getStatusTagColor()} px-4 py-0.5 rounded `}
                >
                    {status}
                </div>
                <div 
                  className={`text-[12px] font-medium ${getPriorityTagColor()} px-4 py-0.5 rounded `}
                >
                    {priority} Priority
                </div>
            </div>

            <div 
              className={`px-4 border-l-[4px] ${
                status === "In Progress"
                  ? "border-cyan-600"
                  : status === "Completed"
                  ? "border-indigo-600"
                  : "border-violet-600"

              }`}
            >
                <p className="text-sm font-medium text-gray-900 mt-4 line-clamp-2">
                    {title}
                </p>

                <p className="text-xs text-gray-900 mt-1.5 line-clamp-2 leading-[18px]">
                    {description}
                </p>

                <p className="text [13px] text-gray-900/100 font-medium mt-2 mb-2 leading-[18px]">
                    Task Done:{" "}
                    <span className="font-semibold text-gray-800">
                        {completedTodoCount} / {todoChecklist.length || 0}
                    </span>
                </p>

                <Progress progress={progress} status={status} />
            </div>

            <div className="px-4">
                <div className="flex items-center justify-between my-1">
                    <div>
                        <label className="text-xm text-gray-700">Start Date</label>
                        <p className="text-[14px] font-medium text-gray-900">
                            {moment(createdAt).format("Do MMM YYYY")}
                        </p>
                    </div>

                    <div>
                        <label className="text-xm text-gray-700">Due Date</label>
                        <p className="text-[14px] font-medium text-gray-900">
                            {moment(dueDate).format("Do MMM YYYY")}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                    <AvatarGroup avatars={assignedTo || []} />

                    {attachmentCount > 0 && (
                        <div className="flex items-center gap-2 bg-blue-50 px-2.5 py-1.5 rounded-lg">
                            <LuPaperclip className="text-primary" />{" "}
                            <span className="text-xs text-gray-900">{attachmentCount}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};

export default TaskCard;


