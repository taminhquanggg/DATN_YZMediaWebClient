import React, { useState } from "react";
import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import { Button, Image, Space, Tooltip } from "antd";
import { formatDate } from "../../../utils/convertData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const ImagePreview = ({ image, onClick }) => {
  const [visible, setVisible] = useState(false);
  const [visibleDetect, setVisibleDetect] = useState(false);
  const [imageSelect, setImageSelect] = useState("");



  const handleClick = (e) => {
    onClick && onClick(e, image);
  };

  const onDownload = () => {
    if (imageSelect) {
      fetch(imageSelect.ImagePath)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.download = imageSelect.ImageName;
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      });
    }
  };

  const onDownloadDetect = () => {
    if (imageSelect) {
      fetch(imageSelect.ImageDetectPath)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.download = imageSelect.ImageName;
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      });
    }
    
  };
  
  return (

    <div
      className={
        "px-2 bg-[#f0f4f9] rounded-2xl hover:bg-[#e2e5e9] overflow-hidden " +
        (image?.isSelected === true ? "card-selected" : "")
      }
      onClick={handleClick}
    >

      <div className="py-1 w-full flex flex-nowrap items-center justify-between">
        <Tooltip title={image?.ImageName}>
          <h3 className="whitespace-nowrap text-ellipsis overflow-hidden font-medium">
            {image?.ImageName}
          </h3>
        </Tooltip>
        <div>
          <Button
            type="text"
            shape="circle"
            className="p-0"
            disabled={image?.StatusTrain !== 1}
            onClick={() => setVisibleDetect(true)}>
            <FontAwesomeIcon className="text-xs" icon={faImage} />
          </Button>

          <div style={{
            display: 'none',
          }}>
            <Image
              src={image?.ImageDetectPath}
              preview={{
                visible: visibleDetect,
                src: image?.ImageDetectPath,
                onVisibleChange: (value) => {
                  setVisibleDetect(value);
                  if (value) {
                    setImageSelect(image)
                  }
                },
                toolbarRender: (
                  _,
                  {
                    transform: { scale },
                    actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn },
                  }
                ) => (
                  <Space size={12} className="toolbar-wrapper">
                    <DownloadOutlined onClick={onDownloadDetect} />
                    <SwapOutlined rotate={90} onClick={onFlipY} />
                    <SwapOutlined onClick={onFlipX} />
                    <RotateLeftOutlined onClick={onRotateLeft} />
                    <RotateRightOutlined onClick={onRotateRight} />
                    <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                    <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                  </Space>
                ),
              }}
            />
          </div>


        </div>
      </div>

      <div className="h-[170px] w-full">
        <Image
          className="w-full h-full custom-full-width"
          src={image?.ImagePath}
          preview={{
            visible,
            onVisibleChange: (value) => {
              setVisible(value);
              if (value) {
                setImageSelect(image)
              }
            },
            toolbarRender: (
              _,
              {
                transform: { scale },
                actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn },
              }
            ) => (
              <Space size={12} className="toolbar-wrapper">
                <DownloadOutlined onClick={onDownload} />
                <SwapOutlined rotate={90} onClick={onFlipY} />
                <SwapOutlined onClick={onFlipX} />
                <RotateLeftOutlined onClick={onRotateLeft} />
                <RotateRightOutlined onClick={onRotateRight} />
                <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
              </Space>
            ),
          }}
        />
      </div>

      <div className="py-2 flex flex-nowrap items-center justify-between">
        <h3 className="font-light font-sm">
          {formatDate(image?.InTime, "dd/MM/yyyy hh:mm")}
        </h3>

        <div className="">
          <div className="">
            {image?.Similarity ? (
              <span className="px-1 rounded-lg bg-amber-100 border-amber-600 border">
                Sự tương đồng: {image?.Similarity} %
              </span>
            )
              : (<></>)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ImagePreview;
