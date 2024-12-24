import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import "./Importexcel.css";
import sampleexcel from "../Images/excelsheet.png";

const ExcelModal = ({ isOpen, onClose, segments = [] }) => {
  const [excelData, setExcelData] = useState([]);
  const [fileName, setFileName] = useState('');
  const [message, setMessage] = useState(""); // State for subject of the email

  
  useEffect(() => {
    if (isOpen) {
      console.log("Segments in SendexcelModal:", segments); // Log to verify
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
        alert("Please upload an Excel file first.");
        return;
    }

    const [headers, ...rows] = excelData;
    const nameIndex = headers.indexOf("Name");
    const mailIndex = headers.indexOf("Email");

    // Check if segments are available
    if (!segments || segments.length === 0) {
        alert("No segments available.");
        return;
    }
    if (nameIndex === -1 || mailIndex === -1) {
        alert("Excel file must have Name and Email");
        return;
    }

    // Log the data to ensure it's being passed correctly
    console.log("Excel Data:", excelData);
    console.log("Segments:", segments);


    try {
        for (const row of rows) {
            const [name, mail] = [row[nameIndex], row[mailIndex]];
            const emailData = { name, mail, segments, message };

            // Log the data being sent to the backend
            console.log("Sending email data:", emailData);
            console.log('Email Data:', JSON.stringify(emailData, null, 2));


            await axios.post("http://localhost:5000/sendexcelEmail", emailData);
        }
        alert("Emails sent successfully!");
    } catch (error) {
        console.error("Error sending emails:", error);
        alert("Failed to send some emails.");
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
          {/* Subject Input */}
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
          {/* Sample Excel Image */}
          <img
            src={sampleexcel}
            alt="Sample Excel Format"
            className="sample-excel-image"
          />
             <h4>Upload excel file</h4>
          {/* Excel Uploader */}
          <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
          {fileName && <p>Uploaded File: {fileName}</p>}
       
          {/* View Button */}
          {excelData.length > 0 && (
            <button
              className="excel-modal-view-btn"
              onClick={() => {
                const table = document.getElementById("excel-table");
                table.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View
            </button>
          )}
        </div>

        {/* Table to View Excel Data */}
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
       

        {/* Send Button */}
        <button className="excel-modal-send-btn" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ExcelModal;