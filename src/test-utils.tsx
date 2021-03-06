import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import {
  cleanup,
  render,
  RenderOptions,
  waitFor,
} from "@testing-library/react";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { memberProfileSlice } from "./scripts/Redux/AsyncSlices/AsyncSliceMembers/SetMemberProfileSlice";
import { moviesFilterSlice } from "./scripts/Redux/AsyncSlices/ExpandFilterSlice";
import { allPlansSlice } from "./scripts/Redux/AsyncSlices/GetAllPlans";
import { countriesSlice } from "./scripts/Redux/AsyncSlices/GetCountriesSlice";
import { genresSlice } from "./scripts/Redux/AsyncSlices/GetGenresSlice";
import moviesSlice from "./scripts/Redux/AsyncSlices/GetMoviesSlice";
import { movieVideosSlice } from "./scripts/Redux/AsyncSlices/GetMovieVideos";
import { oneMovieSlice } from "./scripts/Redux/AsyncSlices/GetOneMovieSlice";
import { searchSlice } from "./scripts/Redux/AsyncSlices/GetSearchMovies";
import { similarSlice } from "./scripts/Redux/AsyncSlices/GetSimilarSlice";
import { checkoutSlice } from "./scripts/Redux/AsyncSlices/PostCheckoutSlice";
import { setStorageSlice } from "./scripts/Redux/AsyncSlices/SetStorageDataSlice";
import { setFirestoreSlice } from "./scripts/Redux/AsyncSlices/SetFirestoreData";
import { memberMiddleware } from "./scripts/Redux/Middleware/MemberMiddleware";
import { planMiddleware } from "./scripts/Redux/Middleware/PlanMiddleware";
import { memeberActivityMiddleware } from "./scripts/Redux/Middleware/MemberActivityMiddleware";
import {
  SubscribedStatus,
  MemberStatus,
  User,
} from "./scripts/Redux/UserReducers";
import {
  loginModalSlice,
  pageSlice,
  planSlice,
  profileCategorySlice,
  profilleActivitiesSlice,
} from "./scripts/Redux/StateReducers";

afterEach(cleanup);

const RootReducer = combineReducers({
  user: User.reducer,
  subscribedStatus: SubscribedStatus.reducer,
  membersStatus: MemberStatus.reducer,
  login: loginModalSlice.reducer,
  updateProfile: memberProfileSlice.reducer,
  movies: moviesSlice.reducer,
  page: pageSlice.reducer,
  fiterToggle: moviesFilterSlice.reducer,
  movie: oneMovieSlice.reducer,
  videos: movieVideosSlice.reducer,
  similar: similarSlice.reducer,
  search: searchSlice.reducer,
  plan: planSlice.reducer,
  countries: countriesSlice.reducer,
  checkout: checkoutSlice.reducer,
  genres: genresSlice.reducer,
  allPlans: allPlansSlice.reducer,
  profileCategory: profileCategorySlice.reducer,
  profileActivities: profilleActivitiesSlice.reducer,
  setFirestore: setFirestoreSlice.reducer,
  setStorage: setStorageSlice.reducer,
});
export const store = configureStore({
  reducer: RootReducer,
});

afterEach(cleanup);

export type RootState = ReturnType<typeof RootReducer>;

const RenderWrapper: React.FC = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
const customRender = (
  ui: ReactElement<any>,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: RenderWrapper, ...options });

export * from "@testing-library/react";
export { customRender as renderRedux };
