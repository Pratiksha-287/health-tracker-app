// src/App.js


import './App.css';

import React, { useState } from 'react';
import UserForm from './UserForm';
import WorkoutList from './WorkoutList';

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const workoutsPerPage = 5; 



  // Function to handle adding a new workout
  const addWorkout = (workout) => {
    setWorkouts([...workouts, workout]);
  };

  // Function to handle deletion of a workout
  const deleteWorkout = (index) => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts.splice(index, 1);
    setWorkouts(updatedWorkouts);
  };

  // Function to handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Filtered workouts based on search and filter type
  const filteredWorkouts = workouts.filter((workout) =>
    workout.userName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === '' || workout.workoutType === filterType)
  );

  // Pagination calculation
  const indexOfLastWorkout = currentPage * workoutsPerPage;
  const indexOfFirstWorkout = indexOfLastWorkout - workoutsPerPage;
  const currentWorkouts = filteredWorkouts.slice(indexOfFirstWorkout, indexOfLastWorkout);

  return (
    <div className="App">
      <h1>Health Challenge Tracker</h1>
      <UserForm addWorkout={addWorkout} />
      <WorkoutList
        workouts={currentWorkouts}
        deleteWorkout={deleteWorkout}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
        currentPage={currentPage}
        totalPages={Math.ceil(filteredWorkouts.length / workoutsPerPage)}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
