import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employersApi = createApi({
    reducerPath: 'employersApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
    tagTypes: ['Employees'],
    endpoints: (builder) => ({
        getEmployees: builder.query({
            query: () => '/employees',
            providesTags: (result, error, arg) => 
                result
                    ? [...result.map(({id}) => ({type: 'Employees', id})), {type: 'Employees', id: 'LIST'}]
                    : [{type: 'Employees', id: 'LIST'}]
        }),
        createEmployees: builder.mutation({
            query: (employees) => ({
                url: '/employees',
                method: 'POST',
                body: employees
            }),
            invalidatesTags: [{type: 'Employees', id: 'LIST'}]
        }),
        deleteEmployees: builder.mutation({
            query: id => ({
                url: `/employees/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'Employees', id: 'LIST'}]
        }),
        toggleProp: builder.mutation({
            query: ({id, ...prop}) => ({
                url: `/employees/${id}`,
                method: 'PATCH',
                body: prop
            }),
            invalidatesTags: (result, error, arg) => [{type: 'Employees', id: arg.id}]
        }),
        getEmployee: builder.query({
            query: id => `/employees/${id}`,
            providesTags: (result, error, id) => [{type: 'Employees', id}]    
        })


    })
});

export const { useGetEmployeesQuery, useCreateEmployeesMutation, useDeleteEmployeesMutation, useTogglePropMutation,  useGetEmployeeQuery} = employersApi;