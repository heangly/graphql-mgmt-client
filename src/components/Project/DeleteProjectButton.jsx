import { useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { useMutation } from '@apollo/client'

import { DELETE_PROJECT } from '../../graphql/mutations/projectMutations'
import { GET_PROJECTS } from '../../graphql/queries/projectQueries'

const DeleteProjectButton = ({ projectId }) => {
  const navigate = useNavigate()

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate('/'),
    refetchQueries: [{ query: GET_PROJECTS }]
  })

  const deleteHandler = () => {
    deleteProject()
  }

  return (
    <div className='d-flex mt-5 ms-auto'>
      <button className='btn btn-danger mr-2' onClick={deleteHandler}>
        <FaTrash className='icon' /> Delete
      </button>
    </div>
  )
}

export default DeleteProjectButton
