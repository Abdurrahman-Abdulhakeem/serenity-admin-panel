// import { BaseQueryFn, fetchBaseQuery } from '@reduxjs/toolkit/query';
// import { FetchBaseQueryError, FetchArgs } from '@reduxjs/toolkit/query/react';
// import { RootState, store } from '@/store';
// import { setCredentials } from '@/store/slices/authSlice';
// import Cookies from 'js-cookie';

// const baseQuery = fetchBaseQuery({
//   baseUrl: '/api',
//   prepareHeaders: (headers, { getState }) => {
//     const token = (getState() as RootState).auth.accessToken;
//     if (token) {
//       headers.set('Authorization', `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// export const baseQueryWithReauth: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   // Check for token expired (typically 401 unauthorized)
//   if (result.error && result.error.status === 401) {
//     const refreshToken = Cookies.get('refreshToken');
//     // Try to refresh token
//     const refreshResult = await baseQuery(
//       {
//         url: '/auth/refresh',
//         method: 'POST',
//         body: { refresh: refreshToken },
//       },
//       api,
//       extraOptions
//     );

//     if (refreshResult.data) {
//       const newAccessToken = refreshResult.data as string;

//       // Update store with new token
//       const currentAuth = store.getState().auth;
//       api.dispatch(
//         setCredentials({ ...currentAuth, accessToken: newAccessToken })
//       );

//       // Retry original request with new token
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       // Handle refresh failure
//       return { error: { message: 'Refresh failed', status: 401 } };
//     }
//   }

//   // Return result ensuring it matches the expected type
//   return result;
// };
