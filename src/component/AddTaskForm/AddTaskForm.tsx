import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../redux/slicers/tasksSlice';
import './style.css';
import Button from '../Button/Button';
import Input from '../Input/Input';

interface AddTaskFormProps {
  closeModal: () => void;
}

const AddTaskForm = ({ closeModal }: AddTaskFormProps) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTask(text));
      setText('');
      closeModal();
    }
  };

  return (
    <div className="overlay">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task"
            className="form-input"
          />
          <Button type="submit" className="form-button">Add Task</Button>
          <Button onClick={closeModal} className="form-button">Cancel</Button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;

