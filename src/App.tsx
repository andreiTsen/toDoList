import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import Filters from './components/filters/Filters';
import TaskList from './components/taskList/TaskList';
import Footer from './components/footer/Footer';
import { addTask, deleteTask, getFilters, getTasks, updateTask } from './services/api';
import type { FilterItem, Todo } from './types/types';

function App() {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [filters, setFilters] = useState<FilterItem[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    void getTasks().then((data) => {
      setTasks(data ?? []);
    });

    void getFilters().then((data) => {
      setFilters(data ?? []);
    });
  }, []);

  const handleAddTask = async (title: string) => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    const newTask = await addTask({
      title: trimmedTitle,
      status: 'todo',
    });

    if (newTask) {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
  };

  const handleDeleteTask = async (id: string) => {
    const isDeleted = await deleteTask(id);

    if (isDeleted) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }
  };

  const handleUpdateTask = async (id: string, updates: Partial<Omit<Todo, 'id'>>) => {
    const updatedTask = await updateTask(id, updates);

    if (updatedTask) {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task))
      );
    }
  };

  const visibleTasks = activeFilter === 'all'
    ? tasks
    : tasks.filter((task) => task.status === activeFilter);

  return (
    <>
      <main className="todo-card">
        <Header />
        <Filters
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <TaskList
          tasks={visibleTasks}
          onDeleteTask={handleDeleteTask}
          onUpdateTask={handleUpdateTask}
        />
        <Footer onAddTask={handleAddTask} />
      </main>
    </>
  );
}

export default App;
