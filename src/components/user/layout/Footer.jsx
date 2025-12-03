import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom' 
import Newsletter from './Newsletter'
import { IconBrandFacebook, IconBrandInstagram, IconBrandYoutube } from '@tabler/icons-react';

const Footer = () => {
  return (
    <>
        <Newsletter />
        <footer id="footer">
            <Container>
                <Row className="justify-content-center">
                    <Col sm={12}>
                        <div className="footelogo">
                            <img loading="lazy" src="studentguru_logo_footer.png" alt="Student Guru" />
                        </div>
                    
                        <ul className='footlink'>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/services">Services</Link></li>
                            <li><Link to="/courses">Courses</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    
                        <ul className="social">
                            <li><Link to="https://www.facebook.com/" target='_blank'><IconBrandFacebook stroke={1} width={24} height={24} /></Link></li>
                            <li><Link to="https://www.instagram.com/" target='_blank'><IconBrandInstagram stroke={1} width={24} height={24} /></Link></li>
                            <li><Link to="https://www.youtube.com/" target='_blank'><IconBrandYoutube stroke={1} width={24} height={24} /></Link></li>
                        </ul>
                    
                        <p className='copyright'>© 2025. All rights reserved <Link to="/">studentguru</Link>, Created by Parth Godhani</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    </>
  )
}

export default Footer