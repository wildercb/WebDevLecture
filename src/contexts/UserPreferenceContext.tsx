"use client";
import createCtx from "@/utils/createCtx";
import { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import useSWR from "swr";

// Data type used for context
export interface IUserPreference {
  notifications: {
    sms: boolean;
    email: boolean;
    push: boolean;
  };
}

// this sets the typing expected by the provider component and useContext function.
interface UserPreferenceCtxType {
  data: IUserPreference | undefined;
  isLoading: boolean;
  update: (s: IUserPreference) => void;
}

// create the context and provider with the custom createCtx utility.
const [useContext, Provider] =
  createCtx<UserPreferenceCtxType>("userPreference");

export const UserPreferenceProvider = function UserPreferenceProvider({
  children,
}: PropsWithChildren) {
  const [userPreference, setUserPreference] = useState<IUserPreference>();
  // fetch data from server
  const { error, data, isLoading } = useSWR<IUserPreference>(
    "/me/preferences",
    async () => {
      // preform a fetch request and return the awaited value.
      return { notifications: { sms: false, email: true, push: true } };
    }
  );

  // once data has been fetched, update the global state.
  useEffect(() => {
    if (!isLoading && data) setUserPreference(data);
  }, [isLoading, data]);

  // return provider with context return type.
  return (
    <Provider
      value={{ data: userPreference, isLoading, update: setUserPreference }}
    >
      {children}
    </Provider>
  );
};

// setup file exports.
const UserPreferenceContext = {
  useUserPreference: useContext,
  UserPreferenceProvider: Provider,
};

export default UserPreferenceContext;
export const useUserPreference = useContext;
