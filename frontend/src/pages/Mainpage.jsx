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
import Image4 from "../Images/MidContentTemp.png"
import Image5 from "../Images/FooterTemp.png";
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
          icon: "https://media-hosting.imagekit.io//39456fb45f3c4188/images-removebg-preview.png?Expires=1735453231&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=xrQ~ZDmzOeoIpMa9~FybAbH6ZHXOS9nGIx3TSgysBUihYV2M2H-FK2KgDINeEgOdSyL9GJTzBD-e68nQTazy2~R4yWHEtMtZJ8Yqe1GIcytauY6~xXy59IatyPtSAXbdURDsAzp5oQjQD6VrNPpIT3ex077qWcQ57XUIqts2WEoRwjX~oUcr~SJ2yX3HlgCJbw~l1PjoQ66KdGiUJIPrqLLU~Emt1j-oiE3~r~bk4esrfh1ECgASaNvaAB5EB5wxzHFkN~NBSZF6Na7bMbRk6ySgwB-jlsFT8Kg-7I-mxLVhrJHf~i1DSsFjSqneQMwjaohCLZs9gVw-vAKn5k~R6w__",
          heading: "Imagecon Academy",
          text: "Privilege Brokerage in partnership with Imagecon",
          image: "https://media-hosting.imagekit.io//a02a61b632bd40ce/header-woman-block-removebg-preview.png?Expires=1735453372&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=PGeSeg2iUnXR02Aawah-~4n-srR~Y~n9Kro~LedlPlq1EHJRluXVh5R49OYulitf3zNkNfR0ehqBiVwwC2h5Zty3xYwGSG1AKuUG-6F17b5YmtpzYKkMXXDCyHaZi-tKuW1y3L4DFNT6im377qVUzv6ebyJX4uraL5WHJVRxEvDGTL7xCUyZSRBavKa328K2bk-SvERgAEOwJaKsKEmE8HvLnu7z6eeCUGcOZulgxG32M-GgZdKbj0Z3IS~bIDjmOttnZxneg4oRDak9HBIGGHz7JdXwiJvHFMLrMclwQWR5mWriVOc7uj9FrFIrRiz1tDd-yyc~GiVOuxCJxpuo4A__",
        },
      };
    } else if (type === "segment-2") {
      newSegment = {
        id: Date.now(),
        type,
        content: {
          input:"Hello",
          textEditor: `          
            <p><strong>By the end of 2022, borrowing rates could reach up to 3%.</strong></p>
            <p>There is still time to make your real estate purchase in good conditions. More than ever, <em>a mortgage broker will be your ally</em> with banks to negotiate the best mortgage offer in your favour.</p>
            <p>At Privilège Courtage, a French brokerage firm specialising in real estate loans, we have agreements with <strong>80 banking institutions</strong> that allow us to obtain the best loan conditions.</p>
            <p><strong>Are you at the beginning of your research?</strong><br/>
            <strong>Have you already found your property?</strong></p>
          `,
        },
      };
    } else if (type === "segment-3") {
      newSegment = {
        id: Date.now(),
        type,
        content: {
          input: "https://imageconindia.com",
          heading: "Don't wait to obtain the best conditions!",
          image: "https://media-hosting.imagekit.io//9c67ff6473164d42/download.png?Expires=1735453413&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=JX2muMLsrBp2roqshY-ztOkH0fiCx3P1oEPJlQKQinharkC1OoSVTvZ-i597R1TABlNmxzZhzgJBd0aNAFARy1s~eIrcADoXJ8bP9aLoF9b6f~N9ruekZo817PqlTO0-WGqhILOLf-hcKB9sT1W9G-TOyiY9CHPceeNgpIg2YYjiSzovfgJ~gui6jjULTewDxnEgisXehaZ618E~FgGr1MP8h1tkPbx6VVwd6~WV5ASQ0LVI~P--TX1cyuTwXTgZi8ovKHVeFzIFCwxOAzX4zPIz0YAVhS4YIj6PVGvtlSAk7LH9NBKO5Jrrr5BeUFZNgqNSsiGI1EaKfgwKtwMtuQ__",
        },
      };
    }
    else if (type === "segment-4") {
    newSegment = {
      id: Date.now(),
      type,
      content: {
        textEditor: `
          <li>Ensuring the protection of your data</li>
          <li>Simulation without commitment</li>
          <p>Following this simulation, a Privilège Courtage broker will contact you, to refine your financing plan, facilitate your procedures, and put all the chances on your side.</p>
          <p><strong>See you soon</strong></p>
          <p><strong>Damien from Privilège Courtage.</strong></p>
        `,
      },
    };
  }

  else if (type === "segment-5") {
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
            <img
            src={Image5}
            alt="Add Segment 5"
            className="circular-image-button"
            style={{ cursor: "pointer" }} // Ensures the cursor changes to a pointer for better UX
            onClick={() => handleAddSegment("segment-5")}
          />
        </div>
        <SegmentPreview segments={segments} setSegments={setSegments} />
      </div>
    </div>
  );
};

export default MainPage;
