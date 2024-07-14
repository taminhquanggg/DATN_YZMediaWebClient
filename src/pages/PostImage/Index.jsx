import React from "react";
import { useState } from "react";

import { Form } from "antd";

import { useLocation } from "react-router-dom";

import { useEffect } from "react";
import { usePublicApi } from "../../apiHelper/api/PublicApi";

import ItemSearch from "./component/ItemSearch";
import ListImage from "./component/ListImage";


const Index = () => {
  const apiPublic = usePublicApi();

  const location = useLocation();

  const [data, setData] = useState([]);
  const [formSearch] = Form.useForm();

  const [searchObj, setSearchObj] = useState();
  const [postsInfo, setPostsInfo] = useState();
  const [optionSearch, setOptionSearch] = useState(1);

  const queryParameters = new URLSearchParams(window.location.search);

  useEffect(() => {
    const postID = queryParameters.get("postId");
    formSearch.setFieldValue("PostID", postID);
    LoadPostData(postID);
  }, [location]);

  const LoadPostData = (postID) => {
    if (postID && postID > 0) {
      apiPublic
        .GetPostInfo(postID)
        .then((data) => {
          if (data?.jsondata) {
            const _obj = JSON.parse(data?.jsondata);
            setPostsInfo(_obj);
          }
        })
        .catch((e) => {
          console.log(e);
          setListPosts([]);
        });
    }
  };

  useEffect(() => {
    setData([]);
    Search();
  }, [optionSearch]);

  useEffect(() => {
    Search();
  }, []);

  const Search = () => {
    formSearch.submit();
    formSearch
      .validateFields()
      .then((values) => {
        setSearchObj(values);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="mx-4 my-4 bg-white rounded-2xl">

        <div className="w-full h-screen max-h-80 overflow-hidden rounded-t-2xl"
          style={{
            backgroundImage: `url(${postsInfo?.PostCoverImagePath})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }} />
        <div className="m-4">
          <div className="flex">
            <div className="w-1/6 h-full mr-10 ">
              <img
              className="rounded-2xl"
                src={postsInfo?.PostLogoImagePath}
                alt={postsInfo?.PostTitle}
                style={{ alignSelf: 'center' }} />
            </div>
            <div>
              <div className="text-lg font-semibold">{postsInfo?.PostTitle}</div>
              <div>{postsInfo?.PostDescription}</div>
            </div>
          </div>
          <div className="py-5">
            <Form
              className="form-search"
              form={formSearch}
              onKeyDown={(e) => {
                if (e.code == "Enter") {
                  Search();
                }
              }}
            >
              <ItemSearch
                formInstance={formSearch}
                onSubmit={Search}
                optionSearch={optionSearch}
                setOptionSearch={setOptionSearch}
              />
            </Form>
          </div>
          <ListImage datas={data} setDatas={setData} searchObj={searchObj} />
        </div>
      </div>
    </>
  );
};

export default Index;
