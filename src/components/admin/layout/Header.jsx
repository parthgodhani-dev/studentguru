import React from 'react';
import { IconMenu3, IconUserStar } from '@tabler/icons-react';
import { useSelector } from "react-redux";

const Header = ({ onToggleSidebar }) => {

  const { userData } = useSelector((state) => state.auth);
  const name = userData?.name || "Admin";

  return (
    <>
      <header className="dashboard-app">
        <div className="dashboard-toolbar">
          <div className="head_wrap">
            <a href="#" className="menu-toggle" id="toggleSidebarBtn" onClick={onToggleSidebar}>
              <IconMenu3 stroke={2} width={30} height={30} />
            </a>
            <a className="brand-logo-mob d-lg-none d-flex" href="/admin">
              <img src="/public/studentguru_logo.png" alt="studentguru_logo" />
            </a>
            <strong className="user_info">
              <IconUserStar size={20} />
              {name}
            </strong>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
