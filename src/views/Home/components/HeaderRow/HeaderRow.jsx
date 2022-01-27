import React from 'react';
import {Button, IconButton, Paper, styled} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {addToFavorites, removeFromFavorites} from "../../../../features/weatherSlice";

const HeaderRowContainer = styled('div')`
  position: relative;
  display: flex;
  flex: 1;
  width: 100%;
  padding: 5px;
`

const MuiPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  width: 200px;
  align-items: center;
`

const MuiIconButton = styled(IconButton)`
  position: absolute;
  right: 20px;
`

const MuiButton = styled(Button)`
  position: absolute;
  right: 20px;
`

const HeaderRow = () => {
    const {currentCity, currentCityWeather, favorites} = useSelector(state => state?.weather);
    const dispatch = useDispatch();

    const getImageId = (id) => id < 10 ? `0${id}` : id;
    const isFavorite = favorites.some((city) => city.Key === currentCity.Key)

    const handleAdd = () => {
        dispatch(addToFavorites(currentCity))
    }

    const handleRemove = () => {
        dispatch(removeFromFavorites(currentCity.Key))
    }

    return (
        <HeaderRowContainer>
            <MuiPaper variant="outlined">
                <img typeof="foaf:Image"
                     src={`https://developer.accuweather.com/sites/default/files/${getImageId(currentCityWeather?.WeatherIcon)}-s.png`}
                     width="75"
                     height="45"
                />
                <span>{currentCity?.LocalizedName}</span>
                <span>{`${currentCityWeather?.Temperature?.Metric?.Value}\u00B0`}</span>
            </MuiPaper>
            {!isFavorite ?
                <MuiButton
                    onClick={handleAdd}
                    variant="text"
                    color="error"
                    endIcon={<FavoriteIcon fontSize="small" />}
                    aria-label="delete"
                    size="small">
                    Add to Favorites
                </MuiButton> :
                <MuiButton variant="text"
                           size="small"
                           onClick={handleRemove}>
                    Remove from Favorites
                </MuiButton>

            }
        </HeaderRowContainer>
    );
};

export default HeaderRow;
