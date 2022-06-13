import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import Spinner from '../components/Utils/Spinner'
import { GET_PROJECT } from '../graphql/queries/projectQueries'
import ClientInfo from '../components/Client/ClientInfo'
import DeleteProjectButton from '../components/Project/DeleteProjectButton'
import EditProjectForm from '../components/Project/EditProjectForm'

const Project = () => {
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id }
  })

  if (loading) return <Spinner />
  if (error) return <p>Something went wrong</p>

  return (
    <div className='mx-auto w-75 card p-5'>
      <Link className='btn btn-light btn-sm w-25 d-inline ms-auto' to='/'>
        Go Back
      </Link>
      <h1>{data.project.name}</h1>
      <p>{data.project.description}</p>
      <h5 className='mt-3'>Project Status:</h5>
      <p className='lead'>{data.project.status}</p>

      <ClientInfo client={data.project.client} />
      <EditProjectForm projectData={data.project} />
      <DeleteProjectButton projectId={data.project.id} />
    </div>
  )
}

export default Project
