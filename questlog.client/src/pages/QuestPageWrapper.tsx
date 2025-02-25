// src/pages/QuestPageWrapper.tsx
import React from "react";
import { useParams, Navigate, useLocation } from "react-router-dom";
import QuestPage from "./QuestPage";
import RoleGuard from "../components/RoleGuard/RoleGuard";
import { Campaign } from "../types";

// Mock campaigns data; in a real app, replace with API or context.
const mockCampaigns: Campaign[] = [
  { id: 1, title: "The Dragon's Den", role: "DM" },
  { id: 2, title: "Mystic Woods", role: "Player" },
  { id: 3, title: "Cursed Castle", role: "DM" },
  { id: 4, title: "Lost Mines", role: "Player" },
];

const QuestPageWrapper: React.FC = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const campaign = mockCampaigns.find((c) => c.id === Number(campaignId));
  const location = useLocation();
  const username = (location.state as any)?.username || "";

  if (!campaign) {
    return <Navigate to="/campaigns" replace />;
  }

  return (
    <RoleGuard campaign={campaign} allowedRoles={["DM", "Player"]} username={username}>
      <QuestPage />
    </RoleGuard>
  );
};

export default QuestPageWrapper;
