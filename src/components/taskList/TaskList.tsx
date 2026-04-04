import { useEffect, useState } from 'react';
import icon from '../../assets/icon.svg';
import { getTasks } from '../../services/api';
import type { Todo } from '../../types/types';

const statusLabels: Record<string, string> = {
    todo: 'To Do',
    in_progress: 'In Progress',
    inprogress: 'In Progress',
    done: 'Done',
};

function TaskList() {
    const [tasks, setTasks] = useState<Todo[]>([]);

    useEffect(() => {
        void getTasks().then((data) => {
            console.log('TaskList API data:', data);
            setTasks(data ?? []);
        });
    }, []);

    return (
         <section className="task-list">
            {tasks.map((task) => {
                const statusClass = task.status === 'in_progress' ? 'inprogress' : task.status;

                return (
                <div key={task.id} className={`task-item ${statusClass}`}>
                    <div className="task-content">
                        <div
                            className={`status-dot ${statusClass}`}
                            title={`Статус: ${statusLabels[task.status] ?? task.status}`}
                        ></div>

                        <div className={`task-info ${task.status === 'done' ? 'line-through' : ''}`}>
                            <h3>{task.title}</h3>
                            <span className={`task-label ${statusClass}`}>
                                {statusLabels[task.status] ?? task.status}
                            </span>
                        </div>
                    </div>

                    <button className={`action-btn ${task.status === 'done' ? 'done-btn' : ''}`} type="button">
                        <img className="icon" src={icon} alt="" />
                    </button>
                </div>
            )})}
        </section>
    )
};

export default TaskList;
