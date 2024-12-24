import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SegmentPreview from "../components/SegmentPreview";
import GroupModal from "../components/GroupModal";
import ListPageModal from "../components/ListPage"; // Import ListPageModal
import SendbulkModal from "../components/SendbulkModal"; // Import SendBulkModal
import SendexcelModal from "../components/Importexcel"; 
import Image1 from "../Images/HeaderTemp.png";
import Image2 from "../Images/ContentTemp.png";
import Image3 from "../Images/MiddleTemp.png";
import Image4 from "../Images/FooterTemp.png";
import "./Mainpage.css";
import SendTestMail from '../components/Testsendmail';

const MainPage = () => {
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showListPageModal, setShowListPageModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false); // State for opening SendbulkModal
const [showSendtestModal, setShowSendtestModal] = useState(false); // State for opening Sendtestmail
const [showSendexcelModal, setShowSendexcelModal] = useState(false); // State for opening Sendexcelmail


  const [segments, setSegments] = useState([]);
  useEffect(() => {
  console.log("Segments in Parent Component:", segments);
}, [segments]);


  // Function to add a segment
  const handleAddSegment = (type) => {
    let newSegment;

    // Creating a new segment
    if (type === "segment-1") {
      newSegment = {
        id: Date.now(),
        type,
        content: {
          icon: "https://i.ibb.co/4VFQzWF/images-removebg-preview.png",
          heading: "Imagecon Academy",
          text: "Privilege Brokerage in partnership with Imagecon",
          image: "https://i.ibb.co/3m8BMYp/header-woman-block-removebg-preview.png",
        },
      };
    } else if (type === "segment-2") {
      newSegment = {
        id: Date.now(),
        type,
        content: {
          input: "Hello",
          textEditor: "hello welcome",
        },
      };
    } else if (type === "segment-3") {
      newSegment = {
        id: Date.now(),
        type,
        content: {
          input: "https://imageconindia.com",
          heading: "Don't wait to obtain the best conditions!",
          image: "https://i.ibb.co/b3b2qd3/download.png",
        },
      };
    }
    else if (type === "segment-4") {
    newSegment = {
      id: Date.now(),
      type,
      content: {
        textEditor:"Thank you for choosing us! we are comitted to deliver the best solutions for your needs.Staying touch follow us on social media on updates and offers.For questions or support contact us imageconindia@gmail.com."
      },
    };
  }
    console.log("Segments updated:", segments); // Check updated segments
    setSegments([...segments, newSegment]);
  };

  return (
    <div className="main-page">
      <Navbar
        onCreate={() => setShowGroupModal(true)}
        onListClick={() => setShowListPageModal(true)}
        onSendbulkClick={()=>setShowSendModal(true)}
        ontestSendMail={()=>setShowSendtestModal(true)}
        onsendexcelmail={()=>setShowSendexcelModal(true)}


      />

      {showGroupModal && <GroupModal onClose={() => setShowGroupModal(false)} />}
      {showListPageModal && (
        <ListPageModal onClose={() => setShowListPageModal(false)} />
      )}

      {/* Show SendBulkModal when button is clicked */}
        {showSendModal && (
        <SendbulkModal
          isOpen={showSendModal}
          onClose={() => setShowSendModal(false)}
          segments={segments}  // Pass segments to SendbulkModal
        />
      )}
       {/* Show Sendtestmail when button is clicked */}
        {showSendtestModal && (
        <SendTestMail
          isOpen={showSendtestModal}
          onClose={() => setShowSendtestModal(false)}
          segments={segments}  // Pass segments to SendbulkModal
        />
      )}
      {/* Show Sendecelmail when button is clicked */}
        {showSendexcelModal && (
        <SendexcelModal
          isOpen={showSendexcelModal}
          onClose={() => setShowSendexcelModal(false)}
          segments={segments}  // Pass segments to SendbulkModal
        />
      )}
      <div className="editor-section">
        <div className="controls">
          <img
            src={Image1}
            alt="Add Segment 1"
            className="circular-image-button"
            style={{ cursor: "pointer" }} // Ensures the cursor changes to a pointer for better UX
            onClick={() => handleAddSegment("segment-1")}
          />
          <img
            src={Image2}
            alt="Add Segment 2"
            className="circular-image-button"
            style={{ cursor: "pointer" }} // Ensures the cursor changes to a pointer for better UX
            onClick={() => handleAddSegment("segment-2")}
          />

          <img
            src={Image3}
            alt="Add Segment 3"
            className="circular-image-button"
            style={{ cursor: "pointer" }} // Ensures the cursor changes to a pointer for better UX
            onClick={() => handleAddSegment("segment-3")}
          />

          <img
            src={Image4}
            alt="Add Segment 4"
            className="circular-image-button"
            style={{ cursor: "pointer" }} // Ensures the cursor changes to a pointer for better UX
            onClick={() => handleAddSegment("segment-4")}
          />
        </div>
        <SegmentPreview segments={segments} setSegments={setSegments} />
      </div>
    </div>
  );
};

export default MainPage;
