import React, { useState } from 'react';
import styles from './Profile.module.css';
import { useUser } from '../Hooks/UserContext';

const Profile = () => {
  const {user,setUser} = useUser()
  const [profileData, setProfileData] = useState({
    username: '',
    password: '',
    mail: '',
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
    <div name = 'Profile' className={styles.profile}>
      <h2>User Profile</h2>
      <div className={styles.profileContainer}>
        {/* <div className={styles.profilePic}>
          <img
            src={profileData.profilePic ? URL.createObjectURL(profileData.profilePic) : './Images/default-profile-pic.png'}
            alt="Profile"
          />
          <input type="file" accept="image/*" onChange={handleProfilePicChange} />
        </div> */}
        <form className={styles.profileForm}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={profileData.username}
            onChange={handleInputChange}
            title="Enter your username"
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="mail"
            id="mail"
            name="mail"
            value={profileData.email}
            onChange={handleInputChange}
            title="Enter your email"
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={profileData.password}
            onChange={handleInputChange}
            title="Enter your password"
            required
          />

          <button onClick={handleSubmit} type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
