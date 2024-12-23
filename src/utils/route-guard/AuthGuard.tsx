"use client";

import { useRouter } from "next/navigation";

import Loader from "@/components/ui-components/Loader";
import { useEffect } from "react";

// types
import { GuardProps } from "@/types";

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */

const AuthGuard = ({ children }: GuardProps) => {
  const router = useRouter();

  const isLoggedIn = true;

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return <Loader />;

  return children;
};

export default AuthGuard;
