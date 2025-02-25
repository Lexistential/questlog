// src/components/RoleGuard.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { Campaign } from "../../types";

interface RoleGuardProps {
  campaign: Campaign;
  allowedRoles: ("DM" | "Player")[];
  username?: string;
  children: React.ReactNode;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ campaign, allowedRoles, username, children }) => {
  if (!username) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(campaign.role)) {
    return <Navigate to="/campaigns" replace />;
  }

  return <>{children}</>;
};

export default RoleGuard;
