import React, { useEffect, useRef, useState } from "react";
import {
  CardMedia,
  CardContent,
  Skeleton,
} from "@mui/material";
import { ActionIcon, Badge, Card, Group, Stack, Text } from "@mantine/core";
import Avatar from "../avatar/avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

import style from "./postArticle.module.css";
import Thumb from "../thumb/thumb";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import Commits from "../commits/commits";
import PostArticleMore from "../postArticleMore/postArticleMore";

function PostArticle({ article, renderFn, from }) {
  const store = useStore();
  const [showMore, setShowMore] = useState(false);
  const cardRef = useRef(null);
  const touchStart = useRef(null);
  const [images, setImages] = useState(() =>
    article ? new Array(article.img_names.length).fill(0) : []
  );
  const [showCommits, setShowCommits] = useState(false);

  const renderTime = (time) => {
    const d = new Date(Date.parse(time));
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, 0)}-${d.getDate().toString().padStart(2, 0)} ${d.getHours().toString().padStart(2, 0)}:${d.getMinutes().toString().padStart(2, 0)}`;
  };
  const loadingRestImage = (e) => {
    if (
      images.filter((item) => item === 0).length === 0 ||
      e.target.dataset.loading === "loading"
    ) {
      return;
    }
    const restImgs = article.img_names.slice(2);
    if (restImgs.length) {
      restImgs.map((img, index) => {
        const imgObj = new Image();
        imgObj.onload = () => {
          setImages((images) => {
            const cpImages = [...images];
            cpImages[index + 2] = `/api/article/img?t=${img}`;
            return cpImages;
          });
        };
        imgObj.src = `/api/article/img?t=${img}`;
        return undefined;
      });
    }
    e.target.dataset.loading = "loading";
  };

  const getScrollTarget = (element) => {
    let scrollTarget = element.parentElement;

    while (scrollTarget) {
      const { overflowY } = window.getComputedStyle(scrollTarget);

      if (
        ["auto", "scroll"].includes(overflowY) &&
        scrollTarget.scrollHeight > scrollTarget.clientHeight
      ) {
        break;
      }

      scrollTarget = scrollTarget.parentElement;
    }

    return scrollTarget;
  };

  const scrollPageFromPost = (e) => {
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) {
      return;
    }

    const scrollTarget = getScrollTarget(e.currentTarget);

    if (scrollTarget) {
      scrollTarget.scrollTop += e.deltaY;
      e.preventDefault();
    }
  };

  useEffect(() => {
    const card = cardRef.current;

    if (!card) {
      return undefined;
    }

    card.addEventListener("wheel", scrollPageFromPost, { passive: false });

    return () => {
      card.removeEventListener("wheel", scrollPageFromPost);
    };
  });

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e) => {
    if (!touchStart.current) {
      return;
    }

    const touch = e.touches[0];
    const deltaX = touchStart.current.x - touch.clientX;
    const deltaY = touchStart.current.y - touch.clientY;

    if (Math.abs(deltaY) <= Math.abs(deltaX)) {
      return;
    }

    const scrollTarget = getScrollTarget(e.currentTarget);

    if (scrollTarget) {
      scrollTarget.scrollTop += deltaY;
      touchStart.current = { x: touch.clientX, y: touch.clientY };
    }
  };

  useEffect(() => {
    if (article) {
      // 先載入動態前兩張圖片
      const preRenderImages = article.img_names.slice(0, 2);
      preRenderImages.map((img, index) => {
        const imgObj = new Image();
        imgObj.onload = () => {
          setImages((images) => {
            const cpImages = [...images];
            cpImages[index] = `/api/article/img?t=${img}`;
            return cpImages;
          });
        };
        imgObj.src = `/api/article/img?t=${img}`;
        return undefined;
      });
    }
  }, [article]);
  useEffect(() => {
    if (showCommits) {
      setTimeout(() => {
        renderFn && renderFn();
      }, 200);
    } else {
      renderFn && renderFn();
    }
  }, [showCommits, renderFn]);

  return (
    <>
      <Card
        ref={cardRef}
        className={style.card}
        padding="0"
        radius="xl"
        withBorder
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <Group className={style.cardHeader} justify="space-between" wrap="nowrap">
          <Group gap="sm" wrap="nowrap">
            <Avatar from="Index" friendName={article.username}></Avatar>
            <Stack gap={2}>
              <Text className={style.authorName}>{article.username}</Text>
              <Text className={style.timeText}>{renderTime(article.time)}</Text>
            </Stack>
          </Group>
          {from !== "chatroom" && (
            <ActionIcon
              aria-label="more"
              variant="subtle"
              color="gray"
              radius="xl"
              onClick={() => setShowMore(true)}
            >
              <MoreVertIcon fontSize="small" />
            </ActionIcon>
          )}
        </Group>

        <CardMedia
          children={
            <div
              className={`${style.imageGallery} imgsWall`}
              onScroll={(e) => loadingRestImage(e)}
            >
              {images &&
                images.map((img, index) =>
                  img === 0 ? (
                    <Skeleton
                      key={index}
                      animation="wave"
                      sx={{
                        width: "300px",
                        transform: "none",
                        flex: "0 0 300px",
                        height: "700px",
                      }}
                      className={style.articleImg}
                    />
                  ) : (
                    <img
                      className={style.articleImg}
                      key={img}
                      src={img}
                      alt="article"
                      onClick={() => store.zoomImg.watch(img)}
                    ></img>
                  )
                )}
            </div>
          }
        />
        <CardContent sx={{ padding: "0px", "&:last-child": { pb: 0 } }}>
          <div variant="body2" color="text.secondary">
            {(article.is_thumb * 1 === 1 ||
              article.is_reply * 1 === 1 ||
              article.place.name !== "未設定") && (
              <div className={style.interactive}>
                <Thumb
                  articleID={article.id}
                  show={article.is_thumb * 1 === 1}
                  selfArticle={store.user.account.username === article.username}
                  thumbNum={article.thumbTotal}
                  hasBeenThumb={article.thumbSelf}
                ></Thumb>

                {article.is_reply * 1 === 1 && (
                  <>
                    <ActionIcon
                      variant="light"
                      color="violet"
                      radius="xl"
                      onClick={() =>
                        setShowCommits((showCommits) => !showCommits)
                      }
                    >
                      <CommentIcon fontSize="small"></CommentIcon>
                    </ActionIcon>
                    <Badge variant="light" color="violet" radius="xl">
                      {article.replyTotal}
                    </Badge>
                  </>
                )}
                {article.place.name !== "未設定" && (
                  <a
                    target="_BLANK"
                    rel="noreferrer"
                    className={style.address}
                    href={`https://www.google.com/maps/dir//google+map+${article.place.name}`}
                  >
                    <FmdGoodIcon sx={{ fontSize: "13px" }}></FmdGoodIcon>
                    <div className={style.addressDetail}>
                      <div className={style.nowrap}>{article.place.name}</div>
                    </div>
                  </a>
                )}
              </div>
            )}

            <div className={style.message}>{article.message}</div>
            {showCommits && (
              <Commits id={article.id} renderFn={renderFn}></Commits>
            )}
          </div>
        </CardContent>
      </Card>
      <PostArticleMore
        articleId={article.id}
        showMore={showMore}
        setShowMore={setShowMore}
      ></PostArticleMore>
    </>
  );
}
export default observer(PostArticle);
