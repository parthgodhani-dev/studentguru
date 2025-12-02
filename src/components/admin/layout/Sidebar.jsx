import React, { useState } from "react";
import { IconX, IconHomeSpark, IconHome, IconLogout, IconListDetails, IconList, IconPlaylistAdd } from '@tabler/icons-react';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../store/authSlice";
import authService from "../../../appwrite/auth";

const Sidebar = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await authService.logout()
    dispatch(logout())
    navigate('/admin')
  }

  const [openDropdown, setOpenDropdown] = useState(null);

  const handleToggle = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <>
      <div className="dashboard-nav">
        <header>
          <a href="#" className="menu-toggle" id="toggleSidebarBtn" onClick={onToggleSidebar}>
            <IconX size={30} stroke={2} />
          </a>
          <Link className="brand-logo" to="/admin">
            <img src="/studentguru_logo_footer.png" alt="studentguru_logo" width={170} />
          </Link>
        </header>
        <nav className="dashboard-nav-list">
          <Nav className="dashboard-nav-list">
            <Link className="dashboard-nav-item active" to="/admin/dashboard">
              <IconHomeSpark size={20} stroke={2} /> Dashboard
            </Link>

            <div className={`dashboard-nav-dropdown ${openDropdown === 1 ? "show" : ""}`}>
              <Link className="dashboard-nav-item dashboard-nav-dropdown-toggle" onClick={() => handleToggle(1)}>
                <IconListDetails size={20} stroke={2} /> Course
              </Link>
              <div className="dashboard-nav-dropdown-menu">
                <Link to="/admin/addcourse" className="dashboard-nav-dropdown-item"><IconPlaylistAdd size={20} stroke={2} /> Add Course</Link>
                <Link to="/admin/listingcourse" className="dashboard-nav-dropdown-item"><IconList size={20} stroke={2} /> View Course</Link>
              </div>
            </div>

            <div className={`dashboard-nav-dropdown ${openDropdown === 2 ? "show" : ""}`}>
              <Link className="dashboard-nav-item dashboard-nav-dropdown-toggle" onClick={() => handleToggle(2)}>
                <IconListDetails size={20} stroke={2} /> Team Member
              </Link>
              <div className="dashboard-nav-dropdown-menu">
                <Link to="/admin/addmember" className="dashboard-nav-dropdown-item"><IconPlaylistAdd size={20} stroke={2} /> Add Member</Link>
                <Link to="/admin/listingmember" className="dashboard-nav-dropdown-item"><IconList size={20} stroke={2} /> View Member</Link>
              </div>
            </div>

            <div className={`dashboard-nav-dropdown ${openDropdown === 3 ? "show" : ""}`}>
              <Link className="dashboard-nav-item dashboard-nav-dropdown-toggle" onClick={() => handleToggle(3)}>
                <IconListDetails size={20} stroke={2} /> Testimonial
              </Link>
              <div className="dashboard-nav-dropdown-menu">
                <Link to="/admin/addtestimonial" className="dashboard-nav-dropdown-item"><IconPlaylistAdd size={20} stroke={2} /> Add Testimonial</Link>
                <Link to="/admin/listingtestimonial" className="dashboard-nav-dropdown-item"><IconList size={20} stroke={2} /> View Testimonial</Link>
              </div>
            </div>

            <div className={`dashboard-nav-dropdown ${openDropdown === 4 ? "show" : ""}`}>
              <Link className="dashboard-nav-item dashboard-nav-dropdown-toggle" onClick={() => handleToggle(4)}>
                <IconListDetails size={20} stroke={2} /> Blog
              </Link>
              <div className="dashboard-nav-dropdown-menu">
                <Link to="/admin/addblog" className="dashboard-nav-dropdown-item"><IconPlaylistAdd size={20} stroke={2} /> Add Blog</Link>
                <Link to="/admin/listingblog" className="dashboard-nav-dropdown-item"><IconList size={20} stroke={2} /> View Blog</Link>
              </div>
            </div>

            

            <div className="nav-item-divider" />
            <Link className="dashboard-nav-item" to={"/"}>
              <IconHome size={20} stroke={2} />
              Home
            </Link>
            <Link className="dashboard-nav-item" onClick={handleLogout}>
              <IconLogout size={20} stroke={2} />
              Logout
            </Link>
          </Nav>
        </nav>
      </div>
    </>
  );
};
export default Sidebar;
