import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { forgetEmailSendData, forgetPasswordData, getProfile, loginUserData, regusterUserData, updateData } from "../../api";

export const regusterUser = createAsyncThunk("auth/reguster", async ({ data, navigate, toast }, { rejectWithValue }) => {
    try {
        const response = await regusterUserData(data);
        toast.success("Reguster successfull");
        navigate("/login");
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const loginUser = createAsyncThunk("auth/login", async ({data,navigate,toast},{rejectWithValue}) => {
    try {
        const response = await loginUserData(data);
        toast.success("Login Successfull");
        navigate("/");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const forgetEmailSend = createAsyncThunk("auth/forgetemail", async ({ data, toast},{rejectWithValue}) => {
    try {
        const response = await forgetEmailSendData(data);
        toast.success("Email send Successfull");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})


export const forgetPassword = createAsyncThunk("auth/forgetPassword", async ({ data, id, token, navigate, toast }, { rejectWithValue }) => {
    try {
        const response = await forgetPasswordData(data, id, token);
        toast.success("Password update successfull");
        navigate("/login");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateUser = createAsyncThunk("auth/updateuser", async ({ id,formData,toast,navigate }, { rejectWithValue }) => {
    try {
        const response = await updateData(id, formData);
        toast.success("Update Successfull");
        navigate("/profile");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});



export const profileData = createAsyncThunk("auth/getprofile", async (id,{ rejectWithValue }) => {
    try {
        const response = await getProfile(id);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});




const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loding: false,
        error: "",
        updateUserData: {},
        isEmailSuccess: false,
    },
    reducers: {
        getUser: (state, action) => {
            state.user = action.payload;
        },
        logOut: (state, action) => {
            state.user = null;
            localStorage.removeItem("profile");
        }
    },
    extraReducers: {
        //REGUSTER
        [regusterUser.pending]: (state, action) => {
            state.loding = true;
        },
        [regusterUser.fulfilled]: (state, action) => {
            state.loding = false;
            localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
            state.user = action.payload;
        },
        [regusterUser.rejected]: (state, action) => {
            state.loding = false;
            state.error = action.payload.message;
        },

        //LOGIN
        [loginUser.pending]: (state, action) => {
            state.loding = true;
        },
        [loginUser.fulfilled]: (state, action) => {
            state.loding = false;
            localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
            state.user = action.payload;
        },
        [loginUser.rejected]: (state, action) => {
            state.loding = false;
            state.error = action.payload.message;
        },

        //forgetPasswordEmailSend
        [forgetEmailSend.pending]: (state, action) => {
            state.loding = true;
            state.isEmailSuccess = false;
        },
        [forgetEmailSend.fulfilled]: (state, action) => {
            state.loding = false;
            state.user = action.payload;
            state.isEmailSuccess = true;
        },
        [forgetEmailSend.rejected]: (state, action) => {
            state.loding = false;
            state.error = action.payload.message;
            state.isEmailSuccess = false;
        },


         //forgetpassword
         [forgetPassword.pending]: (state, action) => {
            state.loding = true;
        },
        [forgetPassword.fulfilled]: (state, action) => {
            state.loding = false;
            state.user = action.payload;
        },
        [forgetPassword.rejected]: (state, action) => {
            state.loding = false;
            state.error = action.payload.message;
        },


        //update user
        [updateUser.pending]: (state, action) => {
            state.loding = true;
        },
        [updateUser.fulfilled]: (state, action) => {
            state.loding = false;
            const { arg:{_id} } = action.meta
            if (_id) {
                state.updateUserData = state.updateUserData.map(user => user._id === _id ? action.payload:user);
            }
            state.updateUserData = action.payload;
        },
        [updateUser.rejected]: (state, action) => {
            state.loding = false;
            state.error = action.payload.message;
        },



          //get user
        [profileData.pending]: (state, action) => {
            state.loding = true;
        },
        [profileData.fulfilled]: (state, action) => {
            state.loding = false;
            state.updateUserData = action.payload;
        },
        [profileData.rejected]: (state, action) => {
            state.loding = false;
            state.error = action.payload.message;
        }
    }
});

export const { getUser,logOut } = authSlice.actions;
export default authSlice.reducer;


