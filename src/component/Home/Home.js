import React, { useState } from "react";

import { Link, navigate } from "@reach/router";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { sessionService } from "redux-react-session";

import { setYearAction } from "../../actions/page/page.action";

import { Upload, message, Button, Icon } from "antd";

import axios from "axios";

const deleteSession = () => sessionService.deleteSession();

const Home = props => {
  const { session } = props;
  const [uploadImg, setUploadImage] = useState(null);
  const component = !session.authenticated ? (
    <Link to="/login">Please Login</Link>
  ) : (
    <React.Fragment>
      <h1>Home page</h1>
      <button onClick={() => deleteSession()}>Logout</button>
      <Upload
        name="file"
        action="http://localhost:3000/upload"
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
      {uploadImg ? (
        <img
          src={`http://localhost:3000/${uploadImg}`}
          alt="avatar"
          style={{ width: 100, height: 100, objectFit: "cover" }}
        />
      ) : null}
    </React.Fragment>
  );

  return component;
};

const mapStateToProps = store => {
  return {
    page: store.pageReducer,
    session: store.sessionReducer
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setYearAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
