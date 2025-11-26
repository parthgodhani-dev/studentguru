import React from 'react'
import PageBanner from '../common/PageBanner'
import CourseCounter from '../common/CourseCounter'
import CourseList from '../common/CourseList'
import AboutStories from '../common/AboutStories'
import Faq from '../common/Faq'

const Courses = () => {
  return (
    <>
    <PageBanner
      className={"coursesbanner"}
      pageTitle={<h2>Your Journey to <strong className="unline">IT Mastery Begins Here.</strong></h2>}
      pageSubtext={<p>
        Explore industry-ready IT courses designed to help you grow faster.
        From coding to design, each course is crafted to make learning simple,
        practical, and career-focused.
      </p>}
      pageBannerimg={<img src="/courses-banner.svg" alt='courses-banner' />}
    />
    <CourseCounter/>
    <CourseList />
    <AboutStories />
    <Faq />
    </>
  )
}

export default Courses