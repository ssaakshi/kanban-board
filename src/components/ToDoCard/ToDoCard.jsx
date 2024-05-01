import React, { useState } from 'react'
import './ToDoCard.css'
import Modal from '../Modal/Modal';

export default function ToDoCard(props) {


    const deleteHandler = async () => {
        const title = props.title;
        const response = await fetch("http://localhost:5000/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title
            })
        });

        const res = await response.json();
        if (res.status === 422 || !res) {
            window.alert(" Not able to delete task");
        }
        else {
            window.alert("successfully deleted the data");
        }
    }

    const [showModalForEdit, setShowModalForEdit] = useState(false);

    const [editTask, setEditTask] = useState({
        title: "",
        description: "",
        col: 0
    });

    const editHandler = () => {
        setShowModalForEdit(true);

        setEditTask({
            title: props.title,
            description: props.description,
        })
    }

    const closeModalForEdit = () => setShowModalForEdit(false);




    return (
        <article className='to-do-card'>
            {showModalForEdit && <Modal heading="Edit Task" closeModalForEdit={closeModalForEdit} editForm={showModalForEdit} editTask={editTask} />}

            <div className="card-header">
                <h4>{props.title}</h4>
                <div className='card-edit'>
                    <button onClick={editHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                            <path d="M16 5l3 3"></path>
                        </svg>
                    </button>
                    <button className='delete-button' onClick={deleteHandler}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash-filled" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z" stroke-width="0" fill="currentColor" />
                        <path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" stroke-width="0" fill="currentColor" />
                    </svg></button>
                </div>
            </div>
            <p>{props.description}</p>
        </article>
    )
}
