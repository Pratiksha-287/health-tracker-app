import './App.css';
import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import WorkoutList from './WorkoutList';

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const workoutsPerPage = 5;

  // Load workouts from localStorage when the app starts
  useEffect(() => {
    const storedWorkouts = JSON.parse(localStorage.getItem('workouts'));
    if (storedWorkouts) {
      setWorkouts(storedWorkouts);
    }
  }, []);

  // Save workouts to localStorage whenever workouts change
  useEffect(() => {
    if (workouts.length > 0) {
      localStorage.setItem('workouts', JSON.stringify(workouts));
    }
  }, [workouts]);

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

  // Aggregating workouts by user
  const aggregatedWorkouts = filteredWorkouts.reduce((acc, workout) => {
    if (!acc[workout.userName]) {
      acc[workout.userName] = {
        userName: workout.userName,
        workoutTypes: [workout.workoutType],
        totalMinutes: workout.workoutMinutes,
        workoutCount: 1,
      };
    } else {
      acc[workout.userName].workoutTypes.push(workout.workoutType);
      acc[workout.userName].totalMinutes += workout.workoutMinutes;
      acc[workout.userName].workoutCount += 1;
    }
    return acc;
  }, {});

  const aggregatedWorkoutsArray = Object.values(aggregatedWorkouts);

  // Pagination calculation
  const indexOfLastWorkout = currentPage * workoutsPerPage;
  const indexOfFirstWorkout = indexOfLastWorkout - workoutsPerPage;
  const currentWorkouts = aggregatedWorkoutsArray.slice(indexOfFirstWorkout, indexOfLastWorkout);

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
        totalPages={Math.ceil(aggregatedWorkoutsArray.length / workoutsPerPage)}
        paginate={paginate}
      />
    </div>
  );
}

export default App;

