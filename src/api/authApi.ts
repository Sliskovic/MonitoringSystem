import { setCredentials } from "@/store/auth/authState";
import { baseApi } from "./baseApi";

type LoginBody = { username: string; password: string };
type LoginResponse = {
  token: string;
  refreshToken: string;
  user: { id: string; username: string; role: string; email: string };
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    login: b.mutation<LoginResponse, LoginBody>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(
          setCredentials({
            token: data.token,
            refreshToken: data.refreshToken,
            user: data.user,
          })
        );
      },
    }),
  }),
});
export const { useLoginMutation } = authApi;
