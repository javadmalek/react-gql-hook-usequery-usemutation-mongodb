import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <div>
      <Link to="/student/list"><h3>List of Students</h3></Link>
    </div>
  );
}

export default App;
