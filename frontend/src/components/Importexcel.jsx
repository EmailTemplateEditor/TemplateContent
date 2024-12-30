import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Importexcel.css";
import sampleexcel from "../Images/excelsheet.png";

const ExcelModal = ({ isOpen, onClose, segments = [] }) => {
  const [excelData, setExcelData] = useState([]);
  const [fileName, setFileName] = useState('');
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for loader

  useEffect(() => {
    if (isOpen) {
      console.log("Segments in SendexcelModal:", segments);
    }
  }, [isOpen, segments]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setExcelData(jsonData);
      console.log(jsonData); // Log to verify data
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSend = async () => {
    if (excelData.length === 0) {
      toast.error("Please upload an Excel file first.");
      return;
    }

    const [headers] = excelData;
    const nameIndex = headers.indexOf("Name");
    const mailIndex = headers.indexOf("Email");

    if (nameIndex === -1 || mailIndex === -1) {
      toast.error("Excel file must have 'Name' and 'Email' columns.");
      return;
    }

    if (!segments || segments.length === 0) {
      toast.error("No segments available.");
      return;
    }

    try {
      setIsLoading(true); // Show loader
      console.log("Data being sent to backend:", { excelData, segments, message });

      const response = await axios.post("http://localhost:5000/sendexcelEmail", {
        excelData,
        segments,
        message
      });

toast.success("Emails sent successfully!");
setTimeout(() => {
  onClose();
}, 5000); // Wait 3 seconds
      setIsLoading(false); // Hide loader
      onClose();
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error sending emails:", error.response?.data || error.message);
      setIsLoading(false); // Hide loader
      toast.error("Failed to send emails. Check the console for more details.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="excel-modal-overlay">
      <div className="excel-modal-content">
        <button className="excel-modal-close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Upload and Send Emails</h2>
        <label htmlFor="subject-input">Subject:</label>
        <input
          type="text"
          id="subject-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter subject"
        />
        <div className="excel-modal-body">
          <h4>Sample excel format</h4>
          <img src={sampleexcel} alt="Sample Excel Format" className="sample-excel-image" />
          <h4>Upload excel file</h4>
          <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
          {fileName && <p>Uploaded File: {fileName}</p>}
          {excelData.length > 0 && (
            <button
              className="excel-modal-view-btn"
              onClick={() => {
                const table = document.getElementById("excel-table");
                table.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Uploaded List
            </button>
          )}
        </div>
        {excelData.length > 0 && (
          <div className="excel-table-container">
            <table id="excel-table">
              <thead>
                <tr>
                  {excelData[0].map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {excelData.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <button className="excel-modal-send-btn" onClick={handleSend} disabled={isLoading}>
          {isLoading ? "Processing..." : "Send"}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ExcelModal;
