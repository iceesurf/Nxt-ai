// Re-export types from shared schema
export type {
  User,
  InsertUser,
  Company,
  InsertCompany,
  Lead,
  InsertLead,
  Campaign,
  InsertCampaign,
  Workflow,
  InsertWorkflow,
  Webhook,
  InsertWebhook,
  LoginRequest,
} from "@shared/schema";

// Frontend-specific types
export interface AuthState {
  user: User | null;
  company: Company | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface ApiError {
  message: string;
  status?: number;
  errors?: any[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface DashboardStats {
  totalLeads: number;
  activeCampaigns: number;
  activeWorkflows: number;
  monthlyRevenue: number;
}

// Form states
export interface FormState {
  isSubmitting: boolean;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}

// Navigation
export interface NavigationItem {
  path: string;
  label: string;
  icon: React.ComponentType<any>;
  permission?: string;
}

// Landing Page Builder
export interface LandingPageTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: string;
}

export interface LandingPageElement {
  id: string;
  type: "text" | "image" | "button" | "form" | "section";
  properties: Record<string, any>;
  children?: LandingPageElement[];
}

export interface LandingPage {
  id: string;
  name: string;
  url: string;
  status: "draft" | "published" | "archived";
  template: string;
  elements: LandingPageElement[];
  settings: {
    seo: {
      title: string;
      description: string;
      keywords: string[];
    };
    analytics: {
      enabled: boolean;
      trackingId?: string;
    };
    theme: {
      primaryColor: string;
      fontFamily: string;
    };
  };
  stats: {
    visits: number;
    conversions: number;
    conversionRate: number;
  };
  createdAt: string;
  updatedAt: string;
}

// Webhook types
export interface WebhookEvent {
  id: string;
  name: string;
  description: string;
  payload: Record<string, any>;
}

export interface WebhookDelivery {
  id: string;
  webhookId: string;
  event: string;
  status: "pending" | "success" | "failed";
  attempts: number;
  lastAttempt: string;
  response?: {
    status: number;
    body: string;
  };
}

// Integration types
export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "social" | "email" | "analytics" | "automation" | "payment";
  isConnected: boolean;
  settings: Record<string, any>;
}

// Report types
export interface ReportMetric {
  name: string;
  value: number;
  change: number;
  trend: "up" | "down" | "stable";
  format: "number" | "percentage" | "currency";
}

export interface AIInsight {
  type: "optimization" | "trend" | "alert" | "recommendation";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  action: string;
  confidence: number;
}

// Theme and branding
export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logo?: string;
  favicon?: string;
  fontFamily: string;
}

export interface BrandingSettings {
  companyName: string;
  logo: string;
  favicon: string;
  theme: ThemeConfig;
  customCSS?: string;
}

// Subscription and usage
export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  limits: {
    leads: number;
    emails: number;
    storage: number; // GB
    users: number;
  };
}

export interface UsageMetrics {
  leads: { current: number; limit: number };
  emails: { current: number; limit: number };
  storage: { current: number; limit: number };
  users: { current: number; limit: number };
}

// Filter and sort options
export interface FilterOptions {
  status?: string[];
  source?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  search?: string;
}

export interface SortOptions {
  field: string;
  direction: "asc" | "desc";
}

// Table configuration
export interface TableColumn<T = any> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface TableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    onPageChange: (page: number) => void;
  };
  filters?: FilterOptions;
  onFiltersChange?: (filters: FilterOptions) => void;
  sort?: SortOptions;
  onSortChange?: (sort: SortOptions) => void;
}

// Modal and dialog states
export interface ModalState {
  isOpen: boolean;
  title?: string;
  content?: React.ReactNode;
  onClose?: () => void;
  onConfirm?: () => void;
}

// Notification types
export interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actions?: {
    label: string;
    onClick: () => void;
  }[];
}

// File upload types
export interface FileUpload {
  file: File;
  progress: number;
  status: "pending" | "uploading" | "success" | "error";
  url?: string;
  error?: string;
}

// Search and autocomplete
export interface SearchResult {
  id: string;
  type: "lead" | "campaign" | "workflow" | "page";
  title: string;
  description: string;
  url: string;
}

export interface AutocompleteOption {
  value: string;
  label: string;
  group?: string;
}
