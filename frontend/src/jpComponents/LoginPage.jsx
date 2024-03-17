import React, { useState, useEffect } from 'react';
import './LoginPage.css'; // Import the CSS file for styling

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsLoggedIn(true);
      setUserId(user.userId);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your Flask API endpoint for login
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          password: password,
        }),
      });

      if (response.ok) {
        // Handle successful login
        const data = await response.json();
        alert(`Login successful! User ID: ${data.userId}`);
        setIsLoggedIn(true);
        setUserId(data.userId);

        // Fetch user profile data after successful login
        const profileResponse = await fetch('http://localhost:5000/returnProfile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: data.userId }),
        });

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          // You can save profile data in localStorage or use it directly as needed
          localStorage.setItem('profile', JSON.stringify(profileData));
        } else {
          alert('Failed to fetch user profile data.');
        }
      } else {
        // Handle unsuccessful login
        const data = await response.json();
        alert(`Login failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please try again later.');
    }
  };
  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Login Page</h2>
        <div className="form-group"> 
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;