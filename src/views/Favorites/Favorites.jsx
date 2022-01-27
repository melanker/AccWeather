import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCitiesWeather, setCurrentCity} from "../../features/weatherSlice";
import {Card, CardHeader, styled} from "@mui/material";
import {nanoid} from "@reduxjs/toolkit";
import {useNavigate} from "react-router-dom";

const MuiCard = styled(Card)`
  height: 200px;
  width: 200px;
`

const FavoritesContainer = styled('div')`
  display: flex;
  gap: 30px;
  justify-content: flex-start;
  padding: 20px;
`

const Favorites = () => {
    const {favorites} = useSelector(state => state?.weather);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCitiesWeather(favorites))
    }, [])

    const handleHeaderClick = (city) => {
        dispatch(setCurrentCity(city));
        navigate("/");
    }

    return (
        <FavoritesContainer>
            {favorites?.map(city => (
                <MuiCard
                    variant="outlined"
                    key={nanoid()}>
                    <CardHeader title={city?.LocalizedName}
                                onClick={() => handleHeaderClick(city)}
                    />
                </MuiCard>
            ))}
        </FavoritesContainer>
    );
};

export default Favorites;
