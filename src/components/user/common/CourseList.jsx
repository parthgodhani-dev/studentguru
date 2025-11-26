import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Card, Button, Spinner } from 'react-bootstrap'
import Headtitle from './Headtitle'
import { Link } from 'react-router-dom'
import maincoursesServices from "../../../appwrite/awmaincourses"

const CourseList = () => {

    const [listcourses, setListcourses] = useState([])
    const [loading, setLoading] = useState(true)

    const fatchcourses = async() => {
        try {
            const response = await maincoursesServices.getAllCourses()
            if (response && response.documents){
                setListcourses(response.documents)
            }
            
        } catch (error) {
            console.error("Error fetching courses data:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fatchcourses()
    }, [])

    // const listofcourse = [
    //     {
    //         img: "/shapes/1.svg",
    //         title: "Full Stack Web Development",
    //         content: "Learn frontend + backend using HTML, CSS, JavaScript, React, Node.js, Express, MongoDB." 
    //     },
    //     {
    //         img: "/shapes/3.svg",
    //         title: "Frontend Development",
    //         content: "Master UI development with React, Tailwind, Bootstrap, and modern JS."
    //     },
    //     {
    //         img: "/shapes/2.svg",
    //         title: "Backend Development",
    //         content: "Learn APIs, authentication, databases, and real-world backend systems."
    //     },
    //     {
    //         img: "/shapes/4.svg",
    //         title: "UI/UX Design",
    //         content: "Learn design principles, Figma, prototyping, and user research."
    //     },
    //     {
    //         img: "/shapes/5.svg",
    //         title: "Data Science & Machine Learning",
    //         content: "Hands-on Python, Pandas, NumPy, ML models, real datasets."
    //     },
    //     {
    //         img: "/shapes/6.svg",
    //         title: "Python Programming",
    //         content: "Master Python basics, OOP, automation, and problem-solving."
    //     },
    //     {
    //         img: "/shapes/7.svg",
    //         title: "Mobile App Development",
    //         content: "Build cross-platform apps with Flutter and Dart."
    //     },
    //     {
    //         img: "/shapes/12.svg",
    //         title: "Cloud Computing with AWS",
    //         content: "Learn EC2, S3, Lambda, VPC, IAM, deployments, DevOps basics."
    //     },
    //     {
    //         img: "/shapes/9.svg",
    //         title: "Cyber Security & Ethical Hacking",
    //         content: "Network security, tools, penetration testing, cyber laws."
    //     },
    //     {
    //         img: "/shapes/10.svg",
    //         title: "DevOps & Automation",
    //         content: "Learn CI/CD, Docker, Kubernetes, GitHub Actions."
    //     },
    //     {
    //         img: "/shapes/11.svg",
    //         title: "Digital Marketing & SEO",
    //         content: "Perfect for non-tech students — SEO, social media, ads, analytics."
    //     },
    //     {
    //         img: "/shapes/8.svg",
    //         title: "Data Analytics",
    //         content: "Business-focused data cleaning, dashboards, reporting."
    //     },
    // ]

  return (
    <>
          <div className="courselist">
              <Container>
                  <Row className="justify-content-center">
                      <Col sm={10}>
                          <Headtitle
                              className="text-center"
                              topTitle="Explore Courses"
                              title="Master the Skills That Power Today’s Technology"
                              headingTag="h2"
                              headingClass="maintitle h3"
                              underline={true}
                              underlineClass="underline h3"
                              underlineText="Today’s Technology"
                          />
                      </Col>
                  </Row>
                  <Row>
                    {loading ? (
                            <div className="text-center py-4">
                                <Spinner animation="border" />
                            </div>
                        ) : (
                            listcourses.map((course, index) => (
                                <Col sm={3} key={index} className='d-flex align-items-stretch mb-4'>
                                    <Card>
                                        <Card.Body>
                                            <img src={maincoursesServices.getFilePreview(course.courseimg)} alt={course.coursetitle} />
                                            <h3>{course.coursetitle}</h3>
                                            <span>{course.description}</span>
                                            {/* <div dangerouslySetInnerHTML={{ __html: course.briefinfo }}></div> */}
                                            <Link className='button' to={`/courses/${course.$id}`}>Learn Now</Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        )
                    }
                    


                    
                      
                  </Row>
              </Container>
          </div>
          
    </>
  )
}

export default CourseList