// src/components/QuestDetails/QuestDetails.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { Quest } from "../../types";

interface QuestDetailsProps {
  quest?: Quest;
}

const QuestDetails: React.FC<QuestDetailsProps> = ({ quest }) => {
  if (!quest) {
    return <Typography variant="body1">Select a quest to see details</Typography>;
  }

  // Style for completed steps
  const completedStyle = {
    textDecoration: "line-through",
    color: "text.disabled",
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Quest Title and Description */}
      <Typography variant="h6" gutterBottom>
        {quest.description}
      </Typography>

      {/* Ordered List of Quest Steps */}
      <Typography variant="h6" sx={{ mb: 1, mt: 3 }}>
        Quest Steps:
      </Typography>
      <ol style={{ paddingLeft: "1.5rem" }}>
        {quest.steps.map((step) => (
          <li key={step.id}>
            <Typography
              variant="body1"
              sx={step.isCompleted ? completedStyle : {}}
            >
              {step.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ ml: 2, ...(step.isCompleted ? completedStyle : {}) }}
            >
              {step.details}
            </Typography>
          </li>
        ))}
      </ol>
    </Box>
  );
};

export default QuestDetails;
