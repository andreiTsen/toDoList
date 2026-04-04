import './App.css';
import Header from './components/header/Header';
import Filters from './components/filters/Filters';
import TaskList from './components/taskList/TaskList';
import Footer from './components/footer/Footer';

function App() {
  return (
    <>
      <main className="todo-card">
        <Header />
        <Filters />
        <TaskList />
        <Footer />
      </main>
    </>
  )
}

export default App
