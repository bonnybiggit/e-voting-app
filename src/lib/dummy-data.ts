export const UNIVERSITY_NAME = "Federal University of Technology, Abuja";
export const UNIVERSITY_ABBR = "FUTA";

export interface Candidate {
  id: string;
  name: string;
  position: string;
  department: string;
  level: string;
  avatar: string;
  manifesto: string;
  votes: number;
  color: string;
}

export interface Election {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "active" | "upcoming" | "closed";
  totalVoters: number;
  votedCount: number;
  candidates: Candidate[];
}

export interface Student {
  id: string;
  name: string;
  matricNumber: string;
  department: string;
  level: string;
  email: string;
  hasVoted: boolean;
  avatar: string;
}

export const elections: Election[] = [
  {
    id: "el-001",
    title: "Student Union Government (SUG) Elections 2024/2025",
    description:
      "Elect your student union president and executive team for the 2024/2025 academic session.",
    startDate: "2025-05-10",
    endDate: "2025-05-16",
    status: "active",
    totalVoters: 8450,
    votedCount: 5120,
    candidates: [
      {
        id: "c-001",
        name: "Adebayo Oluwaseun",
        position: "President",
        department: "Computer Science",
        level: "400L",
        avatar: "https://i.pravatar.cc/200?u=adebayo",
        manifesto:
          "I will champion digital transformation of student services, improve hostel conditions, and establish a student innovation hub with free Wi-Fi across campus.",
        votes: 2341,
        color: "#00356B",
      },
      {
        id: "c-002",
        name: "Chidinma Okafor",
        position: "President",
        department: "Law",
        level: "500L",
        avatar: "https://i.pravatar.cc/200?u=chidinma",
        manifesto:
          "My agenda focuses on student welfare, academic excellence, and creating mentorship programs with industry leaders for every department.",
        votes: 1879,
        color: "#0079F1",
      },
      {
        id: "c-003",
        name: "Ibrahim Musa Dankoli",
        position: "President",
        department: "Engineering",
        level: "400L",
        avatar: "https://i.pravatar.cc/200?u=ibrahim",
        manifesto:
          "I promise transparent governance, scholarship programs for indigent students, and revamping the student clinic for better healthcare.",
        votes: 900,
        color: "#16A34A",
      },
    ],
  },
  {
    id: "el-002",
    title: "Faculty of Engineering Student Representative",
    description:
      "Vote for your faculty student representative for the 2024/2025 session.",
    startDate: "2025-05-12",
    endDate: "2025-05-18",
    status: "active",
    totalVoters: 2100,
    votedCount: 980,
    candidates: [
      {
        id: "c-004",
        name: "Emeka Nwachukwu",
        position: "Faculty Rep",
        department: "Mechanical Engineering",
        level: "300L",
        avatar: "https://i.pravatar.cc/200?u=emeka",
        manifesto:
          "Advocating for better lab facilities, more industrial visit opportunities, and a dedicated engineering study lounge.",
        votes: 540,
        color: "#7C3AED",
      },
      {
        id: "c-005",
        name: "Fatima Al-Hassan",
        position: "Faculty Rep",
        department: "Electrical Engineering",
        level: "300L",
        avatar: "https://i.pravatar.cc/200?u=fatima",
        manifesto:
          "I will fight for power supply improvements, modern equipment, and industry-university partnership programs.",
        votes: 440,
        color: "#DC2626",
      },
    ],
  },
  {
    id: "el-003",
    title: "Departmental Representative — Computer Science",
    description:
      "Elect your department representative to the faculty board.",
    startDate: "2025-06-01",
    endDate: "2025-06-05",
    status: "upcoming",
    totalVoters: 420,
    votedCount: 0,
    candidates: [
      {
        id: "c-006",
        name: "Taiwo Adeyemi",
        position: "Dept. Rep",
        department: "Computer Science",
        level: "200L",
        avatar: "https://i.pravatar.cc/200?u=taiwo",
        manifesto:
          "Better course registration system, student-lecturer feedback portal, and hackathon funding.",
        votes: 0,
        color: "#EA580C",
      },
    ],
  },
];

export const students: Student[] = [
  {
    id: "s-001",
    name: "Adaeze Nwosu",
    matricNumber: "CSC/2021/001",
    department: "Computer Science",
    level: "400L",
    email: "adaeze.nwosu@futa.edu.ng",
    hasVoted: true,
    avatar: "https://i.pravatar.cc/200?u=adaeze",
  },
  {
    id: "s-002",
    name: "Femi Adesanya",
    matricNumber: "ENG/2022/045",
    department: "Engineering",
    level: "300L",
    email: "femi.adesanya@futa.edu.ng",
    hasVoted: false,
    avatar: "https://i.pravatar.cc/200?u=femi",
  },
  {
    id: "s-003",
    name: "Ngozi Eze",
    matricNumber: "LAW/2020/012",
    department: "Law",
    level: "500L",
    email: "ngozi.eze@futa.edu.ng",
    hasVoted: true,
    avatar: "https://i.pravatar.cc/200?u=ngozi",
  },
  {
    id: "s-004",
    name: "Usman Garba",
    matricNumber: "MED/2021/089",
    department: "Medicine",
    level: "400L",
    email: "usman.garba@futa.edu.ng",
    hasVoted: false,
    avatar: "https://i.pravatar.cc/200?u=usman",
  },
  {
    id: "s-005",
    name: "Amaka Obi",
    matricNumber: "ACC/2023/034",
    department: "Accounting",
    level: "200L",
    email: "amaka.obi@futa.edu.ng",
    hasVoted: true,
    avatar: "https://i.pravatar.cc/200?u=amaka",
  },
  {
    id: "s-006",
    name: "Bello Abdulrahman",
    matricNumber: "PHY/2022/067",
    department: "Physics",
    level: "300L",
    email: "bello.abdulrahman@futa.edu.ng",
    hasVoted: false,
    avatar: "https://i.pravatar.cc/200?u=bello",
  },
  {
    id: "s-007",
    name: "Kemi Ogundimu",
    matricNumber: "CHE/2021/023",
    department: "Chemistry",
    level: "400L",
    email: "kemi.ogundimu@futa.edu.ng",
    hasVoted: true,
    avatar: "https://i.pravatar.cc/200?u=kemi",
  },
  {
    id: "s-008",
    name: "Chukwuemeka Obi",
    matricNumber: "MTH/2023/011",
    department: "Mathematics",
    level: "200L",
    email: "chukwuemeka.obi@futa.edu.ng",
    hasVoted: false,
    avatar: "https://i.pravatar.cc/200?u=chukwuemeka",
  },
];

export const adminStats = {
  totalStudents: 8450,
  registeredVoters: 8120,
  totalVotesCast: 5120,
  activeElections: 2,
  upcomingElections: 1,
  closedElections: 3,
  turnoutPercentage: 63.1,
};

export const turnoutByFaculty = [
  { faculty: "Engineering", registered: 2100, voted: 1540, percentage: 73.3 },
  { faculty: "Law", registered: 950, voted: 712, percentage: 74.9 },
  { faculty: "Medicine", registered: 1200, voted: 820, percentage: 68.3 },
  { faculty: "Sciences", registered: 1800, voted: 1100, percentage: 61.1 },
  { faculty: "Management", registered: 1400, voted: 780, percentage: 55.7 },
  { faculty: "Humanities", registered: 670, voted: 168, percentage: 25.1 },
];

export const dailyTurnout = [
  { day: "Day 1", votes: 820 },
  { day: "Day 2", votes: 1240 },
  { day: "Day 3", votes: 980 },
  { day: "Day 4", votes: 1560 },
  { day: "Day 5", votes: 520 },
];
