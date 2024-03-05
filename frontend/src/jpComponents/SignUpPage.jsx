import React, { useState } from 'react';
import './SignUpPage.css'; // Import the CSS file for styling

const SignUpPage = () => {

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [farmerPid, setFarmerPid] = useState('');
  const [profileBio, setProfileBio] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your Flask API endpoint for user registration
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          phone_number: phoneNumber,
          email_address: email,
          password: password,
          role: role,
          farmer_pid: farmerPid,
          profile_bio: profileBio,
        }),
      });

      if (response.ok) {
        // Handle successful sign-up
        alert('Sign up successful!');
      } else {
        // Handle unsuccessful sign-up
        const data = await response.json();
        alert(`Sign up failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      alert('Sign up failed. Please try again later.');
    }
  };

  return (
    <div className='signup-container'>
      
      <form onSubmit={handleSignUp}>
      <h2>Sign Up Page</h2>
        <div className='form-group'>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Phone Number:</label>
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Role:</label>
          <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Farmer PID:</label>
          <input type="text" value={farmerPid} onChange={(e) => setFarmerPid(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Profile Bio:</label>
          <input type="text" value={profileBio} onChange={(e) => setProfileBio(e.target.value)} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
  
};

export default SignUpPage;
