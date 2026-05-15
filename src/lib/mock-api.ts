import { Candidate, ElectionMetrics, Position, Voter } from './types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockPositions: Position[] = [
  { id: '1', title: 'President' },
  { id: '2', title: 'Vice President' },
  { id: '3', title: 'General Secretary' },
];

export const mockCandidates: Candidate[] = [
  { id: 'c1', positionId: '1', fullName: 'Oluwaseun Adeyemi', department: 'Computer Science', manifesto: 'Bringing innovation to student welfare.', photoUrl: '/candidates/p1.png' },
  { id: 'c2', positionId: '1', fullName: 'Chidi Okoro', department: 'Economics', manifesto: 'Financial transparency for all student funds.' },
  { id: 'c3', positionId: '2', fullName: 'Amina Bello', department: 'Political Science', manifesto: 'Voice for the voiceless.', photoUrl: '/candidates/p2.png' },
  { id: 'c4', positionId: '2', fullName: 'Fatima Yusuf', department: 'Biology', manifesto: 'Health and safety first.' },
  { id: 'c5', positionId: '3', fullName: 'Tunde Bakare', department: 'English', manifesto: 'Bridging the gap between students and management.' },
];


export const mockVoters: Voter[] = [
  { matricNumber: 'ACE/2021/001', fullName: 'John Doe', department: 'Computer Science', status: 'ELIGIBLE' },
  { matricNumber: 'ACE/2021/002', fullName: 'Jane Smith', department: 'Mathematics', status: 'VOTED' },
];

export const api = {
  login: async (matric: string, pin: string) => {
    await delay(1500);
    if (matric.startsWith('ACE/')) {
      return { success: true, voter: mockVoters[0] };
    }
    throw new Error('Invalid credentials');
  },
  adminLogin: async (username: string, pass: string) => {
    await delay(1500);
    if (username === 'admin' && pass === 'password') {
      return { success: true };
    }
    throw new Error('Unauthorized');
  },
  submitBallot: async (votes: Record<string, string>) => {
    await delay(2000);
    return { success: true, ballotId: Math.random().toString(36).substr(2, 9) };
  },
  getElectionMetrics: async (): Promise<ElectionMetrics> => {
    await delay(500);
    return {
      totalEligible: 5000,
      totalCast: 3240,
      turnoutPercentage: 64.8,
      status: 'ACTIVE',
    };
  },
  getResults: async () => {
    await delay(800);
    return mockCandidates.map(c => ({
      candidateId: c.id,
      votes: Math.floor(Math.random() * 1000)
    }));
  }
};
