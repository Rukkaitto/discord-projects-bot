export interface Member {
  _id: string;
  username: string;
  avatar: string;
}

export interface Project {
  _id: string;
  title: string;
  members: Member[];
  logs: Log[];
}

export interface Server {
  _id: string;
  icon: string;
  name: string;
  projects: Project[];
}

export interface Log {
  _id: string;
  author: Member;
  message: string;
  createdAt: string;
}

export interface APIResponse {
  response: string;
}
