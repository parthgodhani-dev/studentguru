import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import blogServices from '../../../appwrite/awblog';
import Headtitle from './Headtitle';

const Blogslider = () => {

    useEffect(() => {
        const timer = setTimeout(() => {
            window.dispatchEvent(new Event("resize"));
        }, 50);
        return () => clearTimeout(timer);
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 3000,
        slidesToShow: 3,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    };

    const [blogs, setBlogs] = useState([]);

    const fatchBlogInfo = async() => {
        try {
            const response = await blogServices.getAllBlogs()

            console.log(response);
            console.log(response.documents);

            if (response && response.documents) {
                setBlogs(response.documents)
            }
        } catch (error) {
            console.log(console.error("Error fetching blogs:", error));
        }
    }

    useEffect(() => {
        fatchBlogInfo();
    }, []);


    
        

  return (
    <>
        <div className="blogslider">
            <Container>
                <Row className="align-items-center justify-content-between">
                    <Col xl={3} md={4} className='text-center mb-md-0 mb-5'>
                        <Headtitle
                            className="text-center mb-3"
                            topTitle="Get Started With a basic knowledge"
                            title="Boost Your Career With Advanced Skill."
                            headingTag="h2"
                            headingClass="maintitle"
                            underline={true}
                            underlineClass="underline"
                            underlineText="Boost Your Career"
                        />
                        <Link to="/blog" className='button'>get knowledge</Link>
                    </Col>
                    <Col xl={9} md={8}>
                        <div className="blogslider_box">
                            <div className="blog_slider">
                            <Slider {...settings}>
                                {
                                    blogs.length > 0 ? (
                                        blogs.map((blog) => {
                                            const createdDateStr = blog.$createdAt || blog.createdAt;
                                            const createdDate = createdDateStr
                                                ? new Date(createdDateStr).toLocaleDateString("en-IN", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })
                                                : "";
                                                return(
                                            <div className="blog_box" key={blog.$id}>
                                                    <div className="wrap">
                                                        <div className="box_img">
                                                            <img src={blogServices.getFilePreview(blog.featuredimage)} alt={blog.title} />
                                                        </div>
                                                        <div className="featwrap">
                                                            <small>{createdDate}</small>
                                                            <h3>{blog.title}</h3>
                                                            <p>{blog.shortcontent}</p>
                                                            <Link to={`/blog/${blog.$id}`} className="button">Read More</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                ) })
                                    ) : (
                                        <h2>
                                            lol
                                        </h2>
                                    )
                                }
                                </Slider>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    </>
  )
}

export default Blogslider