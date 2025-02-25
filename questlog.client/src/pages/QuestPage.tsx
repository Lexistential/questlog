// src/pages/QuestPage.tsx
import React, { useState } from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import QuestDrawer from "../components/QuestDrawer/QuestDrawer";
import QuestDetails from "../components/QuestDetails/QuestDetails";
import QuestNotes from "../components/QuestNotes/QuestNotes";
import { Campaign, Quest } from "../types";

// Mock data
const mockCampaigns: Campaign[] = [
  { id: 1, title: "The Dragon's Den", role: "DM" },
  { id: 2, title: "Mystic Woods", role: "Player" },
  { id: 3, title: "Cursed Castle", role: "DM" },
  { id: 4, title: "Lost Mines", role: "Player" },
];

const allMockQuests: Quest[] = [
  {
    id: 1,
    campaignId: 1,
    title: "Rescue the Princess",
    description: "Find and rescue the princess from the dragon's lair.",
    steps: [
      {
        id: 101,
        title: "Find the map",
        description: "Locate the ancient map in the really cool place",
        details:
          "The ancient map is said to be hidden in a forgotten crypt, guarded by restless spirits.",
        isCompleted: true,
        isActive: false,
      },
      {
        id: 102,
        title: "Reach the lair entrance",
        description: "Travel to the lair's entrance",
        details:
          "Cross treacherous terrain and avoid patrols to reach the dragon's lair entrance.",
        isCompleted: false,
        isActive: true,
      },
      {
        id: 103,
        title: "Defeat the dragon",
        description: "Confront the mighty dragon",
        details:
          "Utilize strategy and teamwork to defeat the dragon and free the princess.",
        isCompleted: false,
        isActive: false,
      },
    ],
  },
  {
    id: 2,
    campaignId: 1,
    title: "Defend the Kingdom",
    description: "Help defend the kingdom against invading forces.",
    steps: [
      {
        id: 104,
        title: "Gather allies",
        description: "Recruit support from neighboring realms",
        details:
          "Visit nearby towns and rally local militias to join the fight against the invaders.",
        isCompleted: true,
        isActive: false,
      },
      {
        id: 105,
        title: "Build defenses",
        description: "Strengthen kingdom fortifications",
        details:
          "Enhance walls, set up barricades, and prepare defensive strategies for the impending attack.",
        isCompleted: false,
        isActive: true,
      },
    ],
  },
  {
    id: 6,
    campaignId: 1,
    title: "Figure out who the princess is",
    description: "Help defend the kingdom against invading forces.",
    steps: [
      {
        id: 104,
        title: "Gather allies",
        description: "Recruit support from neighboring realms",
        details:
          "Visit nearby towns and rally local militias to join the fight against the invaders.",
        isCompleted: true,
        isActive: false,
      },
      {
        id: 105,
        title: "Build defenses",
        description: "Strengthen kingdom fortifications",
        details:
          "Enhance walls, set up barricades, and prepare defensive strategies for the impending attack.",
        isCompleted: true,
        isActive: true,
      },
    ],
  },
  {
    id: 3,
    campaignId: 2,
    title: "Collect Rare Herbs",
    description: "Gather 3 rare herbs for the local alchemist.",
    steps: [
      {
        id: 201,
        title: "Talk to the alchemist",
        description: "Meet the alchemist for herb details",
        details:
          "The alchemist provides clues on where to find the rare herbs in the enchanted forest.",
        isCompleted: true,
        isActive: false,
      },
      {
        id: 202,
        title: "Find the forest clearing",
        description: "Locate a clearing in the forest",
        details:
          "The clearing is known for its abundance of magical herbs, but it is well-guarded by natural hazards.",
        isCompleted: false,
        isActive: true,
      },
      {
        id: 203,
        title: "Harvest the herbs",
        description: "Collect the rare herbs",
        details:
          "Carefully harvest the herbs without damaging their potent magical properties.",
        isCompleted: false,
        isActive: false,
      },
    ],
  },
  {
    id: 4,
    campaignId: 3,
    title: "Cursed Artifact",
    description: "Locate and secure the cursed artifact.",
    steps: [
      {
        id: 301,
        title: "Research the legend",
        description: "Study the artifact's history",
        details:
          "Dive into ancient tomes and speak with elders to uncover the artifact's dark past.",
        isCompleted: true,
        isActive: false,
      },
      {
        id: 302,
        title: "Locate the artifact",
        description: "Find the artifact's resting place",
        details:
          "Follow the clues discovered during your research to pinpoint the artifact's location.",
        isCompleted: false,
        isActive: true,
      },
    ],
  },
  {
    id: 5,
    campaignId: 4,
    title: "Explore the Lost Mines",
    description: "Chart the caverns of the lost mines.",
    steps: [
      {
        id: 401,
        title: "Gather a team",
        description: "Recruit brave adventurers",
        details:
          "Assemble a team with diverse skills to navigate the treacherous mines and uncover hidden secrets.",
        isCompleted: true,
        isActive: false,
      },
      {
        id: 402,
        title: "Enter the mines",
        description: "Descend into the mines",
        details:
          "Explore the labyrinthine tunnels of the lost mines and document every discovery.",
        isCompleted: false,
        isActive: true,
      },
    ],
  },
];

const QuestPage: React.FC = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const username = (location.state as any)?.username || "Guest";

  const campaign = mockCampaigns.find((c) => c.id === Number(campaignId)) as Campaign;
  const campaignQuests = allMockQuests.filter((q) => q.campaignId === campaign.id);
  const [selectedQuest, setSelectedQuest] = useState<Quest | undefined>(undefined);

  const handleSelectQuest = (quest: Quest) => {
    setSelectedQuest(quest);
  };

  const handleSelectStep = (quest: Quest, stepId: number) => {
    console.log(`Selected step ${stepId} of quest ${quest.id}`);
  };

  const handleDMView = () => {
    navigate(`/campaigns/${campaign.id}/editor`, { state: { username } });
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        {/* Drawer: pass the entire campaign object */}
        <QuestDrawer
          campaign={campaign}
          quests={campaignQuests}
          selectedQuestId={selectedQuest?.id}
          onSelectQuest={handleSelectQuest}
          onSelectStep={handleSelectStep}
          onBack={() => navigate("/campaigns", { state: { username } })}
          />

        {/* Main content area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            marginLeft: "100px", // adjust as needed to align with the drawer
            pt: 1,             // reduced top padding
            px: 2,
            pb: 2,
            display: "flex",
            flexDirection: "column",
            height: "calc(100vh - 64px)",
            boxSizing: "border-box",
          }}
        >
          {/* DM View button absolutely positioned (fixed relative to viewport) */}
          {campaign.role === "DM" && (
            <Button
                variant="contained"
                onClick={() =>
                navigate(`/campaigns/${campaign.id}/editor`, { state: { username } })
                }
                sx={{
                position: "fixed",
                top: "72px",
                left: "310px", // adjust as needed
                zIndex: 1300,
                }}
            >
                DM View
            </Button>
            )}


          {/* If you want to display the quest title in the main content area,
              ensure its container has minimal top padding */}
          {selectedQuest && (
            <Typography variant="h4" sx={{ mt: 1, mb: 1, ml: 1.5, fontWeight: "bold" }}>
              {selectedQuest.title}
            </Typography>
          )}

          {/* Quest content split: top half details, bottom half notes */}
          <Grid container direction="column" sx={{ flex: 1 }}>
            <Grid item sx={{ flex: "1 0 50%", overflowY: "auto" }}>
              <QuestDetails quest={selectedQuest} />
            </Grid>
            <Grid item sx={{ flex: "1 0 50%", overflowY: "auto" }}>
              <QuestNotes quest={selectedQuest} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default QuestPage;