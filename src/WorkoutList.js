// src/WorkoutList.js

import React from 'react';

function WorkoutList({
  workouts,
  deleteWorkout,
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  currentPage,
  totalPages,
  paginate,
}) {
  
  return (
    <div className="workout-list">
      
      <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
        <option value=""disabled hidden>Filter by Workout Type</option>
        <option value="Cardio">Cardio</option>
        <option value="Strength Training">Strength Training</option>
        <option value="Yoga">Yoga</option>
        {/* Add more options as needed */}
      </select>


      
      {workouts.length > 0 ? (
  <table className="workout-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Workouts</th>
        <th>Number of Workouts</th>
        <th>Total Workout Minutes</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {workouts.map((workout, index) => (
        <tr key={index}>
          <td>{workout.userName}</td>
          <td>{workout.workoutType}</td>
          <td>{workout.workoutType.split(',').length}</td>
          <td>{workout.workoutMinutes}</td>
          <td>
            <button onClick={() => deleteWorkout(index)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <p>No workouts found.</p>
)}


      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default WorkoutList;
