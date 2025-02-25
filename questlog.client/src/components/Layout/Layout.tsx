import React, { useState, MouseEvent } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
  Badge,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Invitation, Campaign } from "../../types";

// Mock campaign data to look up campaign names.
const mockCampaigns: Campaign[] = [
  { id: 1, title: "The Dragon's Den", role: "DM" },
  { id: 2, title: "Mystic Woods", role: "Player" },
  { id: 3, title: "Cursed Castle", role: "DM" },
  { id: 4, title: "Lost Mines", role: "Player" },
];

// Mock invitations (using campaignId)
const mockInvitations: Invitation[] = [
  { id: 1, campaignId: 2, from: "DungeonMaster1", to: "currentUser", status: "pending" },
  { id: 2, campaignId: 3, from: "DungeonMaster2", to: "currentUser", status: "pending" },
];

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = (location.state as any)?.username || "Guest";

  // User menu state
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleUserClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUser = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    handleCloseUser();
    navigate("/", { replace: true });
  };

  // Inbox popover state
  const [anchorElInbox, setAnchorElInbox] = useState<null | HTMLElement>(null);
  const handleInboxClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElInbox(event.currentTarget);
  };
  const handleCloseInbox = () => {
    setAnchorElInbox(null);
  };
  const inboxOpen = Boolean(anchorElInbox);
  const inboxId = inboxOpen ? "inbox-popover" : undefined;

  // Filter pending invitations
  const pendingInvitations = mockInvitations.filter(inv => inv.status === "pending");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Questlog
          </Typography>
          <Badge
            color="error"
            variant="dot"
            invisible={pendingInvitations.length === 0}
          >
            <IconButton color="inherit" onClick={handleInboxClick}>
              <MailIcon />
            </IconButton>
          </Badge>
          <Popover
            id={inboxId}
            open={inboxOpen}
            anchorEl={anchorElInbox}
            onClose={handleCloseInbox}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Box sx={{ p: 2, minWidth: 250 }}>
              <Typography variant="subtitle1" gutterBottom>
                Pending Invitations
              </Typography>
              {pendingInvitations.length === 0 ? (
                <Typography variant="body2">No pending invitations.</Typography>
              ) : (
                <List>
                {pendingInvitations.map((inv) => {
                    const camp = mockCampaigns.find(c => c.id === inv.campaignId);
                    return (
                    <ListItem key={inv.id} disablePadding>
                        <ListItemText
                        primary={`${camp ? camp.title : ""}`}
                        secondary={`From: ${inv.from}`}
                        />
                        <IconButton size="small" onClick={() => { /* accept logic */ }}>
                        <CheckIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={() => { /* deny logic */ }}>
                        <CloseIcon fontSize="small" />
                        </IconButton>
                    </ListItem>
                    );
                })}
                </List>
              )}
            </Box>
          </Popover>
          <Button color="inherit" onClick={handleUserClick}>
            {username}
          </Button>
          <Menu
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUser}
          >
            <MenuItem onClick={handleLogout}>Log out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, overflow: "auto" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
