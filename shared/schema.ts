import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const assessments = pgTable("assessments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  category: text("category").notNull(), // logical, math, verbal, interest
  responses: jsonb("responses").notNull(), // array of question-answer pairs
  scores: jsonb("scores").notNull(), // calculated scores for each category
  completedAt: timestamp("completed_at").defaultNow(),
});

export const questions = pgTable("questions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  category: text("category").notNull(),
  question: text("question").notNull(),
  options: jsonb("options").notNull(), // array of option objects
  correctAnswer: text("correct_answer"),
  order: integer("order").notNull(),
});

export const colleges = pgTable("colleges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  location: text("location").notNull(),
  state: text("state").notNull(),
  district: text("district").notNull(),
  type: text("type").notNull(), // government, autonomous, etc.
  courses: jsonb("courses").notNull(), // array of course objects
  cutoffs: jsonb("cutoffs").notNull(), // cutoff data by category
  fees: jsonb("fees").notNull(), // fee structure
  seats: integer("seats").notNull(),
  scholarships: boolean("scholarships").default(false),
  ranking: integer("ranking"),
  accreditation: text("accreditation"),
});

export const scholarships = pgTable("scholarships", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  provider: text("provider").notNull(),
  category: text("category").notNull(), // merit, caste, income, minority
  educationLevel: text("education_level").notNull(),
  amount: integer("amount").notNull(),
  eligibility: jsonb("eligibility").notNull(),
  documents: jsonb("documents").notNull(), // required documents
  applicationDeadline: timestamp("application_deadline"),
  state: text("state"),
  isActive: boolean("is_active").default(true),
});

export const studyMaterials = pgTable("study_materials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  stream: text("stream").notNull(), // science, commerce, arts, vocational
  subject: text("subject").notNull(),
  type: text("type").notNull(), // pdf, video, test, notes
  description: text("description"),
  url: text("url"),
  downloadUrl: text("download_url"),
  duration: text("duration"), // for videos
  level: text("level"), // class 11, 12, jee, neet, etc.
});

export const careerPaths = pgTable("career_paths", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  stream: text("stream").notNull(),
  course: text("course").notNull(),
  careers: jsonb("careers").notNull(), // array of career options
  salaryRange: text("salary_range"),
  skills: jsonb("skills").notNull(), // required skills
  futureOpportunities: jsonb("future_opportunities").notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertAssessmentSchema = createInsertSchema(assessments).omit({
  id: true,
  completedAt: true,
});

export const insertQuestionSchema = createInsertSchema(questions).omit({
  id: true,
});

export const insertCollegeSchema = createInsertSchema(colleges).omit({
  id: true,
});

export const insertScholarshipSchema = createInsertSchema(scholarships).omit({
  id: true,
});

export const insertStudyMaterialSchema = createInsertSchema(studyMaterials).omit({
  id: true,
});

export const insertCareerPathSchema = createInsertSchema(careerPaths).omit({
  id: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Assessment = typeof assessments.$inferSelect;
export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type Question = typeof questions.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
export type College = typeof colleges.$inferSelect;
export type InsertCollege = z.infer<typeof insertCollegeSchema>;
export type Scholarship = typeof scholarships.$inferSelect;
export type InsertScholarship = z.infer<typeof insertScholarshipSchema>;
export type StudyMaterial = typeof studyMaterials.$inferSelect;
export type InsertStudyMaterial = z.infer<typeof insertStudyMaterialSchema>;
export type CareerPath = typeof careerPaths.$inferSelect;
export type InsertCareerPath = z.infer<typeof insertCareerPathSchema>;
