# JobNest - Job Portal Project Setup Guide

Ye ek complete setup guide hai agar aap is project ko zip karke kisi aur ko dena chahte hain. Unhe project run karne ke liye niche diye gaye steps follow karne honge.

## 📌 Prerequisites (Kya Install Hona Chahiye)
Bina inke project run nahi hoga. Unke system me ye install hona zaroori hai:
1. **Python** (version 3.9 ya usse upar) - Backend ke liye.
2. **Node.js** (version 18 ya usse upar) - Frontend ke liye.

## 🚀 Step-by-Step Setup Structure

### 1. Extract the Zip File
Sabse pehle project ke `.zip` file ko apne system me extract (unzip) karein aur us folder ko VS Code (ya kisi aur code editor) me open karein.

### 2. Backend Setup (Django)
Backend ko run karne ke liye VS Code me naya terminal open karein aur ye commands run karein:

```bash
# 1. Backend folder me jayein
cd backend

# 2. Virtual Environment banayein (taaki dependencies system ke sath clash na ho)
python -m venv venv

# 3. Virtual Environment ko activate karein (Windows ke liye)
venv\Scripts\activate

# (Mac/Linux users ke liye: source venv/bin/activate)

# 4. Saari required Python packages install karein
pip install -r requirements.txt

# 5. Database setup karein (Django ke migrations run karke)
cd jobportal
python manage.py makemigrations
python manage.py migrate

# 6. Admin panel access karne ke liye superuser banayein (Optional)
python manage.py createsuperuser

# 7. Backend server start karein
python manage.py runserver
```
👉 Server start hone ke baad backend API yaha chalegi: **http://127.0.0.1:8000/**

### 3. Frontend Setup (React/Vite)
Frontend ko run karne ke liye VS Code me ek **naya (dusra)** terminal open karein aur ye commands chalayein:

```bash
# 1. Frontend folder me jayein
cd frontend/job-portal

# 2. Saari frontend dependencies install karein
npm install

# 3. Frontend server start karein
npm run dev
```
👉 Server start hone ke baad frontend application yaha chalegi: **http://localhost:5173/**

## 🛠 Project Structure Overview
- `backend/`: Django project files.
  - `requirements.txt`: Saari python libraries ki list (Maine isko abhi manually generate karke aapke project me add kar diya hai).
  - `jobportal/`: Main backend code and API logic.
- `frontend/job-portal/`: React (Vite) project files.
  - `package.json`: Node dependencies ki list.
  - `src/`: UI components, pages, aur routing logic.

## 📝 Zaroori Baatein (Important Notes for the User)
- Project ko test karne ke liye **dono terminals (frontend aur backend)** ek hi time par chalte rehne chahiye.
- Jab dusra insaan ise chalaayega, to uska database fresh hoga. Unhe register page se naya account banana padega ya terminal me `createsuperuser` banakar login karna hoga.
- Zip karne se pehle, aap apne folders me se `venv/` (backend me) aur `node_modules/` (frontend me) folders ko delete kar sakte hain taki zip file ka size chhota ho jaye (wo folders samne wale ke PC me `pip install` aur `npm install` command se apne aap ban jayenge).
