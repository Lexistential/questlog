// src/components/QuestNotes/QuestNotes.tsx
import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { Quest } from "../../types";

// This object simulates stored notes for different quests
const initialNotes: { [questId: number]: string } = {
  1: "Initial notes for quest 1: Rescue the Princess.",
  2: "Initial notes for quest 2: Defend the Kingdom.",
  3: "Initial notes for quest 3: Collect Rare Herbs.",
  4: "Initial notes for quest 4: Cursed Artifact.",
  5: "Initial notes for quest 5: Explore the Lost Mines.",
};

interface QuestNotesProps {
  quest?: Quest;
}

const QuestNotes: React.FC<QuestNotesProps> = ({ quest }) => {
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    if (quest) {
      // Simulate loading a note for the given quest
      setNoteText(initialNotes[quest.id] || "");
    } else {
      setNoteText("");
    }
  }, [quest]);

  const handleSave = () => {
    if (quest) {
      // Simulate saving the note
      initialNotes[quest.id] = noteText;
      alert("Note saved!");
    }
  };

  if (!quest) {
    return <Typography>Select a quest to view/edit notes.</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Quest Notes</Typography>
      <TextField
        label="(Only you can see or edit this)"
        multiline
        rows={6}
        variant="outlined"
        fullWidth
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        sx={{ mt: 2 }}
      />
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleSave}>
        Save
      </Button>
    </Box>
  );
};

export default QuestNotes;