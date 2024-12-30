import React, { useState } from "react";
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react'; // Import the TinyMCE Editor
import { FiEdit, FiTrash2 } from "react-icons/fi"; // Import icons


import "./SegmentPreview.css";

const SegmentPreview = ({ segments, setSegments }) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [editSegmentIndex, setEditSegmentIndex] = useState(null); // Index of the segment being edited
  const [modalContent, setModalContent] = useState({}); // Content being edited
  const [isModalOpen, setIsModalOpen] = useState(false);

  const apiKey = 'oadtdlupdyt9cw9ad66j97sac0tyb2li4xvrxzjtywmrpmrx'; // Replace with your TinyMCE API key

  // Drag-and-drop handlers
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDrop = (index) => {
    const reorderedSegments = [...segments];
    const [removed] = reorderedSegments.splice(draggedIndex, 1);
    reorderedSegments.splice(index, 0, removed);
    setSegments(reorderedSegments);
    setDraggedIndex(null);
  };

  // Delete segment
  const handleDelete = (index) => {
    const updatedSegments = segments.filter((_, i) => i !== index);
    setSegments(updatedSegments);
  };

  // Open modal for editing
  const handleEdit = (index) => {
    setEditSegmentIndex(index);
    setModalContent(segments[index].content); // Load current content into modal
    setIsModalOpen(true);
  };

  // Save changes from modal
  const saveChanges = () => {
    const updatedSegments = [...segments];
    updatedSegments[editSegmentIndex].content = modalContent;
    setSegments(updatedSegments);
    closeModal();
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent({});
    setEditSegmentIndex(null);
  };

  // Handle input changes in modal
  const handleModalChange = (field, value) => {
    setModalContent((prevContent) => ({
      ...prevContent,
      [field]: value,
    }));
  };

  // Handle image upload
  const handleImageUpload = async (key, file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      handleModalChange(key, response.data.url); // Update the modal content with the uploaded image URL
    } catch (error) {
      console.error(`Error uploading ${key}:`, error);
    }
  };

  return (
    <div className="segment-preview">
      {segments.map((segment, index) => (
        <div
          key={segment.id}
          className="segment"
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(index)}
        >
          <div className="segment-content">
            {(() => {
              if (segment.type === "segment-1") {
                return (
                  <div className="segment-1"
                    style={{ backgroundColor: segment.content.backgroundColor || "red" }}>
                    <div className="banner">
                      <div className="banner-headings">
                        <div>
                          <img src={segment.content.icon} alt="Icon" className="icon" />
                        </div>
                        <div>
                          <h2 style={{
                            color: segment.content.textColor || "white"
                          }}>{segment.content.heading}</h2>
                        </div>
                      </div>
                      <p style={{
                        color: segment.content.textColor || "white"
                      }}>{segment.content.text}</p>
                    </div>
                    <div className="banner-right">
                      <img
                        src={segment.content.image}
                        alt="RightImage"
                        className="right-image"
                      />
                    </div>
                  </div>
                );
              } else if (segment.type === "segment-2") {
                return (
                  <div className="segment-2">
                    <p>{segment.content.input}</p>
                    {/* Render HTML content */}
                    <div
                      dangerouslySetInnerHTML={{ __html: segment.content.textEditor }}
                    />
                  </div>
                );
              } else if (segment.type === "segment-3") {
                return (
                  <div className="segment-3"
                    style={{ backgroundColor: segment.content.backgroundColor || "red" }}>
                    <div className="banner">
                      <h2 style={{
                        color: segment.content.textColor || "white"
                      }}>{segment.content.heading}</h2>
                      <div style={{
                        backgroundColor: segment.content.buttonBackgroundColor || "white"
                      }}>
                        <a className="banner-btn" href={segment.content.input} style={{
                          color: segment.content.buttonTextColor || "black"
                        }}>Click Here
                        </a>
                      </div>
                    </div>
                    <div className="ban-img">
                      <img
                        src={segment.content.image}
                        alt="RightImage"
                        className="right-image"
                      />
                    </div>
                  </div>
                );
              }
             else if (segment.type === "segment-4") {
    return (
      <div className="segment-4 Mid-content">
        <div
          dangerouslySetInnerHTML={{ __html: segment.content.textEditor }}
        />
      </div>
    );
  }
  else if (segment.type === "segment-5") {
    return (
      <div className="segment-5 Footer-content"
      style={{backgroundColor: segment.content.backgroundColor || "black",
              color: segment.content.textColor || "white",
              }}>
        <div
          dangerouslySetInnerHTML={{ __html: segment.content.textEditor }}
        />
      </div>
    );
  }
            })()}
          </div>

        <div className="segment-actions">
    <button onClick={() => handleEdit(index)} title="Edit">
      <FiEdit size={18} color="blue"/>
     </button>
     <button onClick={() => handleDelete(index)} title="Delete">
      <FiTrash2 size={18} color="red"/>
     </button>
</div>
        </div>
      ))}

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content modal-seg-content">
            <h2>Edit Segment</h2>
            <>
              {segments[editSegmentIndex].type === "segment-1" && (
                <>
                  {/* Icon Upload */}
                  <label>Icon:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload("icon", e.target.files[0])}
                  />
                  {modalContent.icon && (
                    <img src={modalContent.icon} alt="Icon Preview" className="preview" />
                  )}

                  {/* Heading */}
                  <label>Heading:</label>
                  <input
                    type="text"
                    value={modalContent.heading}
                    onChange={(e) => handleModalChange("heading", e.target.value)}
                  />

                  {/* Text */}
                  <label>Text:</label>
                  <input
                    value={modalContent.text}
                    onChange={(e) => handleModalChange("text", e.target.value)}
                  />

                  {/* RightImage Upload */}
                  <label>Right Image:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload("image", e.target.files[0])}
                  />
                  {modalContent.image && (
                    <img src={modalContent.image} alt="RightImage Preview" className="preview" />
                  )}

                  {/* Background Color */}
      <div class="colors-content">
      <label>Background Color :</label>
      <input
        type="color"
        value={modalContent.backgroundColor || "#ffffff"}
        onChange={(e) => handleModalChange("backgroundColor", e.target.value)}
      />
      <label>Text Color :</label>
      <input
         type="color"
         value={modalContent.textColor || "#ffffff"}
         onChange={(e) =>
         handleModalChange("textColor", e.target.value)
          }
            />
</div>
                </>
              )}

              {segments[editSegmentIndex].type === "segment-2" && (
                <>
                  <label>Input:</label>
                  <input
                    type="text"
                    value={modalContent.input}
                    onChange={(e) => handleModalChange("input", e.target.value)}
                  />

                  <label>Text Editor:</label>
                <Editor
  apiKey={apiKey} // Add the API key here
  value={modalContent.textEditor}
  init={{
    menubar: true,
    branding: false, // This removes the TinyMCE logo
    plugins: ['link', 'lists', 'textcolor', 'colorpicker'], // Add the 'directionality' plugin
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | forecolor backcolor | ltr rtl', // Add ltr and rtl buttons
  }}
  onEditorChange={(content) => handleModalChange("textEditor", content)}
/>

                </>
              )}

              {segments[editSegmentIndex].type === "segment-3" && (
                <>
                  {/* Heading */}
                  <label>Heading:</label>
                  <input
                    type="text"
                    value={modalContent.heading}
                    onChange={(e) => handleModalChange("heading", e.target.value)}
                  />

                  {/* url button */}
                  <label>Button Url:</label>
                  <input
                    type="text"
                    value={modalContent.input}
                    onChange={(e) => handleModalChange("input", e.target.value)}
                  />

                  {/* RightImage Upload */}
                  <label>Right Image:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload("image", e.target.files[0])}
                  />
                  {modalContent.image && (
                    <img src={modalContent.image} alt="RightImage Preview" className="preview" />
                  )}
    <div className="colors-content">

                  {/* Background Color */}
                  <label>Background Color:</label>
                  <input
                    type="color"
                    value={modalContent.backgroundColor || "#ffffff"}
                    onChange={(e) => handleModalChange("backgroundColor", e.target.value)}
                  />
                  <label>Text Color:</label>
                  <input
                    type="color"
                    value={modalContent.textColor || "#ffffff"}
                    onChange={(e) =>
                      handleModalChange("textColor", e.target.value)
                    }
                  />

                  {/* Button Color */}
                  <label>Button Background Color:</label>
                  <input
                    type="color"
                    value={modalContent.buttonBackgroundColor || "#ffffff"}
                    onChange={(e) =>
                      handleModalChange("buttonBackgroundColor", e.target.value)
                    }
                  />
                  <label>Button Text Color:</label>
                  <input
                    type="color"
                    value={modalContent.buttonTextColor || "#ffffff"}
                    onChange={(e) =>
                      handleModalChange("buttonTextColor", e.target.value)
                    }
                  />
                  </div>
                </>
              )}

              {segments[editSegmentIndex].type === "segment-4" && (
  <>
    
    <label>Text Editor:</label>
      <Editor
                    apiKey={apiKey} // Add the API key here
                    value={modalContent.textEditor}
                    init={{
                      menubar:true,
                      branding: false, // This removes the TinyMCE logo
                      plugins: ['link', 'lists', 'textcolor', 'colorpicker'],
                      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | forecolor backcolor',
                    }}
                    onEditorChange={(content) => handleModalChange("textEditor", content)}
                  />

  </>
)}


              {segments[editSegmentIndex].type === "segment-5" && (
                <>
                  <label>Text Editor:</label>
                  <Editor
                    apiKey={apiKey} // Add the API key here
                    initialValue={modalContent.textEditor}
                    init={{
                      menubar: false,
                      branding: false, // This removes the TinyMCE logo
                      plugins: ['link', 'lists', 'textcolor', 'colorpicker'],
                      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | forecolor backcolor',
                    }}
                    onEditorChange={(content) => handleModalChange("textEditor", content)}
                  />
                  {/* Background Color */}
                  <label>Background Color:</label>
                  <input
                    type="color"
                    value={modalContent.backgroundColor || "#ffffff"}
                    onChange={(e) => handleModalChange("backgroundColor", e.target.value)}
                  />
                  <label>Text Color:</label>
                  <input
                    type="color"
                    value={modalContent.textColor || "#ffffff"}
                    onChange={(e) =>
                      handleModalChange("textColor", e.target.value)
                    }
                  />
                </>
              )}
            </>

            <div className="modal-actions">
              <button className="modal-btns" onClick={saveChanges}>Save</button>
              <button className="modal-btns" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SegmentPreview;
