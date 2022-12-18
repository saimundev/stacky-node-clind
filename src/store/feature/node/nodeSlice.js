import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addNodeData, deleteNodeData, editNodeData, getNodeData } from "../../api";


export const addNode = createAsyncThunk("node/addnode", async ({ data,navegate,toast },{rejectWithValue}) => {
    try {
        const response = await addNodeData(data);
        toast.success("Node added successfull");
        navegate("/");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const getNode = createAsyncThunk("node/getNode", async (id, { rejectWithValue }) => {
    try {
        const response = await getNodeData(id);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});


export const deleteNode = createAsyncThunk("node/deleteNode", async ({ _id, toast }, { rejectWithValue }) => {
    try {
        const response = await deleteNodeData(_id);
        toast.success("Delete Successfull");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});


export const editNode = createAsyncThunk("node/editnode", async ({data,id,toast,navegate},{rejectWithValue}) => {
    try {
        const response = await editNodeData(id, data);
        navegate("/");
        toast.success("Node successfull");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


const nodeSlice = createSlice({
    name: "node",
    initialState: {
        nodes: [],
        nodeContainer:[],
        loding: false,
        error: ""
    },
    reducers: {
        getUser: (state, action) => {
            state.user = action.payload;
        },
        searchNodes: (state, action) => {
            state.nodes = state.nodeContainer.filter(node => node.title.toUpperCase().includes(action.payload.toUpperCase()))
            
           
        }
    },
    extraReducers: {
        [addNode.pending]: (state, action) => {
            state.loding = true;
        },
        [addNode.fulfilled]: (state, action) => {
            state.loding = false;
            state.nodes = action.payload;
        },
        [addNode.rejected]: (state, action) => {
            state.loding = false;
            state.error = action.payload.message;
        },


        [getNode.pending]: (state, action) => {
            state.loding = true;
        },
        [getNode.fulfilled]: (state, action) => {
            state.loding = false;
            state.nodes = action.payload;
            state.nodeContainer = action.payload
        },
        [getNode.rejected]: (state, action) => {
            state.loding = false;
            state.error = action.payload.message;
        },



        [deleteNode.pending]: (state, action) => {
            state.loding = true;
            console.log("first")
        },
        [deleteNode.fulfilled]: (state, action) => {
            state.loding = false;
            const { arg:{_id} } = action.meta
            if (_id) {
                state.nodes = state.nodes.filter(node => node._id !== _id);
            }
        },
        [deleteNode.rejected]: (state, action) => {
            state.loding = false;
            state.error = action.payload.message;
        },



        [editNode.pending]: (state, action) => {
            state.loding = true;
        },
        [editNode.fulfilled]: (state, action) => {
            state.loding = false;
            const { arg:{_id} } = action.meta
            if (_id) {
                state.nodes = state.nodes.map(node => node._id === _id ? action.payload:node);
            }
        },
        [editNode.rejected]: (state, action) => {
            state.loding = false;
            state.error = action.payload.message;
        },

        


        

    }
});

export const { searchNodes } = nodeSlice.actions;
export default nodeSlice.reducer;