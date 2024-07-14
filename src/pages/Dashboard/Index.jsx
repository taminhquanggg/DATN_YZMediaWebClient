import React from "react";
import { useState } from "react";

import { Button, Form, Select } from "antd";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import { usePublicApi } from "../../apiHelper/api/PublicApi";
import { useEffect } from "react";
import { useGlobalConst } from "../../utils/constData";
import bg from "../../assets/image/background.jpg";

const Index = () => {
  const location = useLocation();
  const globalConst = useGlobalConst();
  const [formSearch] = Form.useForm();
  const [listPosts, setListPosts] = useState([]);
  const navigator = useNavigate();

  const apiClient = usePublicApi();

  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    LoadPost();
  }, []);

  const LoadPost = () => {
    apiClient
      .GetAllPosts()
      .then((data) => {
        if (data?.jsondata) {
          const _lst = JSON.parse(data?.jsondata);
          setListPosts(
            _lst.map((x) => {
              return { value: x.PostID, label: <span>{x.PostTitle}</span>, ...x };
            })
          );
        }
      })
      .catch((e) => {
        console.log(e);
        setListPosts([]);
      });
  };

  const goToPost = (post) => {
    if (post.PostID) {
      navigator("/tim-anh/?postId=" + post.PostID);
    }
  };

  const Search = () => {
    formSearch.submit();
    formSearch
      .validateFields()
      .then((values) => {
        const post = listPosts.find((x) => x.PostID == values.PostID);
       
        goToPost(post);
      })
      .catch((err) => {
        console.log(err);
      });
    return;
  };

  return (
    <>
      <div
        className="w-ful h-screen relative flex"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="w-full h-full absolute opacity-40 bg-black z-0"></div>

        <div className="w-full h-full flex items-center">
          <div className="w-full h-10 flex flex-wrap items-end justify-center gap-4">
            <Form
              className="form-search w-full min-w-60 max-w-96"
              form={formSearch}
              onKeyDown={(e) => {
                if (e.code == "Enter") {
                  Search();
                }
              }}
            >
              <Form.Item name={"PostID"} rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}>
                <Select
                  className="w-full h-10 rounded-lg text-left"
                  placeholder={"-- Chọn sự kiện --"}
                  allowClear
                  options={listPosts}
                />
              </Form.Item>
            </Form>

            <Button
              type="primary"
              className="h-full  rounded-lg text-base mb-[24px]"
              icon={<FontAwesomeIcon icon={faSearch} />}
              onClick={Search}
            >
              Tìm kiếm
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
