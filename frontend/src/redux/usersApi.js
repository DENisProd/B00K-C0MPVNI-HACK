import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { useDispatch } from 'react-redux';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://dev.darksecrets.ru/api/'}),
    endpoints: (build) => ({
        registerUser: build.mutation({
            query: (user) => ({
                url: '/auth/signup',
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),
        loginUser: build.mutation({
            query: (user) => ({
                url: '/auth/signin',
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),
        getAuth: build.mutation({
            query: () => ({
                url: '/user/profile/',
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            }),
        }),
        getEvents: build.mutation({
            query: () => ({
                url: '/events/',
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            }),
        })
    })
})

export const { useRegisterUserMutation, useLoginUserMutation, useGetAuthMutation } = usersApi;