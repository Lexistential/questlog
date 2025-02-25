import React from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { Campaign } from "../types";
import EditIcon from "@mui/icons-material/Edit";

const mockCampaigns: Campaign[] = [
  { id: 1, title: "The Dragon's Den", role: "DM" },
  { id: 2, title: "Mystic Woods", role: "Player" },
  { id: 3, title: "Cursed Castle", role: "DM" },
  { id: 4, title: "Lost Mines", role: "Player" },
];

const CampaignPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Do not default to "Guest"; if no username, consider the user not logged in.
  const username = (location.state as any)?.username;
  
  if (!username) {
    return <Navigate to="/" replace />;
  }

  const dmCampaigns = mockCampaigns.filter((c) => c.role === "DM");
  const playerCampaigns = mockCampaigns.filter((c) => c.role === "Player");

  const handlePlayerView = (campaign: Campaign) => {
    navigate(`/campaigns/${campaign.id}/player`, { state: { username } });
  };

  const handleEdit = (campaign: Campaign, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/campaigns/${campaign.id}/editor`, { state: { username } });
  };

  const handleCreateNew = () => {
    navigate(`/campaigns/new/editor`, { state: { username, newCampaign: true } });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">Welcome, {username}!</Typography>
        <Button variant="contained" onClick={handleCreateNew}>
          Create New Campaign
        </Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">DM Campaigns</Typography>
        <List>
          {dmCampaigns.map((campaign) => (
            <ListItem
              key={campaign.id}
              button
              onClick={() => handlePlayerView(campaign)}
              secondaryAction={
                <IconButton edge="end" onClick={(e) => handleEdit(campaign, e)}>
                  <EditIcon />
                </IconButton>
              }
            >
              <ListItemText primary={campaign.title} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box>
        <Typography variant="h6">Player Campaigns</Typography>
        <List>
          {playerCampaigns.map((campaign) => (
            <ListItem
              key={campaign.id}
              button
              onClick={() => handlePlayerView(campaign)}
            >
              <ListItemText primary={campaign.title} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default CampaignPage;
