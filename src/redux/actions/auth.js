import { createAsyncThunk } from "@reduxjs/toolkit"
import http from "../../helper/http"

export const asyncLoginAction = createAsyncThunk(
    "auth/login",
    async (payload, {rejectWithValue})=>{
        try {
            const form = {
                email: payload.email,
                password: payload.password
            }
            const formJson = JSON.stringify(form)
            console.log(formJson)
            const {data} = await http().post("/auth/login", formJson)
            return data.results
        } catch (error) {
            const results = error?.response?.data?.results
            const message = error?.response?.data?.message
            if(results){
                return rejectWithValue(results)
            }
            if(error.code === "ERR_NETWORK"){
                return rejectWithValue("Error: Conennecting to backend failed")
            }
            return rejectWithValue(message)
        }
    }
)

export const asyncRegisterAction = createAsyncThunk(
    "auth/register",
    async (payload, {rejectWithValue})=>{
        try {
            const form = {
                fullName: payload.fullName,
                email: payload.email,
                password: payload.password
            }
            const formJson = JSON.stringify(form)
            const {data} = await http().post("/auth/register", formJson)
            return data.results
        } catch (error) {
            const results = error?.response?.data?.results
            const message = error?.response?.data?.message
            if(results){
                return rejectWithValue(results)
            }
            if(error.code === "ERR_NETWORK"){
                return rejectWithValue("Error: Conennecting to backend failed")
            }
            return rejectWithValue(message)
        }
    }
)