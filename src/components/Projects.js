import React from "react";

function Projects({ match }) {
  return (
    <div className="d-flex pl-5 ml-5 mt-5 pt-5">
      <h4>{match.params.username} does not have any projects yet. </h4>
    </div>
  )
}

export default Projects;
