import React from 'react';
import { Row, Col } from 'antd';
import AboutTile from '../../AbouTile';
// stripTags
import { domHtml } from '../../../utils/stripTags';

import SEO from '../../Seo';

const pageText = {
  paraOne: 'Hello !! My name is Oyegoke Abiodun Ogundijo. I\'m a software engineer with 4+ years of experience with NodeJS, JAVA and various diverse frameworks and can even design a  custom approach or pattern to match any special case required for a project. I have passions for architecting scalable systems and managing engineering teams in the future. I am always learning and growing to be the very best of the best.',
  paraTwo: '',
  // paraTwo: `<h4< Abilities </h4> \n
  //    DYNAMIC SOLUTION BASED ARCHITECTURAL DESIGN. \n
  //    MENTORSHIP AND MULTITASKING. \n
  //    TEST DRIVEN DEVELOPMENT. \n
  //    BUILDING APIS AND SDK \n
  //    WRITING TECHINCAL DOCUMENTATIONS \n
  //    CUSTOMER CENTER DESIGN AND SOLUTIONS. \n
  //    SALES REPRESENTATION.`,
};

const AboutMe = () => {
  const description = `${pageText.paraOne} ${(pageText.paraTwo)}`;

  return (
    <>
      <div>
        <SEO
          title="About"
          description={description}
          path=""
          keywords={['Oyegoke', 'Abiodun', 'Lagos', 'FullStack developer', 'Javascript', 'Typescript', 'NodeJS', 'JAVA', 'MSSQL', 'MONGO DB']}
        />
        <h1 className="titleSeparate">About Me</h1>
        <p>
          {pageText.paraOne}
        </p>
        <p dangerouslySetInnerHTML={domHtml(pageText.paraTwo)} />
      </div>
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={24} md={12} lg={8}>
          <AboutTile
            img="location.png"
            height={60}
            alt="location image"
            textH4="Born and bought up in"
            textH3="Nigeria"
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <AboutTile
            img="coffee.png"
            alt="coffee image"
            textH4="Love Coffee"
            textH3="Coffee + Me = Happiness"
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <AboutTile
            img="meeting.png"
            alt="meeting image"
            textH4="Socially Awkward"
            textH3="At times"
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <AboutTile
            img="motorcycle.png"
            alt="motorcycle image"
            textH4="Love Riding"
            textH3="Biker for life"
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <AboutTile
            img="web.png"
            alt="web image"
            textH4="Self Taught Programmer"
            textH3="Thanks to the Web Resources"
            height={60}
            width={60}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <AboutTile
            img="graduation.png"
            alt="graduation image"
            textH4="Pursued B.Tech in"
            textH3="Agricultural Engineering"
            height={60}
            width={60}
          />
        </Col>
      </Row>
    </>
  );
};
export default AboutMe;
