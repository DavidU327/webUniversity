import React from 'react';
import { Row, Col } from 'antd';
import { Aside, Content } from './style';

const AuthSideImage = (WraperContent) => {
  return function () {
    return (
      <Row>
        <Col xxl={8} xl={9} lg={12} md={8} xs={24}>
          <Aside>
            <div className="auth-side-content">
              <img src={require('../../assets/auth/topShape.png')} alt="" className="topShape" />
              <img src={require('../../assets/auth/bottomShape.png')} alt="" className="bottomShape" />
              <Content>
                <img
                  className="auth-content-figure"
                  src={require('../../assets/auth/ilustration.png')}
                  alt=""
                />
              </Content>
            </div>
          </Aside>
        </Col>

        <Col xxl={16} xl={15} lg={12} md={16} xs={24}>
          <WraperContent />
        </Col>
      </Row>
    );
  };
};

export default AuthSideImage;
