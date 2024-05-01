import React, { useState } from 'react'
import './EditForm.css';

export default function EditForm(props) {

    const [desc, setDesc] = useState(props.editTask.description);

    const changeHandler = (e) => {
        setDesc(e.target.value)

    }

    const editHandler = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title:props.editTask.title, description:desc
            })
        });

        const res = await response.json();
        if (res.status === 422 || !res) {
            window.alert(" Not able to edit task");
        }
        else {
            window.alert("successfully edited the data");
        }

        props.closeModalForEdit();

    }
    return (
        <div>
            <div>
                <form className='form-wrapper'>
                    <h2>Edit Task</h2>
                    <label>{props.editTask.title}</label>
                    <textarea type="text" placeholder='Change Description' value={desc} onChange={changeHandler} rows="10" cols="50" name="description" />
                    <button className="submit-btn" type="submit" onClick={editHandler}>Edit Task</button>
                    <button className="cancel-btn" onClick={props.closeModal} type="submit">Cancel</button>
                </form>
            </div>

        </div>
    )
}
