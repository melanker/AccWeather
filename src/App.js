import './App.css';
import Home from "./views/Home/Home";
import Favorites from "./views/Favorites/Favorites";
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import {createTheme, ThemeProvider, styled} from "@mui/material";
import {useMemo, useState} from "react";

const AppContainer = styled('div')`
  background-color: ${(props) => props.theme.palette.background.paper};
  text-align: center;
  display: flex;
  flex-direction: column;
  flex: 1;
`

function App() {
    const [mode, setMode] = useState('light');

    const changeMode = (mode) => {
        setMode(mode)
    }

    // Update the theme only if the mode changes
    const theme = useMemo(() => createTheme({
        palette: {
            mode
        }
    }), [mode]);

    return (
        <ThemeProvider theme={theme}>
            <AppContainer>
                <Header changeMode={changeMode} mode={mode}/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="favorites" element={<Favorites/>}/>
                </Routes>
            </AppContainer>
        </ThemeProvider>
    );
}

export default App;
