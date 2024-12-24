import React, { useState, useEffect } from "react";
import axios from "axios";
import './Testsendmail.css'
const Testsendmail = ({ isOpen, onClose, segments = [] }) => {
  const [recipientEmail, setRecipientEmail] = useState(""); // State for recipient's email
  const [subject, setSubject] = useState(""); // State for subject of the email
   const [name, setName] = useState(""); // State for subject of the email


  useEffect(() => {
    if (isOpen) {
      console.log("Segments in SendtestModal:", segments); // Log to verify
    }
  }, [isOpen, segments]);

  const handleSend = async () => {
    if (!recipientEmail || !subject || !name) {
      alert("Please provide a recipient email,name and subject.");
      return;
    }

    // Check if segments are available
    if (!segments || segments.length === 0) {
      alert("No segments available.");
      return;
    }
    console.log("Name:", name);

    console.log("Recipient Email:", recipientEmail);
    console.log("Subject:", subject);

    console.log("Segments:", segments);

    try {
      // Prepare email data
      const emailData = {
        recipientEmail,
        subject,
        name,
        segments, // Pass segments as part of the email data
      };

      // Send email data to the backend
      await axios.post("http://localhost:5000/sendtestEmail", emailData);
      alert("Email sent successfully!");
      setRecipientEmail("");
      setSubject("");
      onClose();
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="send-modal-overlay">
      <div className="send-modal-content">
        <button className="send-modal-close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Send Test Email</h2>
        <div className="send-modal-form">
             {/* Subject Input */}
          <label htmlFor="name-input">Name:</label>
          <input
            type="text"
            id="name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
          />
          {/* Recipient Email Input */}
          <label htmlFor="recipient-email">Recipient Email:</label>
          <input
            type="email"
            id="recipient-email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            placeholder="Enter recipient email"
          />
          
          {/* Subject Input */}
          <label htmlFor="subject-input">Subject:</label>
          <input
            type="text"
            id="subject-input"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject"
          />

          {/* Send Email Button */}
          <button className="send-modal-submit-btn" onClick={handleSend}>
            Send Mail
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testsendmail;
