import React, { useState } from 'react';
import styles from './Profile.module.css';
import { useUser } from '../Hooks/UserContext';
import NewUserSetter from '../Hooks/NewUserSetter'

const Profile = () => {
  return (
    <div className={styles.register}>
      <NewUserSetter Title="User Profile" buttonText="Update Profile"/>
    </div>
  );
};

export default Profile;
