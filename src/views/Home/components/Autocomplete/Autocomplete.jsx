import React, {memo, useState} from 'react';
import {Autocomplete as MuiAutocomplete, styled, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {setCurrentCity} from "../../../../features/weatherSlice";

const StyledAutocomplete = styled(MuiAutocomplete)`
  width: 200px;
  margin-bottom: 10px;
`

const Autocomplete = () => {
    console.log("RENDER Autocomplete")
    const [options, setOptions] = useState([]);
    const dispatch = useDispatch();

    const handleOnInputChange = async (event) => {
        const response = await fetch('__mocks__/query_list.json');
        const data = await response.json();
        setOptions(data);
    }

    const handleOnChange = (event, value) => {
        dispatch(setCurrentCity(value))
    }

    return (
        <StyledAutocomplete
            renderInput={(params) => (
                <TextField
                    {...params}
                    size="small"
                    label="Search a location"/>
            )}
            options={options}
            autoComplete
            onInputChange={handleOnInputChange}
            onChange={handleOnChange}
            getOptionLabel={(option) => option.LocalizedName}
        />
    );
};

export default memo(Autocomplete);
