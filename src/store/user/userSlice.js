import { createSlice } from "@reduxjs/toolkit";
import { createUser, FetchUserProfile, LoginUser, LogoutUser, sendTwoStepAuthOTP, verifyTwoStepAuthOTP } from "./userController";


const initialState = {
    user: {},
    status: {
        createUser: '',
        fetchUser: '',
        loginUser: '',
        logoutUser: '',
        verifyAccount: '',
        verifyOTP:'',
        sendOTP:''
    },
    loading: {
        createLoading: false,
        fetchLoading: false,
        loginLoading: false, 
        logoutLoading: false,
        verifyAccountLoading: false,
        verifyOTPLoading : false,
        sendOTPLoading : false
    },
    isAuthenticated: false,
    isTwoStepAuth : false,
    message: '',
    error: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Reset state after creating a user
       resetState: (state , action)=>{
        state.error = null
        state.message = ''
        state.status.createUser = ''
        state.status.fetchUser = ''
        state.status.loginUser = ''
        state.status.logoutUser = ''
        state.status.verifyAccount = ''
        state.status.verifyOTP = ''
        state.status.sendOTP = ''
       }
    },

    extraReducers: (builder) => {



        
    // Handle create user profile
        builder.addCase(createUser.pending, (state) => {
            state.status.createUser = 'pending';
            state.loading.createLoading = true;
            state.message = '';
            state.error = null;
        });

        
        builder.addCase(createUser.fulfilled, (state, action) => {
            const { data , message } = action.payload || {};
            state.status.createUser = 'success';
            state.user = data.user || {};
            state.isAuthenticated = true;
            state.message = message || 'User fetched successfully';
            state.loading.createLoading = false;
        });

        
        builder.addCase(createUser.rejected, (state, action) => {
            const { message, error } = action.payload || {};
            state.isAuthenticated = false;
            state.status.createUser = 'rejected';
            state.message = message || 'Something went wrong! Please try again';
            state.error = error || 'An unknown error occurred';
            state.loading.createLoading = false;
        });


    // Handle fetching user profile
        builder.addCase(FetchUserProfile.pending, (state) => {
            state.status.fetchUser = 'pending';
            state.loading.fetchLoading = true;
            state.message = '';
            state.error = null;
        });

        
        builder.addCase(FetchUserProfile.fulfilled, (state, action) => {
            const { data, message } = action.payload || {};
            state.status.fetchUser = 'success';
            state.user = data.user || {};
            state.isAuthenticated = true;
            state.message = message || 'User fetched successfully';
            state.loading.fetchLoading = false;
        });

        
        builder.addCase(FetchUserProfile.rejected, (state, action) => {
            const { message, error } = action.payload || {};
            state.isAuthenticated = false;
            state.status.fetchUser = 'rejected';
            state.message = message || 'Something went wrong! Please try again';
            state.error = error || 'An unknown error occurred';
            state.loading.fetchLoading = false;
        });


    // Handle user login 
        builder.addCase(LoginUser.pending, (state) => {
            state.status.loginUser = 'pending';
            state.loading.loginLoading = true;
            
            state.message = '';
            state.error = null;
        });

          
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            const { data, message } = action.payload || {};
            state.status.loginUser = 'success';
            state.user = data.user || {};
            state.isAuthenticated = true;
            state.isTwoStepAuth = data.isTwoStepAuth
            state.message = message || 'User fetched successfully';
            state.loading.loginLoading = false;
        });

        
        builder.addCase(LoginUser.rejected, (state, action) => {
            const { message, error } = action.payload || {};
            state.isAuthenticated = false;
            state.status.loginUser = 'rejected';
            state.message = message || 'Something went wrong! Please try again';
            state.error = error || 'An unknown error occurred';
            state.loading.loginLoading = false;
        });



    // Handle user logout 
        builder.addCase(LogoutUser.pending, (state) => {
            state.status.logoutUser = 'pending';
            state.loading.logoutLoading = true;
            state.message = '';
            state.error = null;
        });

        
        builder.addCase(LogoutUser.fulfilled, (state, action) => {
            const { message } = action.payload || {};
            state.status.logoutUser = 'success';
            state.loading.logoutLoading = false;
            state.user =  {};
            state.isAuthenticated = false;
            state.message = message || 'User logout successfully';
        });

        
        builder.addCase(LogoutUser.rejected, (state, action) => {
            const { message, error } = action.payload || {};
            state.isAuthenticated = false;
            state.status.logoutUser = 'rejected';
            state.message = message || 'Something went wrong! Please try again';
            state.error = error || 'An unknown error occurred';
            state.loading.logoutLoading = false;
        });


        // Handle verify OTP
        builder.addCase(verifyTwoStepAuthOTP.pending, (state) => {
            state.status.verifyOTP = 'pending';
            state.loading.verifyOTPLoading = true;
            
            state.message = '';
            state.error = null;
        });

        
        builder.addCase(verifyTwoStepAuthOTP.fulfilled, (state, action) => {
            const { data, message } = action.payload || {};
            state.status.verifyOTP = 'success';
            state.user = data.user || {};
            state.isAuthenticated = true;
            state.message = message || 'User fetched successfully';
            state.loading.verifyOTPLoading = false;
        });

        
        builder.addCase(verifyTwoStepAuthOTP.rejected, (state, action) => {
            const { message } = action.payload || {};
            state.isAuthenticated = false;
            state.status.verifyOTP = 'rejected';
            state.message = message || 'Something went wrong! Please try again';
            state.error = 'An unknown error occurred';
            state.loading.verifyOTPLoading = false;
        });



       
     // Handle send OTP
        builder.addCase(sendTwoStepAuthOTP.pending, (state) => {
            state.status.sendOTP = 'pending';
            state.loading.sendOTPLoading = true;
            state.message = '';
            state.error = null;
        });

        
        builder.addCase(sendTwoStepAuthOTP.fulfilled, (state, action) => {
            const { message } = action.payload || {};
            state.status.sendOTP = 'success';
            state.message = message || 'User fetched successfully';
            state.loading.sendOTPLoading = false;
        });

        
        builder.addCase(sendTwoStepAuthOTP.rejected, (state, action) => {
            const { message } = action.payload || {};
            state.status.sendOTP = 'rejected';
            state.message = message || 'Something went wrong! Please try again';
            state.error = 'An unknown error occurred';
            state.loading.sendOTPLoading = false;
        });


    }
});

export const { resetState } = userSlice.actions;
export default userSlice.reducer;
