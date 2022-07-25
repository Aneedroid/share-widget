import React, { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';

import Expander from '../Expander';

import vector from '../../images/vector.svg'

import './ShareWidget.css';

// TODO: Context API to pass props to children directly.

export const ShareWidget = ({ peopleData, groupData }) => {
    const [showModal, setShowModal] = useState(false);
    const divElement = useRef();

    useEffect(() => {
        divElement.current.focus();
    }, [])

    const onClickHandler = () => setShowModal(!showModal);

    const onKeyDownHandler = (e) => {
        if(e.key === 'Enter') {
            onClickHandler();
        }
    };

    return (
    <div className="share-widget">
        <div className="share-widget__button" onClick={onClickHandler} ref={divElement} onKeyDown={onKeyDownHandler}  tabIndex={"0"} role="tab">
            <div>Share</div>
            <img src={vector} />
        </div>
        { showModal ? <Expander peopleData={peopleData} groupData={groupData} closeWidget={onClickHandler}/>: null}
    </div>
    );
}

ShareWidget.propTypes = {
    groupData: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
    peopleData: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            title: PropTypes.string,
            access: PropTypes.string,
            family: PropTypes.array,
            imageUrl: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
}

export default ShareWidget;