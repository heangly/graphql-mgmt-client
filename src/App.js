import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import Home from './pages/Home'
import Project from './pages/Project'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <Router>
      <Header />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='projects/:id' element={<Project />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
