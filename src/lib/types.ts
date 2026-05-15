export type ElectionStatus = 'DRAFT' | 'ACTIVE' | 'CONCLUDED';

export interface Position {
  id: string;
  title: string;
}

export interface Candidate {
  id: string;
  fullName: string;
  positionId: string;
  department: string;
  manifesto: string;
  photoUrl?: string;
}

export interface Voter {
  matricNumber: string;
  fullName: string;
  department: string;
  status: 'ELIGIBLE' | 'VOTED';
}

export interface VoteTally {
  candidateId: string;
  votes: number;
}

export interface ElectionMetrics {
  totalEligible: number;
  totalCast: number;
  turnoutPercentage: number;
  status: ElectionStatus;
}
