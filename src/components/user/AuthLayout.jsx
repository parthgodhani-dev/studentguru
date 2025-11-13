import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true, allowedRole = null }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    // Not logged in, but page requires authentication
    if (authentication && !authStatus) {
      navigate("/login");
    }
    // Logged in, but page is public (like login/register)
    else if (!authentication && authStatus) {
      navigate("/");
    }
    // Role-based check
    else if (allowedRole && userData?.role !== allowedRole) {
      navigate("/"); // redirect to home if role mismatch
    }

    setLoader(false);
  }, [navigate, authStatus, authentication, allowedRole, userData]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
