import React, { useState } from 'react';
import styles from './Profile.module.css';
import { useUser } from '../Hooks/UserContext';
import NewUserSetter from '../Hooks/NewUserSetter'

const Profile = () => {
  const {user,setUser} = useUser()
  const [profileData, setProfileData] = useState({
    username: user.username || '',
    password: user.password || '',
    mail: user.mail || '',
  });

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.id]: e.target.value.trim(),
  })
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfileData({ ...profileData, profilePic: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    setUser(profileData);
  };

  return (
    <div className={styles.register}>
      <NewUserSetter Title="User Profile" buttonText="Update Profile"/>
    </div>
  );
};

export default Profile;
