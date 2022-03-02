import React from "react";

const DrpdownMenue = () => {

  const projects=[
    {projectLabel: "Interior Design", projectUrl: "/projects/interior-design" },
    {projectLabel: "Academic Projects", projectUrl: "/projects/academic-projects" },
    {projectLabel: "Competitions Projects", projectUrl: "/projects/competitions-projects"}
  ]
  
  return(
    <ul className="dropdown-menue-container">
      {
        projects.map((project, i) =>  <li className="dropdown-menu-label" key={i}> 
                                        <a className='dropdown-menu-label-text'
                                           href={project.projectUrl}
                                        > 
                                          {project.projectLabel}                                        
                                        </a> 
                                      </li>)
      }     
  </ul>
  )
}
export default DrpdownMenue;