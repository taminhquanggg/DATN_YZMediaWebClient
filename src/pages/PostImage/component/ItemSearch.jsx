import React, { useEffect, useState } from "react";

import { Form, Input, Button, Radio, Upload, Image } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useGlobalConst } from "../../../utils/constData";
import { getBase64 } from "../../../utils/convertData";

const ItemSearch = React.forwardRef(
  ({ formInstance, onSubmit, optionSearch, setOptionSearch }, ref) => {
    const globalConst = useGlobalConst();

    const [previewImage, setPreviewImage] = useState("");
    const [fileName, setFileName] = useState("");
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
      formInstance.setFieldValue("SearchType", optionSearch);
    }, []);

    const handleChange = ({ file: newFile, fileList: newFileList }) => {
      formInstance.setFieldValue("SearchImage", newFile);
      setFileName(newFile.name);
      setFileList([newFile]);
    };

    const customRequest = async (options) => {
      const { onSuccess, onError, file, onProgress } = options;

      getBase64(file, (data) => {
        if (data) {
          file.preview = data;
          setPreviewImage(data);
          onSuccess("Ok");
        } else {
          onError();
        }
      });
    };

    const props_btn_upload = {
      fileList: fileList,
      accept: "image/*",
      showUploadList: false,
      customRequest: customRequest,
      onChange: handleChange,
      // onRemove: handleRemove,
    };

    const validateFileattach = async (rule, value) => {
      if (!value) {
        throw new Error("Tải ảnh lên để thực hiện tra cứu");
      }
    };

    return (
      <>
        <Form.Item name={"PostID"} hidden />

        <div className="mb-3">
          <Form.Item name={"SearchType"}>
            <Radio.Group
              value={optionSearch}
              onChange={(e) => {
                setOptionSearch(e.target.value);
              }}
              optionType="button"
              options={options}
            />
          </Form.Item>
        </div>

        <div className="flex-controls">
          <div className="flex flex-wrap">
            <div className="form-search w-full max-w-96 ">
              {formInstance.getFieldValue("SearchType") === 1 ? (
                <></>
              ) : (
                <Form.Item
                  className="	"
                  name={"SearchImage"}
                  rules={
                    formInstance.getFieldValue("SearchType") == 2
                      ? [
                        {
                          validator: validateFileattach,
                        },
                        {
                          required: true,
                          message: "",
                        },
                      ]
                      : []
                  }
                >
                  <div className="flex justify-center items-center	">
                    <div className="h-full border rounded-xl bg-gray overflow-hidden flex items-center img_search">
                      {previewImage && <Image height={80} src={previewImage} />}
                    </div>
                    <div className="w-full ml-3">
                      <Upload {...props_btn_upload}>
                        <Button
                          className="w-full min-w-60 max-w-96 h-14 rounded-lg text-left"
                          icon={<FontAwesomeIcon icon={faUpload} />}
                        >
                          Tải lên
                        </Button>
                      </Upload>
                    </div>
                  </div>
                </Form.Item>
              )}
            </div>
          </div>
        </div>

        <div className="ant-form-control">
          <Button
            type="primary"
            className="text-base w-full h-10 rounded-lg text-left"
            icon={<FontAwesomeIcon icon={faSearch} />}
            onClick={onSubmit}
          >
            Tìm kiếm
          </Button>
        </div>
      </>
    );
  }
);

const options = [
  {
    label: "Tất cả",
    value: 1,
  },
  {
    label: "Tra cứu khuôn mặt",
    value: 2,
    title: "Tải hình ảnh lên để tra cứu",
  },
];

export default ItemSearch;
