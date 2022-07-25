import React from "react";
import PropTypes from 'prop-types';

import shareImage from '../../images/learn.png';
import copyImage from '../../images/copy.png';

import './Footer.css';

export const Footer = ({ showCopyLink, classname }) => {
    return (
    <div className={`share-container ${classname}`}>
        <img src={shareImage} className="share-image"></img>
        <div className="share-content">Learn about sharing</div>
        { showCopyLink ?
            <React.Fragment>
                <img src={copyImage} className="share-image"></img>
                <div className="share-copy-content">Copy Link</div>
            </React.Fragment>
            : null
        }
    </div>
    );
}

Footer.defaultProps = {
    showCopyLink: false,
}

Footer.propTypes = {
    showCopyLink: PropTypes.bool
}

export default Footer;