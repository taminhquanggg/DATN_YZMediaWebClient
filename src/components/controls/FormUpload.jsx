import { faFileUpload, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Image, Input, List, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import { getBase64 } from "../../../utils/convertData";
import { faEye, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";
import { LIST_IGNORE } from "antd/es/upload/Upload";

const { Dragger } = Upload;

export const FormUpload = ({ form }) => {
  const [viewOptions, setViewOptions] = useState("TABLE");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const handleRemove = (props) =>
    setFileList(
      fileList.filter(function (item) {
        return item.uid !== props.uid;
      })
    );

  const customRequest = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    getBase64(file, (data) => {
      if (data) {
        file.preview = data;
        onSuccess("Ok");
      } else {
        onError();
      }
    });
  };

  const handleBeforeUpload = (file, files) => {
    //fileList hiện tại, files ds file nhận từ thẻ input
    if (fileList.length === 50 || files.length >= 50) {
      toast.error("Vui lòng tải lên tối đa 50 file 1 lần.");
      return LIST_IGNORE;
    }

    return file;
  };
  const props_upload = {
    accept: "image/png, image/jpeg",
    listType: "picture-card",
    fileList: fileList,
    multiple: true,
    beforeUpload: handleBeforeUpload,
    customRequest: customRequest,
    onRemove: handleRemove,
    onChange: handleChange,
    onPreview: handlePreview,
  };

  const props_drag = {
    name: "file",
    multiple: true,
    fileList: fileList,
    showUploadList: false,
    openFileDialogOnClick: false,
    accept: "image/png, image/jpeg",
    beforeUpload: handleBeforeUpload,
    customRequest: customRequest,
    onRemove: handleRemove,
    onPreview: handlePreview,
    onChange: handleChange,
  };

  const props_btn_upload = {
    fileList: fileList,
    multiple: true,
    accept: "image/png, image/jpeg",
    beforeUpload: handleBeforeUpload,
    customRequest: customRequest,
    onChange: handleChange,
  };

  useEffect(() => {
    form.setFieldValue(
      "ListFile",
      fileList.filter(function (item) {
        return item.status == "done";
      })
    );
  }, [fileList]);

  return (
    <>
      <Form.Item name={"ListFile"} hidden>
        <Input hidden />
      </Form.Item>
      <div className="flex items-center justify-between w-full">
        <div className="py-2 w-fit">
          <label className="mr-2">Kiểu hiển thị:</label>
          <Select
            defaultValue={viewOptions}
            style={{
              width: 200,
            }}
            value={viewOptions}
            onChange={(value) => setViewOptions(value)}
            options={[
              {
                value: "LIST",
                label: "Danh Sách",
              },
              {
                value: "TABLE",
                label: "Bảng",
              },
            ]}
          />
        </div>
        {/* <Checkbox>Ghi đè</Checkbox> */}
      </div>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
      {viewOptions == "TABLE" ? (
        <Dragger {...props_drag}>
          <p className="ant-upload-drag-icon">{/* <InboxOutlined /> */}</p>
          <p className="ant-upload-text">Chọn tải lên hoặc kéo file vào khu vực này</p>
          <p className="ant-upload-hint">Chỉ hỗ trợ tải file ảnh có đuôi dạng .jpeg, .jgp, .png</p>
          <Upload {...props_upload}>
            <button
              style={{
                border: 0,
                background: "none",
                margin: "-16px",
              }}
              type="button"
            >
              <FontAwesomeIcon icon={faPlus} />
              <div>Tải lên</div>
            </button>
          </Upload>
        </Dragger>
      ) : (
        <>
          <div className="flex items-center justify-between w-full pl-6">
            <div>{/* <Checkbox>Chọn tất cả</Checkbox> */}</div>
            <div className="flex items-center">
              <Upload {...props_btn_upload} showUploadList={false} multiple={true}>
                <Button
                  type="text"
                  className="text-gray-500"
                  icon={<FontAwesomeIcon icon={faFileUpload}></FontAwesomeIcon>}
                >
                  Tải lên
                </Button>
              </Upload>
              <Button
                type="text"
                onClick={() => {
                  // handleRemoveMore();
                }}
                className="text-gray-500"
                icon={<FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>}
              >
                Xóa
              </Button>
            </div>
          </div>
          <List
            className="list-item-hover py-2"
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                // console.log(page);
              },
              pageSize: 10,
            }}
            dataSource={fileList}
            renderItem={(item, i) => {
              // console.log(item);
              return (
                <List.Item key={i}>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-5">
                      {/* <Checkbox></Checkbox> */}
                      <img className="h-12" src={item.preview || item.url}></img>
                      <span className={item?.status == "error" ? "text-red-500" : ""}>
                        {item.name}
                      </span>
                    </div>
                    <div className="">
                      <Button
                        type="text"
                        onClick={() => {
                          handlePreview(item);
                        }}
                        className="text-gray-500"
                        icon={<FontAwesomeIcon icon={faEye}></FontAwesomeIcon>}
                      ></Button>
                      <Button
                        type="text"
                        onClick={() => {
                          handleRemove(item);
                        }}
                        className="text-gray-500"
                        icon={<FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>}
                      ></Button>
                    </div>
                  </div>
                </List.Item>
              );
            }}
          />
        </>
      )}
    </>
  );
};
