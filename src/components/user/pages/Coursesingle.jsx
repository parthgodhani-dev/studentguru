import React, { useState, useEffect } from 'react'
import Coursebanner from '../common/Coursebanner'
import { useParams } from "react-router-dom";
import { Col, Container, Row, Accordion, Button, Modal } from 'react-bootstrap'
import Headtitle from '../common/Headtitle'
import { IconPlayerPlayFilled } from "@tabler/icons-react"
import maincoursesServices from '../../../appwrite/awmaincourses'
import subCourseServices from "../../../appwrite/awsubcourses"
import lessonsServices from "../../../appwrite/awlessons"

const Coursesingle = () => {

  const { slug } = useParams();
  const [show, setShow] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  const [videoUrl, setVideoUrl] = useState("");
  const handleClose = () => {
    setShow(false);
    setVideoUrl("");
  };

  const [courses, setCourses] = useState(null)
  const [subcourses, setSubcourses] = useState(null)
  const [lessons, setLessons] = useState(null)

  const [loading, setLoading] = useState(true);

  function handleShow(breakpoint, url) {
    setFullscreen(breakpoint);
    setVideoUrl(url);
    setShow(true);
  } 

  const convertYoutubeUrl = (url) => {
    if (!url) return "";
    return url.replace("watch?v=", "embed/");
  };

  const fatchcourses = async () => {
    try {
      const resp = await maincoursesServices.getCourse(slug)
      if (resp) {
        setCourses(resp)
      }

      const subresp = await subCourseServices.getSubcourses(resp.$id)
        if (subresp && subresp.documents) {
          setSubcourses(subresp.documents)
        }

          const lessonsData = {};
            for (const sub of subresp.documents) {
              const lessonResp = await lessonsServices.getLessons(sub.$id);
              lessonsData[sub.$id] = lessonResp?.documents || [];
            }
            
            setLessons(lessonsData)
        // console.log("data :", resp.$id);
      // console.log("data :", subresp.documents);
      console.log("data lessons :", lessonsData);

    } catch (error) {
      console.error("Error fetching courses all data:", error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fatchcourses()
  }, [])

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (!courses) {
    return <div className="text-center py-5">Courses not found</div>;
  }

  return (
    <>
      <Coursebanner
        pageTitle={<h1><strong className="unline">{courses.coursetitle}</strong></h1>}
        pageSubtext={<p>{courses.description}</p>}
      />
      
      <section className='courseintro'>
        <Container>
          <Row>
            <Col md={12}>
              <div dangerouslySetInnerHTML={{ __html: courses.briefinfo }}></div>
            </Col>
          </Row>
        </Container>
      </section>


      <section className='tutorials'>
        <Container>
          <Row className="justify-content-center">
              <Col sm={10}>
                  <Headtitle
                      className="text-center"
                      topTitle="Course Curriculum"
                      title="What You’ll Learn in This Course"
                      headingTag="h2"
                      headingClass="maintitle h3"
                      underline={true}
                      underlineClass="underline h3"
                      underlineText="Learn in This Course"
                  />
              </Col>
          </Row>

          <Row className='justify-content-center'>
            <Col md={10}>
              <Accordion className='tutorialacc' defaultActiveKey="0">
                {
                  subcourses.map((subc, index) => (
                    <Accordion.Item eventKey={String(index)} key={subc.$id}>
                      <Accordion.Header>{subc.subtitle}</Accordion.Header>
                      <Accordion.Body>
                        <ul>
                          {lessons[subc.$id]?.length > 0 ? (
                            lessons[subc.$id].map(lesson => (
                              <li key={lesson.$id}>
                                <strong>{lesson.lessontitle}</strong>
                                <Button
                                  className='button'
                                  onClick={() => handleShow(true, convertYoutubeUrl(lesson.lessonvideo))}
                                >
                                  <IconPlayerPlayFilled />
                                </Button>
                              </li>
                            ))
                          ) : (
                            <li>No lessons available</li>
                          )}
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))
                }
                
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>
      
      <Modal show={show} fullscreen={fullscreen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Course Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {videoUrl ? (
            <iframe
              width="100%"
              height="500"
              src={videoUrl}
              title="Lesson Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : <p>No video available</p>}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Coursesingle