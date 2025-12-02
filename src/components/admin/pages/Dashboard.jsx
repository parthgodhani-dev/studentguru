import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card, Spinner } from "react-bootstrap";

import blogServices from "../../../appwrite/awblog";
import testimoServices from "../../../appwrite/awtestimo";
import teamServices from "../../../appwrite/awteam";
import maincoursesServices from "../../../appwrite/awmaincourses";
import subCourseServices from "../../../appwrite/awsubcourses";
import lessonsServices from "../../../appwrite/awlessons";

const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    blogs: [],
    reviews: [],
    team: [],
    mainCourses: [],
    subCourses: { total: 0, subcourses: [] },
    lessons: {},
  });

  const fetchAll = async () => {
    try {
      const [
        blogsRes,
        reviewsRes,
        teamRes,
        mainCoursesRes,
        subCoursesRes,
        lessonsRes,
      ] = await Promise.all([
        blogServices.getAllBlogs(),
        testimoServices.getAllTestimo(),
        teamServices.getAllTeam(),
        maincoursesServices.getAllCourses(),
        subCourseServices.getAllSubcourses(),
        lessonsServices.getAllLessonsCount(),
      ]);

      setData({
        blogs: blogsRes?.documents || [],
        reviews: reviewsRes?.documents || [],
        team: teamRes?.documents || [],
        mainCourses: mainCoursesRes?.documents || [],
        subCourses: subCoursesRes || { total: 0, subcourses: [] },
        lessons: lessonsRes || {},
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);


  const StatCard = ({ title, value }) => (
    <Col md={4} sm={6}>
      <Card className='admincard mb-4'>
        <Card.Header as="h5">{title}</Card.Header>
        <Card.Body>
          <div className='display-1 fw-bold'>{value}</div>
        </Card.Body>
      </Card>
    </Col>
  );

  return (
    <section>
      <Container>
        <Row>
          <Col sm={12} className="mb-3">
            <div className="d-flex align-items-center justify-content-between">
              <div className="admintitle">
                <h1>Admin Dashboard</h1>
                <p>
                  Welcome to the Admin Dashboard. Here you can manage users,
                  view analytics, and configure settings.
                </p>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          {loading ? (
            <Col sm={12}>
              <div className="text-center py-4">
                <Spinner animation="border" />
              </div>
            </Col>
          ) : (
            <>
              <StatCard title="Added Courses" value={data.mainCourses.length} />
              <StatCard title="Added Sub Courses" value={data.subCourses.total} />
              <StatCard title="Added Lessons" value={data.lessons?.total || 0} />
              <StatCard title="Added Blogs" value={data.blogs.length} />
              <StatCard title="Added Reviews" value={data.reviews.length} />
              <StatCard title="Added Members" value={data.team.length} />
            </>
          )}

        </Row>
      </Container>
    </section>
  );
};

export default Dashboard;
