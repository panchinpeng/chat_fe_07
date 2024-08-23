import { useState, useRef } from "react";
import { Paper, CircularProgress, Button } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import DeleteIcon from "@mui/icons-material/Delete";
import style from "./picture.module.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Base64 } from "js-base64";

export default function Picture({ emitPictureFn }) {
  const [picture, setPicture] = useState([]);
  const [longTouchPicture, setLongTouchPicture] = useState(null);
  const longTouchTimer = useState();
  const files = useRef([]);

  const removePicture = (index) => {
    setPicture((pics) => {
      const cpPics = [...pics];
      cpPics.splice(index, 1);
      files.current.splice(index, 1);
      emitPictureFn([...files.current]);
      return cpPics;
    });
  };

  const handlerImage = (e) => {
    if (e.target.files.length > 0) {
      const filesAry = [...e.target.files]
        .filter((item) => /^image\//.test(item.type))
        .slice(0, 10);
      files.current = filesAry;
      emitPictureFn([...files.current]);

      filesAry.map((item, index) => {
        setPicture((p) => {
          const copyPic = [...p];
          copyPic[index] = "loading";
          return copyPic;
        });
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          setPicture((p) => {
            const copyPic = [...p];
            copyPic[index] = {
              src: e.target.result,
              id: Base64.encode(item.name),
            };
            return copyPic;
          });
        };
        fileReader.readAsDataURL(item);
      });
    }
  };

  const handleAppendImage = (e) => {
    if (e.target.files.length > 0) {
      const alreadyFilesLength = picture.length;
      let filesAry = [...e.target.files]
        .filter((item) => /^image\//.test(item.type))
        .filter(
          (item) =>
            !files.current.find((alreadyFile) => alreadyFile.name === item.name)
        );
      const totalSize = alreadyFilesLength + filesAry.length;

      if (totalSize > 10) {
        filesAry = filesAry.slice(0, 10 - alreadyFilesLength);
      }
      files.current = [...files.current, ...filesAry];
      emitPictureFn([...files.current]);
      files.current.map((item, index) => {
        setPicture((p) => {
          const copyPic = [...p];
          copyPic[index] = "loading";
          return copyPic;
        });
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          setPicture((p) => {
            const copyPic = [...p];
            copyPic[index] = {
              src: e.target.result,
              id: Base64.encode(item.name),
            };
            return copyPic;
          });
        };
        fileReader.readAsDataURL(item);
      });
    }
  };

  const handleLongTouchStart = (index) => {
    if (picture.length > 1) {
      longTouchTimer.current = setTimeout(() => {
        setLongTouchPicture(index);
      }, 1000);
    }
  };
  const handleLongTouchEnd = () => {
    clearTimeout(longTouchTimer.current);
  };

  const changeSortEnd = (result) => {
    if (!result.destination) {
      return;
    }
    try {
      setPicture((pics) => {
        const cpPics = [...pics];
        cpPics[result.source.index] = pics[result.destination.index];
        cpPics[result.destination.index] = pics[result.source.index];
        return cpPics;
      });

      const cpFiles = [...files.current];
      files.current[result.source.index] = cpFiles[result.destination.index];
      files.current[result.destination.index] = cpFiles[result.source.index];
    } catch (e) {
      alert("err");
    }
  };

  const getListStyle = (isDraggingOver) => ({});

  const getItemStyle = (isDragging, isDraggingOver, draggableStyle) => {
    if (!isDraggingOver) {
      return {
        ...draggableStyle,
      };
    }
    return {
      filter: isDragging ? "" : "opacity(0.5)",
      ...draggableStyle,
    };
  };

  return picture.length === 0 ? (
    <>
      <Paper
        elevation={2}
        sx={{
          width: 1,
          maxWidth: "300px",
          mx: "auto",
          height: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <label htmlFor="postImg">
          <AddAPhotoIcon sx={{ fontSize: 60 }} />
        </label>
        <input
          type="file"
          id="postImg"
          className={style.file}
          accept="image/*"
          multiple
          onChange={handlerImage}
        ></input>
      </Paper>

      <div className={style.warn}>最多挑選10張照片</div>
    </>
  ) : (
    <>
      {longTouchPicture === null ? (
        <>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow]}
            className={style.mySwipper}
          >
            {picture.map((item, index) => (
              <SwiperSlide
                key={index}
                className={style.imgWrap}
                onTouchStart={() => handleLongTouchStart(index)}
                onTouchEnd={handleLongTouchEnd}
              >
                {item === "loading" ? (
                  <div className={style.img}>
                    <CircularProgress color="secondary"></CircularProgress>
                  </div>
                ) : (
                  <div className={style.img}>
                    <img src={item.src}></img>
                    <div className={style.remove}>
                      <DeleteIcon
                        sx={{ fontSize: 30 }}
                        color="error"
                        className={style.removeIcon}
                        onClick={() => removePicture(index)}
                      ></DeleteIcon>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={style.pickInfo}>
            <label className={style.info} htmlFor="AppendImg">
              已選 {picture.length} / 10 {picture.length < 10 && "，添加相片"}
            </label>
            {picture.length < 10 && (
              <input
                type="file"
                id="AppendImg"
                className={style.file}
                accept="image/*"
                multiple
                onChange={handleAppendImage}
              ></input>
            )}
          </div>
          <div className={style.warn}>
            最多可上傳10張相片{picture.length > 1 && "，長按相片可編輯順序"}
          </div>
        </>
      ) : (
        <>
          <DragDropContext onDragEnd={changeSortEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided, snapshot) => {
                return (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                    className={style.sortWrap}
                  >
                    {picture.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot2) => (
                          <img
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot2.isDragging,
                              snapshot.isDraggingOver,
                              provided.draggableProps.style
                            )}
                            src={item.src}
                            className={style.sortPicture}
                          ></img>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
            <div className={style.warnSort}>
              拖曳圖片調整順序
              <Button
                variant="contained"
                color="success"
                onClick={() => setLongTouchPicture(null)}
              >
                確認
              </Button>
            </div>
          </DragDropContext>
        </>
      )}
    </>
  );
}
