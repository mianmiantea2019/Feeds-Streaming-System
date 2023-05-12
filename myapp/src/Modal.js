import React from "react";
import "./Modal.css";

function Modal({ movie, onClose }) {
    return (
        <div className="modal">
            <div className="modal__content">
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
                <button className="modal__close" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}

export default Modal;