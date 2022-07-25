import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';

import DisplayTile from '../DisplayTile';
import Modal from '../Modal';
import Footer from '../Footer';
import SearchBox from '../SearchBox';
import Toggle from '../Toggle';

import publicShareImage from '../../images/publicShare.png';

import './Expander.css';

export const Expander = ({ peopleData, groupData }) => {
    // Parent component
    // SPOC for other children needing global person and group data.
    // Updations and stuff take place here through callbacks from child components.

    const [openModal, setOpenModal] = useState(false);
    const [people, setPerson] = useState([...peopleData]);
    const [group, setGroup] = useState([...groupData]);
    const [recentTiles, setRecentTiles] = useState([]);

    const inviteElement = useRef();

    useEffect(() => {
        inviteElement.current.focus();
    }, [])

    const findAndUpdateData = (obj, type) => {
        // Updates the state of people and group, also updates recent tiles.
        if(type === 'people') {
            setPerson(prevPerson => {
                const updatedPerson = [...prevPerson];
                updatedPerson[updatedPerson.findIndex(item => item.id === obj.id)] = obj;
                return updatedPerson;
            });
        } else {
            setGroup(prevGroup => {
                const updatedGroup = [...prevGroup];
                updatedGroup[updatedGroup.findIndex(item => item.id === obj.id)] = obj;
                return updatedGroup;
            });
        }
        setOpenModal(false);
        setRecentTiles(prevTiles => {
            if(prevTiles.find(tile => tile.id === obj.id) !== undefined) {
                // Already present.
                const index = prevTiles.findIndex(tile => tile.id === obj.id);
                prevTiles[index] = obj;
                return [...prevTiles];
            }
            return [...prevTiles, obj];
        });
    }

    const onKeyDownHandler = (e) => {
        if(e.key === 'Enter') {
            setOpenModal(true);
        }
    }

    return (
        <div className="expander">
            <div className="link-container">
                <img src={publicShareImage} className="link-image"></img>
                <div className="link-content">
                    <div className="link-content__title">Share to web</div>
                    <div className="link-content__desc">Publish and share link with anyone</div>
                </div>
                <div className="link-toggle"><Toggle/></div>
            </div>
            <div className="invite-and-recents">
                <div className="invite-container">
                    <div className="invite-content">Add people, email or groups...</div>
                    <div className="invite-button" onClick={() => setOpenModal(true)} ref={inviteElement} role="tab" tabIndex={'0'} onKeyDown={onKeyDownHandler}>Invite</div>
                </div>
                <div className="recent-tiles">
                    {
                        recentTiles.map(tile => {
                            return <DisplayTile key={tile.id} showAccess onClickHandler={() => {}} displayDeets={{...tile}} disableAccess />
                        })
                    }
                </div>
            </div>
            <Footer showCopyLink/>
            {openModal ?
                <Modal show={openModal} handleClose={() => setOpenModal(false)}>
                    <SearchBox peopleData={people} groupData={group} onInvite={(obj, type) => findAndUpdateData(obj, type)}/>
                </Modal>
                : null
            }
        </div>
    );
}

Expander.propTypes = {
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
    ).isRequired
}

export default Expander;