import { useState } from 'react';
import type { Todo } from '../../types/types';

const statusLabels: Record<string, string> = {
    todo: 'To Do',
    in_progress: 'In Progress',
    done: 'Done',
};

type TaskListProps = {
    tasks: Todo[];
    onDeleteTask: (id: number) => Promise<void>;
    onUpdateTask: (id: number, updates: Partial<Omit<Todo, 'id'>>) => Promise<void>;
};

function TaskList({ tasks, onDeleteTask, onUpdateTask }: TaskListProps) {
    const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editStatus, setEditStatus] = useState<Todo['status']>('todo');

    const startEditing = (task: Todo) => {
        setEditingTaskId(task.id);
        setEditTitle(task.title);
        setEditStatus(task.status);
        setActiveMenuId(null);
    };

    const handleSave = async (id: number) => {
        const trimmedTitle = editTitle.trim();

        if (!trimmedTitle) {
            return;
        }

        await onUpdateTask(id, {
            title: trimmedTitle,
            status: editStatus,
        });

        setEditingTaskId(null);
        setEditTitle('');
        setEditStatus('todo');
    };

    return (
         <section className="task-list">
            {tasks.map((task) => {
                const statusClass = task.status === 'in_progress' ? 'inprogress' : task.status;
                const isEditing = editingTaskId === task.id;
                const isMenuOpen = activeMenuId === task.id;

                return (
                <div key={task.id} className={`task-item ${statusClass} ${isEditing ? 'editing' : ''}`}>
                    <div className="task-main-row">
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

                        <div className="task-actions-menu">
                            <button
                                className={`action-btn menu-toggle ${isMenuOpen ? 'active' : ''}`}
                                type="button"
                                onClick={() => setActiveMenuId(isMenuOpen ? null : task.id)}
                                aria-label="Открыть меню задачи"
                            >
                                <span className="menu-dots">...</span>
                            </button>

                            {isMenuOpen ? (
                                <div className="task-dropdown-menu">
                                    <button
                                        className="task-menu-btn"
                                        type="button"
                                        onClick={() => startEditing(task)}
                                    >
                                        Редактировать
                                    </button>
                                    <button
                                        className="task-menu-btn delete"
                                        type="button"
                                        onClick={async () => {
                                            setActiveMenuId(null);
                                            await onDeleteTask(task.id);
                                        }}
                                    >
                                        Удалить
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    </div>

                    {isEditing ? (
                        <form
                            className="edit-task-form"
                            onSubmit={async (event) => {
                                event.preventDefault();
                                await handleSave(task.id);
                            }}
                        >
                            <input
                                className="edit-task-input"
                                type="text"
                                value={editTitle}
                                onChange={(event) => setEditTitle(event.target.value)}
                                placeholder="Новое название"
                            />
                            <select
                                className="edit-task-select"
                                value={editStatus}
                                onChange={(event) => setEditStatus(event.target.value)}
                            >
                                <option value="todo">To Do</option>
                                <option value="in_progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                            <div className="edit-task-actions">
                                <button className="task-menu-btn save" type="submit">Сохранить</button>
                                <button
                                    className="task-menu-btn cancel"
                                    type="button"
                                    onClick={() => {
                                        setEditingTaskId(null);
                                        setEditTitle('');
                                        setEditStatus('todo');
                                    }}
                                >
                                    Отмена
                                </button>
                            </div>
                        </form>
                    ) : null}
                </div>
            )})}
        </section>
    );
}

export default TaskList;
