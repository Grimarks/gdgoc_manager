GDGoC UNSRI Management Platform

Platform manajemen internal untuk **Google Developer Groups on Campus (GDGoC) Universitas Sriwijaya**. Aplikasi ini dirancang untuk mempermudah pengelolaan anggota, proyek, acara, dan tim inti komunitas.

🔗 **Live Demo:** [https://gdgoc-manager.vercel.app](https://www.google.com/url?sa=E&source=gmail&q=https://gdgoc-manager.vercel.app)

## ✨ Fitur Utama

  * **📊 Dashboard Interaktif**: Melihat statistik anggota, acara, dan aktivitas terbaru.
  * **👥 Manajemen Anggota**: Daftar anggota lengkap dengan fitur pencarian, filter role, dan manajemen (CRUD) untuk Lead/Co-Lead.
  * **📂 Manajemen Proyek**: Pelacakan status proyek, progress bar, dan tenggat waktu per divisi.
  * **📅 Event Organizer**: (Coming Soon) Perencanaan dan manajemen acara komunitas.
  * **🏆 Core Team View**: Tampilan khusus untuk struktur organisasi tim inti.
  * **🔐 Autentikasi**: Login dan Register menggunakan Firebase Auth.
  * **📱 Responsif**: Tampilan sidebar yang adaptif untuk desktop dan mobile.

## 🛠️ Tech Stack

Aplikasi ini dibangun menggunakan teknologi modern:

  * **Frontend**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
  * **Styling**: [Tailwind CSS](https://tailwindcss.com/)
  * **UI Components**: [Shadcn UI](https://ui.shadcn.com/) / [Radix UI](https://www.radix-ui.com/)
  * **Backend & Database**: [Firebase](https://firebase.google.com/) (Authentication, Firestore)
  * **State Management**: [TanStack Query](https://tanstack.com/query/latest)
  * **Routing**: [React Router DOM](https://reactrouter.com/)
  * **Icons**: [Lucide React](https://lucide.dev/)

## ⚙️ Prasyarat

Sebelum menjalankan proyek ini, pastikan Anda telah menginstal:

  * [Node.js](https://nodejs.org/) (Versi 18 atau lebih baru direkomendasikan)
  * [npm](https://www.npmjs.com/) atau yarn

## 🚀 Cara Menjalankan (Instalasi)

Ikuti langkah-langkah berikut untuk menjalankan proyek di komputer lokal Anda:

### 1\. Clone Repository

```bash
git clone https://github.com/username-anda/gdgoc-manager.git
cd gdgoc-manager
```

### 2\. Install Dependencies

Install semua library yang dibutuhkan:

```bash
npm install
```

### 3\. Konfigurasi Environment Variable

Buat file `.env` di root folder proyek Anda, lalu salin konfigurasi berikut dan isi dengan kredensial Firebase Anda:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=gdgocmanager.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=gdgocmanager
VITE_FIREBASE_STORAGE_BUCKET=gdgocmanager.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```

> **Catatan:** Pastikan Anda telah membuat project di Firebase Console dan mengaktifkan **Authentication** (Email/Password) serta **Firestore Database**.

### 4\. Jalankan Aplikasi

Jalankan server development lokal:

```bash
npm run dev
```

Buka browser dan akses `http://localhost:5173`.


## 📂 Struktur Proyek

```
gdgoc-manager/
├── public/              # Aset statis
│
├── src/
│   ├── components/      # Komponen UI (Button, Card, Sidebar, dll)
│   ├── hooks/           # Custom hooks (useAuth, useMobile, dll)
│   ├── lib/             # Konfigurasi utilitas (firebase.js, utils.js)
│   ├── Pages/           # Halaman utama (Dashboard, Members, Projects, dll)
│   ├── App.jsx          # Root component & Routing
│   └── index.css        # Global styling & Tailwind config
├── .env                 # Environment variables
├── index.html           # Entry point HTML
└── package.json         # Dependencies & scripts
```
