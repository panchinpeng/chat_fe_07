import { useState, useRef, useEffect } from "react";
import style from "./place.module.css";
import {
  TextField,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";

import api from "../../../common/api";
export default function Place({ emitSelectPlaceFn, draftPlace }) {
  const searchPlaceDeboundRef = useRef();
  const [places, setPlaces] = useState([]);
  const [selectPlace, setSelectPlace] = useState("");

  const handlePlaceChange = (e) => {
    setSelectPlace(e.target.value.trim());
    if (e.target.value.trim() === "") {
      setPlaces([]);
      return;
    }
    setPlaces("loading");
    clearTimeout(searchPlaceDeboundRef.current);
    searchPlaceDeboundRef.current = setTimeout(async () => {
      if (e.target.value) {
        const places = await api.searchPlace(e.target.value);
        if (places.status && places.data) {
          setPlaces(places.data);
        }
      }
    }, 2000);
  };

  useEffect(() => {
    emitSelectPlaceFn(selectPlace);
  }, [selectPlace]);
  useEffect(() => {
    setSelectPlace(
      draftPlace && draftPlace.name !== "未設定" ? draftPlace : ""
    );
  }, [draftPlace]);
  return (
    <Box>
      {typeof selectPlace === "string" ? (
        <TextField
          size="small"
          variant="standard"
          color="primary"
          fullWidth
          onChange={handlePlaceChange}
          value={selectPlace.name ? selectPlace.name : selectPlace}
          InputProps={{
            disableUnderline: true,
          }}
          autoFocus
          placeholder="地點關鍵字，選擇清單中推薦項目..."
        />
      ) : (
        <>
          <div className={style.showSelectPlace}>
            <FmdGoodIcon></FmdGoodIcon>
            <div className={style.placeDesc}>
              <div className={style.placeTitle}>{selectPlace.name}</div>
              <div className={style.placeDesc}>{selectPlace.display_name}</div>
            </div>
            <div className={style.close} onClick={() => setSelectPlace("")}>
              <CancelSharpIcon sx={{ color: "#fff" }}></CancelSharpIcon>
            </div>
          </div>
        </>
      )}

      {places.length > 0 && (
        <List dense={true}>
          {places === "loading" && (
            <Box sx={{ textAlign: "center" }}>
              <CircularProgress color="secondary"></CircularProgress>
            </Box>
          )}
          {places.length > 0 &&
            places.map &&
            places.map((place) => (
              <ListItem
                disablePadding
                key={place.osm_id}
                onClick={() => {
                  setSelectPlace(place);
                  setPlaces([]);
                }}
              >
                <ListItemButton sx={{ borderBottom: "1px solid #dedada" }}>
                  <ListItemIcon sx={{ minWidth: "36px" }}>
                    <FmdGoodIcon></FmdGoodIcon>
                  </ListItemIcon>
                  <ListItemText>
                    <div>{place.name}</div>
                    <div className={style.placeDesc}>{place.display_name}</div>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      )}
    </Box>
  );
}
