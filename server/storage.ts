import { 
  type User, 
  type InsertUser, 
  type Assessment, 
  type InsertAssessment,
  type Question,
  type InsertQuestion,
  type College,
  type InsertCollege,
  type Scholarship,
  type InsertScholarship,
  type StudyMaterial,
  type InsertStudyMaterial,
  type CareerPath,
  type InsertCareerPath
} from "@shared/schema";
import { randomUUID } from "crypto";
import { readFileSync } from "fs";
import { join } from "path";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Assessments
  createAssessment(assessment: InsertAssessment): Promise<Assessment>;
  getAssessmentsByUserId(userId: string): Promise<Assessment[]>;
  
  // Questions
  getQuestionsByCategory(category: string): Promise<Question[]>;
  getAllQuestions(): Promise<Question[]>;
  createQuestion(question: InsertQuestion): Promise<Question>;
  
  // Colleges
  getColleges(filters?: {
    state?: string;
    district?: string;
    course?: string;
  }): Promise<College[]>;
  getCollegeById(id: string): Promise<College | undefined>;
  createCollege(college: InsertCollege): Promise<College>;
  
  // Scholarships
  getScholarships(filters?: {
    category?: string;
    educationLevel?: string;
    state?: string;
  }): Promise<Scholarship[]>;
  getScholarshipById(id: string): Promise<Scholarship | undefined>;
  createScholarship(scholarship: InsertScholarship): Promise<Scholarship>;
  
  // Study Materials
  getStudyMaterials(filters?: {
    stream?: string;
    subject?: string;
    type?: string;
  }): Promise<StudyMaterial[]>;
  createStudyMaterial(material: InsertStudyMaterial): Promise<StudyMaterial>;
  
  // Career Paths
  getCareerPaths(stream?: string): Promise<CareerPath[]>;
  createCareerPath(careerPath: InsertCareerPath): Promise<CareerPath>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private assessments: Map<string, Assessment> = new Map();
  private questions: Map<string, Question> = new Map();
  private colleges: Map<string, College> = new Map();
  private scholarships: Map<string, Scholarship> = new Map();
  private studyMaterials: Map<string, StudyMaterial> = new Map();
  private careerPaths: Map<string, CareerPath> = new Map();

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    this.loadQuestionsData();
    this.loadCollegesData();
    this.loadScholarshipsData();
    this.loadCareerPathsData();
    this.loadStudyMaterialsData();
  }

  private loadQuestionsData() {
    // Initialize with sample questions for assessment
    const sampleQuestions: InsertQuestion[] = [
      {
        category: "logical",
        question: "Which number comes next in the sequence: 2, 6, 12, 20, 30, ?",
        options: [
          { id: "a", text: "38" },
          { id: "b", text: "42" },
          { id: "c", text: "40" },
          { id: "d", text: "36" }
        ],
        correctAnswer: "b",
        order: 1
      },
      {
        category: "math",
        question: "If 3x + 7 = 22, what is the value of x?",
        options: [
          { id: "a", text: "3" },
          { id: "b", text: "5" },
          { id: "c", text: "7" },
          { id: "d", text: "4" }
        ],
        correctAnswer: "b",
        order: 2
      },
      {
        category: "verbal",
        question: "Choose the word that best completes the analogy: Book : Author :: Song : ?",
        options: [
          { id: "a", text: "Singer" },
          { id: "b", text: "Composer" },
          { id: "c", text: "Musician" },
          { id: "d", text: "Producer" }
        ],
        correctAnswer: "b",
        order: 3
      },
      {
        category: "interest",
        question: "Which activity interests you the most?",
        options: [
          { id: "a", text: "Designing graphics or creating art" },
          { id: "b", text: "Solving complex problems and analyzing data" },
          { id: "c", text: "Helping and interacting with people" },
          { id: "d", text: "Managing projects and leading teams" }
        ],
        correctAnswer: null,
        order: 4
      }
    ];

    sampleQuestions.forEach(q => this.createQuestion(q));
  }

  private loadCollegesData() {
    try {
      const csvPath = join(process.cwd(), 'server', 'data', 'colleges_dataset.csv');
      const csvData = readFileSync(csvPath, 'utf-8');
      const lines = csvData.split('\n').slice(1); // Skip header
      
      lines.forEach((line, index) => {
        if (line.trim()) {
          const [collegeId, collegeName, district, coursesOffered, cutoff, fees, seats, scholarshipAvailable] = line.split(',');
          
          const courses = coursesOffered.split(';').map(course => ({
            name: course.trim(),
            duration: course.includes('B.Tech') ? '4 years' : course.includes('MBBS') ? '5.5 years' : '3 years'
          }));

          const collegeData: InsertCollege = {
            name: collegeName.trim(),
            location: `${district.trim()}, Tamil Nadu`,
            state: "Tamil Nadu",
            district: district.trim(),
            type: "Government",
            courses: courses,
            cutoffs: { general: cutoff.trim() },
            fees: { annual: parseInt(fees.trim()) || 2000, hostel: 15000 },
            seats: parseInt(seats.trim()) || 100,
            scholarships: scholarshipAvailable.trim().toLowerCase() === 'yes',
            ranking: index + 1,
            accreditation: "NAAC A+"
          };

          this.createCollege(collegeData);
        }
      });
    } catch (error) {
      console.log('Could not load colleges CSV, using default data');
    }
  }

  private loadScholarshipsData() {
    try {
      const csvPath = join(process.cwd(), 'server', 'data', 'scholarships_dataset.csv');
      const csvData = readFileSync(csvPath, 'utf-8');
      const lines = csvData.split('\n').slice(1); // Skip header
      
      lines.forEach(line => {
        if (line.trim()) {
          const [scholarshipId, name, category, eligibility, amount, lastDate] = line.split(',');
          
          const scholarshipData: InsertScholarship = {
            name: name.trim(),
            provider: "Government of Tamil Nadu",
            category: category.toLowerCase().includes('merit') ? 'merit' : 
                     category.toLowerCase().includes('caste') ? 'caste' :
                     category.toLowerCase().includes('income') ? 'income' : 'minority',
            educationLevel: "undergraduate",
            amount: parseInt(amount.trim()) || 5000,
            eligibility: { criteria: eligibility.trim() },
            documents: ["Income Certificate", "Academic Marksheets", "Aadhaar Card", "Bank Details"],
            applicationDeadline: new Date(lastDate.trim() + "-2024"),
            state: "Tamil Nadu",
            isActive: true
          };

          this.createScholarship(scholarshipData);
        }
      });
    } catch (error) {
      console.log('Could not load scholarships CSV, using default data');
    }
  }

  private loadCareerPathsData() {
    try {
      const csvPath = join(process.cwd(), 'server', 'data', 'courses_dataset.csv');
      const csvData = readFileSync(csvPath, 'utf-8');
      const lines = csvData.split('\n').slice(1); // Skip header
      
      lines.forEach(line => {
        if (line.trim()) {
          const [courseId, courseName, careerPaths] = line.split(',');
          
          const stream = courseName.includes('B.Tech') || courseName.includes('B.Sc') ? 'science' :
                        courseName.includes('B.Com') || courseName.includes('MBA') ? 'commerce' :
                        courseName.includes('B.A') ? 'arts' : 'vocational';

          const careers = careerPaths.split(';').map(career => career.trim());

          const careerPathData: InsertCareerPath = {
            stream: stream,
            course: courseName.trim(),
            careers: careers,
            salaryRange: "₹3-15 LPA",
            skills: ["Technical Skills", "Communication", "Problem Solving"],
            futureOpportunities: ["Higher Studies", "Government Jobs", "Private Sector"]
          };

          this.createCareerPath(careerPathData);
        }
      });
    } catch (error) {
      console.log('Could not load career paths CSV, using default data');
    }
  }

  private loadStudyMaterialsData() {
    // Add Tamil Nadu specific study materials
    const studyMaterials: InsertStudyMaterial[] = [
      {
        title: "Tamil Nadu State Board Physics",
        stream: "science",
        subject: "physics",
        type: "pdf",
        description: "Complete Physics notes for TN State Board",
        url: "#",
        downloadUrl: "#",
        level: "class 12"
      },
      {
        title: "Tamil Nadu History Guide",
        stream: "arts",
        subject: "history",
        type: "pdf",
        description: "Tamil Nadu history and culture guide",
        url: "#",
        downloadUrl: "#",
        level: "class 12"
      },
      {
        title: "Commerce Practical Guide",
        stream: "commerce",
        subject: "accountancy",
        type: "pdf",
        description: "Practical accounting for Tamil Nadu students",
        url: "#",
        downloadUrl: "#",
        level: "undergraduate"
      }
    ];

    studyMaterials.forEach(material => this.createStudyMaterial(material));
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Assessments
  async createAssessment(insertAssessment: InsertAssessment): Promise<Assessment> {
    const id = randomUUID();
    const assessment: Assessment = { 
      ...insertAssessment, 
      id,
      completedAt: new Date()
    };
    this.assessments.set(id, assessment);
    return assessment;
  }

  async getAssessmentsByUserId(userId: string): Promise<Assessment[]> {
    return Array.from(this.assessments.values()).filter(
      assessment => assessment.userId === userId
    );
  }

  // Questions
  async getQuestionsByCategory(category: string): Promise<Question[]> {
    return Array.from(this.questions.values())
      .filter(q => q.category === category)
      .sort((a, b) => a.order - b.order);
  }

  async getAllQuestions(): Promise<Question[]> {
    return Array.from(this.questions.values())
      .sort((a, b) => a.order - b.order);
  }

  async createQuestion(insertQuestion: InsertQuestion): Promise<Question> {
    const id = randomUUID();
    const question: Question = { ...insertQuestion, id };
    this.questions.set(id, question);
    return question;
  }

  // Colleges
  async getColleges(filters?: {
    state?: string;
    district?: string;
    course?: string;
  }): Promise<College[]> {
    let colleges = Array.from(this.colleges.values());
    
    if (filters?.state) {
      colleges = colleges.filter(c => c.state.toLowerCase() === filters.state?.toLowerCase());
    }
    if (filters?.district) {
      colleges = colleges.filter(c => c.district.toLowerCase() === filters.district?.toLowerCase());
    }
    if (filters?.course) {
      colleges = colleges.filter(c => 
        JSON.stringify(c.courses).toLowerCase().includes(filters.course?.toLowerCase() || '')
      );
    }
    
    return colleges;
  }

  async getCollegeById(id: string): Promise<College | undefined> {
    return this.colleges.get(id);
  }

  async createCollege(insertCollege: InsertCollege): Promise<College> {
    const id = randomUUID();
    const college: College = { ...insertCollege, id };
    this.colleges.set(id, college);
    return college;
  }

  // Scholarships
  async getScholarships(filters?: {
    category?: string;
    educationLevel?: string;
    state?: string;
  }): Promise<Scholarship[]> {
    let scholarships = Array.from(this.scholarships.values()).filter(s => s.isActive);
    
    if (filters?.category) {
      scholarships = scholarships.filter(s => s.category === filters.category);
    }
    if (filters?.educationLevel) {
      scholarships = scholarships.filter(s => s.educationLevel === filters.educationLevel);
    }
    if (filters?.state) {
      scholarships = scholarships.filter(s => !s.state || s.state === filters.state);
    }
    
    return scholarships;
  }

  async getScholarshipById(id: string): Promise<Scholarship | undefined> {
    return this.scholarships.get(id);
  }

  async createScholarship(insertScholarship: InsertScholarship): Promise<Scholarship> {
    const id = randomUUID();
    const scholarship: Scholarship = { ...insertScholarship, id };
    this.scholarships.set(id, scholarship);
    return scholarship;
  }

  // Study Materials
  async getStudyMaterials(filters?: {
    stream?: string;
    subject?: string;
    type?: string;
  }): Promise<StudyMaterial[]> {
    let materials = Array.from(this.studyMaterials.values());
    
    if (filters?.stream) {
      materials = materials.filter(m => m.stream === filters.stream);
    }
    if (filters?.subject) {
      materials = materials.filter(m => m.subject === filters.subject);
    }
    if (filters?.type) {
      materials = materials.filter(m => m.type === filters.type);
    }
    
    return materials;
  }

  async createStudyMaterial(insertMaterial: InsertStudyMaterial): Promise<StudyMaterial> {
    const id = randomUUID();
    const material: StudyMaterial = { ...insertMaterial, id };
    this.studyMaterials.set(id, material);
    return material;
  }

  // Career Paths
  async getCareerPaths(stream?: string): Promise<CareerPath[]> {
    let paths = Array.from(this.careerPaths.values());
    
    if (stream) {
      paths = paths.filter(p => p.stream === stream);
    }
    
    return paths;
  }

  async createCareerPath(insertCareerPath: InsertCareerPath): Promise<CareerPath> {
    const id = randomUUID();
    const careerPath: CareerPath = { ...insertCareerPath, id };
    this.careerPaths.set(id, careerPath);
    return careerPath;
  }
}

export const storage = new MemStorage();
