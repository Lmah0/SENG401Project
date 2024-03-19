import "./Layout.css";
import { Outlet, useNavigate } from "react-router-dom";

function Layout() {
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

    const handleLogout = () => {
        handleLogout();
    };

    return (
        <>
            <div id="Main-Container">
                <header>
                    <div className="title">Make Agriculture Great Again</div>
                    <nav className="navbar">
                        <button className="navbar-button" onClick={goToHome}>Home</button>
                        <button className="navbar-button" onClick={goToProfile}>Profile</button>
                        <button className="navbar-button" onClick={goToCart}>Cart</button>
                        <button className="navbar-button" onClick={handleLogout}>Logout</button>
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
