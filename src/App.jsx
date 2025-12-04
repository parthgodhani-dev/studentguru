import React, { useEffect, useState, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import {login , logout} from './store/authSlice'
import authService from './appwrite/auth'
import { useDispatch, useSelector } from "react-redux";
import './App.css'
import Scrolltotop from './Scrolltotop';
import Loader from './components/Loader';
import Protected from './components/Protected';

// user pages
import Home from './components/user/pages/Home';
import About from './components/user/pages/About';
import Services from './components/user/pages/Services'
import Bloglisting from './components/user/pages/Bloglisting';
import Blogsingle from './components/user/pages/Blogsingle';
import Contact from './components/user/pages/Contact';
import Profile from './components/user/pages/Profile';
import Changepassword from './components/user/pages/Changepassword';
import Login from './components/user/pages/Login';
import Register from './components/user/pages/Register';
import Forgotpassword from "./components/user/pages/Forgotpassword"
import Header from './components/user/layout/Header';
import Footer from './components/user/layout/Footer';
import Notfound from './components/user/pages/Notfound';
import Courses from './components/user/pages/Courses';
import Coursesingle from './components/user/pages/Coursesingle';

// admin pages
import AdminHeader from './components/admin/layout/Header';
import AdminSidebar from './components/admin/layout/Sidebar';
import Dashboard from './components/admin/pages/Dashboard';
import AdminLogin from './components/admin/pages/Login';
import Listingblog from './components/admin/pages/blog/Listingblog';
import Addblog from './components/admin/pages/blog/Addblog';
import Editblog from './components/admin/pages/blog/Editblog';
import Listingtestimo from './components/admin/pages/testimonial/Listingtestimo';
import Addtestimo from './components/admin/pages/testimonial/Addtestimo';
import Edittestimo from './components/admin/pages/testimonial/Edittestimo';
import Listingmember from './components/admin/pages/expertteam/Listingmember';
import Addmember from './components/admin/pages/expertteam/Addmember';
import Editmember from './components/admin/pages/expertteam/Editmember';
import Listingcourse from './components/admin/pages/maincourses/Listingcourses';
import Addcourse from './components/admin/pages/maincourses/Addcourses';
import Editcourse from './components/admin/pages/maincourses/Editcourses';


function App() {

  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [isSidebarActive, setSidebarActive] = useState(false);
  const sidebarRef = useRef(null); 
  const toggleSidebar = () => {
    setSidebarActive(!isSidebarActive);
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        // console.log("🧠 currentUser:", currentUser);
        // console.log("🧠 Redux userData:", userData);
        // console.log("🧠 Role in App:", currentUser?.role);

        if (currentUser) {
          dispatch(login(currentUser));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Session check failed:", error);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (window.innerWidth >= 1281) return;
      if (!isSidebarActive) return;

      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSidebarActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarActive]);

  if (loading) return <Loader message="Loading..." />;

  const isAdmin = userData?.role;
  const isLoggedIn = !!userData;

  return (
    <>
      <Router>
        <Scrolltotop />
        <Routes>
            <Route
              path="/admin"
              element={
                isAdmin === "admin" ? (
                  <Navigate to="/admin/dashboard" replace />
                ) : (
                  <Protected authentication={false}>
                    <AdminLogin />
                  </Protected>
                )
              }
            />
            <Route path="/admin/*" element={isAdmin === "admin" ? (
              <div className={`dashboard-main ${isSidebarActive ?  "dashboard-compact" : ""}`}>
                    {isLoggedIn && <AdminSidebar ref={sidebarRef} onCloseSidebar={() => setSidebarActive(false)} onToggleSidebar={toggleSidebar} />}
                    {isLoggedIn && <AdminHeader onToggleSidebar={toggleSidebar} />}
                    <div className="dashboard-content">
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/listingblog" element={<Listingblog />} />
                        <Route path="/addblog" element={<Addblog />} />
                        <Route path="/editblog/:slug" element={<Editblog />} />
                        <Route path="/listingtestimonial" element={<Listingtestimo />} />
                        <Route path="/addtestimonial" element={<Addtestimo />} />
                        <Route path="/edittestimonial/:slug" element={<Edittestimo />} />
                        <Route path="/listingmember" element={<Listingmember />} />
                        <Route path="/addmember" element={<Addmember />} />
                        <Route path="/editmember/:slug" element={<Editmember />} />
                        <Route path="/listingcourse" element={<Listingcourse />} />
                        <Route path="/addcourse" element={<Addcourse />} />
                        <Route path="/editcourse/:slug" element={<Editcourse />} />
                        <Route path="*" element={<Dashboard />} />
                      </Routes>
                    </div>
                  </div>
                ) : (
                  <Navigate to="/admin" replace />
                )
              }
            />
            <Route
              path="/*"
              element={
                <>
                  <Header />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/courses" element={<Protected authentication={true}><Courses /></Protected>} />
                    <Route path="/courses/:slug" element={<Coursesingle />} />
                    <Route path="/blog" element={<Bloglisting />} />
                    <Route path="/blog/:slug" element={<Blogsingle />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/changepassword" element={<Changepassword />} />
                    <Route path="/login" element={<Protected authentication={false}><Login /></Protected>}/>
                    <Route path="/register" element={<Protected authentication={false}><Register /></Protected>} />
                    <Route path="/forgotpassword" element={<Protected authentication={false}><Forgotpassword /></Protected>} />
                    <Route path="*" element={<Notfound />} />
                  </Routes>
                  <Footer />
                </>
              }
            />
        </Routes>
      </Router>
    </>
  );

}

export default App
