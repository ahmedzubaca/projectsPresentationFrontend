import React from 'react';
import { DataToRender } from '../utilities/data-to-render'

interface Props {
  props: DataToRender[]
}

const RenderProjects: React.FC<Props> = ({ props }) => {
  return(
    <div>
      {
        props.map((item) => {
          return(
            <div key={item.id}>
              <img alt = 'Cover/Project Poster'src={item.url} />
              <div> {item.projectTitle} </div>
            </div>
          )
        })
      }
    </div>
  )
}
export default RenderProjects;