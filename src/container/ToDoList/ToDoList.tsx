import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import ToDoItem from '../../component/ToDoItem/ToDoItem';
import AddTaskForm from '../../component/AddTaskForm/AddTaskForm';
import { moveTask } from '../../redux/slicers/tasksSlice';
import './style.css';
import Button from '../../component/Button/Button';

const ToDoList = () => {
  const { activeTasks, completedTasks } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();
  const [targetIndex, setTargetIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const taskRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, newList: 'active' | 'completed') => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    if (targetIndex !== -1) {
      dispatch(moveTask({ taskId, targetIndex, newList }));
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, listType: 'active' | 'completed') => {
    e.preventDefault();
    const mouseY = e.clientY;
    const tasks = listType === 'active' ? activeTasks : completedTasks;
    const positions = tasks.map((_task, index) => {
      const ref = taskRefs.current[index];
      if (ref) {
        const rect = ref.getBoundingClientRect();
        return {
          index,
          top: rect.top,
          bottom: rect.bottom
        };
      }
      return { index: -1, top: 0, bottom: 0 };
    });
  
    const foundIndex = positions.findIndex(pos => mouseY >= pos.top && mouseY <= pos.bottom);
    setTargetIndex(foundIndex);
  };

  return (
    <div className='container'>
      <Button className='button-todolist' onClick={toggleModal}>Add New Task</Button>
      {isModalOpen && (
        <div className="overlay">
          <div className="modal">
            <AddTaskForm closeModal={toggleModal} />
          </div>
        </div>
      )}
      <div className="container-todolist">
        <div className="column" onDrop={(e) => handleDrop(e, 'active')} onDragOver={(e) => handleDragOver(e, 'active')}>
          <h2>Active Tasks</h2>
          {activeTasks.map((task, index) => (
            <ToDoItem key={task.id} task={task} ref={el => taskRefs.current[index] = el} />
          ))}
        </div>
        <div className="column" onDrop={(e) => handleDrop(e, 'completed')} onDragOver={(e) => handleDragOver(e, 'completed')}>
          <h2>Completed Tasks</h2>
          {completedTasks.map((task, index) => (
            <ToDoItem key={task.id} task={task} ref={el => taskRefs.current[index] = el} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToDoList;


