import React from "react";
import PropTypes from 'prop-types';
import Message from './Message';

function Projects({match}) {
  return (
    <Message height="30vh" message={`${match.params.username} does not have any projects yet. `} />
  )
}

Projects.propTypes = {
  match: PropTypes.object.isRequired
}

export default Projects;
