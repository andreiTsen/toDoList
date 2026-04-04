import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import Filters from './components/filters/Filters';
import TaskList from './components/taskList/TaskList';
import Footer from './components/footer/Footer';
import { addTask, deleteTask, getTasks, updateTask } from './services/api';
import type { Todo } from './types/types';

function App() {
  const [tasks, setTasks] = useState<Todo[]>([]);

  useEffect(() => {
    void getTasks().then((data) => {
      setTasks(data ?? []);
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

  const handleDeleteTask = async (id: number) => {
    const isDeleted = await deleteTask(id);

    if (isDeleted) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }
  };

  const handleUpdateTask = async (id: number, updates: Partial<Omit<Todo, 'id'>>) => {
    const updatedTask = await updateTask(id, updates);

    if (updatedTask) {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task))
      );
    }
  };

  return (
    <>
      <main className="todo-card">
        <Header />
        <Filters />
        <TaskList
          tasks={tasks}
          onDeleteTask={handleDeleteTask}
          onUpdateTask={handleUpdateTask}
        />
        <Footer onAddTask={handleAddTask} />
      </main>
    </>
  );
}

export default App;
