import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GroupModal.css";
import * as XLSX from "xlsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import sampleexcels from '../Images/excelsheet.png';

const GroupModal = ({ onClose }) => {
  const [groupName, setGroupName] = useState("");
  const [uploadedData, setUploadedData] = useState([]);
  const [manualStudent, setManualStudent] = useState({ name: "", email: "" });
  const [selectedGroupForUpload, setSelectedGroupForUpload] = useState(null);
  const [selectedGroupForManual, setSelectedGroupForManual] = useState(null);
  const [groups, setGroups] = useState([]);

  // Fetch existing groups from DB when the component mounts
  useEffect(() => {
    axios.get("http://localhost:5000/groups")
      .then((response) => {
        setGroups(response.data); // Set the fetched groups to state
      })
      .catch((error) => {
        console.error("Error fetching groups:", error);
        toast.error("Failed to fetch groups");
      });
  }, []);

  const handleGroupCreate = () => {
    if (groupName) {
      axios.post("http://localhost:5000/groups", { name: groupName })
        .then((response) => {
          // Add the newly created group to the list
          setGroups([...groups, response.data]);

          // Automatically select the newly created group
          setSelectedGroupForUpload(response.data._id);
          setSelectedGroupForManual(response.data._id);

          toast.success("Group created");
          setGroupName(""); // Clear the group name input field
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Failed to create group");
        });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const mockData = jsonData.slice(1).map((row) => ({
          name: row[0],
          email: row[1],
        }));

        setUploadedData(mockData);
      };

      reader.readAsBinaryString(file);
    }
  };

  const handleSaveUploadedData = () => {
    if (selectedGroupForUpload && uploadedData.length > 0) {
      const payload = uploadedData.map((student) => ({
        ...student,
        group: selectedGroupForUpload,
      }));
      axios
        .post("http://localhost:5000/students/upload", payload)
        .then(() => {
          toast.success("Uploaded data saved successfully");
          setUploadedData([]); // Clear uploaded data after saving
        });
    } else {
      toast.error("Please select a group and upload data");
    }
  };

  const handleManualStudentSave = () => {
    if (manualStudent.name && manualStudent.email && selectedGroupForManual) {
      axios
        .post("http://localhost:5000/students/manual", {
          ...manualStudent,
          group: selectedGroupForManual,
        })
        .then(() => {
          toast.success("Manual student added successfully");
          setManualStudent({ name: "", email: "" }); // Reset form fields
        });
    } else {
      toast.error("Please fill all fields and select a group");
    }
  };

  return (
   <div className="modal-overlay">

      <div className="modal-group">
         <button className="modal-close-btn" onClick={onClose}>
        &times;
      </button>
        <div className="modal-content">

          {/* Group Creation Section */}
          <div className="group-creation-section">
            <h2 className="modal-title">Create Group</h2>
            <label className="modal-label">Group Name</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="modal-input modal-group-name-input"
            />
            <button
              className="modal-btn btn-create-group"
              onClick={handleGroupCreate}
            >
              Create
            </button>
          </div>

          {/* Excel Uploader Section */}
          <div className="excel-uploader">
            <h3 className="modal-section-title">Upload Excel</h3>
            <select
              value={selectedGroupForUpload || ""}
              onChange={(e) => setSelectedGroupForUpload(e.target.value)}
              className="modal-select modal-group-select"
            >
              <option value="" disabled>
                Select Group
              </option>
              {groups.map((group, index) => (
                <option key={group._id} value={group._id}>
                  {group.name}
                </option>
              ))}
            </select>
            <h3 className="Sampleimg-heading">Sample excel format</h3>
            <img
            src={sampleexcels}
            alt="Sample Excel Format"
            className="samples-excels-images"
          />
          <h3 className="modal-section-title">Upload Data</h3>
            <input
              type="file"
              onChange={handleFileUpload}
              className="modal-input modal-file-input"
            />
             <h3 className="modal-section-title">Uploaded Data</h3>

            <div className="modal-data-table">
              {uploadedData.length > 0 ? (
                uploadedData.map((item, index) => (
                  <div key={index} className="modal-data-row">
                    <span className="modal-data-cell">{item.name}</span>
                    <span className="modal-data-cell">{item.email}</span>
                  </div>
                ))
              ) : (
                <p>No data to display</p>
              )}
            </div>
            <button className="modal-btn btn-save-uploaded-data"
              onClick={handleSaveUploadedData}
            >
              Save Upload
            </button>
          </div>

          {/* Manual Student Uploader Section */}
          <div className="manual-uploader">
            <h3 className="modal-section-title">Add Manual Student</h3>
            <select
              value={selectedGroupForManual || ""}
              onChange={(e) => setSelectedGroupForManual(e.target.value)}
              className="modal-select modal-group-manual-select"
            >
              <option value="" disabled>
                Select Group
              </option>
              {groups.map((group, index) => (
                <option key={group._id} value={group._id}>
                  {group.name}
                </option>
              ))}
            </select>
            <label className="modal-label">Name</label>
            <input
              type="text"
              value={manualStudent.name}
              onChange={(e) =>
                setManualStudent({ ...manualStudent, name: e.target.value })
              }
              className="modal-input modal-manual-name-input"
            />
            <label className="modal-label">Email</label>
            <input
              type="email"
              value={manualStudent.email}
              onChange={(e) =>
                setManualStudent({ ...manualStudent, email: e.target.value })
              }
              className="modal-input modal-manual-email-input"
            />
            <button
              className="modal-btn btn-save-manual-student"
              onClick={handleManualStudentSave}
            >
              Save Manual Student
            </button>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};
export default GroupModal;
