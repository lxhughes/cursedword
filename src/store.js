import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const initialState = {
    "errors": "",
    "guessHistory": []
};