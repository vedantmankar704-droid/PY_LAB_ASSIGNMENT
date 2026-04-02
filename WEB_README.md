# 🗳️ Advanced Online Polling & Voting System - WEB VERSION

A professional, full-stack web application for secure online voting with real-time analytics.

## 🎯 Tech Stack

- **Backend:** Flask (Python)
- **Frontend:** HTML5, CSS3, JavaScript
- **Database:** SQLite
- **Charts:** Chart.js
- **Styling:** Responsive CSS Grid

## ✨ Features

### 👤 User Features
- ✅ Secure voter login with ID verification
- ✅ Duplicate voting prevention
- ✅ Real-time vote casting
- ✅ Live results display
- ✅ Interactive pie & doughnut charts
- ✅ Responsive design (mobile-friendly)

### 🔐 Admin Features
- ✅ Admin password protected panel
- ✅ Real-time voting statistics
- ✅ Reset voting system
- ✅ Export results (CSV & TXT)
- ✅ Advanced charts and analytics
- ✅ Auto-refresh capabilities

### 🎨 UI/UX
- ✅ Modern gradient design
- ✅ Responsive layouts
- ✅ Real-time updates without page reload
- ✅ Smooth animations
- ✅ Mobile-optimized

## 🚀 Installation & Running

### Step 1: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 2: Run the Application

```bash
python web_app.py
```

### Step 3: Open in Browser

Navigate to: **http://localhost:5000**

## 📝 Default Credentials

**User Login:**
- Voter ID: Any unique ID
- Password: `user123`

**Admin Login:**
- Password: `admin123`

## 🗂️ Project Structure

```
voting_system/
├── web_app.py                    # Flask backend
├── requirements.txt              # Dependencies
├── voting_system.db             # SQLite database (auto-created)
├── templates/
│   ├── index.html               # Login page
│   ├── vote.html                # Voting page
│   ├── results.html             # Results page
│   ├── admin.html               # Admin login
│   └── admin_dashboard.html     # Admin panel
└── static/
    └── style.css                # Global styling
```

## 🔌 API Endpoints

### Authentication
- `POST /api/user-login` - User login
- `POST /api/admin-login` - Admin login
- `POST /api/logout` - Logout

### Voting
- `GET /api/candidates` - Get all candidates
- `POST /api/vote` - Cast a vote
- `GET /api/results` - Get current results
- `GET /api/voting-status` - Get voting statistics

### Admin
- `POST /api/admin/reset` - Reset voting system
- `GET /api/admin/export-csv` - Export to CSV
- `GET /api/admin/export-txt` - Export to TXT

## 📊 Database Schema

### Candidates Table
```sql
id | name | votes
```

### Voters Table
```sql
id | voter_id | voted | candidate_id | timestamp
```

## 🎮 Usage Guide

### For Users

1. **Login**
   - Click "User Login"
   - Enter any Voter ID
   - Enter password: `user123`

2. **Vote**
   - Select a candidate
   - Click "SUBMIT VOTE"
   - View live results

3. **View Results**
   - Click "VIEW RESULTS" button
   - See interactive pie chart
   - Statistics auto-update every 3 seconds

### For Admins

1. **Access Admin Panel**
   - Click "Admin Login" on home page
   - Enter password: `admin123`

2. **Manage Voting**
   - View real-time statistics
   - See interactive doughnut chart
   - Monitor voter participation

3. **Admin Controls**
   - **Reset:** Clear all votes and start fresh
   - **Export CSV:** Download results as spreadsheet
   - **Export TXT:** Download results as text
   - **Refresh:** Update statistics immediately

## 🔄 Real-Time Features

- ✅ Live vote counting (updates every 2 seconds)
- ✅ Real-time percentage calculations
- ✅ Automatic chart updates
- ✅ Live statistics refresh
- ✅ No page reload needed

## 📱 Responsive Design

- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 767px)

## 🛡️ Security Features

- Session-based authentication
- Duplicate voting prevention
- Voter ID validation
- Password protection for admin
- CORS enabled
- SQL query parameters

## 🎨 Color Scheme

- Primary: `#2C3E50` (Dark)
- Secondary: `#3498DB` (Blue)
- Success: `#27AE60` (Green)
- Danger: `#E74C3C` (Red)
- Warning: `#F39C12` (Orange)

## 📈 Charts

- **Pie Chart:** Vote distribution on results page
- **Doughnut Chart:** Vote distribution on admin panel
- **Progress Bars:** Live voting progress

## 🔧 Customization

### Change Candidates

Edit `web_app.py` line ~76:

```python
candidates = ['Your Candidate 1', 'Your Candidate 2', ...]
```

### Change Passwords

Edit `web_app.py`:
- Line ~30: `'user123'` → Change user password
- Line ~44: `'admin123'` → Change admin password

### Change Colors

Edit `static/style.css` variables (lines 20-28):

```css
:root {
    --primary: #2C3E50;
    --secondary: #3498DB;
    /* ... */
}
```

## 🌐 Deployment Options

### Local Development
```bash
python web_app.py
```

### Gunicorn (Production)
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 web_app:app
```

### Docker
```dockerfile
FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "web_app.py"]
```

### Heroku
```bash
git push heroku main
```

## 📊 Sample Workflow

1. **User Login**
   - Access http://localhost:5000
   - Click "User Login"
   - Enter Voter ID: "VOTER001"
   - Password: "user123"
   - ✓ Login successful

2. **Cast Vote**
   - Select "Candidate A"
   - Click "SUBMIT VOTE"
   - ✓ Vote recorded

3. **View Results**
   - Click "VIEW RESULTS"
   - See pie chart with vote distribution
   - Chart auto-updates every 3 seconds

4. **Admin Access**
   - Go back to home page
   - Click "Admin Login"
   - Password: "admin123"
   - ✓ Access admin dashboard

5. **Admin Controls**
   - View detailed statistics
   - See doughnut chart
   - Reset votes or export results

## 🐛 Troubleshooting

### Issue: Port 5000 already in use

**Solution:**
```bash
# Change port in web_app.py
app.run(debug=True, host='localhost', port=5001)
```

### Issue: Module not found

**Solution:**
```bash
pip install -r requirements.txt --force-reinstall
```

### Issue: Database locked

**Solution:**
- Delete `voting_system.db`
- Restart application
- Database will be recreated

### Issue: CORS errors

**Already handled** - CORS is enabled in `web_app.py`

## 📞 Support

Refer to `README.md` in the project root for additional documentation.

## ✅ Testing Checklist

- ✅ User login works
- ✅ Vote submission successful
- ✅ Results display correctly
- ✅ Admin login protected
- ✅ Reset functionality works
- ✅ CSV export works
- ✅ TXT export works
- ✅ Charts display correctly
- ✅ Real-time updates working
- ✅ Mobile responsive

## 🎓 Learning Outcomes

- ✅ Flask web framework
- ✅ RESTful API design
- ✅ SQLite database
- ✅ Frontend-backend integration
- ✅ JavaScript async operations
- ✅ Chart.js visualization
- ✅ Responsive CSS design
- ✅ Session management

## 📜 License

Educational Project - February 2026

---

**🚀 Ready to run! Start voting now!**

**Web Version: Fully Functional**
**Status: Production Ready**
