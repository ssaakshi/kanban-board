import React, { useEffect, useState } from 'react'
import './ToDoList.css'
import ToDoCard from '../ToDoCard/ToDoCard';


export default function ToDoList(props) {

    const [task, setList] = useState([])

    const displayCards = async () => {
        const response = await fetch(`http://localhost:5000/data?col=${props.col}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        setList(await response.json());
    }

    const deleteColumn = async () => {

        //props.listTitle
        const listTitle = props.listTitle;
        const response = await fetch("http://localhost:5000/deleteColumn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                listTitle
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

    useEffect(() => {
        displayCards();

    }, []);

    return (
        <div className='to-do-list'>
            <div className="list-icon">
                <div className="list-first">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-checklist" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8"></path>
                        <path d="M14 19l2 2l4 -4"></path>
                        <path d="M9 8h4"></path>
                        <path d="M9 12h2"></path>
                    </svg>
                    <h3> {props.listTitle}</h3>
                </div>
                <button className='delete-button' onClick={deleteColumn} ><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash-filled" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z" stroke-width="0" fill="currentColor" />
                    <path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" stroke-width="0" fill="currentColor" />
                </svg></button>
            </div>

            {
                task.map(item => {
                    return <ToDoCard title={item.title} description={item.description} />
                })
            }

        </div>
    )
}
