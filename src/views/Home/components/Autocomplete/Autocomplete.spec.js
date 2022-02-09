import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import Autocomplete from "./Autocomplete";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import * as reactRedux from "react-redux";

const mockedStore = {reducer: jest.fn()};
const store = configureStore(mockedStore);


jest.mock('@mui/material/Autocomplete', () => (...props) => {
    return (
        <>
            <input
                onInput={props[0].onInputChange}
                onChange={props[0].onChange}
                data-testid='mock-autocomplete'
            />
            <div>{(props[0].options || []).map((option, index) =>
                <div key={index}
                     data-testid="option-id">{option}
                </div>)}
            </div>
        </>
    )
});

const MockedAutocomplete = ({store}) => {
    return (
        <Provider store={store}>
            <Autocomplete/>
        </Provider>
    );
};

describe("Autocomplete", () => {
    let useDispatchSpy = null;
    let mockDispatchFn = null;

    beforeEach(() => {
        useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');
        mockDispatchFn = jest.fn();
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(["ALOO", "HEYA"])
        })
        useDispatchSpy.mockReturnValue(mockDispatchFn);
    });

    afterEach(() => {
        jest.restoreAllMocks();
        useDispatchSpy.mockClear();
    });

    it("Should renders options when onInputChange is triggered", async () => {
        render(<MockedAutocomplete store={store}/>)

        const inputElement = screen.getByTestId("mock-autocomplete");
        fireEvent.input(inputElement, {target: {value: "Heya"}})
        const optionElements = await waitFor(() => screen.findAllByTestId(/option-id/i))
        expect(optionElements.length).toBe(2)
        useDispatchSpy.mockClear();
    });

    it("Should renders options when onChange is triggered", async () => {
        render(<MockedAutocomplete store={store}/>)

        const inputElement = screen.getByTestId("mock-autocomplete");
        fireEvent.change(inputElement, {target: {value: "Heya"}})
        fireEvent.change(inputElement, {target: {value: "Heya1"}})
        expect(mockDispatchFn).toHaveBeenCalledTimes(2);
        useDispatchSpy.mockClear();
    });
})

