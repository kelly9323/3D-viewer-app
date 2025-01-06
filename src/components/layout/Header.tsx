import "../../styles/Header.css";
import importIcon from "../../assets/icons/import-icon.png";

const Header: React.FC = () => {
  const handleImportClick = () => {
      window.location.reload();
  };
  return (
    <>
      <header className="header-container">
        <div className="logo-container">
          <img className="logo" src="main-logo.png" alt="" />
          {/* <h1 className="app-name">3D Model Viewer</h1> */}
        </div>
        <div className="import-btn-container">
          <a className="import-btn" onClick={handleImportClick}>
            <img src={importIcon} alt="import-icon" className="import-icon" />
            <p className="import-btn-txt">Import model</p>
          </a>
        </div>
      </header>
    </>
  );
};

export default Header;
