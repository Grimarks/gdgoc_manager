// seedMembers.js
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "./serviceAccountKey.json" with { type: "json" };

// Init Firebase Admin
initializeApp({
    credential: cert(serviceAccount),
});

const db = getFirestore();

// ==========================
// 🔹 FULL MEMBER LIST
// ==========================
const membersData = [
    // Project Management
    { full_name: "Marizka Riffiy Alfiyah", division: "Project Management", role: "member" },
    { full_name: "Olivin Putri Ditama", division: "Project Management", role: "member" },
    { full_name: "Ilma Sari", division: "Project Management", role: "member" },
    { full_name: "M. Dimas Anwar", division: "Project Management", role: "member" },
    { full_name: "Moza Gina Aliya", division: "Project Management", role: "member" },
    { full_name: "Muhammad Wahyu Hikmalsyah", division: "Project Management", role: "member" },
    { full_name: "Riselva Putri Zaura", division: "Project Management", role: "member" },
    { full_name: "M. Ghalib Assiddiq Gusri", division: "Project Management", role: "member" },
    { full_name: "Syakirah Febriani", division: "Project Management", role: "member" },
    { full_name: "Nailah Nazhirah", division: "Project Management", role: "member" },

    // Public Relations
    { full_name: "Daffa Imanudzorif", division: "Public Relations", role: "member" },
    { full_name: "Ulva Khairunnisya", division: "Public Relations", role: "member" },
    { full_name: "Inayah Khofifah Danis", division: "Public Relations", role: "member" },
    { full_name: "Naufal Nazhif Almaulidzar", division: "Public Relations", role: "member" },
    { full_name: "Mona Annisa Komering", division: "Public Relations", role: "member" },
    { full_name: "M. Aditya Nirwansya Putra", division: "Public Relations", role: "member" },
    { full_name: "Metta Karuna", division: "Public Relations", role: "member" },
    { full_name: "Violin Juneyla Nandita", division: "Public Relations", role: "member" },

    // Front End Development
    { full_name: "Ferdianto", division: "Front End Development", role: "member" },
    { full_name: "M. Rabyndra Janitra Binello", division: "Front End Development", role: "member" },
    { full_name: "Darrell Satriano", division: "Front End Development", role: "member" },
    { full_name: "Leonardo Gunawan", division: "Front End Development", role: "member" },
    { full_name: "Nabila Ayu Talita", division: "Front End Development", role: "member" },
    { full_name: "Monica Amrina Rosyada", division: "Front End Development", role: "member" },
    { full_name: "Nabil Pasha", division: "Front End Development", role: "member" },
    { full_name: "Affan Madley", division: "Front End Development", role: "member" },
    { full_name: "Julio Syah Putra", division: "Front End Development", role: "member" },
    { full_name: "Fannysia Arum Sari", division: "Front End Development", role: "member" },
    { full_name: "Nicolaus Owen Marvell", division: "Front End Development", role: "member" },

    // Back End Development
    { full_name: "Diam Kharisma Ramadian", division: "Back End Development", role: "member" },
    { full_name: "Maulana Adiatma", division: "Back End Development", role: "member" },
    { full_name: "Abdul 'Aziz", division: "Back End Development", role: "member" },
    { full_name: "M. Naufal Rafif Pratama", division: "Back End Development", role: "member" },
    { full_name: "Adhia Rihal Sulaiman", division: "Back End Development", role: "member" },
    { full_name: "Ahmad Fadhil Rizqi", division: "Back End Development", role: "member" },
    { full_name: "Andhika Pratama", division: "Back End Development", role: "member" },
    { full_name: "Kenz Raki Abdurrazak", division: "Back End Development", role: "member" },
    { full_name: "Depo Sadrila Hadi", division: "Back End Development", role: "member" },
    { full_name: "Arjun Elvas Janggiara", division: "Back End Development", role: "member" },
    { full_name: "Zildjian Vito Sulaiman", division: "Back End Development", role: "member" },
    { full_name: "Steven", division: "Back End Development", role: "member" },

    // Mobile Development
    { full_name: "Fachry Ghifary", division: "Mobile Development", role: "member" },
    { full_name: "Muhammad Arief Pratama", division: "Mobile Development", role: "member" },
    { full_name: "Ahmad Bintara Mansur", division: "Mobile Development", role: "member" },
    { full_name: "Muhammad Rizki Sepriadi", division: "Mobile Development", role: "member" },
    { full_name: "Muhammad Suheil Ichma Putra", division: "Mobile Development", role: "member" },
    { full_name: "M Haikal Ash Shiddiq", division: "Mobile Development", role: "member" },
    { full_name: "Farhan Abel Rantisi", division: "Mobile Development", role: "member" },
    { full_name: "Syakillah Nachwa", division: "Mobile Development", role: "member" },
    { full_name: "Dayana Khoiriyah Harahap", division: "Mobile Development", role: "member" },
    { full_name: "Najwa Ainayah", division: "Mobile Development", role: "member" },
];

// ==========================
// 🔹 Seed Function
// ==========================
async function seedMembers() {
    console.log("Seeding Members into Firestore...");

    try {
        const batch = db.batch();
        const ref = db.collection("users");

        membersData.forEach((member) => {
            const doc = ref.doc();

            batch.set(doc, {
                full_name: member.full_name,
                division: member.division,
                role: member.role,
                created_at: new Date(),
                email: `${member.full_name
                    .toLowerCase()
                    .replace(/[^a-z]/g, "")}@example.com`,
            });
        });

        await batch.commit();
        console.log("Members SEEDING SUCCESS ✔️");
        process.exit(0);
    } catch (err) {
        console.error("ERROR SEEDING MEMBERS:", err);
        process.exit(1);
    }
}

seedMembers();
