import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
    currentCity: {
        "Version": 1,
        "Key": "215793",
        "Type": "City",
        "Rank": 95,
        "LocalizedName": "Tel-aviv Port",
        "Country": {
            "ID": "IL",
            "LocalizedName": "Israel"
        },
        "AdministrativeArea": {
            "ID": "TA",
            "LocalizedName": "Tel Aviv"
        }
    },
    forecast: {},
    currentCityWeather: {},
    favorites: [],
    favoritesWeather: [],
    }

export const getForecast = createAsyncThunk(
    'weather/getForecast',
    async (dispatch, getState) => {
        const response = await fetch('__mocks__/forecast.json')

        return response.json();
    }
)

const getCityWeatherHandler = async (key) => {
    const response = await fetch(`__mocks__/city_${key}.json`)

    return response.json();
}

export const getCityWeather = createAsyncThunk(
    'weather/getCity',
    getCityWeatherHandler
)

export const getCitiesWeather = createAsyncThunk(
    'weather/getCities',
    async (cities= []) => {
        let response = await Promise.all(cities.map((city) => getCityWeatherHandler(city.Key)))

        return response.map((city) => city[0])
    }
)

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setCurrentCity: (state, action) => {
            state.currentCity = action.payload
        },
        addToFavorites: (state, action) => {
            state.favorites.push(action.payload);

            if (state.favorites.length > 5) {
                state.favorites.shift();
            }
        },
        removeFromFavorites: (state, action) => {
            const index = state.favorites.findIndex( city => city.Key === action.payload)

            state.favorites.splice(index, 1);
        }
    },
    extraReducers:
        (builder) => {
            builder
                .addCase(getForecast.fulfilled, (state, action) => {
                    state.loading = false
                    state.forecast = action.payload;
                })
                .addCase(getCityWeather.fulfilled, (state, action) => {
                    state.loading = false
                    state.currentCityWeather = action.payload[0];
                })
                .addCase(getCitiesWeather.fulfilled, (state, action) => {
                    state.loading = false
                    state.favorites = state.favorites.map((city, idx) => ({
                        ...city,
                            weather: action.payload[idx]
                    }))
                })
                .addMatcher(
                    // matcher can be defined inline as a type predicate function
                    (action) => action.type.endsWith('/rejected'),
                    (state, action) => {
                        state.loading = false
                    }
                )
                // matcher can just return boolean and the matcher can receive a generic argument
                .addMatcher(
                    (action) => action.type.endsWith('/pending'),
                    (state, action) => {
                        state.loading = true
                    }
                )
        }
})

// Action creators are generated for each case reducer function
export const {setCurrentCity, addToFavorites, removeFromFavorites} = weatherSlice.actions;

export default weatherSlice.reducer;
