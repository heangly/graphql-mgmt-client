import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { GET_PROJECT } from '../../graphql/queries/projectQueries'
import { UPDATE_PROJECT } from '../../graphql/mutations/projectMutations'

const EditProjectForm = ({ projectData }) => {
  const [project, setProject] = useState({
    id: projectData.id,
    name: projectData.name,
    description: projectData.description
  })

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      id: project.id,
      name: project.name,
      description: project.description
    },

    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }]
  })

  const inputChangeHandler = (e) => {
    setProject((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const isInputFieldEmpty = () => {
    const { name, description } = project
    return name.trim().length === 0 || description.trim().length === 0
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (isInputFieldEmpty()) return alert('Please fill in all fields')
    updateProject()
  }

  return (
    <div className='mt-5'>
      <h3>Update Project Details</h3>
      <form onSubmit={submitHandler}>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            id='name'
            type='text'
            className='form-control'
            name='name'
            onChange={inputChangeHandler}
            value={project.name}
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='description' className='form-label'>
            Description
          </label>
          <textarea
            id='description'
            className='form-control'
            name='description'
            onChange={inputChangeHandler}
            value={project.description}
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          Update
        </button>
      </form>
    </div>
  )
}

export default EditProjectForm
