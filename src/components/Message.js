import React from 'react';
import PropTypes from 'prop-types';

function Message({messageClass="text-success", message = "Loading...", height = '60vh'}) {
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{minHeight: height}}>
            <h4 className={messageClass}> {message} </h4>
        </div>
    )
}

Message.propTypes = {
    messageClass: PropTypes.string,
    message: PropTypes.string,
    height: PropTypes.string
}

export default Message;