 
import { createApi } from '@reduxjs/toolkit/query/react'
import { API_KEY, BASE_URL } from '../constants/secret'
import query from '../utils/query'
import { EventApiResponse } from '../../features/home/type'


export const api = createApi({
  reducerPath: 'api',
  baseQuery: query.baseQuery({baseUrl:BASE_URL}),
  endpoints: (builder) => ({
    getEvents : builder.query<EventApiResponse,  {city?:string}>({
      query: (params) => {
        const { city } = params;
        let url = `/events.json?size=10&page=${1}&apikey=${API_KEY}`;
        if (city) {
          url += `&city=${city}`;
        }
        return url
      },
    }),
    getEventsByPage : builder.query<EventApiResponse, {city?:string, page: number}>({
      query: (params) => {
        const {city , page} = params;
        let url = `/events.json?size=10&page=${page}&apikey=${API_KEY}`;
        if (city) {
          url += `&city=${city}`;
        }
        return url
      },
      async onQueryStarted(queryArg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData('getEvents', {city: queryArg.city}, (draft) => {
              if (data?._embedded?.events && draft?._embedded?.events && queryArg.page > 1) {
                draft._embedded.events.push(...data._embedded.events);
              }
            }),
          );
        } catch (err) {
          console.error('Pagination error:', err);
        }
      },
    })
  }),
})

export const {
  useGetEventsQuery,
  useLazyGetEventsByPageQuery,
} = api