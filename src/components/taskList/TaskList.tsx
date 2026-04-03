import icon from '../../assets/icon.svg';

const tasks = [
  { id: 1, title: 'Создать API', status: 'todo', label: 'To Do' },
  { id: 2, title: 'Исправить ошибку входа', status: 'inprogress', label: 'In Progress' },
  { id: 3, title: 'Создать панель управления', status: 'done', label: 'Done' },
]

function TaskList() {
    return (
         <section className="task-list">
            {tasks.map((task) => (
                <div key={task.id} className={`task-item ${task.status}`}>
                    <div className="task-content">
                        <div
                            className={`status-dot ${task.status}`}
                            title={`Статус: ${task.label}`}
                        ></div>

                        <div className={`task-info ${task.status === 'done' ? 'line-through' : ''}`}>
                            <h3>{task.title}</h3>
                            <span className={`task-label ${task.status}`}>{task.label}</span>
                        </div>
                    </div>

                    <button className={`action-btn ${task.status === 'done' ? 'done-btn' : ''}`} type="button">
                        <img className="icon" src={icon} alt="" />
                    </button>
                </div>
            ))}
        </section>
    )
};

export default TaskList;