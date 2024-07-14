import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faFacebook, faYoutube } from "@fortawesome/free-brands-svg-icons";

import { Header } from "../header/Header";

const LayoutTopMenu = (props) => {
  return (
    <Layout className="overflow-y-auto h-screen " id="scrollableDiv">
        <Header/>
            <props.component />
    </Layout>
  );
};
export default LayoutTopMenu;
