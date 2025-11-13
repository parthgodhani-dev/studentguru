import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({
    children,
    authentication = true,
    allowedRole = null,
}) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const { status: authStatus, userData } = useSelector((state) => state.auth);

    useEffect(() => {
        if (authentication && !authStatus) {
            navigate("/login", { replace: true });
        } else if (!authentication && authStatus) {
            navigate("/", { replace: true });
        } else if (allowedRole && userData?.role !== allowedRole) {
            navigate("/", { replace: true });
        }
        setLoader(false);
    }, [navigate, authStatus, authentication, allowedRole, userData]);

    if (loader) return <h1>Loading...</h1>;
    return <>{children}</>;
}
