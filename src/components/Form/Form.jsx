import React, { useState } from 'react'
import './Form.css'

export default function Form(props) {

    const [task, setTask] = useState({
        title: "",
        description: "",
        col: "BackLog"
    })

    let name, value;
    const inputHandler = (event) => {
        name = event.target.name;
        value = event.target.value;
        setTask({ ...task, [name]: value });
        console.log(task)
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const { title, description, col } = task;
        const response = await fetch("http://localhost:5000/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title, description, col
            })
        });

        const res = await response.json();
        if (res.status === 422 || !res) {
            window.alert(" Not able to add task");
            console.log("invalid")
        }
        else {
            window.alert("successfully added the data");
            console.log("valid")
        }

        props.closeModal();

    }


    return (
        <div>
            <form className='form-wrapper'>
                <h2>{props.heading}</h2>
                <textarea type="text" value={task.title} onChange={inputHandler} placeholder='Add New Task' name="title" />
                <textarea type="text" value={task.description} onChange={inputHandler} placeholder='Add Description' rows="10" cols="50" name="description" />
                <button className="submit-btn" type="submit" onClick={submitHandler}>Add Task</button>
                <button className="cancel-btn" onClick={props.closeModal} type="submit">Cancel</button>
            </form>
        </div>
    );
}
