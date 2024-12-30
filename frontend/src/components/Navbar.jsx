import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ onCreate, onListClick, onSendbulkClick, ontestSendMail, onsendexcelmail }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleButtonClick = (action) => {
    // Close the mobile menu
    setIsMenuOpen(false);
    // Perform the action passed as a parameter
    action();
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <h1>Template Builder</h1>
        </div>
        <div className="navbar-right">
          <button className="add-group-btn" onClick={() => handleButtonClick(onCreate)}>
            Add Group
          </button>
          <button className="list-btn" onClick={() => handleButtonClick(onListClick)}>
            List
          </button>
          <button className="send-bulk-btn" onClick={() => handleButtonClick(onsendexcelmail)}>
            Import Excel File
          </button>
          <button className="navbar-btn send-btn" onClick={() => handleButtonClick(onSendbulkClick)}>
            SendBulk
          </button>
          <button className="test-mail-btn" onClick={() => handleButtonClick(ontestSendMail)}>
            Test Mail
          </button>
        </div>
        <button className="navbar-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <div className={`navbar-menu ${isMenuOpen ? 'show' : ''}`}>
          <button className="add-group-btn" onClick={() => handleButtonClick(onCreate)}>
            Add Group
          </button>
          <button className="list-btn" onClick={() => handleButtonClick(onListClick)}>
            List
          </button>
          <button className="send-bulk-btn" onClick={() => handleButtonClick(onsendexcelmail)}>
            Import Excel File
          </button>
          <button className="navbar-btn send-btn" onClick={() => handleButtonClick(onSendbulkClick)}>
            SendBulk
          </button>
          <button className="test-mail-btn" onClick={() => handleButtonClick(ontestSendMail)}>
            Test Mail
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
