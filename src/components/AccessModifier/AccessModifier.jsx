import React, { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';

import './AccessModifier.css';

export const AccessModifier = ({ onSelect, currValue, classname, disableAccess }) => {

    const accessElem = useRef();

    useEffect(() => {
        accessElem.current.focus();
    }, [])

    const accessModifiers = [
        {
            name: "No Access",
            value: "NO_ACCESS"
        },
        {
            name: "Can View",
            value: "VIEW"
        },
        {
            name: "Can Edit",
            value: "EDIT"
        },
        {
            name:  "Full Access",
            value: "FULL_ACCESS"
        },
    ];

    // TODO: Might be required later.
    const findDisplayNameFromValue = (value) => {
        if(value)
            return accessModifiers.find(item => item.value === value).name;
        return accessModifiers[0].name;
    }

    const [expandItems, setExpandItems] = useState(false);
    const titleClassName = currValue === 'NO_ACCESS' ? "access-dd-title danger" : "access-dd-title"

    const optionsOnClickHandler = (val) => {
        onSelect(val);
        setExpandItems(!expandItems)
    };

    const onKeyDownHandler = (e) => {
        if(e.key === 'Enter') {
            if(!disableAccess) {
                setExpandItems(!expandItems);
            }
        }
    }

    return (
        <div className={`access-modifier ${classname}`}>
            <div className="access-dd-container" onClick={() => !disableAccess ? setExpandItems(!expandItems): {}} tabIndex={'0'} ref={accessElem} onKeyDown={onKeyDownHandler} role="tab">
                <div className={titleClassName}>{findDisplayNameFromValue(currValue)}</div>
                <div className="access-dd-image">{'>'}</div>
            </div>
            {expandItems ?
                <div className="access-dd-list">
                    {accessModifiers.map(item => {
                        return (
                                    <button
                                        key={item.value}
                                        className={item.value === 'NO_ACCESS' ? "access-dd-item danger" : "access-dd-item"}
                                        value={item.value}
                                        onClick={(e) => optionsOnClickHandler(e.target.value)}
                                    >
                                        {item.name}
                                    </button>
                        )
                    })}
                </div>
                : null
            }
        </div>
    );
}

AccessModifier.defaultValues = {
    currValue: "NO_ACCESS",
    disableAccess: false,
    onSelect: () => {},
}

AccessModifier.propTypes = {
    currValue: PropTypes.string,
    onSelect: PropTypes.func,
    disableAccess: PropTypes.bool,
}

export default AccessModifier;