import { forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { Task } from '../../types/types';
import { toggleTask, removeTask } from '../../redux/slicers/tasksSlice';
import Button from '../Button/Button';
import './style.css'

interface ToDoItemProps {
  task: Task;
}

const ToDoItem = forwardRef<HTMLDivElement, ToDoItemProps>(({ task }, ref) => {
  const dispatch = useDispatch();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", task.id);
  };

  const handleToggle = () => dispatch(toggleTask(task.id));
  const handleRemove = () => dispatch(removeTask(task.id));

  return (
    <div ref={ref} draggable="true" onDragStart={handleDragStart} className="container-todoitem">
      <span className={task.completed ? "text completed" : "text"}>
        {task.text}
      </span>
      <div>
        <Button onClick={handleToggle} className="button-todoitem">
          {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
        </Button>
        <Button onClick={handleRemove} className="button-todoitem">
          Remove
        </Button>
      </div>
    </div>
  );
});

export default ToDoItem;

