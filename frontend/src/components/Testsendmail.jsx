import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Testsendmail.css";

const Testsendmail = ({ isOpen, onClose, segments = [] }) => {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false); // Loading state

  useEffect(() => {
    if (isOpen) {
      console.log("Segments in SendtestModal:", segments);
    }
  }, [isOpen, segments]);

  const handleSend = async () => {
    if (!recipientEmail || !subject || !name) {
      toast.warning("Please provide a recipient email, name, and subject.");
      return;
    }

    if (!segments || segments.length === 0) {
      toast.warning("No segments available.");
      return;
    }

    setIsProcessing(true);

    try {
      const emailData = {
        recipientEmail,
        subject,
        name,
        segments,
      };

      await axios.post("http://localhost:5000/sendtestEmail", emailData);
      toast.success("Email sent successfully!");

      // Reset form and close modal
      setRecipientEmail("");
      setSubject("");
      setName("");
      setTimeout(() => {
        setIsProcessing(false);
        onClose();
      }, 5000);
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email.");
      setIsProcessing(false);
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
          {/* Name Input */}
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
          <button
            className="send-modal-submit-btn"
            onClick={handleSend}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Send Mail"}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Testsendmail;
