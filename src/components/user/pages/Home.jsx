import React from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'

import Herobanner from '../common/Herobanner'
import Features from '../common/Features'
import Professor from '../common/Professor'
import Counter from '../common/Counter'
import Whychoose from '../common/Whychoose'
import Studentlove from '../common/Studentlove'
import Blogslider from '../common/Blogslider'


const Home = () => {

  return (
    <>
      <Herobanner />
      <Features />
      <Professor/>
      <Counter/>
      <Whychoose />
      <Blogslider/>
      <Studentlove/>
    </>
  )
}

export default Home