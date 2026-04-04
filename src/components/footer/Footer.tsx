import { useState } from 'react';
import icon from '../../assets/icon.svg';

type FooterProps = {
    onAddTask: (title: string) => Promise<void>;
};

function Footer({ onAddTask }: FooterProps) {
    const [title, setTitle] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await onAddTask(title);
        setTitle('');
    };

    return (
        <footer className="footer">
          <form className="add-task-form" onSubmit={handleSubmit}>
            <input
              className="add-task-input"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Введите новую задачу"
            />
            <button className="add-task-btn" type="submit">
              <img className="icon" src={icon} alt="" />
              <span>Новая задача</span>
            </button>
          </form>
        </footer>
    );
}

export default Footer;
