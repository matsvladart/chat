import React from "react";

import { Upload, Button, Icon, message } from "antd";
import axios from "axios";
const UploadImage = ({ setUploadImage }) => {
  return (
    <Upload
      name="file"
      action="https://chatmatsypura.herokuapp.com/upload"
      headers={{
        "content-type": "multipart/form-data"
      }}
      customRequest={({
        action,
        data,
        file,
        filename,
        headers,
        onError,
        onProgress,
        onSuccess,
        withCredentials
      }) => {
        const formData = new FormData();
        formData.append("file", file);
        axios
          .post(action, formData, {
            withCredentials,
            headers,
            onUploadProgress: ({ total, loaded }) => {
              onProgress(
                {
                  percent: parseInt(
                    Math.round((loaded / total) * 100).toFixed(2)
                  )
                },
                file
              );
            }
          })
          .then(response => {
            onSuccess(response, file);
            setUploadImage(file.name);
          })
          .catch(error => {});
      }}
      showUploadList={false}
      onChange={info => {
        if (info.file.status !== "uploading") {
          console.log(info.file);
        }
        if (info.file.status === "done") {
          message.success(`${info.file.name} file uploaded successfully`);
          // setUploadImage(URL.createObjectURL(info.file));
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      }}
    >
      <Button>
        <Icon type="upload" /> Click to Upload
      </Button>
    </Upload>
  );
};

export default UploadImage;
