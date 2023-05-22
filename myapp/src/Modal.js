import React, { useEffect, useRef } from "react"; 
import "./Modal.css";

function Modal({ movie, onClose }) {
    const base_url = "https://image.tmdb.org/t/p/original/";
    const imageUrl = base_url + movie.poster_path;
    const modalRef = useRef(null);
    
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [onClose]);


    return (
        <div className="modal">
            <div className="modal__content" ref={modalRef}>
                <h3>{movie.title}</h3>
                <img
                    className="modal__image"
                    src={imageUrl}
                    alt={movie.title}
                />
                <p className="modal__overview">{movie.overview}</p>
                <button className="modal__close" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}

export default Modal;