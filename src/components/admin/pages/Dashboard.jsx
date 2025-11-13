import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Card } from 'react-bootstrap'
import blogServices from "../../../appwrite/awblog"
import testimoServices from "../../../appwrite/awtestimo"

const Dashboard = () => {

  const [blogs, setBlogs] = useState([]);
  const [reviews, setReviews] = useState([])

  const fetchReviews = async () => {
    try {

      const responseBlog = await blogServices.getAllBlogs()
      if (responseBlog && responseBlog.documents) {
        setBlogs(responseBlog.documents)
      }

      const responseReview = await testimoServices.getAllTestimo()
      if (responseReview && responseReview.documents) {
        setReviews(responseReview.documents)
      }

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  return (

    <section>
                    <Container>
                        <Row>
                            <Col sm={12} className='mb-3'>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="admintitle">
                                        <h1>Admin Dashboard</h1>
                                        <p>Welcome to the Admin Dashboard. Here you can manage users, view analytics, and configure settings.</p>
                                    </div>
                                </div>
                            </Col>
                            
                            <Col md={4}>
                                <Card className='admincard'>
                                    <Card.Header as="h5">Added Blogs</Card.Header>
                                    <Card.Body>
                                      <div className='display-1 fw-bold'>{blogs.length}</div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4}>
                              <Card className='admincard'>
                                <Card.Header as="h5">Added reviews</Card.Header>
                                <Card.Body>
                                  <div className='display-1 fw-bold'>{reviews.length}</div>
                                </Card.Body>
                              </Card>
                            </Col>
                        </Row>
                    </Container>
                </section>
  )
}

export default Dashboard