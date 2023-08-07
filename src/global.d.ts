type RequireOnly<T, P extends keyof T> = Pick<T, P> & Partial<Omit<T, P>>;

// Pick<Task, 'title'>
// Partial<Task>

type Task = {
  id: string;
  title: string;
  user?: User[id];
  column?: StatusColumn["id"];
};

type StatusColumn = {
  id: string;
  tasks: Task["id"][];
  title: Status;
};

type User = {
  avatar_url: string;
  events_ur?: string;
  followers_url?: string;
  following_url?: string;
  gists_url?: string;
  gravatar_id?: string;
  html_url?: string;
  id: number;
  login: string;
  node_id?: string;
  organizations_url?: string;
  received_events_url?: string;
  repos_url?: string;
  score?: number;
  site_admin?: boolean;
  starred_url?: string;
  subscriptions_url?: string;
  type?: string;
  url: string;
};

type Issue = {
  active_lock_reason: string | null;
  assignee: string | null;
  assignees: string[];
  author_association: string;
  body: string | null;
  closed_at: string | null;
  comments: number;
  comments_url: string;
  created_at: string;
  draft: boolean;
  events_url: string;
  html_url: string;
  id: number;
  labels: string[];
  labels_url: string;
  locked: boolean;
  milestone: string | null;
  node_id: string;
  number: number;
  performed_via_github_app: string | null;
  pull_request: object;
  reactions: object;
  repository_url: string;
  score: number;
  state: string;
  state_reason: string | null;
  timeline_url: string;
  title: string;
  updated_at: string;
  url: string;
  user: User;
};

type Repo = {
  id: number;
  html_url: string;
  full_name: string;
  forks_count: number;
  visibility: string;
  watchers_count: number;
};
