import React, { useState, useEffect } from "react";
import axios from "axios";
import './SendbulkModal.css';

const SendbulkModal = ({ isOpen, onClose, segments = [] }) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [message, setMessage] = useState("");
 useEffect(() => {
    if (isOpen) {
      console.log("Segments in SendbulkModal:", segments); // Log to verify
    }
  }, [isOpen, segments]);


  // Fetch groups on modal open
  useEffect(() => {
    if (isOpen) {
      axios.get("http://localhost:5000/groups")
        .then((response) => setGroups(response.data))
        .catch((error) => {
          console.error("Error fetching groups:", error);
          alert("Failed to fetch groups");
        });
    }
  }, [isOpen]);
const handleSend = async () => {
  if (!selectedGroup || !message) {
    alert("Please select a group and enter a message.");
    return;
  }

  // Check if segments is available
  if (!segments || segments.length === 0) {
    alert("No segments available.");
    return;
  }

  console.log("Selected Group:", selectedGroup);
  console.log("Message:", message);
  console.log("Segments:", segments);

  try {
    const studentsResponse = await axios.get(`http://localhost:5000/groups/${selectedGroup}/students`);
    const students = studentsResponse.data;

    if (students.length === 0) {
      alert("No students found in the selected group.");
      return;
    }

    const emailData = {
      students,
      segments, // Pass segments as part of the email data
      message,  // Pass the message to be used as the email subject
    };

    await axios.post("http://localhost:5000/sendbulkEmail", emailData);
    alert("Emails sent successfully!");
    setSelectedGroup("");
    setMessage("");
    onClose();
  } catch (error) {
    console.error("Error sending emails:", error);
    alert("Failed to send emails.");
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
          <button className="send-modal-submit-btn" onClick={handleSend}>
            Send Mail
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendbulkModal;
