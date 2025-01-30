import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const createUser = createAsyncThunk(
    '/user/createUser',
     async ({ email, password, userName, fullName }, { rejectWithValue }) => {

    try {
        const { data } = await axios.post("/api/auth/signup", { email, password, userName, fullName },
            {
                headers: {
                    "Content-Type": 'application/json'
                },
                withCredentials: true
            }
        );
        console.info(data)
        return data

    } catch (error) {
        console.error(error)
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue('An unexpected error occurred');
    }
})


export const FetchUserProfile = createAsyncThunk('/user/FetchUserProfile', async (_, { rejectWithValue }) => {

    try {
        const { data } = await axios.get("/api/auth/profile",
            {
                headers: {
                    "Content-Type": 'application/json'
                },
                withCredentials: true
            }
        );
        console.info(data)
        return data

    } catch (error) {
        console.error(error)
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue('An unexpected error occurred');
    }
})



export const LoginUser = createAsyncThunk('/user/LoginUser', async ({ authId, password }, { rejectWithValue }) => {

    try {

        const { data } = await axios.post("/api/auth/signin", { authId, password },
            {
                headers: {
                    "Content-Type": 'application/json'
                },
                withCredentials: true
            }
        );
        console.info("into login function", data)
        return data

    } catch (error) {
        // console.error(error)
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue('An unexpected error occurred');
    }
})



export const LogoutUser = createAsyncThunk('/user/LogoutUser', async (_, { rejectWithValue }) => {

    try {

        const { data } = await axios.get("/api/auth/logout",
            {
                headers: {
                    "Content-Type": 'application/json'
                },
                withCredentials: true
            }
        );
        console.info("into logout ", data)
        return data

    } catch (error) {
        // console.error(error)
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue('An unexpected error occurred');
    }
})




export const verifyTwoStepAuthOTP = createAsyncThunk('/user/verifyTwoStepAuthOTP', async ({ authId, otp }, { rejectWithValue }) => {

    try {

        const { data } = await axios.get("/api/auth/verify-otp", { authId, otp },
            {
                headers: {
                    "Content-Type": 'application/json'
                },
                withCredentials: true
            }
        );
        console.info("into logout ", data)
        return data

    } catch (error) {
        // console.error(error)
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue('An unexpected error occurred');
    }
})



export const sendTwoStepAuthOTP = createAsyncThunk('/user/sendTwoStepAuthOTP', async ({ authId }, { rejectWithValue }) => {

    try {

        const { data } = await axios.get("/api/auth/send-otp", { authId },
            {
                headers: {
                    "Content-Type": 'application/json'
                },
                withCredentials: true
            }
        );
        console.info("into logout ", data)
        return data

    } catch (error) {
        // console.error(error)
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue('An unexpected error occurred');
    }
})