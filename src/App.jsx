import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import SignupComponent from "./pages/SignupComponent";
import LoginComponent from "./pages/LoginComponent";
import UserDataComponent from "./pages/UserDataComponent";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
};

const Navbar = () => {
    const [username, setUsername] = useState("");

    useEffect(() => {
        // Simulating fetching username from localStorage (Replace with API call if needed)
        const storedUser = localStorage.getItem("username");
        if (storedUser) setUsername(storedUser);
    }, []);

    return (
        <nav style={styles.navbar}>
            <h2 style={styles.heading}>Job Portal</h2>
            <div style={styles.userSection}>
                {username ? <span>Welcome Back, {username}!</span> : <span>Welcome!</span>}
            </div>
            <div style={styles.links}>
                <Link to="/" style={styles.link}>Home</Link>
                <Link to="/add" style={styles.link}>Add Job</Link>
                {username ? (
                    <button style={styles.logoutBtn} onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("username");
                        window.location.href = "/login";
                    }}>
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login" style={styles.link}>Login</Link>
                        <Link to="/signup" style={styles.link}>Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

const App = () => {
    return (
        <Router>
            <img src="/saveetha.png" style={styles.imgResizer} alt="Saveetha Logo"/>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/add" element={<AddJobPage />} />
                <Route path="/edit/:id" element={<EditJobPage />} />

                <Route path="/login" element={<LoginComponent />} />
                <Route path="/signup" element={<SignupComponent />} />

                <Route path="/userdata" element={<ProtectedRoute><UserDataComponent /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
};

const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        background: "#007bff",
        color: "white",
    },
    heading: {
        margin: 0,
        fontSize: "22px",
    },
    userSection: {
        fontSize: "16px",
    },
    links: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    link: {
        color: "white",
        textDecoration: "none",
        fontWeight: "bold",
        padding: "5px 10px",
        borderRadius: "5px",
        background: "rgba(255, 255, 255, 0.2)",
    },
    logoutBtn: {
        padding: "5px 10px",
        background: "#dc3545",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    imgResizer: {
        height: "150px",
        width: "1000px",
        display: "block",
        margin: "10px auto",
    },
};

export default App;
