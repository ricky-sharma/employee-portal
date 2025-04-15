import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    authToken: '',
    username: '',
    userFullName: '',
    loggedOut: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthToken: (state, action) => {
            state.authToken = action.payload;
            state.loggedOut = false;
        },
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setUserFullName: (state, action) => {
            state.userFullName = action.payload;
        },
        logoutUser: (state) => {
            state.authToken = '';
            state.username = '';
            state.userFullName = '';
            state.loggedOut = true;
        }
    }
});

// Maps Redux state to the component's props
export const mapStateToProps = (state) => ({
    authToken: state.authToken,
    username: state.username,
    userFullName: state.userFullName,
    loggedOut: state.loggedOut
});

export const mapDispatchToProps = (dispatch) => {
    return {
        setAuthToken: (token) => dispatch(setAuthToken(token)),
        setUsername: (username) => dispatch(setUsername(username)),
        setUserFullName: (name) => dispatch(setUserFullName(name)),
        logoutUser: () => dispatch(logoutUser())
    };
};

export const { setAuthToken, setUsername, setUserFullName, logoutUser } = userSlice.actions;
export default userSlice.reducer;