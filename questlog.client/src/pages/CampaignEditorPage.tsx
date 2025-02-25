import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Campaign, Quest, QuestStep } from "../types";
import RoleGuard from "../components/RoleGuard/RoleGuard";

interface ConfirmationData {
  type: "quest" | "step";
  questId: number;
  stepId?: number;
}

const CampaignEditorPage: React.FC = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const username = (location.state as any)?.username || "Guest";
  const isNew = (location.state as any)?.newCampaign || false;

  // For new campaigns, start with an empty title.
  const [campaignTitle, setCampaignTitle] = useState(isNew ? "" : "Campaign Title");
  const [quests, setQuests] = useState<Quest[]>([
    {
      id: 1,
      campaignId: isNew ? 0 : Number(campaignId),
      title: "Rescue the Princess",
      description: "Find and rescue the princess from the dragon's lair.",
      steps: [
        {
          id: 101,
          title: "Find the map",
          description: "Locate the ancient map",
          details:
            "The map is hidden in a forgotten crypt, guarded by restless spirits.",
          isCompleted: true,
          isActive: false,
        },
        {
          id: 102,
          title: "Reach the lair entrance",
          description: "Travel to the lair's entrance",
          details:
            "Traverse treacherous terrain and avoid patrols to get there.",
          isCompleted: false,
          isActive: true,
        },
      ],
    },
    {
      id: 2,
      campaignId: isNew ? 0 : Number(campaignId),
      title: "Defend the Kingdom",
      description: "Help defend the kingdom against invading forces.",
      steps: [
        {
          id: 103,
          title: "Gather allies",
          description: "Recruit support",
          details:
            "Visit neighboring realms and rally local militias for support.",
          isCompleted: true,
          isActive: false,
        },
      ],
    },
  ]);

  
  const mockCampaigns: Campaign[] = [
    { id: 1, title: "The Dragon's Den", role: "DM" },
    { id: 2, title: "Mystic Woods", role: "Player" },
    { id: 3, title: "Cursed Castle", role: "DM" },
    { id: 4, title: "Lost Mines", role: "Player" },
  ];
  const existingCampaign = mockCampaigns.find(c => c.id === Number(campaignId)) || { id: 0, title: "", role: "DM" };

  // Confirmation dialog state for deletions
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmationData, setConfirmationData] =
    useState<ConfirmationData | null>(null);

  const openConfirmation = (data: ConfirmationData) => {
    setConfirmationData(data);
    setConfirmOpen(true);
  };

  const closeConfirmation = () => {
    setConfirmOpen(false);
    setConfirmationData(null);
  };

  // QUEST FUNCTIONS

  const handleAddQuest = () => {
    const newQuest: Quest = {
      id: Date.now(),
      campaignId: isNew ? 0 : Number(campaignId),
      title: "New Quest",
      description: "",
      steps: [],
    };
    setQuests([...quests, newQuest]);
  };

  const handleRemoveQuest = (questId: number) => {
    setQuests(quests.filter((q) => q.id !== questId));
    closeConfirmation();
  };

  const handleQuestChange = (
    questId: number,
    field: keyof Omit<Quest, "campaignId" | "id" | "steps">,
    value: string
  ) => {
    setQuests(
      quests.map((q) => (q.id === questId ? { ...q, [field]: value } : q))
    );
  };

  // QUEST STEP FUNCTIONS

  const handleAddStep = (questId: number) => {
    setQuests(
      quests.map((q) => {
        if (q.id === questId) {
          const newStep: QuestStep = {
            id: Date.now(),
            title: "New Step",
            description: "",
            details: "",
            isCompleted: false,
            isActive: false,
          };
          return { ...q, steps: [...q.steps, newStep] };
        }
        return q;
      })
    );
  };

  const handleRemoveStep = (questId: number, stepId: number) => {
    setQuests(
      quests.map((q) =>
        q.id === questId
          ? { ...q, steps: q.steps.filter((s) => s.id !== stepId) }
          : q
      )
    );
    closeConfirmation();
  };

  const handleStepChange = (
    questId: number,
    stepId: number,
    field: keyof Omit<QuestStep, "id">,
    value: string | boolean
  ) => {
    setQuests(
      quests.map((q) => {
        if (q.id === questId) {
          return {
            ...q,
            steps: q.steps.map((s) =>
              s.id === stepId ? { ...s, [field]: value } : s
            ),
          };
        }
        return q;
      })
    );
  };

  const handleToggleStepCompleted = (questId: number, stepId: number) => {
    setQuests(
      quests.map((q) => {
        if (q.id === questId) {
          return {
            ...q,
            steps: q.steps.map((s) =>
              s.id === stepId ? { ...s, isCompleted: !s.isCompleted } : s
            ),
          };
        }
        return q;
      })
    );
  };

  // NAVIGATION FUNCTIONS

  const handleSave = () => {
    if (isNew) {
      // Simulate creating a new campaign.
      const newCampaign: Campaign = {
        id: Date.now(), // generate a new ID
        title: "",
        role: "DM",
      };
      // In a real app, you would POST this new campaign to your backend.
      navigate(`/campaigns/${newCampaign.id}/player`, { state: { username } });
    } else {
      // Simulate saving updates for an existing campaign.
      const updatedCampaign: Campaign = {
        id: Number(campaignId),
        title: "",
        role: "DM",
      };
      navigate(`/campaigns/${updatedCampaign.id}/player`, { state: { username } });
    }
  };

  const handlePlayerView = () => {
    navigate(`/campaigns/${isNew ? "new" : campaignId}/player`, { state: { username } });
  };

  const pageContent = (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        {isNew ? "Create New Campaign" : "Edit Campaign"}
      </Typography>
      <TextField
        fullWidth
        label="Campaign Title"
        value={campaignTitle}
        onChange={(e) => setCampaignTitle(e.target.value)}
        margin="normal"
        variant="outlined"
        sx={{ fontSize: "1.3rem", mb: 3 }}
      />

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Quests
      </Typography>
      <Grid container spacing={3}>
        {quests.map((quest) => (
          <Grid item xs={12} key={quest.id}>
            <Card variant="outlined" sx={{ boxShadow: 3 }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    gap: 2,
                  }}
                >
                  <TextField
                    fullWidth
                    label="Quest Title"
                    value={quest.title}
                    onChange={(e) =>
                      handleQuestChange(quest.id, "title", e.target.value)
                    }
                    variant="outlined"
                    sx={{ fontSize: "1.2rem" }}
                  />
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() =>
                      openConfirmation({ type: "quest", questId: quest.id })
                    }
                  >
                    Delete Quest
                  </Button>
                </Box>
                <TextField
                  fullWidth
                  label="Quest Description"
                  value={quest.description}
                  onChange={(e) =>
                    handleQuestChange(quest.id, "description", e.target.value)
                  }
                  variant="outlined"
                  multiline
                  rows={3}
                  sx={{ mb: 2, fontSize: "1.1rem" }}
                />

                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Steps
                </Typography>
                {quest.steps.map((step) => (
                  <Box
                    key={step.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <Checkbox
                      checked={step.isCompleted}
                      onChange={() =>
                        handleToggleStepCompleted(quest.id, step.id)
                      }
                      inputProps={{
                        "aria-label": "Mark step as completed",
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Step Title"
                      value={step.title}
                      onChange={(e) =>
                        handleStepChange(quest.id, step.id, "title", e.target.value)
                      }
                      variant="outlined"
                      sx={{ fontSize: "1rem" }}
                    />
                    <TextField
                      fullWidth
                      label="Step Description"
                      value={step.description}
                      onChange={(e) =>
                        handleStepChange(
                          quest.id,
                          step.id,
                          "description",
                          e.target.value
                        )
                      }
                      variant="outlined"
                      sx={{ fontSize: "1rem" }}
                    />
                    <TextField
                      fullWidth
                      label="Step Details"
                      value={step.details}
                      onChange={(e) =>
                        handleStepChange(
                          quest.id,
                          step.id,
                          "details",
                          e.target.value
                        )
                      }
                      variant="outlined"
                      multiline
                      rows={2}
                      sx={{ fontSize: "1rem" }}
                    />
                    <IconButton
                      color="error"
                      onClick={() =>
                        openConfirmation({
                          type: "step",
                          questId: quest.id,
                          stepId: step.id,
                        })
                      }
                      aria-label="Delete quest step"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => handleAddStep(quest.id)}
                  sx={{ mt: 2 }}
                >
                  Add Step
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddQuest}
          sx={{ mr: 2 }}
        >
          Add Quest
        </Button>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button variant="outlined" onClick={handlePlayerView}>
            Player View
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save Changes
          </Button>
        </Box>
      </Box>

      {/* Confirmation Dialog for Deletions */}
      <Dialog open={confirmOpen} onClose={closeConfirmation}>
        <DialogTitle>
          {confirmationData?.type === "quest"
            ? "Delete Quest"
            : "Delete Quest Step"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this{" "}
            {confirmationData?.type === "quest" ? "quest" : "quest step"}? This
            action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmation} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (confirmationData) {
                if (confirmationData.type === "quest") {
                  handleRemoveQuest(confirmationData.questId);
                } else if (
                  confirmationData.type === "step" &&
                  confirmationData.stepId
                ) {
                  handleRemoveStep(
                    confirmationData.questId,
                    confirmationData.stepId
                  );
                }
              }
            }}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );

  if (isNew) {
    // Allow access without role check when creating a new campaign.
    return pageContent;
  } else {
    // Only allow if the user is a DM.
    return (
      <RoleGuard campaign={existingCampaign} allowedRoles={["DM"]} username={username}>
        {pageContent}
      </RoleGuard>
    );
  }
};

export default CampaignEditorPage;
