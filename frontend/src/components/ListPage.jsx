import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListPage.css';

const ListPage = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("groups");
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    group: ''
  });

  useEffect(() => {
    // Fetch groups and students
    axios.get("http://localhost:5000/groups")
      .then(response => setGroups(response.data))
      .catch(err => console.log(err));

    axios.get("http://localhost:5000/students")
      .then(response => setStudents(response.data))
      .catch(err => console.log(err));
  }, []);

  const handleDeleteGroup = (groupId) => {
    axios.delete(`http://localhost:5000/groups/${groupId}`)
      .then(() => {
        setGroups(groups.filter(group => group._id !== groupId));
        alert("Group and its students deleted");
      })
      .catch(err => console.log(err));
  };

//   const handleDeleteStudent = (studentId) => {
//     axios.delete(`http://localhost:5000/students/${studentId}`)
//       .then(() => {
//         setStudents(students.filter(student => student._id !== studentId));
//         alert("Student deleted");
//       })
//       .catch(err => console.log(err));
//   };

  const handleDeleteSelectedStudents = () => {
    axios.delete("http://localhost:5000/students", {
      data: { studentIds: selectedStudents }
    })
      .then(() => {
        setStudents(students.filter(student => !selectedStudents.includes(student._id)));
        setSelectedStudents([]);
        alert("Selected students deleted");
      })
      .catch(err => console.log(err));
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedStudents(students.map(student => student._id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (e, studentId) => {
    if (e.target.checked) {
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setEditFormData({
      name: student.name,
      email: student.email,
      group: student.group._id || ''
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleSaveEdit = () => {
    axios.put(`http://localhost:5000/students/${editingStudent._id}`, editFormData)
      .then(response => {
        const updatedStudent = response.data;
        setStudents(students.map(student => student._id === updatedStudent._id ? updatedStudent : student));
        setEditingStudent(null);
        alert("Student details updated");
      })
      .catch(err => console.log(err));
  };

  const filteredStudents = selectedGroup
    ? students.filter(student => student.group && student.group._id === selectedGroup)
    : students;

  return (
    <div className="modal-overlay">
     
      <div className="modal-content">
         <button className="close-btn" onClick={onClose}>
        &times;
      </button>
        <h2>List Page</h2>
        <div class="btn-tabs">
          <button class="btn" onClick={() => setActiveTab("groups")}>Groups</button>
          <button class="btn" onClick={() => setActiveTab("students")}>Students</button>
        </div>
        {activeTab === "groups" && (
          <div>
            <h3>Groups</h3>
            {groups.length === 0 ? (
              <p>No groups available</p>
            ) : (
              groups.map((group) => (
                <div key={group._id}>
                  <span>{group.name}</span>
                  <button class="btn" onClick={() => handleDeleteGroup(group._id)}>
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "students" && (
          <div>
            <h3>Students</h3>
            <div>
              <label>Filter by Group: </label>
              <select
                onChange={(e) => setSelectedGroup(e.target.value)}
                value={selectedGroup || ""}
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
                <button className='btn' onClick={handleDeleteSelectedStudents}>
                  Select And Delete
                </button>
                <div className="student-list">
                  <table>
                    <thead>
                      <tr>
                        <th>
                          <input type="checkbox" onChange={handleSelectAll} />
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Group</th>
                        <th>Edit</th>
                        <th>Delete</th>
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
                                handleSelectStudent(e, student._id)
                              }
                            />
                          </td>
                          <td>{student.name}</td>
                          <td>{student.email}</td>
                          <td>
                            {student.group ? student.group.name : "No group"}
                          </td>
                          <td>
                            <button  onClick={() => handleEditStudent(student)}>
                              Edit
                            </button>
                          </td>
                          <td>
                            <button
                             onClick={handleDeleteSelectedStudents}
                            >
                              Delete
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

        {/* Edit Form */}
        {editingStudent && (
          <div className="edit-form">
            <h3>Edit Student</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveEdit();
              }}
            >
              <div>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditFormChange}
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditFormChange}
                />
              </div>
              <div>
                <label>Group</label>
                <select
                  name="group"
                  value={editFormData.group}
                  onChange={handleEditFormChange}
                >
                  <option value="">Select Group</option>
                  {groups.map((group) => (
                    <option key={group._id} value={group._id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setEditingStudent(null)}>
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListPage;