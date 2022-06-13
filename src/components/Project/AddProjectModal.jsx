import { useState } from 'react'
import { FaList } from 'react-icons/fa'
import { useMutation, useQuery } from '@apollo/client'

import { ADD_PROJECT } from '../../graphql/mutations/projectMutations'
import { GET_PROJECTS } from '../../graphql/queries/projectQueries'
import { GET_CLIENTS } from '../../graphql/queries/clientQueries'

const AddProjectModal = () => {
  const [project, setProject] = useState({
    name: '',
    description: '',
    clientId: '',
    status: 'new'
  })

  const { loading, error, data } = useQuery(GET_CLIENTS)

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { ...project },

    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({
        query: GET_PROJECTS
      })

      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] }
      })
    }
  })

  const inputChangeHandler = (e) => {
    setProject((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const isInputFieldEmpty = () => {
    const { name, description, clientId, status } = project
    return (
      name.trim().length === 0 ||
      description.trim().length === 0 ||
      clientId.trim().length === 0 ||
      status.trim().length === 0
    )
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (isInputFieldEmpty()) return alert('Please fill in all fields')

    addProject()
    setProject({ name: '', description: '', clientId: '', status: 'new' })
  }

  if (loading) return null
  if (error) return <p>Something went wrong</p>

  return (
    <>
      <button
        type='button'
        className='btn btn-primary'
        data-bs-toggle='modal'
        data-bs-target='#addProjectModal'
      >
        <div className='d-flex align-items-center'>
          <FaList className='icon' />
          <div>New Project</div>
        </div>
      </button>

      <div
        className='modal fade'
        id='addProjectModal'
        tabIndex='-1'
        aria-labelledby='addProjectModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content p-2'>
            <div className='modal-header'>
              <h5 className='modal-title' id='addProjectModalLabel'>
                New Project
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
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

                <div className='mb-3'>
                  <label htmlFor='status' className='form-label'>
                    Status
                  </label>
                  <select
                    name='status'
                    id='status'
                    className='form-select'
                    value={project.status}
                    onChange={inputChangeHandler}
                  >
                    <option value='new'>Not Started</option>
                    <option value='progress'>In Progress</option>
                    <option value='completed'>Completed</option>
                  </select>
                </div>

                <div className='mb-3'>
                  <label htmlFor='clientId' className='form-label'>
                    Clients
                  </label>
                  <select
                    name='clientId'
                    id='clientId'
                    className='form-select'
                    value={project.clientId}
                    onChange={inputChangeHandler}
                  >
                    <option value=''>Select Client</option>
                    {data?.clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type='submit'
                  className='btn btn-primary'
                  data-bs-dismiss={!isInputFieldEmpty() && `modal`}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddProjectModal
