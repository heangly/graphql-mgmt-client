import AddClientModal from '../components/Client/AddClientModal'
import Clients from '../components/Client/Clients'
import AddProjectModal from '../components/Project/AddProjectModal'
import Project from '../components/Project/Project'

const Home = () => {
  return (
    <>
      <div className='d-flex gap-3 mb-4'>
        <AddClientModal />
        <AddProjectModal />
      </div>
      <Project />
      <hr />
      <Clients />
    </>
  )
}

export default Home
