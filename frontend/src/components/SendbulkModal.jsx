import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SendbulkModal.css";

const SendbulkModal = ({ isOpen, onClose, segments = [] }) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      console.log("Segments in SendbulkModal:", segments); // Log to verify
    }
  }, [isOpen, segments]);

  // Fetch groups on modal open
  useEffect(() => {
    if (isOpen) {
      axios
        .get("http://localhost:5000/groups")
        .then((response) => setGroups(response.data))
        .catch((error) => {
          console.error("Error fetching groups:", error);
          toast.error("Failed to fetch groups.");
        });
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!selectedGroup || !message) {
      toast.warning("Please select a group and enter a message.");
      return;
    }

    if (!segments || segments.length === 0) {
      toast.warning("No segments available.");
      return;
    }

    setIsProcessing(true);

    try {
      const studentsResponse = await axios.get(
        `http://localhost:5000/groups/${selectedGroup}/students`
      );
      const students = studentsResponse.data;

      if (students.length === 0) {
        toast.warning("No students found in the selected group.");
        setIsProcessing(false);
        return;
      }

      const emailData = {
        students,
        segments,
        message,
      };

      await axios.post("http://localhost:5000/sendbulkEmail", emailData);

      toast.success("Emails sent successfully!");
      setTimeout(() => {
        setSelectedGroup("");
        setMessage("");
        setIsProcessing(false);
        onClose(); // Close the modal after a short delay
      }, 5000);
    } catch (error) {
      console.error("Error sending emails:", error);
      toast.error("Failed to send emails.");
      setTimeout(() => {
        setIsProcessing(false);
      }, 5000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="send-modal-overlay">
      <div className="send-modal-content">
        <button className="send-modal-close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Send Bulk Mail</h2>
        <div className="send-modal-form">
          <label htmlFor="group-select">Select Group:</label>
          <select
            id="group-select"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            <option value="">-- Select Group --</option>
            {groups.map((group) => (
              <option key={group._id} value={group._id}>
                {group.name}
              </option>
            ))}
          </select>
          <label htmlFor="message-input">Subject:</label>
          <textarea
            id="message-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message here"
          />
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

export default SendbulkModal;
