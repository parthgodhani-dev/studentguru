import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

export default function Protected({
    children,
    authentication = true,
    allowedRole = null,
}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [loader, setLoader] = useState(true);

    const { status: authStatus, userData } = useSelector((state) => state.auth);

    useEffect(() => {
        if (authentication && !authStatus) {
            navigate("/login", {
                replace: true,
                state: { from: location.pathname },
            });
        }
        else if (!authentication && authStatus) {
            navigate("/", { replace: true });
        }
        
        else if (allowedRole && userData?.role !== allowedRole) {
            navigate("/", { replace: true });
        }

        setLoader(false);
    }, [
        navigate,
        authStatus,
        authentication,
        allowedRole,
        userData,
        location.pathname,
    ]);

    if (loader) return <h1>Loading...</h1>;

    return <>{children}</>;
}
