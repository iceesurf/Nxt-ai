import { 
  users, companies, leads, campaigns, workflows, webhooks,
  type User, type InsertUser, type Company, type InsertCompany,
  type Lead, type InsertLead, type Campaign, type InsertCampaign,
  type Workflow, type InsertWorkflow, type Webhook, type InsertWebhook
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  validateUser(email: string, password: string): Promise<User | null>;

  // Companies
  getCompany(id: number): Promise<Company | undefined>;
  createCompany(company: InsertCompany): Promise<Company>;

  // Leads
  getLeads(companyId: number): Promise<Lead[]>;
  createLead(lead: InsertLead): Promise<Lead>;
  updateLead(id: number, lead: Partial<Lead>): Promise<Lead | undefined>;
  deleteLead(id: number): Promise<boolean>;

  // Campaigns
  getCampaigns(companyId: number): Promise<Campaign[]>;
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;

  // Workflows
  getWorkflows(companyId: number): Promise<Workflow[]>;
  createWorkflow(workflow: InsertWorkflow): Promise<Workflow>;

  // Webhooks
  getWebhooks(companyId: number): Promise<Webhook[]>;
  createWebhook(webhook: InsertWebhook): Promise<Webhook>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private companies: Map<number, Company> = new Map();
  private leads: Map<number, Lead> = new Map();
  private campaigns: Map<number, Campaign> = new Map();
  private workflows: Map<number, Workflow> = new Map();
  private webhooks: Map<number, Webhook> = new Map();
  
  private currentUserId = 1;
  private currentCompanyId = 1;
  private currentLeadId = 1;
  private currentCampaignId = 1;
  private currentWorkflowId = 1;
  private currentWebhookId = 1;

  constructor() {
    this.seedData();
  }

  private async seedData() {
    // Create default company
    const company: Company = {
      id: this.currentCompanyId++,
      name: "NXT.ai",
      domain: "dnxtai.com",
      logo: null,
      primaryColor: "#120028",
      createdAt: new Date(),
    };
    this.companies.set(company.id, company);

    // Create default admin user
    const hashedPassword = await bcrypt.hash("senha123", 10);
    const user: User = {
      id: this.currentUserId++,
      username: "admin",
      email: "admin@dnxtai.com",
      password: hashedPassword,
      role: "admin",
      companyId: company.id,
      isActive: true,
      createdAt: new Date(),
    };
    this.users.set(user.id, user);

    // Create some sample leads
    const sampleLeads: Lead[] = [
      {
        id: this.currentLeadId++,
        name: "João Silva",
        email: "joao@email.com",
        phone: "(11) 99999-9999",
        source: "LinkedIn",
        status: "qualified",
        companyId: company.id,
        createdAt: new Date(),
      },
      {
        id: this.currentLeadId++,
        name: "Maria Santos",
        email: "maria@email.com",
        phone: "(11) 88888-8888",
        source: "Google Ads",
        status: "new",
        companyId: company.id,
        createdAt: new Date(),
      },
    ];
    
    sampleLeads.forEach(lead => this.leads.set(lead.id, lead));

    // Create sample workflows
    const sampleWorkflows: Workflow[] = [
      {
        id: this.currentWorkflowId++,
        name: "Boas-vindas para novos leads",
        description: "Sequência automática de emails para novos leads",
        isActive: true,
        companyId: company.id,
        createdAt: new Date(),
      },
      {
        id: this.currentWorkflowId++,
        name: "Follow-up pós-reunião",
        description: "Acompanhamento após reuniões comerciais",
        isActive: true,
        companyId: company.id,
        createdAt: new Date(),
      },
    ];

    sampleWorkflows.forEach(workflow => this.workflows.set(workflow.id, workflow));
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const user: User = {
      ...insertUser,
      id: this.currentUserId++,
      password: hashedPassword,
      createdAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (!user || !user.isActive) return null;
    
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }

  // Companies
  async getCompany(id: number): Promise<Company | undefined> {
    return this.companies.get(id);
  }

  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const company: Company = {
      ...insertCompany,
      id: this.currentCompanyId++,
      createdAt: new Date(),
    };
    this.companies.set(company.id, company);
    return company;
  }

  // Leads
  async getLeads(companyId: number): Promise<Lead[]> {
    return Array.from(this.leads.values()).filter(lead => lead.companyId === companyId);
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const lead: Lead = {
      ...insertLead,
      id: this.currentLeadId++,
      createdAt: new Date(),
    };
    this.leads.set(lead.id, lead);
    return lead;
  }

  async updateLead(id: number, updates: Partial<Lead>): Promise<Lead | undefined> {
    const lead = this.leads.get(id);
    if (!lead) return undefined;
    
    const updatedLead = { ...lead, ...updates };
    this.leads.set(id, updatedLead);
    return updatedLead;
  }

  async deleteLead(id: number): Promise<boolean> {
    return this.leads.delete(id);
  }

  // Campaigns
  async getCampaigns(companyId: number): Promise<Campaign[]> {
    return Array.from(this.campaigns.values()).filter(campaign => campaign.companyId === companyId);
  }

  async createCampaign(insertCampaign: InsertCampaign): Promise<Campaign> {
    const campaign: Campaign = {
      ...insertCampaign,
      id: this.currentCampaignId++,
      createdAt: new Date(),
    };
    this.campaigns.set(campaign.id, campaign);
    return campaign;
  }

  // Workflows
  async getWorkflows(companyId: number): Promise<Workflow[]> {
    return Array.from(this.workflows.values()).filter(workflow => workflow.companyId === companyId);
  }

  async createWorkflow(insertWorkflow: InsertWorkflow): Promise<Workflow> {
    const workflow: Workflow = {
      ...insertWorkflow,
      id: this.currentWorkflowId++,
      createdAt: new Date(),
    };
    this.workflows.set(workflow.id, workflow);
    return workflow;
  }

  // Webhooks
  async getWebhooks(companyId: number): Promise<Webhook[]> {
    return Array.from(this.webhooks.values()).filter(webhook => webhook.companyId === companyId);
  }

  async createWebhook(insertWebhook: InsertWebhook): Promise<Webhook> {
    const webhook: Webhook = {
      ...insertWebhook,
      id: this.currentWebhookId++,
      createdAt: new Date(),
    };
    this.webhooks.set(webhook.id, webhook);
    return webhook;
  }
}

// Database Storage Implementation
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (!user) return null;
    
    const isValid = bcrypt.compareSync(password, user.password);
    return isValid ? user : null;
  }

  async getCompany(id: number): Promise<Company | undefined> {
    const [company] = await db.select().from(companies).where(eq(companies.id, id));
    return company || undefined;
  }

  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const [company] = await db
      .insert(companies)
      .values(insertCompany)
      .returning();
    return company;
  }

  async getLeads(companyId: number): Promise<Lead[]> {
    return await db.select().from(leads).where(eq(leads.companyId, companyId));
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const [lead] = await db
      .insert(leads)
      .values(insertLead)
      .returning();
    return lead;
  }

  async updateLead(id: number, updates: Partial<Lead>): Promise<Lead | undefined> {
    const [updatedLead] = await db
      .update(leads)
      .set(updates)
      .where(eq(leads.id, id))
      .returning();
    return updatedLead || undefined;
  }

  async deleteLead(id: number): Promise<boolean> {
    const result = await db.delete(leads).where(eq(leads.id, id));
    return result.rowCount > 0;
  }

  async getCampaigns(companyId: number): Promise<Campaign[]> {
    return await db.select().from(campaigns).where(eq(campaigns.companyId, companyId));
  }

  async createCampaign(insertCampaign: InsertCampaign): Promise<Campaign> {
    const [campaign] = await db
      .insert(campaigns)
      .values(insertCampaign)
      .returning();
    return campaign;
  }

  async getWorkflows(companyId: number): Promise<Workflow[]> {
    return await db.select().from(workflows).where(eq(workflows.companyId, companyId));
  }

  async createWorkflow(insertWorkflow: InsertWorkflow): Promise<Workflow> {
    const [workflow] = await db
      .insert(workflows)
      .values(insertWorkflow)
      .returning();
    return workflow;
  }

  async getWebhooks(companyId: number): Promise<Webhook[]> {
    return await db.select().from(webhooks).where(eq(webhooks.companyId, companyId));
  }

  async createWebhook(insertWebhook: InsertWebhook): Promise<Webhook> {
    const [webhook] = await db
      .insert(webhooks)
      .values(insertWebhook)
      .returning();
    return webhook;
  }
}

export const storage = new DatabaseStorage();
