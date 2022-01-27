import React from 'react';
import {Avatar, Card, CardContent, CardHeader, styled, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {nanoid} from "@reduxjs/toolkit";

const ForecastRowContainer = styled('div')`
  flex: 2;
  width: 100%;
  display: flex;
  gap: 20px;
  padding: 15px;
`

const MuiCard = styled(Card)`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const MuiCardContent = styled(CardContent)`
  display: flex;
  flex: 1;
  flex-direction: column;
`

const Row = styled('div')`
  flex: 1;
`

const ForecastRow = () => {
    const {forecast} = useSelector(state => state?.weather);
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    const getImageId = (id) => id < 10 ? `0${id}` : id;

    return (
        <ForecastRowContainer>
            {forecast?.DailyForecasts?.map(({EpochDate, Day, Night, Temperature}) => {
                return (
                    <MuiCard key={nanoid()}
                             variant="outlined"
                    >
                        <CardHeader title={days[new Date(EpochDate * 1000).getDay()]}/>
                        <MuiCardContent>
                            <Row>
                                <Typography>
                                    {`${Temperature?.Minimum?.Value}F - ${Temperature?.Maximum?.Value}F`}
                                </Typography>
                            </Row>
                            <Row>
                                <Typography gutterBottom align="left" component="div">
                                    Day <img typeof="foaf:Image"
                                             src={`https://developer.accuweather.com/sites/default/files/${getImageId(Day?.Icon)}-s.png`}
                                             width="35"
                                             height="20"
                                />
                                </Typography>
                            </Row>
                            <Row>
                                <Typography gutterBottom align="left" component="div">
                                    Night
                                    <img typeof="foaf:Image"
                                         src={`https://developer.accuweather.com/sites/default/files/${getImageId(Night?.Icon)}-s.png`}
                                         width="35"
                                         height="20"
                                    />
                                </Typography>
                            </Row>
                        </MuiCardContent>
                    </MuiCard>
                )
            })}
        </ForecastRowContainer>
    );
};

export default ForecastRow;
