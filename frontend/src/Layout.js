import "./Layout.css";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "./Images/agriculture.png";

function Layout({ handleLogout, isLoggedIn }) {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/");
    };

    const goToProfile = () => {
        navigate("/profile");
    };

    const goToCart = () => {
        navigate("/Cart");
    };

    const logoutHandler = () => {
        handleLogout();
    };

    const handleBackButton = () => {
        navigate('/');
    }

    return (
        <>
            <div id="Main-Container">
                <header>
                    <img className="logo" src={logo}></img>
                    <div className="title">Make Agriculture Great Again</div>
                    <nav className="navbar">
                        <button className={ isLoggedIn ? "navbar-button" : "navbar-button hidden-button" } onClick={goToHome}>Home</button>
                        <button className={ isLoggedIn ? "navbar-button" : "navbar-button hidden-button" } onClick={goToProfile}>My Profile</button>
                        <button className={ isLoggedIn ? "navbar-button" : "navbar-button hidden-button" } onClick={goToCart}>Cart</button>
                        <button className={ isLoggedIn ? "navbar-button" : "navbar-button hidden-button" }onClick={logoutHandler}>Logout</button>
                        <button className="navbar-button" onClick={handleBackButton}>Back</button>
                    </nav>
                </header>

                <div>
                    <Outlet />
                </div>

                <footer>
                    &#169;MAGA
                </footer>
            </div>
        </>
    );
}

export default Layout;