import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Saved from "./components/Saved";
import Maked from "./components/Maked";
import Profile from "./components/Profile";
import styled from "styled-components";

const MyPage = () => {
  return (
    <MyPageContainer>
      <Profile />
      <TabContainer>
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="home" title="생성됨">
            <Maked />
          </Tab>
          <Tab eventKey="profile" title="저장됨">
            <Saved />
          </Tab>
        </Tabs>
      </TabContainer>
    </MyPageContainer>
  );
};

const TabContainer = styled.div`
  .nav-tabs {
    display: flex;
    justify-content: center;
  }
`;
const MyPageContainer = styled.div``;
export default MyPage;
