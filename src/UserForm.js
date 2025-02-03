// src/UserForm.js

import React, { useState } from 'react';

function UserForm({ addWorkout }) {
  const [userName, setUserName] = useState('');
  const [workoutType, setWorkoutType] = useState('');
  const [workoutMinutes, setWorkoutMinutes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName || !workoutType || !workoutMinutes) return;
    addWorkout({ userName, workoutType, workoutMinutes: parseInt(workoutMinutes) });
    setUserName('');
    setWorkoutType('');
    setWorkoutMinutes('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="User Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      <select
        value={workoutType}
        onChange={(e) => setWorkoutType(e.target.value)}
      >
        <option value="" disabled hidden>Select Workout Type</option>
        <option value="Cardio">Cardio</option>
        <option value="Strength Training">Strength Training</option>
        <option value="Yoga">Yoga</option>
      </select>
      
      <input
        type="number"
        placeholder="Workout Minutes"
        value={workoutMinutes}
        onChange={(e) => setWorkoutMinutes(e.target.value)}
      />
      <button type="submit">Add Workout</button>
    </form>
  );
}

export default UserForm;
