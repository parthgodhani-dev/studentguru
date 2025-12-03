import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Card } from 'react-bootstrap'
import Headtitle from './Headtitle'
import { Link } from 'react-router-dom'
import maincoursesServices from "../../../appwrite/awmaincourses"
import Loader from '../../Loader'

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

    if (loading) return <Loader message="Loading..." />;

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
                    {
                        listcourses.map((course, index) => (
                            <Col lg={3} md={4} sm={6} key={index} className='d-flex align-items-stretch'>
                                <Card>
                                    <Card.Body>
                                        <img loading="lazy" src={maincoursesServices.getFilePreview(course.courseimg)} alt={course.coursetitle} />
                                        <h3>{course.coursetitle}</h3>
                                        <span>{course.description}</span>
                                        <Link className='button' to={`/courses/${course.$id}`}>Learn Now</Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                  </Row>
              </Container>
          </div>
          
    </>
  )
}

export default CourseList