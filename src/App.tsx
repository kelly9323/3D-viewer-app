import './App.css'
import FileUploader from './components/FileUploader'
import Viewer from './components/Viewer'
import { ModelProvider } from './context/ModelContext'

function App() {
  return (
    <>
     <ModelProvider>
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <FileUploader />
      <Viewer />
    </div>
  </ModelProvider>
    </>
  )
}

export default App
