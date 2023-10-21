import React, { useState } from "react";
import stl from "./CreatePost.module.css";
import AddIcon from "@mui/icons-material/Add";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import CancelIcon from "@mui/icons-material/Cancel";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { createPostAction } from "../../redux/actions/post_action";
import { useDispatch, useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 5,
  border: "1px solid gray",
};

const CreatePost = () => {
  const { user } = useSelector((state) => state.auth);

  const [desc, setDesc] = useState("");
  const [media, setMedia] = useState(null);

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fileInputHandle = (e) => {
    const selectedMedia = e.target.files[0];

    if (selectedMedia) {
      let mediaType = selectedMedia.type.startsWith("image")
        ? "photo"
        : "video";

      // Use FileReader to read the selected file
      const reader = new FileReader();
      console.log(reader);
      reader.onload = () => {
        setMedia({
          file: selectedMedia,
          type: mediaType,
          // for rendering the image or video
          dataUrl: reader.result,
        });
      };

      reader.readAsDataURL(selectedMedia);
    }
  };

  const createPostHandle = () => {
    const fd = new FormData();

    fd.append("desc", desc);
    if (media) {
      fd.append("media", media.dataUrl);
      fd.append("mediaType", media.type);
    }

    dispatch(createPostAction(user.accessToken, fd));
  };

  return (
    <div className={stl.container}>
      <div className={stl.elem} onClick={handleOpen}>
        <AddIcon className={stl.icon} />
        <div className={stl.text}>
          <h3>Create Post</h3>
          <p>Share a photo/video or write something.</p>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={stl.modal_header}>
            <h3>Create Post</h3>
            <CancelIcon
              style={{ cursor: "pointer", color: "var(--crimson_color)" }}
              onClick={handleClose}
            />
          </div>

          <div className={stl.upload_container}>
            <div className={stl.upload_input}>
              <input
                type="text"
                placeholder="Write something here..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className={stl.upload_file}>
              {!media ? (
                <>
                  <label htmlFor="uploadFile" className={stl.upload_file_label}>
                    <AddToPhotosIcon className={stl.uploadIcon} />
                    <p>Add photos/videos</p>
                  </label>
                  <input
                    id="uploadFile"
                    style={{ display: "none" }}
                    type="file"
                    accept="image/*, video/*"
                    onChange={fileInputHandle}
                  />
                </>
              ) : (
                <>
                  {media.type === "photo" ? (
                    <img src={media.dataUrl} alt="" />
                  ) : (
                    <video controls>
                      <source src={media.dataUrl} type={media.file.type} />
                    </video>
                  )}
                  <CancelIcon
                    style={{ cursor: "pointer", color: "gray" }}
                    onClick={() => setMedia(null)}
                  />
                </>
              )}
            </div>
            <div className={stl.selected_img_container}></div>
            <div className={stl.upload_btn}>
              <button onClick={createPostHandle}>Post</button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CreatePost;
