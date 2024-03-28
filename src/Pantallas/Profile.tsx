import React, { useState } from 'react';
import '../styles/Profile.css';
import NewUserSetter from '../Hooks/NewUserSetter'

const Profile = () => {
  return (
    <div className="register">
      <NewUserSetter Title="User Profile" buttonText="Update Profile"/>
    </div>
  );
};

export default Profile;
