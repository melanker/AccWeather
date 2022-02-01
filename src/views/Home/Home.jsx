import React, {useEffect} from 'react';
import Autocomplete from "./components/Autocomplete/Autocomplete";
import {useDispatch, useSelector} from "react-redux";
import {getCityWeather, getForecast} from "../../features/weatherSlice";
import {MuiPaper, TitleRow, Container} from './Home.style'
import HeaderRow from "./components/HeaderRow/HeaderRow";
import ForecastRow from "./components/ForecastRow/ForecastRow";

const Home = () => {
    const dispatch = useDispatch();
    const {forecast, currentCity} = useSelector(state => state?.weather);

    useEffect(() => {
        dispatch(getCityWeather(currentCity.Key));
        dispatch(getForecast());
    }, [currentCity])


    return (
        <Container>
            <Autocomplete/>
            <MuiPaper variant="outlined">
                <HeaderRow/>
                <TitleRow>
                    {forecast?.Headline?.Text}
                </TitleRow>
                <ForecastRow forecast={forecast}/>
            </MuiPaper>
        </Container>
    );
};

export default Home;
