import React, {useEffect, useState} from 'react';
import {Tab, Tabs} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";

const Header = ({changeMode, mode= 'light'}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = useState("home");
    const checked = mode === 'dark'

    useEffect(() => {
        if (location.pathname === "/") {
            setValue("home")
        }

        if (location.pathname === "/favorites") {
            setValue("favorites");
        }

    }, [location])

    const handleChange = (event, newValue) => {
        if (newValue === "home") {
            navigate("/");
        }

        if (newValue === "favorites") {
            navigate("/favorites");
        }
    }

    const handleThemeChange = (event) => {
        console.log(event.target.value)
        changeMode(!event.target.checked ? 'light' : 'dark')
    }

    return (
            <div>
                <Tabs
                    value={value}
                    onChange={handleChange}
                >
                    <Tab label="Home" value="home"/>
                    <Tab label="Favorites" value="favorites"/>
                </Tabs>
                <ThemeSwitch onChange={handleThemeChange} checked={checked}/>
            </div>

    );
};

export default Header;
