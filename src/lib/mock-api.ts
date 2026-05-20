import { Candidate, ElectionMetrics, Position, Voter } from './types';

// Use local backend when developing, and relative /api when deployed on Netlify
const API_BASE_URL = import.meta.env.PROD ? '/api' : 'http://localhost:5000/api';

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

export const api = {
  login: async (matric: string, pin: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matricNumber: matric, pin })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    
    // Store logged in user matric in localStorage
    localStorage.setItem('voterMatric', data.voter.matricNumber);
    return data;
  },
  
  register: async (fullName: string, matric: string, department: string, pin: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, department, matricNumber: matric, pin })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    return data;
  },
  
  adminLogin: async (username: string, pass: string) => {
    await new Promise(r => setTimeout(r, 1000));
    if (username === 'admin' && pass === 'password') {
      return { success: true };
    }
    throw new Error('Unauthorized');
  },
  
  adminGetVoters: async () => {
    const res = await fetch(`${API_BASE_URL}/admin/voters`);
    if (!res.ok) throw new Error('Failed to fetch voters');
    return await res.json();
  },

  getCandidates: async () => {
    const res = await fetch(`${API_BASE_URL}/admin/candidates`);
    if (!res.ok) throw new Error('Failed to fetch candidates');
    return await res.json();
  },

  adminCreateCandidate: async (candidate: any) => {
    const res = await fetch(`${API_BASE_URL}/admin/candidates`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(candidate)
    });
    if (!res.ok) throw new Error('Failed to create candidate');
    return await res.json();
  },

  adminUpdateCandidate: async (id: string, candidate: any) => {
    const res = await fetch(`${API_BASE_URL}/admin/candidates/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(candidate)
    });
    if (!res.ok) throw new Error('Failed to update candidate');
    return await res.json();
  },

  adminDeleteCandidate: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/admin/candidates/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete candidate');
    return await res.json();
  },
  
  submitBallot: async (votes: Record<string, string>) => {
    const matricNumber = localStorage.getItem('voterMatric');
    const res = await fetch(`${API_BASE_URL}/vote/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matricNumber, votes })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Voting failed');
    return data;
  },
  
  getElectionMetrics: async (): Promise<ElectionMetrics> => {
    return {
      totalEligible: 5000,
      totalCast: 3240,
      turnoutPercentage: 64.8,
      status: 'ACTIVE',
    };
  },
  
  getResults: async () => {
    return mockCandidates.map(c => ({
      candidateId: c.id,
      votes: Math.floor(Math.random() * 1000)
    }));
  }
};
