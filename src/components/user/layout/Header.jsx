import React from 'react'
import { Container, Navbar, NavDropdown, Nav } from 'react-bootstrap'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import authService from '../../../appwrite/auth'
import { logout } from '../../../store/authSlice'

const Header = () => {
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

    return (
        <header id='header'>
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img src="studentguru_logo.png" alt="Student Logo" />
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {navItems
                                .filter(item => item.active)
                                .map(item => (
                                    <Nav.Link as={NavLink} to={item.slug} key={item.name}>
                                        {item.name}
                                    </Nav.Link>
                                ))}
                        </Nav>

                        <Nav className="ms-auto">
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
