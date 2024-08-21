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

import api from "../../../common/api";
export default function Place({ emitSelectPlaceFn }) {
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
  return (
    <Box sx={{ mt: 1, p: 1, fontSize: 16, borderBottom: "1px solid #ccc" }}>
      <TextField
        multiline
        label="標記地點"
        variant="standard"
        color="primary"
        placeholder="請輸入關鍵字"
        fullWidth
        onChange={handlePlaceChange}
        value={selectPlace.name ? selectPlace.name : selectPlace}
      />
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
                  <ListItemIcon>
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
