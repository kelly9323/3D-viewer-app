import "./App.css";
import MainImport from "./components/layout/MainImport";
import Viewer from "./components/viewer/Viewer";
import { ModelProvider, useModelContext } from "./context/ModelContext";
import { useLoadingState } from "./hooks/useLoadingState";
import ToolBar from "./components/layout/ToolBar";
import Header from "./components/layout/Header";
import LoadingOverlay from "./components/LoadingOverlay";

function AppContent() {
  const { modelUrl, loading } = useModelContext();

  return (
    <>
      {loading && <LoadingOverlay />}
      <div className="wrapper-main">
        <Header />
          <div>
            {!modelUrl && (
              <div className="uploader-container">
                <div className="uploader-main">
                  <MainImport />
                </div>
              </div>
            )}
            {modelUrl && <ToolBar />}
            <div className={`viewer-container ${!modelUrl ? "overlay" : ""}`}>
              <Viewer />
            </div>
          </div>
      </div>
    </>
  );
}

// to make modelProvider work
function App() {
  return (
    <>
      <ModelProvider>
        <AppContent />
      </ModelProvider>      
    </>
  );
}

export default App;
