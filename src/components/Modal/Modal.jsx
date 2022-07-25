import React, { useState } from "react";
import PropTypes from 'prop-types';

import './Modal.css';

export const Modal = ({ handleClose, show, children  }) => {
    const showHideClassName = show ? "modal display-on" : "modal display-off";
    return (
        <div className={showHideClassName} onClick={handleClose} >
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

Modal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
}

export default Modal;