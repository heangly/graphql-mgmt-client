import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useMutation } from '@apollo/client'

import { ADD_CLIENTS } from '../../graphql/mutations/clientMutations'
import { GET_CLIENTS } from '../../graphql/queries/clientQueries'

const AddClientModal = () => {
  const [client, setClient] = useState({ name: '', email: '', phone: '' })

  const [addClient] = useMutation(ADD_CLIENTS, {
    variables: { ...client },

    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({
        query: GET_CLIENTS
      })

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] }
      })
    }
  })

  const inputChangeHandler = (e) => {
    setClient((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const isInputFieldEmpty = () => {
    const { name, email, phone } = client
    return (
      name.trim().length === 0 ||
      email.trim().length === 0 ||
      phone.trim().length === 0
    )
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (isInputFieldEmpty()) return alert('Please fill in all fields')

    addClient()
    setClient({ name: '', email: '', phone: '' })
  }

  return (
    <>
      <button
        type='button'
        className='btn btn-secondary'
        data-bs-toggle='modal'
        data-bs-target='#addClientModal'
      >
        <div className='d-flex align-items-center'>
          <FaUser className='icon' />
          <div>Add Client</div>
        </div>
      </button>

      <div
        className='modal fade'
        id='addClientModal'
        tabIndex='-1'
        aria-labelledby='addClientModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content p-2'>
            <div className='modal-header'>
              <h5 className='modal-title' id='addClientModalLabel'>
                Add Client
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
                    value={client.name}
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor='email' className='form-label'>
                    Email
                  </label>
                  <input
                    id='email'
                    type='email'
                    className='form-control'
                    name='email'
                    onChange={inputChangeHandler}
                    value={client.email}
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor='phone' className='form-label'>
                    Phone
                  </label>
                  <input
                    id='phone'
                    type='text'
                    className='form-control'
                    name='phone'
                    onChange={inputChangeHandler}
                    value={client.phone}
                  />
                </div>

                <button
                  type='submit'
                  className='btn btn-secondary'
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

export default AddClientModal
