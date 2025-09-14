import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAssessmentSchema, insertCollegeSchema, insertScholarshipSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Questions API
  app.get("/api/questions", async (req, res) => {
    try {
      const category = req.query.category as string;
      const questions = category 
        ? await storage.getQuestionsByCategory(category)
        : await storage.getAllQuestions();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch questions" });
    }
  });

  // Assessment API
  app.post("/api/assessments", async (req, res) => {
    try {
      const assessmentData = insertAssessmentSchema.parse(req.body);
      const assessment = await storage.createAssessment(assessmentData);
      res.json(assessment);
    } catch (error) {
      res.status(400).json({ error: "Invalid assessment data" });
    }
  });

  app.get("/api/assessments/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const assessments = await storage.getAssessmentsByUserId(userId);
      res.json(assessments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch assessments" });
    }
  });

  // Colleges API
  app.get("/api/colleges", async (req, res) => {
    try {
      const { state, district, course } = req.query;
      const colleges = await storage.getColleges({
        state: state as string,
        district: district as string,
        course: course as string,
      });
      res.json(colleges);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch colleges" });
    }
  });

  app.get("/api/colleges/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const college = await storage.getCollegeById(id);
      if (!college) {
        return res.status(404).json({ error: "College not found" });
      }
      res.json(college);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch college" });
    }
  });

  // Scholarships API
  app.get("/api/scholarships", async (req, res) => {
    try {
      const { category, educationLevel, state } = req.query;
      const scholarships = await storage.getScholarships({
        category: category as string,
        educationLevel: educationLevel as string,
        state: state as string,
      });
      res.json(scholarships);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch scholarships" });
    }
  });

  app.get("/api/scholarships/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const scholarship = await storage.getScholarshipById(id);
      if (!scholarship) {
        return res.status(404).json({ error: "Scholarship not found" });
      }
      res.json(scholarship);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch scholarship" });
    }
  });

  // Study Materials API
  app.get("/api/study-materials", async (req, res) => {
    try {
      const { stream, subject, type } = req.query;
      const materials = await storage.getStudyMaterials({
        stream: stream as string,
        subject: subject as string,
        type: type as string,
      });
      res.json(materials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch study materials" });
    }
  });

  // Career Paths API
  app.get("/api/career-paths", async (req, res) => {
    try {
      const stream = req.query.stream as string;
      const careerPaths = await storage.getCareerPaths(stream);
      res.json(careerPaths);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch career paths" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
