import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedMentorId, setSelectedMentorId] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState('');

  useEffect(() => {
    fetchMentors();
    fetchStudents();
  }, []);

  const fetchMentors = async () => {
    try {
      const response = await axios.get('http://localhost:9090/mentors');
      setMentors(response.data);
    } catch (error) {
      console.error('Error fetching mentors:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:9090/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

 

  const handleAssignMentorToStudent = async () => {
    try {
      await axios.put(`http://localhost:9090/students/${selectedStudentId}/mentor`, {
        mentorId: selectedMentorId,
      });
      fetchMentors();
      fetchStudents();
    } catch (error) {
      console.error('Error assigning mentor to student:', error);
    }
  };

  return (
    <div className="container">
      <h2>Mentors</h2>
      <ul className="list-group">
        {mentors.map((mentor) => (
          <li key={mentor._id} className="list-group-item">
            {mentor.name}
            <ul className="list-group">
              {mentor.students.map((student) => (
                <li key={student._id} className="list-group-item">
                  {student.name}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <h2>Students</h2>
      <ul className="list-group">
        {students.map((student) => (
          <li key={student._id} className="list-group-item">
            {student.name} (Mentor: {student.mentor ? student.mentor.name : 'None'})
          </li>
        ))}
      </ul>

  <h2>Assign Mentor to Student</h2>
  <div className="mb-3">
    <label htmlFor="studentSelect2" className="form-label">
      Student:
    </label>
    <select
      id="studentSelect2"
      className="form-select"
      value={selectedStudentId}
      onChange={(e) => setSelectedStudentId(e.target.value)}
    >
      <option value="">Select a student</option>
      {students.map((student) => (
        <option key={student._id} value={student._id}>
          {student.name}
        </option>
      ))}
    </select>
  </div>

  <div className="mb-3">
    <label htmlFor="mentorSelect2" className="form-label">
      Mentor:
    </label>
    <select
      id="mentorSelect2"
      className="form-select"
      value={selectedMentorId}
      onChange={(e) => setSelectedMentorId(e.target.value)}
    >
      <option value="">Select a mentor</option>
      {mentors.map((mentor) => (
        <option key={mentor._id} value={mentor._id}>
          {mentor.name}
        </option>
      ))}
    </select>
  </div>

  <button className="btn btn-primary" onClick={handleAssignMentorToStudent}>
    Assign <i className="fas fa-chalkboard-teacher"></i>
  </button>
</div>
);
}

export default App;
