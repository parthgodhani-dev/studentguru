import React, { useEffect, useState, useRef } from 'react'
import { Container, Navbar, NavDropdown, Nav } from 'react-bootstrap'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { IconMenu3, IconUserCircle } from "@tabler/icons-react"
import authService from '../../../appwrite/auth'
import { logout } from '../../../store/authSlice'

const Header = () => {
    const [expanded, setExpanded] = useState(false);
    const collapseRef = useRef(null);
    const authStatus = useSelector(state => state.auth.status)
    const user = useSelector(state => state.auth.userData)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        await authService.logout()
        dispatch(logout())
        navigate('/')
    }

    // Common nav items
    const navItems = [
        { name: 'Home', slug: '/', active: true },
        { name: 'About', slug: '/about', active: true },
        { name: 'Services', slug: '/services', active: true },
        { name: 'Courses', slug: '/courses', active: true },
        { name: 'Blog', slug: '/blog', active: true },
        { name: 'Contact', slug: '/contact', active: true }
    ]

    const navAuthItems = [
        { name: 'Login', slug: '/login', active: !authStatus, className: 'loginbtn' },
        { name: 'Register', slug: '/register', active: !authStatus },
    ]

    useEffect(() => {
        const handleClick = (e) => {
            const el = collapseRef.current;
            if (!el) return;

            const isInside = el.contains(e.target);
            const isLink = e.target.closest("a");

            // Close when clicking ANY link inside
            if (expanded && isInside && isLink) {
                setExpanded(false);
            }

            // Close when clicking outside
            if (expanded && !isInside) {
                setExpanded(false);
            }
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [expanded]);

    return (
        <header id='header'>
            <Navbar expand="lg" expanded={expanded} onToggle={() => setExpanded(prev => !prev)}>
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img src="studentguru_logo.png" alt="Student Logo" />
                    </Navbar.Brand>

                    <div className="d-flex align-items-center gap-2">
                        <Navbar.Toggle ref={collapseRef} aria-controls="basic-navbar-nav">
                            <IconMenu3 stroke={2} width={30} height={30} />
                        </Navbar.Toggle>
                        <Nav className="ms-auto d-lg-none d-inline-flex mob-auth">
                            {authStatus && (
                                <NavDropdown title={<IconUserCircle stroke={2} width={30} height={30} />} id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/profile">
                                        Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/changepassword">
                                        Change Password
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleLogout}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            )}
                        </Nav>
                    </div>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {navItems
                                .filter(item => item.active)
                                .map(item => (
                                    <Nav.Link as={NavLink} to={item.slug} key={item.name}>
                                        {item.name}
                                    </Nav.Link>
                                ))}

                            {navAuthItems
                            .filter(item => item.active)
                            .map(item => (
                                <Nav.Link className='d-lg-none d-block' as={NavLink} to={item.slug} key={item.name}>
                                    {item.name}
                                </Nav.Link>
                            ))}
                        </Nav>

                        <Nav className="ms-auto d-lg-block d-none">
                            <div className="auth-buttons">
                                {navAuthItems
                                    .filter(item => item.active)
                                    .map(item => (
                                        <Link className={`button ${item.className || ""}`} to={item.slug} key={item.name}>
                                            {item.name}
                                        </Link>
                                    ))}
                            </div>

                            {authStatus && (
                                <NavDropdown title={user?.name || 'Account'} id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/profile">
                                        Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/changepassword">
                                        Change Password
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleLogout}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
