import { useQuery } from '@apollo/client'

import Spinner from '../Utils/Spinner'
import { GET_PROJECTS } from '../../graphql/queries/projectQueries'
import ProjectCard from './ProjectCard'

const Project = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS)

  if (loading) return <Spinner />
  if (error) return <p>Something went wrong</p>

  return (
    <div className='row my-4'>
      {data.projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}

export default Project
