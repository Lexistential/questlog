export interface Campaign {
    id: number;
    title: string;
    role: "DM" | "Player";
  }
  
  export interface QuestStep {
    id: number;
    title: string;
    description: string;
    details: string;
    isCompleted: boolean;
    isActive: boolean;
  }
  
  
  export interface Quest {
    id: number;
    campaignId: number;
    title: string;
    description: string;
    steps: QuestStep[];
  }
  
  export interface Note {
    id: number;
    questId: number;
    noteContent: string;
  }

  export interface Invitation {
    id: number;
    campaignId: number;
    from: string;
    to: string;
    status: "pending" | "accepted" | "declined";
  }