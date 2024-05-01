import React from 'react'
import './Modal.css'
import { Form } from '../Form'
import EditForm from '../EditForm/EditForm'

export default function Modal(props) {

    return (
        <>
            <div className='modal-wrapper'></div>
            <div className='modal-container'>
                {(!props.editForm)? ( <Form closeModal={props.closeModal} heading={props.heading} />) : (<EditForm  closeModalForEdit={props.closeModalForEdit} editTask={props.editTask}/>)}
            </div>
        </>
    )
}
