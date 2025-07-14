"use client";
import { SessionProvider, SessionProviderProps } from "next-auth/react";

import React from "react";

const SessionWrapper = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: SessionProviderProps["session"] | null | undefined;
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default SessionWrapper;
