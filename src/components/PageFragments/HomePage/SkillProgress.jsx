import React from 'react';
import { Row, Col } from 'antd';
import ProgressBar from '../../Progress';

const SkillsProgress = () => (
  <div>
    <h2>My Skills</h2>
    <Row gutter={[20, 20]}>
      <Col xs={24} sm={24} md={12}>

        <ProgressBar
          percent={80}
          text="Javascript"
        />
        <ProgressBar
          percent={80}
          text="NodeJS"
        />
        <ProgressBar
          percent={80}
          text="Angular"
        />
        <ProgressBar
          percent={10}
          text="Rust"
        />
      </Col>
      <Col xs={24} sm={24} md={12}>
        <ProgressBar
          percent={70}
          text="JAVA"
        />
        <ProgressBar
          percent={50}
          text="MSSQL"
        />
        <ProgressBar
          percent={78}
          text="Mongo DB"
        />
        <ProgressBar
          percent={20}
          text="Flutter"
        />
      </Col>
    </Row>
  </div>
);

export default SkillsProgress;
