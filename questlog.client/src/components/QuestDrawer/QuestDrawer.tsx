// src/components/QuestDrawer/QuestDrawer.tsx
import React, { useState } from "react";
import {Drawer, List, ListItem, ListItemText, Collapse, ListItemIcon, Divider, ListItemButton, Box, Button, Typography} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Campaign, Quest } from "../../types";

const drawerWidth = 300;

interface QuestDrawerProps {
  campaign: Campaign;
  quests: Quest[];
  selectedQuestId?: number;
  onSelectQuest: (quest: Quest) => void;
  onSelectStep?: (quest: Quest, stepId: number) => void;
  onBack?: () => void;
}

const QuestDrawer: React.FC<QuestDrawerProps> = ({
  campaign,
  quests,
  selectedQuestId,
  onSelectQuest,
  onSelectStep,
  onBack,
}) => {
  const [expandedQuestId, setExpandedQuestId] = useState<number | null>(null);

  const handleExpandToggle = (questId: number) => {
    setExpandedQuestId((prev) => (prev === questId ? null : questId));
  };

  // Split quests into active and completed
  const activeQuests = quests.filter(
    (q) => q.steps.length === 0 || !q.steps.every((s) => s.isCompleted)
  );
  const completedQuests = quests.filter(
    (q) => q.steps.length > 0 && q.steps.every((s) => s.isCompleted)
  );

  const renderActiveQuestItem = (quest: Quest) => (
    <React.Fragment key={quest.id}>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            onSelectQuest(quest);
            handleExpandToggle(quest.id);
          }}
          selected={quest.id === selectedQuestId}
        >
          <ListItemText primary={quest.title} />
          {expandedQuestId === quest.id ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={expandedQuestId === quest.id} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {quest.steps.map((step) => (
            <ListItem key={step.id} disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => onSelectStep?.(quest, step.id)}
              >
                <ListItemIcon>
                  {step.isCompleted ? (
                    <CheckCircleIcon color="success" />
                  ) : step.isActive ? (
                    <RadioButtonUncheckedIcon color="primary" />
                  ) : (
                    <RadioButtonUncheckedIcon />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={step.title}
                  secondary={step.description}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );

  const renderCompletedQuestItem = (quest: Quest) => (
    <ListItem key={quest.id} disablePadding>
      <ListItemButton onClick={() => onSelectQuest(quest)}>
        <ListItemText
          primary={
            <Typography sx={{ textDecoration: "line-through", color: "text.disabled" }}>
              {quest.title}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          marginTop: "64px", // offset below AppBar
        },
      }}
    >
      {/* Campaign Title at the top */}
      <Typography variant="h6" sx={{ p: 2 }}>
        {campaign.title}
      </Typography>

      {/* Back to Campaigns button below title */}
      {onBack && (
        <Box sx={{ px: 2, mb: 1 }}>
          <Button fullWidth variant="outlined" onClick={onBack}>
            Back to Campaigns
          </Button>
        </Box>
      )}

      <Divider />

      {/* Active Quests Section */}
      <Typography variant="subtitle1" sx={{ p: 2 }}>
        Active Quests
      </Typography>
      <List>
        {activeQuests.map(renderActiveQuestItem)}
      </List>

      {/* Completed Quests Section */}
      {completedQuests.length > 0 && (
        <>
          <Divider />
          <Typography variant="subtitle1" sx={{ p: 2 }}>
            Completed Quests
          </Typography>
          <List>
            {completedQuests.map(renderCompletedQuestItem)}
          </List>
        </>
      )}
    </Drawer>
  );
};

export default QuestDrawer;
