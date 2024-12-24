import './Navbar.css';

const Navbar = ({  onCreate, onListClick,onSendbulkClick,ontestSendMail,onsendexcelmail }) => {
  
  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <h1>Template Builder</h1>
        </div>
        <div className="navbar-right">
          <button className="add-group-btn" onClick={onCreate}>
            Add Group
          </button>
          <button className="list-btn" onClick={onListClick}>
            List
          </button>
          <button className="send-bulk-btn" onClick={onsendexcelmail}>
            Import Excel File
          </button>
           <button className="navbar-btn send-btn" onClick={onSendbulkClick}>
            SendBulk
          </button>
            <button className="test-mail-btn" onClick={ontestSendMail}>
            Test mail
          </button>
        </div>
      </nav>

    </>
  );
};

export default Navbar;
