// seedCoreTeam.js
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "./serviceAccountKey.json" with { type: "json" }; // Pastikan path file JSON benar

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();
// === DATA YANG AKAN DISEED ===
const coreTeam = [
    // Lead
    { full_name: "Aisha Nuraini", role: "lead" },
    // Co Lead
    { full_name: "Amalia Sabila", role: "co_lead" },

    // Executives
    { full_name: "Vellanindhita NY", role: "executive", position: "Secretary 1" },
    { full_name: "RA Nur Afifah Widyadhana", role: "executive", position: "Secretary 2" },
    { full_name: "Aisyah Fatimah", role: "executive", position: "Treasurer 1" },
    { full_name: "Aulia Salsabella", role: "executive", position: "Treasurer 2" },
    { full_name: "Hani Aliya", role: "executive", position: "Treasurer 3" },

    // Core Team
    { full_name: "M Ilham Syafik", role: "core", position: "Frontend" },
    { full_name: "M Safarudin Pratama", role: "core", position: "Backend" },
    { full_name: "M Fazri Nizar", role: "core", position: "Mobile Development" },
    { full_name: "M Dzawil Fadhol A", role: "core", position: "Game Development" },
    { full_name: "Anissa Julianty", role: "core", position: "Cyber Security" },
    { full_name: "Natalia Oyong", role: "core", position: "UI/UX" },
    { full_name: "M Aditya Bayhaqie", role: "core", position: "Machine Learning" },

    { full_name: "M Raka Wilantara", role: "core", position: "Public Relation" },
    { full_name: "Juseia Wulandarai", role: "core", position: "Public Relation" },

    { full_name: "Zwesty Quatra", role: "core", position: "Human Resource" },
    { full_name: "Mei Intan Natasyah", role: "core", position: "Team Management" },

    { full_name: "Mutia Sahira", role: "core", position: "Project Management" },
    { full_name: "Diva Sarasvati Azzahra", role: "core", position: "Project Management" },

    { full_name: "Andini Marsha D", role: "core", position: "Creative" },
    { full_name: "Revia Najwa Fitriani", role: "core", position: "Copy Writing" },
    { full_name: "Muhafsyah Abdillah", role: "core", position: "Video" },
];

// === FUNCTION SEED ===
async function seed() {
    console.log("Seeding Core Team into Firestore...");

    try {
        const batch = db.batch(); // Gunakan batch untuk performa lebih baik

        for (const member of coreTeam) {
            // Gunakan db.collection bukan collection(db, ...) karena syntax Admin SDK beda sedikit
            const docRef = db.collection("users").doc();

            batch.set(docRef, {
                full_name: member.full_name,
                email: `${member.full_name.toLowerCase().replace(/\s+/g, "")}@example.com`,
                role: member.role,
                position: member.position || "",
                created_at: new Date(),
            });
            console.log(`Prepared: ${member.full_name}`);
        }

        await batch.commit(); // Eksekusi semua sekaligus
        console.log("DONE SEEDING!");
        process.exit(0);
    } catch (error) {
        console.error("ERROR SEEDING:", error);
        process.exit(1);
    }
}

seed();