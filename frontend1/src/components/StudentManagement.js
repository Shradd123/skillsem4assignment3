// frontend/src/components/StudentManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [editing, setEditing] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get('/api/students', {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    });
    setStudents(res.data);
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (editing) {
      await axios.put(`/api/students/${currentStudent._id}`, { name, age, grade }, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
      setEditing(false);
      setCurrentStudent(null);
    } else {
      await axios.post('/api/students', { name, age, grade }, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
    }
    fetchStudents();
    setName('');
    setAge('');
    setGrade('');
  };

  const handleEditStudent = (student) => {
    setEditing(true);
    setCurrentStudent(student);
    setName(student.name);
    setAge(student.age);
    setGrade(student.grade);
  };

  const handleDeleteStudent = async (id) => {
    await axios.delete(`/api/students/${id}`, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    });
    fetchStudents();
  };

  return (
    <div className="container">
      <form onSubmit={handleAddStudent}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input type="number" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Grade</label>
          <input type="text" className="form-control" value={grade} onChange={(e) => setGrade(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">
          {editing ? 'Update Student' : 'Add Student'}
        </button>
      </form>
      <hr />
      <ul className="list-group">
        {students.map(student => (
          <li key={student._id} className="list-group-item d-flex justify-content-between align-items-center">
            {student.name} ({student.age} years old, Grade: {student.grade})
            <div>
              <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditStudent(student)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteStudent(student._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentManagement;
