import React from "react";

import './Toggle.css';

export const Toggle = ({}) => {
    return (
            <label className="toggle">
                <label htmlFor="toggle-input"></label>
                <input type="toggle-input" name="toggle-input" />
                <span className="slider round"></span>
            </label>
    );
}

export default Toggle;