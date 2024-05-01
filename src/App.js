import { useState, useEffect } from 'react';
import './App.css';
import Modal from './components/Modal/Modal';
import { ToDoList } from './components/ToDoList';



function App() {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const [colNo, setColNo] = useState([])


  const displayLists = async () => {
    const response = await fetch(`http://localhost:5000/column`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    setColNo(await response.json());
  }

  useEffect(() => {
    displayLists();

  }, []);



  const [newColumn, setNewColumn] = useState("");
  const changeHandler = (e) => { setNewColumn(e.target.value); }
  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {

      await fetch(`http://localhost:5000/column`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newColumn
        })
      });

    }
  }

  return (
    <div className="main-div">
      {showModal && <Modal heading="Create New Task" closeModal={closeModal} />}
      <div className='board-header'>
        <h1>Hiii!!! Welcome to Kanban Dashboard!</h1>
        <div className='header-end'>
          <form>
            <input type="text" placeholder=' + Add new Column' value={newColumn} onChange={changeHandler} onKeyDown={handleKeyDown}></input>
          </form>
          <button onClick={openModal}>+ Add New Task</button>
        </div>
      </div>

      <div className='list-manager'>
        {
          colNo.map((item, index) => {
            return <ToDoList listTitle={item.name} col={item.name} />
          })
        }
      </div>

    </div>
  );
}

export default App;
