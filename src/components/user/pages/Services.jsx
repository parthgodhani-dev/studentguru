import React from 'react'
import PageBanner from '../common/PageBanner'
import Serviceintro from '../common/Serviceintro'
import Servicedetails from '../common/Servicedetails'
import Whychoose from '../common/Whychoose'
import LearningPrograms from '../common/LearningPrograms'
import HowItWorks from '../common/HowItWorks'
import Faq from '../common/Faq'

const Services = () => {
  return (
    <>
        <PageBanner 
            className={"servicebanner"}
            pageTitle={<h2>Empowering Students to <strong className="unline">Learn Smarter, Grow Faster</strong></h2>} 
            pageSubtext={<p>At StudentGuru, we help you build skills, confidence, and a clear path toward your dream career through guided learning and real mentorship.</p>} 
            pageBannerimg={<img src="./servicesbanner.svg" alt='' />}
        />
        <Serviceintro />
        <Servicedetails />
        <Whychoose />
        <LearningPrograms />
        <HowItWorks/>
        <Faq/>
    </>
  )
}

export default Services