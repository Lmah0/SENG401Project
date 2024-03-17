
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Layout from "./Layout";
import HomePageEmpty from "./HomePage/HomePageEmpty";
import HomePage from "./HomePage/HomePage";
import Cart from "./Cart/Cart";
import Payment from "./Payment/Payment";
import SellItems from "./SellItems/SellItems";
import LoginPage from "./UserPages/LoginPage";
import SignUpPage from "./UserPages/SignUpPage";
import ProfilePage from "./UserPages/ProfilePage";

function App() {
  /* This is the main app component basically the "view controller" this will just pass information along to different pages from API */

  const [items, setItems] = useState([]);

  const [userProfile, setUserProfile] = useState(
    JSON.parse(localStorage.getItem("userProfile"))
  );
  
  // const profileData = JSON.parse(localStorage.getItem("userProfile"));

  let profileData = {};
  if (userProfile) {
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      try {
        profileData = JSON.parse(storedProfile);
      } catch (error) {
        console.error('Error parsing stored profile:', error);
      }
    }
  }
  
  const handleSetProfile = (userData) => {
    localStorage.setItem("userProfile", JSON.stringify(userData));
    setUserProfile(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("userProfile");
    setUserProfile(null);

    const cleanCart = async () => { // This function will flush the cart when the user logs out
      try {
        let response = await fetch("http://127.0.0.1:5001/flushCart", {
          method: "DELETE",
          body: JSON.stringify({
            userId: profileData.id
          }),
          headers: {
            'Content-Type' : 'application/json',
          },
        });
        if (response.ok) {
          let jsonRes = await response.json();
          console.log(jsonRes, "JSON RES");
        } else {
          console.log("Failed to fetch data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    cleanCart();
  };

  useEffect(() => {
    // This useEffect gets all the postings every time an event occurs on the page and stores them in items array
    const fetchData = async () => {
      try {
        let response = await fetch("http://127.0.0.1:5007/getPostings", {
          method: "GET",
        });

        if (response.ok) {
          let jsonRes = await response.json();
          console.log(jsonRes, "JSON RES");
          setItems(jsonRes);
        } else {
          console.log("Failed to fetch data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
 
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>

          {
            userProfile ? (
              <Route path="/" element={<HomePage items={items} handleLogout={handleLogout} currentUserID={profileData.id}/>} />
            ) : (
              <Route path="/" element={<HomePageEmpty />} /> 
            )
          }

          <Route path="/login" element={<LoginPage handleSetProfile={handleSetProfile}/>} /> 
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage userProfile={userProfile} />} />
          <Route path="/cart" element={<Cart currentUserID={profileData.id} />} />
          <Route path="/Payment" element={<Payment/>} />
          <Route path="/SellItems" element={<SellItems/>} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
