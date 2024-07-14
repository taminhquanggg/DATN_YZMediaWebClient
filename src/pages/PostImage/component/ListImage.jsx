import React, { useEffect, useState } from "react";
import PaginationV2 from "../../../components/controls/PaginationV2";
import { List } from "antd";
import ImagePreview from "./ImagePreview";
import { usePublicApi } from "../../../apiHelper/api/PublicApi";
import { getFromToPaging } from "../../../utils/commonFunction";

const ListImage = React.forwardRef(
  (
    {
      datas = [],
      setDatas,
      searchObj,
      // apiPublic,
    },
    ref
  ) => {
    const apiPublic = usePublicApi();

    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalRecord, setTotalRecord] = useState(0);
    const [recordOnPage, setRecordOnPage] = useState(10);
    const [orderBy, setOrderBy] = useState("InTime");
    const [itemImageSearch, setItemImageSearch] = useState();


    useEffect(() => {
      searchData(1);
    }, [searchObj, recordOnPage]);

    const searchData = (p_curentPage) => {
      const calcPage = getFromToPaging(p_curentPage, recordOnPage);

      let fromRecord = recordOnPage * (p_curentPage - 1) + 1;

      setCurrentPage(p_curentPage);

      let param = {
        postID: searchObj?.PostID,
        orderBy: orderBy,
        offset: fromRecord,
        pageSize: recordOnPage,
        image: searchObj?.SearchImage?.originFileObj,
        searchType: searchObj?.SearchType
      }

      if (searchObj?.PostID > 0) {
        apiPublic &&
          apiPublic
            ?.GetImageByPostID(param)
            .then((data) => {
              if (data && data.jsondata) {
                const _lst = JSON.parse(data.jsondata);
                // console.log(_lst);
                setTotalRecord(data.totalrows);
                setTotalPages(Math.ceil(data.totalrows / recordOnPage));
                setDatas(_lst);

                if (_lst) {
                  const itemImageSearch = { ..._lst[0] };
                  itemImageSearch.ImageName = "Khuôn mặt tra cứu .jpg";
                  itemImageSearch.ImagePath = itemImageSearch.ImageSearchDetect;
                  itemImageSearch.InTime = "";
                  itemImageSearch.StatusTrain = 0;
                  itemImageSearch.Similarity = null;

                  setItemImageSearch(itemImageSearch);
                }

              }
            })
            .catch(function (err) {
              console.log(err);
            });
      }
    };

    const [indexFirstSelect, setIndexFirstSelect] = useState(0);
    const countdataselected = React.useMemo(
      () => datas.filter((e) => e.isSelected === true).length || 0,
      [datas]
    );
    const [fileIdSelected, setFileIdSelected] = useState(0);
    useEffect(() => {
      if (countdataselected <= 1) {
        const _index = datas.findIndex((x) => x.File_Id === fileIdSelected);
        if (_index >= 0) {
          setIndexFirstSelect(_index);
        }
      }
    }, [countdataselected]);
    const handleClearSelect = (e) => {
      setDatas([
        ...datas.map((e, i) => {
          return { ...e, isSelected: false };
        }),
      ]);
    };

    const itemClick = (e, data) => {
      e.stopPropagation();
      setFileIdSelected(data?.File_Id);

      if (e.ctrlKey || e.shiftKey) {
        if (data?.File_Id > 0) {
          setDatas([
            ...datas.map((e, i) => {
              if (e.File_Id === data?.File_Id) {
                return { ...e, isSelected: true };
              } else {
                return e;
              }
            }),
          ]);
        }
      } else {
        if (data?.File_Id > 0) {
          setDatas([
            ...datas.map((e, i) => {
              if (e.File_Id === data?.File_Id) {
                return { ...e, isSelected: true };
              } else {
                return { ...e, isSelected: false };
              }
            }),
          ]);
        }
      }
    };

    return (
      <div>

        <div className="mb-10	">
          {itemImageSearch?.ImagePath ? (
            <ImagePreview image={itemImageSearch} onClick={itemClick} />
          )
            : (<></>)}
        </div>



        <div onClick={handleClearSelect} className="not_allow_hightlight">
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 3,
              xxl: 4,
            }}
            dataSource={datas}
            renderItem={(item) => (
              <List.Item>
                <ImagePreview image={item} onClick={itemClick} />
              </List.Item>
            )}
          />
        </div>
        <PaginationV2
          totalPages={totalPages}
          currentPage={currentPage}
          totalRecord={totalRecord}
          recordOnPage={recordOnPage}
          setRecordOnPage={setRecordOnPage}
          searchData={searchData}
        />
      </div>
    );
  }
);

export default ListImage;
