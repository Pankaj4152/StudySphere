export interface Comment {
  id: string;
  user: string;
  comment: string;
  timestamp: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface Resource {
  id: string;
  year: number;
  semester: number;
  branch: string;
  subject: string;
  type: 'PYQ' | 'Notes' | 'PDF';
  title: string;
  desc: string;
  file_url: string;
  comments: Comment[];
}

export interface Syllabus {
  branch: string;
  semester: number;
  subjects: string[];
}

export const branches = [
  "Civil", "Mechanical", "Computer Science", "Electrical", "Electronics", "Chemical", "Aerospace", "Biotechnology", "Information Technology", "Metallurgy", "Common"
];

export const resourceTypes = ['PYQ', 'Notes', 'PDF'];


export const mockResources: Resource[] = [
  {
    id: "1",
    year: 1,
    semester: 1,
    branch: "Common",
    subject: "Mathematics-I",
    type: "PYQ",
    title: "Maths-I PYQ 2023",
    desc: "Past year question paper for Engineering Mathematics-I from the 2023 session.",
    file_url: "#",
    comments: [
        { id: 'c1', user: 'HelpfulStudent', comment: 'This was super helpful for my exam prep!', timestamp: '2024-05-19T10:00:00Z', sentiment: 'positive' },
        { id: 'c2', user: 'ConfusedPeer', comment: 'Question 3b seems to have a typo, can anyone confirm?', timestamp: '2024-05-20T12:30:00Z', sentiment: 'neutral' },
    ],
  },
  {
    id: "2",
    year: 2,
    semester: 3,
    branch: "Computer Science",
    subject: "Data Structures",
    type: "Notes",
    title: "Comprehensive DS Notes",
    desc: "Detailed notes covering all major topics in Data Structures including arrays, linked lists, stacks, and queues.",
    file_url: "#",
    comments: [],
  },
  {
    id: "3",
    year: 3,
    semester: 5,
    branch: "Mechanical",
    subject: "Thermodynamics",
    type: "PDF",
    title: "Thermodynamics Textbook PDF",
    desc: "A scanned PDF of the recommended textbook for Thermodynamics for quick reference.",
    file_url: "#",
    comments: [
        { id: 'c3', user: 'MechMaster', comment: 'The quality is not great, some pages are blurry.', timestamp: '2024-05-18T15:00:00Z', sentiment: 'negative' },
    ],
  },
  {
    id: "4",
    year: 1,
    semester: 2,
    branch: "Common",
    subject: "Physics",
    type: "PYQ",
    title: "Physics PYQ 2022",
    desc: "Question paper for Engineering Physics from the 2022 session, useful for pattern analysis.",
    file_url: "#",
    comments: [],
  },
  {
    id: "5",
    year: 4,
    semester: 7,
    branch: "Electronics",
    subject: "VLSI Design",
    type: "Notes",
    title: "Handwritten VLSI Notes",
    desc: "Scanned handwritten notes from a senior on VLSI design concepts and circuits.",
    file_url: "#",
    comments: [
        { id: 'c4', user: 'ChipDesigner', comment: 'Amazing notes! Saved me a lot of time.', timestamp: '2024-05-21T09:00:00Z', sentiment: 'positive' },
    ],
  },
    {
    id: "6",
    year: 2,
    semester: 4,
    branch: "Civil",
    subject: "Structural Analysis",
    type: "PDF",
    title: "Structural Analysis Problem Set",
    desc: "A PDF containing a set of practice problems for Structural Analysis with solutions.",
    file_url: "#",
    comments: [],
  },
  {
    id: "7",
    year: 3,
    semester: 6,
    branch: "Computer Science",
    subject: "Operating Systems",
    type: "PYQ",
    title: "OS PYQ 2021",
    desc: "Operating Systems past year paper from 2021. Includes both theory and practical questions.",
    file_url: "#",
    comments: [],
  },
];

export const mockSyllabus: Syllabus[] = [
  {
    branch: "Computer Science",
    semester: 3,
    subjects: ["Data Structures", "Algorithms", "Digital Logic", "Mathematics-III"],
  },
  {
    branch: "Computer Science",
    semester: 4,
    subjects: ["Operating Systems", "Computer Networks", "Database Management Systems", "Software Engineering"],
  },
  {
    branch: "Mechanical",
    semester: 3,
    subjects: ["Fluid Mechanics", "Material Science", "Machine Drawing", "Mathematics-III"],
  },
  {
    branch: "Mechanical",
    semester: 4,
    subjects: ["Theory of Machines", "Manufacturing Processes", "Applied Thermodynamics", "Strength of Materials"],
  },
  {
    branch: "Civil",
    semester: 3,
    subjects: ["Surveying", "Building Materials", "Solid Mechanics", "Fluid Mechanics"],
  },
];
