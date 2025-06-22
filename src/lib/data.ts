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
  createdAt?: string;
}

export interface Syllabus {
  id?: string;
  branch: string;
  semester: number;
  subjects: string[];
}

export const branches = [
  "Civil", "Mechanical", "Computer Science", "Electrical", "Electronics", "Chemical", "Aerospace", "Biotechnology", "Information Technology", "Metallurgy", "Common"
];

export const resourceTypes = ['PYQ', 'Notes', 'PDF'];
