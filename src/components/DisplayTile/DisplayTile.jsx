import React, { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';

import AccessModifier from '../AccessModifier';

import './DisplayTile.css';

export const DisplayTile = ({ onClickHandler, displayDeets, showAccess, disableAccess, tabIndex }) => {

    const tileElement = useRef();

    useEffect(() => {
        tileElement.current.focus();
    }, [])

    const onKeyPressHandler = (e) => {
        if(e.key === 'Enter') {
            onClickHandler({...displayDeets});
        }
    };

    return (
    <div className="display-tile" onClick={() => onClickHandler({...displayDeets})} tabIndex={tabIndex} onKeyDown={onKeyPressHandler} ref={tileElement} role="tab">
        {displayDeets.imageUrl ? <img src={displayDeets.imageUrl} className="avatar"/>: <div className="custom-avatar">{displayDeets.name.charAt()}</div>}
        <div className="title-container">
            <div className="title">{displayDeets.name}</div>
            {displayDeets.title ? <div className="sub-title">{displayDeets.title}</div> : null }
        </div>
        { showAccess ? <AccessModifier classname="display-tile-access" currValue={displayDeets.access} disableAccess/> : null }
    </div>
    );
}

DisplayTile.defaultValues = {
    showAccess: false,
    onAccessChange: () => {},
    disableAccess: false,
    tabIndex: '0',
    updateTabIndex: () => {},
}

DisplayTile.propTypes = {
    displayDeets: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        title: PropTypes.string,
        access: PropTypes.string,
        family: PropTypes.arrayOf(PropTypes.string),
        imageUrl: PropTypes.string
    }).isRequired,
    onClickHandler: PropTypes.func.isRequired,
    showAccess: PropTypes.bool,
    onAccessChange: PropTypes.func,
    disableAccess: PropTypes.bool,
    tabIndex: PropTypes.string,
    updateTabIndex: PropTypes.func,
}

export default DisplayTile;