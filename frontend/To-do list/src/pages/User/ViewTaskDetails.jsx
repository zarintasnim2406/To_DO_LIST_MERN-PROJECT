import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import AvatarGroup from '../../components/AvatarGroup';
import moment from 'moment';
import { LuSquareArrowOutUpRight } from 'react-icons/lu';


const ViewTaskDetails= () => {
  const {id} = useParams();

  const[task,setTask] = useState(null);

  const getStatusTagColor = (status) => {
    switch(status) {
      case "In Progress":
        return "text-cyan-600 bg-cyan-200 border border-cyan-500/80";

      case "Completed":
        return "text-lime-600 bg-lime-200 border border-lime-500/80";

      default:
        return "text-violet-900 bg-violet-200 border border-violet-500/80"
    }
  };

  //get Task info by ID

  const getTaskDetailsByID = async () => {
    try{
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(id));

      if (response.data) {
        const taskInfo = response.data;
        setTask(taskInfo);
      }
    }catch (error) {
      console.error("Error fetching users:",error);
    }
  };

  //hadnle todo check

  const updateTodoChecklist = async (index) => {
    const todoChecklist = [...task?.todoChecklist];
    const taskId = id;

    if (todoChecklist && todoChecklist[index]) {
      todoChecklist[index].completed = !todoChecklist[index].completed;


      try{
        const response = await axiosInstance.put(
          API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(taskId),
            {todoChecklist}
        );
        
        if (response.status === 200) {
          setTask(response.data?.task || task);
        } else {
          //Optionally revert the toggle if the API call fails
          todoChecklist[index].completed = !todoChecklist[index].completed;
        }
      } catch (error) {
        todoChecklist[index].completed = !todoChecklist[index].completed;
      }
    }
  };

  //Handle attachment linl click

  const handleLinkClick = (link) => {
    if(!/^https?:\/\//i.test(link)) {
      link="https://" + link; //Default to HTTPs
    }
    window.open(link,"_blank");
  };


  useEffect(() => {
    if(id) {
      getTaskDetailsByID();
    }
    return() => {};
  }, [id]);


  
  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className="mt-5">
        {task && (
          <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
            <div className="form-card col-span-3">
              <div className="flex itms-center justify-between">
                <h2 className="text-base md:text-xl font-medium">
                  {task?.title}
                </h2>

                <div 
                  className={`text-[12px] md:text-[14px]font-medium ${getStatusTagColor(
                    task?.status                 
                  )} px-4 py-0.5 rounded `}
                >
                  
                  {task?.status}
                </div>
              </div>

              <div className="mt-4">
                <InfoBox label="Description" value={task?.description} />
              </div>

              <div className="grid grid-cols-12 gap-4 mt-4">
                <div className="col-span-6 md:col-span-4">
                  <InfoBox label="Priority" value={task?.priority} />
                </div>

                <div className="col-span-6 md:col-span-4">
                  <InfoBox
                    label="Due Date"
                    value={
                      task?.dueDate
                        ? moment(task?.dueDate).format("Do MMM YYYY")
                        : "N/A" 
                    }
                  />
                </div>
                <div className="col-span-6 md:col-span-4">
                  <label className="text-xm font-medium text-slate-900">
                    Assigned To
                  </label>

                  <AvatarGroup
                    avatars={
                      task?.assignedTo?.map((item) => item?.profileImageUrl) ||
                      []
                    }
                    maxVisible={5}
                  />
                </div>
              </div>

              <div className="mt-2">
                <label className="text-xm font-medium text-slate-900">
                  Todo Checklist
                </label>


                {task?.todoChecklist?.map((item,index) => (
                  <TodoCheckList
                    key={`todo_${index}`}
                    text={item.text}
                    isChecked={item?.completed}
                    onChange={() => updateTodoChecklist(index)}
                  />
                ))}
              
              </div>


              {task?.attachments?.length > 0 && (
                <div className="mt-2">
                  <label className="text-xm font-medium text-slate-800">
                    Attachments
                  </label>

                  {task?.attachments?.map((link,index) => (
                    <Attachment
                      key={`link_${index}`}
                      link={link}
                      index={index}
                      onClick={() => handleLinkClick(link)}
                    />
                  ))}
                </div>

              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
export default ViewTaskDetails;

const InfoBox = ({label,value}) => {
  return(
    <>
      <label className="text-xm font-medium text-slate-700">{label}</label>

      <p className="text-[12px] md:text-[14px] font-medium text-gray-800 mt-0.5">
        {value}
      </p>
  
    </>
  );
};

const TodoCheckList = ({text, isChecked, onChange}) => {
  return( 
    <div className="flex items-center gap-3 p-3">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="w-4 h-4 text-primary bg-gray-100 border-gray-400 rounded-sm outline-none cursor-pointer"
      />

      <p className="text-[15px] text-gray-900">{text}</p>

    </div>
  );
};


const Attachment = ({link, index, onClick}) => {
  return(

    <div className="flex justify-between bg-gray-200 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-2 cursor-pointer"
      onClick= {onClick}

    >

      <div className="flex-1 flex items-center gap-3 ">
        <span className="text-xm text-gray-400 font-semibold mr-2">
          {index < 9 ? `0${index + 1}` : index+1}
        </span>

        <p className="text-sm text-black">{link}</p>
      </div>

      <LuSquareArrowOutUpRight className="text-gray-800" />

    </div>

  );

};

