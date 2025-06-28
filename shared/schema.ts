import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Companies table for multi-tenant support
export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  domain: text("domain").notNull().unique(),
  logo: text("logo"),
  primaryColor: text("primary_color").default("#120028"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Users table with company association
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"), // admin, manager, user
  companyId: integer("company_id").references(() => companies.id).notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Leads table for CRM
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  source: text("source").notNull(), // LinkedIn, Google Ads, Website, etc.
  status: text("status").notNull().default("new"), // new, qualified, proposal, closed
  companyId: integer("company_id").references(() => companies.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Marketing campaigns
export const campaigns = pgTable("campaigns", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // email, sms, social
  status: text("status").notNull().default("draft"), // draft, active, paused, completed
  companyId: integer("company_id").references(() => companies.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Workflows
export const workflows = pgTable("workflows", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  isActive: boolean("is_active").default(true),
  companyId: integer("company_id").references(() => companies.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Webhooks
export const webhooks = pgTable("webhooks", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  events: text("events").notNull(), // JSON array of events
  isActive: boolean("is_active").default(true),
  companyId: integer("company_id").references(() => companies.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertCompanySchema = createInsertSchema(companies).omit({
  id: true,
  createdAt: true,
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
});

export const insertCampaignSchema = createInsertSchema(campaigns).omit({
  id: true,
  createdAt: true,
});

export const insertWorkflowSchema = createInsertSchema(workflows).omit({
  id: true,
  createdAt: true,
});

export const insertWebhookSchema = createInsertSchema(webhooks).omit({
  id: true,
  createdAt: true,
});

// Login schema
export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

// Types
export type Company = typeof companies.$inferSelect;
export type InsertCompany = z.infer<typeof insertCompanySchema>;

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;

export type Campaign = typeof campaigns.$inferSelect;
export type InsertCampaign = z.infer<typeof insertCampaignSchema>;

export type Workflow = typeof workflows.$inferSelect;
export type InsertWorkflow = z.infer<typeof insertWorkflowSchema>;

export type Webhook = typeof webhooks.$inferSelect;
export type InsertWebhook = z.infer<typeof insertWebhookSchema>;

export type LoginRequest = z.infer<typeof loginSchema>;

// Relations
export const companiesRelations = relations(companies, ({ many }) => ({
  users: many(users),
  leads: many(leads),
  campaigns: many(campaigns),
  workflows: many(workflows),
  webhooks: many(webhooks),
}));

export const usersRelations = relations(users, ({ one }) => ({
  company: one(companies, {
    fields: [users.companyId],
    references: [companies.id],
  }),
}));

export const leadsRelations = relations(leads, ({ one }) => ({
  company: one(companies, {
    fields: [leads.companyId],
    references: [companies.id],
  }),
}));

export const campaignsRelations = relations(campaigns, ({ one }) => ({
  company: one(companies, {
    fields: [campaigns.companyId],
    references: [companies.id],
  }),
}));

export const workflowsRelations = relations(workflows, ({ one }) => ({
  company: one(companies, {
    fields: [workflows.companyId],
    references: [companies.id],
  }),
}));

export const webhooksRelations = relations(webhooks, ({ one }) => ({
  company: one(companies, {
    fields: [webhooks.companyId],
    references: [companies.id],
  }),
}));
