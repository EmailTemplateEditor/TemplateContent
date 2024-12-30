import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ListPage.css";
import { FiEdit, FiTrash2 } from "react-icons/fi"; // Import icons



const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-confirm">
        <p>{message}</p>
        <div className="confirm">
        <button className="editbtn" onClick={onConfirm}>
          Yes
        </button>
        <button className="cancelbtn" onClick={onClose}>
          No
        </button>
        </div>
      </div>
    </div>
  );
};


const ListPage = ({ onClose }) => {
 const [activeTab, setActiveTab] = useState("groups");
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    group: "",
  });
  const [editingGroup, setEditingGroup] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState(null);

  useEffect(() => {
    // Fetch groups and students
    axios
      .get("http://localhost:5000/groups")
      .then((response) => setGroups(response.data))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:5000/students")
      .then((response) => setStudents(response.data))
      .catch((err) => console.log(err));
  }, []);

  // Delete a group
   const handleDeleteGroup = (groupId) => {
    setGroupToDelete(groupId);
    setIsModalOpen(true);
  };

  const confirmDeleteGroup = () => {
    if (groupToDelete) {
      axios
        .delete(`http://localhost:5000/groups/${groupToDelete}`)
        .then(() => {
          setGroups(groups.filter((group) => group._id !== groupToDelete));
          toast.success("Group and its students deleted");
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to delete group");
        })
        .finally(() => {
          setIsModalOpen(false);
          setGroupToDelete(null);
        });
    }
  };
  // Delete selected students
  const handleDeleteSelectedStudents = () => {
    if (selectedStudents.length === 0) {
      toast.error("Please select students to delete.");
      return;
    }
    axios
      .delete("http://localhost:5000/students", {
        data: { studentIds: selectedStudents },
      })
      .then(() => {
        setStudents(
          students.filter((student) => !selectedStudents.includes(student._id))
        );
        setSelectedStudents([]);
        toast.success("Selected students deleted successfully!");
      })
      .catch((err) => toast.error("Failed to delete students"));
  };

  // Edit group name
  const handleEditGroupName = (group) => {
    setEditingGroup(group);
    setGroupName(group.name);
  };

  const handleSaveGroupName = () => {
    if (groupName.trim()) {
      axios
        .put(`http://localhost:5000/groups/${editingGroup._id}`, {
          name: groupName,
        })
        .then(() => {
          setGroups(
            groups.map((group) =>
              group._id === editingGroup._id
                ? { ...group, name: groupName }
                : group
            )
          );
          setEditingGroup(null);
          setGroupName("");
          toast.success("Group name updated successfully!");
        })
        .catch((err) => toast.error("Failed to update group name"));
    }
  };

  // Edit student details
const handleEditStudent = (student) => {
    toast.success("Editor student detail in bottom of tab");
    console.log(student); // Debug log
    setEditingStudent(student);
    setEditFormData({
        name: student.name,
        email: student.email,
        group: student.group?._id || "",
    });
};

const handleSaveStudent = () => {
  if (editFormData.name.trim() && editFormData.email.trim() && editFormData.group) {
    axios
      .put(`http://localhost:5000/students/${editingStudent._id}`, {
        name: editFormData.name,
        email: editFormData.email,
        group: editFormData.group, // Send only the group ID here
      })
      .then((response) => {
        const updatedStudent = response.data;

        // Update the students list with the updated student data
        setStudents(
          students.map((student) =>
            student._id === updatedStudent._id ? updatedStudent : student
          )
        );

        setEditingStudent(null); // Close the edit form
        toast.success("Student updated successfully!");
      })
      .catch((err) => {
        console.error("Error updating student:", err);
        toast.error("Failed to update student");
      });
  } else {
    toast.error("All fields are required");
  }
};

  const filteredStudents = selectedGroup
    ? students.filter(
        (student) => student.group && student.group._id === selectedGroup
      )
    : students;

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-content-list">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>List Page</h2>
        <div className="btn-tabs">
          <button
            className={`btn ${activeTab === "groups" ? "active" : ""}`}
            onClick={() => setActiveTab("groups")}
          >
            Groups
          </button>
          <button
            className={`btn ${activeTab === "students" ? "active" : ""}`}
            onClick={() => setActiveTab("students")}
          >
            Students
          </button>
        </div>

        {activeTab === "groups" && (
          <div>
            <h3>Groups</h3>
            {groups.length === 0 ? (
              <p>No groups available</p>
            ) : (
              groups.map((group) => (
                <div key={group._id} className="groupbtn">
                  <div>{group.name}</div>
                  <div>
                  <button
                    className="delstudent"
                    onClick={() => handleEditGroupName(group)}
                  >
              <FiEdit size={18} color="green"/>
                  </button>
                    <button
                    className="delstudent"
                    onClick={() => handleDeleteGroup(group._id)}
                  >
                              <FiTrash2 size={18} color="red"/>
                  </button>
                  </div>
                  </div>
              ))
            )}
          </div>
        )}

        {activeTab === "students" && (
          <div>
            <h3>Students</h3>
            <div>
              <label>Filter by Group:</label>
              <select
                value={selectedGroup || ""}
                onChange={(e) => setSelectedGroup(e.target.value)}
              >
                <option value="">All</option>
                {groups.map((group) => (
                  <option key={group._id} value={group._id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
          {filteredStudents.length === 0 ? (
              <p>No students available</p>
            ) : (
              <>
                <button className="btn" onClick={handleDeleteSelectedStudents}>
                  Delete Selected Students
                </button>
                <div className="student-list">
            <table>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        setSelectedStudents(
                          e.target.checked
                            ? filteredStudents.map((s) => s._id)
                            : []
                        )
                      }
                    />
                  </th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Group</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student._id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student._id)}
                        onChange={(e) =>
                          setSelectedStudents((prev) =>
                            e.target.checked
                              ? [...prev, student._id]
                              : prev.filter((id) => id !== student._id)
                          )
                        }
                      />
                    </td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.group?.name || "No group"}</td>
                    <td>
                      <button className="editstudent"
                        
                        onClick={() => handleEditStudent(student)}
                      >
              <FiEdit size={18} color="green"/>
                      </button>
                       <button className="delstudent"
                        onClick={handleDeleteSelectedStudents}
                      >
                              <FiTrash2 size={18} color="red"/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
              </div>
              </>
            )}
          </div>
        )}

        {editingStudent && (
          <div className="edit-modal">
            <h3>Edit Student</h3>
          <form
  onSubmit={(e) => {
    e.preventDefault();
    handleSaveStudent(); // Save the student when the form is submitted
  }}
>
  {/* Name Input */}
  <input
    type="text"
    name="name"
    value={editFormData.name}
    onChange={(e) =>
      setEditFormData({ ...editFormData, name: e.target.value })
    }
    placeholder="Enter Name"
  />

  {/* Email Input */}
  <input
    type="email"
    name="email"
    value={editFormData.email}
    onChange={(e) =>
      setEditFormData({ ...editFormData, email: e.target.value })
    }
    placeholder="Enter Email"
  />

  {/* Group Dropdown */}
  <select
    name="group"
    value={editFormData.group?._id || ""}
    onChange={(e) => {
      const selectedGroup = groups.find(
        (group) => group._id === e.target.value
      );
      setEditFormData({ ...editFormData, group: selectedGroup || null });
    }}
  >
    <option value="">Select Group</option>
    {groups.map((group) => (
      <option key={group._id} value={group._id}>
        {group.name}
      </option>
    ))}
  </select>

  {/* Save Button */}
  <button className="editbtn" type="submit">
    Save
  </button>

  {/* Cancel Button */}
  <button
    className="cancelbtn"
    type="button"
    onClick={() => setEditingStudent(null)} // Close the edit form
  >
    Cancel
  </button>
</form>

          </div>
        )}

        {editingGroup && (
          <div className="edit-modal">
            <h3>Edit Group</h3>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <button className="editbtn" onClick={handleSaveGroupName}>Save</button>
            <button className="cancelbtn" onClick={() => setEditingGroup(null)}>Cancel</button>
          </div>
        )}

          {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={confirmDeleteGroup}
          message="Are you sure you want to delete this group?"
        />


        <ToastContainer />
      </div>
    </div>
  );
};

export default ListPage;
