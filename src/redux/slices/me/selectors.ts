import { RootState } from "../../store";

export const selectIsAuth = (state: RootState) => state.me.isAuth;
export const selectToken = (state: RootState) => state.me.token;
export const selectMeData = (state: RootState) => state.me.data;
