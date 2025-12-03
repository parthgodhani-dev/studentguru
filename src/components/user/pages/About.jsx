import React from 'react'
import PageBanner from '../common/PageBanner.jsx'
import AboutCounter from '../common/AboutCounter.jsx'
import AboutContent from '../common/AboutContent.jsx'
import AboutStories from '../common/AboutStories.jsx'
import Aboutteam from '../common/Aboutteam.jsx'


const About = () => {
  return (
    <>
        <PageBanner
          className={"aboutbanner"}
          pageTitle={<h2>Teaching is the <strong className="unline">greatest act of optimism.</strong></h2>}
          pageSubtext={<p>At StudentGuru, we believe education is more than just lessons — it's the power to transform lives. Our platform connects passionate mentors with curious learners, helping students gain real-world skills, confidence, and clarity for their future.</p>}
          pageBannerimg={<img loading="lazy" src="/about_us.svg" alt='lol' />}
        />
        <AboutCounter />
        <AboutContent />
        <AboutStories />
        <Aboutteam/>
    </>
  )
}

export default About