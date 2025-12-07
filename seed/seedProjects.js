// seedProjects.js
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import serviceAccount from "./serviceAccountKey.json" with { type: "json" };

// Init Firebase Admin
initializeApp({
    credential: cert(serviceAccount),
});

const db = getFirestore();

// ==========================
// 🔹 PROJECT LIST (format lengkap)
// ==========================
const projectsData = [
    {
        title: "GDGoC Landing Page Enhancement",
        description: "Improving landing page animation, accessibility, and performance optimization.",
        division: "Front End Development",
        status: "ongoing",
        progress: 45,
        deadline: "Maret 2026",
        created_by: "Nabil Pasha",
    },
    {
        title: "Component Library Refactoring",
        description: "Refactoring UI components for better reusability and cleaner architecture.",
        division: "Front End Development",
        status: "planning",
        progress: 20,
        deadline: "April 2026",
        created_by: "Affan Madley",
    },
    {
        title: "Admin Dashboard Interface",
        description: "Building a modern dashboard for internal GDGoC management tools.",
        division: "Front End Development",
        status: "ongoing",
        progress: 55,
        deadline: "Februari 2026",
        created_by: "Julio Syah Putra",
    },
    {
        title: "Design System Color & Typography Revamp",
        description: "Redesigning typography scale and color palette to align with Google standards.",
        division: "Front End Development",
        status: "planning",
        progress: 15,
        deadline: "Juni 2026",
        created_by: "Fannysia Arum Sari",
    },
    {
        title: "Event Registration UI/UX Flow",
        description: "Creating a smooth and intuitive UI flow for event registration.",
        division: "Front End Development",
        status: "ongoing",
        progress: 60,
        deadline: "Mei 2026",
        created_by: "Nicolaus Owen Marvell",
    },

    {
        title: "Authentication Service Hardening",
        description: "Upgrading authentication flow with better validation and token security.",
        division: "Back End Development",
        status: "ongoing",
        progress: 50,
        deadline: "Maret 2026",
        created_by: "Diam Kharisma Ramadian",
    },
    {
        title: "User Analytics API",
        description: "Building an event-based analytics API for user activity tracking.",
        division: "Back End Development",
        status: "planning",
        progress: 25,
        deadline: "Juli 2026",
        created_by: "Maulana Adiatma",
    },
    {
        title: "Cloud Function Migration",
        description: "Migrating server logic into modular Firebase Cloud Functions.",
        division: "Back End Development",
        status: "ongoing",
        progress: 35,
        deadline: "Oktober 2026",
        created_by: "Abdul 'Aziz",
    },
    {
        title: "Database Schema Optimization",
        description: "Optimizing collections, indexes, and schema to reduce Firestore read costs.",
        division: "Back End Development",
        status: "ongoing",
        progress: 65,
        deadline: "Desember 2025",
        created_by: "M. Naufal Rafif Pratama",
    },
    {
        title: "Notification Service",
        description: "Developing real-time notification service for all app modules.",
        division: "Back End Development",
        status: "planning",
        progress: 10,
        deadline: "Akhir 2025",
        created_by: "Adhia Rihal Sulaiman",
    },
    {
        title: "GDGoC Mobile Dashboard",
        description: "Building a mobile dashboard for internal team and event monitoring.",
        division: "Mobile Development",
        status: "ongoing",
        progress: 40,
        deadline: "Maret 2026",
        created_by: "Fachry Ghifary",
    },
    {
        title: "Event Reminder Push Notifications",
        description: "Integrating FCM push notifications for event scheduling.",
        division: "Mobile Development",
        status: "planning",
        progress: 15,
        deadline: "April 2026",
        created_by: "Muhammad Arief Pratama",
    },
    {
        title: "Mobile UI Kit",
        description: "Designing reusable UI components for Android & iOS interfaces.",
        division: "Mobile Development",
        status: "ongoing",
        progress: 50,
        deadline: "Januari 2026",
        created_by: "Ahmad Bintara Mansur",
    },
    {
        title: "QR-Based Attendance Scanner",
        description: "Developing QR scanner for event check-in and attendance validation.",
        division: "Mobile Development",
        status: "ongoing",
        progress: 70,
        deadline: "Desember 2025",
        created_by: "Muhammad Rizki Sepriadi",
    },
    {
        title: "Offline Mode Cache System",
        description: "Implementing local storage & offline caching for mobile sessions.",
        division: "Mobile Development",
        status: "planning",
        progress: 25,
        deadline: "Juni 2026",
        created_by: "Muhammad Suheil Ichma Putra",
    },

];

// ==========================
// 🔹 Seed Function
// ==========================
async function seedProjects() {
    console.log("Seeding Projects into Firestore...");

    try {
        const batch = db.batch();
        const ref = db.collection("projects");

        projectsData.forEach((project) => {
            const doc = ref.doc();

            batch.set(doc, {
                title: project.title,
                description: project.description,
                division: project.division,
                status: project.status,
                progress: project.progress,
                deadline: project.deadline,
                created_by: project.created_by,

                // timestamp Firestore wajib pakai Timestamp.fromDate
                created_at: Timestamp.fromDate(new Date("2025-12-04T10:48:44+07:00")),
            });
        });

        await batch.commit();
        console.log("Projects SEEDING SUCCESS ✔️");
        process.exit(0);
    } catch (err) {
        console.error("ERROR SEEDING PROJECTS:", err);
        process.exit(1);
    }
}

seedProjects();
