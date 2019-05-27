import React from 'react';
import PropTypes from 'prop-types';

function Message({messageClass="text-success", message = "Loading...", height = '80vh'}) {
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{minHeight: height}}>
            <h4 className={messageClass}>Loading ... </h4>
        </div>
    )
}

Message.propTypes = {
    messageClass: PropTypes.string,
    message: PropTypes.string,
    height: PropTypes.string
}

export default Message;