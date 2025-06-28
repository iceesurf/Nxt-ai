import type { Express } from "express";
import { createServer, type Server } from "http";
import jwt from "jsonwebtoken";
import { storage } from "./storage";
import { loginSchema, insertLeadSchema } from "@shared/schema";
import { z } from "zod";

const JWT_SECRET = process.env.JWT_SECRET || "nxt-ai-secret-key-2024";

// Middleware to verify JWT
function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token de acesso requerido' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.user = user;
    next();
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Login endpoint
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      
      const user = await storage.validateUser(email, password);
      if (!user) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      const company = await storage.getCompany(user.companyId);
      if (!company) {
        return res.status(500).json({ message: "Erro interno do servidor" });
      }

      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email, 
          role: user.role,
          companyId: user.companyId 
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          companyId: user.companyId,
        },
        company: {
          id: company.id,
          name: company.name,
          primaryColor: company.primaryColor,
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      }
      console.error("Login error:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  });

  // Get current user
  app.get("/api/auth/me", authenticateToken, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const company = await storage.getCompany(user.companyId);
      
      res.json({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          companyId: user.companyId,
        },
        company: company ? {
          id: company.id,
          name: company.name,
          primaryColor: company.primaryColor,
        } : null
      });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  });

  // Leads endpoints
  app.get("/api/leads", authenticateToken, async (req: any, res) => {
    try {
      const leads = await storage.getLeads(req.user.companyId);
      res.json(leads);
    } catch (error) {
      console.error("Get leads error:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  });

  app.post("/api/leads", authenticateToken, async (req: any, res) => {
    try {
      const leadData = insertLeadSchema.parse({
        ...req.body,
        companyId: req.user.companyId,
      });
      
      const lead = await storage.createLead(leadData);
      res.status(201).json(lead);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      }
      console.error("Create lead error:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  });

  app.put("/api/leads/:id", authenticateToken, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      
      const lead = await storage.updateLead(id, updates);
      if (!lead) {
        return res.status(404).json({ message: "Lead não encontrado" });
      }
      
      res.json(lead);
    } catch (error) {
      console.error("Update lead error:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  });

  app.delete("/api/leads/:id", authenticateToken, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteLead(id);
      
      if (!success) {
        return res.status(404).json({ message: "Lead não encontrado" });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error("Delete lead error:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  });

  // Campaigns endpoints
  app.get("/api/campaigns", authenticateToken, async (req: any, res) => {
    try {
      const campaigns = await storage.getCampaigns(req.user.companyId);
      res.json(campaigns);
    } catch (error) {
      console.error("Get campaigns error:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  });

  // Workflows endpoints
  app.get("/api/workflows", authenticateToken, async (req: any, res) => {
    try {
      const workflows = await storage.getWorkflows(req.user.companyId);
      res.json(workflows);
    } catch (error) {
      console.error("Get workflows error:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  });

  // Webhooks endpoints
  app.get("/api/webhooks", authenticateToken, async (req: any, res) => {
    try {
      const webhooks = await storage.getWebhooks(req.user.companyId);
      res.json(webhooks);
    } catch (error) {
      console.error("Get webhooks error:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  });

  // Dashboard stats endpoint
  app.get("/api/dashboard/stats", authenticateToken, async (req: any, res) => {
    try {
      const leads = await storage.getLeads(req.user.companyId);
      const campaigns = await storage.getCampaigns(req.user.companyId);
      const workflows = await storage.getWorkflows(req.user.companyId);
      
      const stats = {
        totalLeads: leads.length,
        activeCampaigns: campaigns.filter(c => c.status === 'active').length,
        activeWorkflows: workflows.filter(w => w.isActive).length,
        monthlyRevenue: 45890, // TODO: Calculate from actual data
      };
      
      res.json(stats);
    } catch (error) {
      console.error("Get dashboard stats error:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
