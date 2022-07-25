import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';

import AccessModifier from '../AccessModifier';
import Footer from '../Footer';
import DisplayTile from "../DisplayTile";

import './SearchBox.css';

export const SearchBox = ({ peopleData, groupData, onInvite }) => {
    // TODO: Debounce later maybe??
    const [searchText, setSearchText] = useState('');
    const [pill, setPill] = useState({});

    const pillElement = useRef();
    const displayElement = useRef();
    const inviteElement = useRef();

    useEffect(() => {
        const checkAndFocus = (elem) => {
            if(elem && elem.current) {
                elem.current.focus();
            }
        }

        checkAndFocus(pillElement);
        checkAndFocus(displayElement);
        checkAndFocus(inviteElement);
    }, []);

    let targetPeopleData = [...peopleData.slice(0,3)];
    let targetGroupData = [...groupData.slice(0,2)];

    if(searchText !== '') {
        targetPeopleData = [...peopleData.filter(pupil => pupil.name.includes(searchText))];
        targetGroupData = [...groupData.filter(group => group.name.includes(searchText))];
    }

    const renderData = (val, type) => {
        // TODO: While rendering DisplayTile component, need to handle logic to change tabIndex when tab focused.
        if(val.length > 0) {
            return (
                <div className="search-display-section">
                    <div>{`Select a ${type}`}</div>
                    {
                        val.map((item) => {
                            return <DisplayTile key={item.id} displayDeets={item} onClickHandler={setPill} tabIndex={'0'} />
                        })
                    }
                </div>
            );
        }
    }

    const accessOnSelect = (updatedAccess) => setPill({...pill, access: updatedAccess })

    const onKeyDownHandler = (e, fn) => {
        if(e.key === 'Enter') {
            fn();
        }
    };

    const onInviteHandler = () => {
        if(pill.id) {
            onInvite(pill, pill.imageUrl ? 'people' : 'group')
        }
    };

    return (
        <div className="search-box">
            <div className="search-input__container">
                <div className="search-container">
                    {
                        pill.id ?
                            <div className="search-pill" onClick={() => setPill({})} role="tab" tabIndex={'0'} ref={pillElement} onKeyDown={(e) => onKeyDownHandler(e, () => setPill({}))}>
                                <div>{pill.name}</div>
                                <div className="search-pill-close">x</div>
                            </div>
                            :
                            <React.Fragment>
                                <label htmlFor="search-input"></label>
                                <input
                                    autoComplete="off"
                                    autoFocus
                                    type="text"
                                    id="search-input"
                                    className="search-input"
                                    value={searchText}
                                    placeholder={"Search emails, names or groups"}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                            </React.Fragment>
                    }
                </div>
                <AccessModifier
                    currValue={pill.access || "FULL_ACCESS"}
                    onSelect={accessOnSelect}
                    />
                <div
                    className="search-invite-button"
                    onClick={onInviteHandler}
                    role="tab"
                    tabIndex={"0"}
                    onKeyDown={(e) => onKeyDownHandler(e, onInviteHandler)}
                >
                    Invite
                </div>
            </div>
            <div className="search-display" tabIndex={'0'} ref={displayElement} role="tab">
                {renderData(targetPeopleData, "person")}
                {renderData(targetGroupData, "group")}
            </div>
            <Footer classname={"search-footer"}/>
        </div>
    );
}

SearchBox.propTypes = {
    peopleData: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            title: PropTypes.string,
            access: PropTypes.string,
            family: PropTypes.arrayOf(PropTypes.string),
            imageUrl: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    groupData: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
    onInvite: PropTypes.func.isRequired,
}

export default SearchBox;