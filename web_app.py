"""
Advanced Online Polling & Voting System - Web Version
Flask Backend with SQLite Database
"""

from flask import Flask, render_template, request, jsonify, session
from flask_cors import CORS
import sqlite3
import os
import csv
import io
from datetime import datetime
from functools import wraps
import hashlib

# ============================================================================
# FLASK APP SETUP
# ============================================================================

app = Flask(__name__)
app.secret_key = 'voting_system_secret_key_2024'
CORS(app)

# Database configuration
DATABASE = 'voting_system.db'

# ============================================================================
# DATABASE FUNCTIONS
# ============================================================================

def get_db():
    """Get database connection"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initialize database with tables (idempotent)."""
    conn = get_db()
    cursor = conn.cursor()

    # create tables if they don't exist
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS candidates (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            votes INTEGER DEFAULT 0
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS voters (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            voter_id TEXT UNIQUE NOT NULL,
            voted INTEGER DEFAULT 0,
            candidate_id INTEGER,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # insert default candidates if table is empty
    cursor.execute('SELECT COUNT(*) as cnt FROM candidates')
    count = cursor.fetchone()['cnt']
    if count == 0:
        candidates = ['Candidate A', 'Candidate B', 'Candidate C', 'Candidate D']
        for candidate in candidates:
            cursor.execute('INSERT INTO candidates (name, votes) VALUES (?, ?)', (candidate, 0))

    conn.commit()
    conn.close()

def login_required(f):
    """Decorator to check if user is logged in"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'voter_id' not in session:
            return jsonify({'error': 'Not logged in'}), 401
        return f(*args, **kwargs)
    return decorated_function

def admin_required(f):
    """Decorator to check if admin is logged in"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'admin' not in session or not session['admin']:
            return jsonify({'error': 'Admin access required'}), 401
        return f(*args, **kwargs)
    return decorated_function

# ============================================================================
# ROUTE: HOME / LOGIN
# ============================================================================

@app.route('/')
def index():
    """Home page - Login screen"""
    return render_template('index.html')

# ============================================================================
# API: USER LOGIN
# ============================================================================

# ============================================================================
# API: USER LOGIN
# ============================================================================

@app.route('/api/user-login', methods=['POST'])
def user_login():
    """User login endpoint"""
    data = request.json
    voter_id = data.get('voter_id', '').strip()
    password = data.get('password', '').strip()
    
    if not voter_id:
        return jsonify({'error': 'Please enter Voter ID'}), 400
    
    if password != 'user123':
        return jsonify({'error': 'Invalid password'}), 401
    
    conn = get_db()
    cursor = conn.cursor()
    
    # Check if voter already voted
    cursor.execute('SELECT * FROM voters WHERE voter_id = ?', (voter_id,))
    voter = cursor.fetchone()
    
    if voter and voter['voted']:
        conn.close()
        return jsonify({'error': 'This Voter ID has already voted!'}), 400
    
    conn.close()
    
    # Set session
    session['voter_id'] = voter_id
    session['admin'] = False
    
    return jsonify({'success': True, 'message': 'Login successful'})

# ============================================================================
# API: ADMIN LOGIN
# ============================================================================

@app.route('/api/admin-login', methods=['POST'])
def admin_login():
    """Admin login endpoint"""
    data = request.json
    password = data.get('password', '').strip()
    
    if password != 'admin123':
        return jsonify({'error': 'Invalid admin password'}), 401
    
    session['admin'] = True
    
    return jsonify({'success': True, 'message': 'Admin login successful'})

# ============================================================================
# API: USER LOGOUT
# ============================================================================

@app.route('/api/logout', methods=['POST'])
def logout():
    """Logout endpoint"""
    session.clear()
    return jsonify({'success': True})

# ============================================================================
# ROUTE: VOTING PAGE
# ============================================================================

@app.route('/voting')
@login_required
def voting_page():
    """Voting page"""
    return render_template('vote.html', voter_id=session.get('voter_id'))

# ============================================================================
# API: GET CANDIDATES
# ============================================================================

@app.route('/api/candidates')
def get_candidates():
    """Get all candidates"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM candidates')
    candidates = cursor.fetchall()
    conn.close()
    
    return jsonify([dict(c) for c in candidates])

# ============================================================================
# API: CAST VOTE
# ============================================================================

@app.route('/api/vote', methods=['POST'])
@login_required
def cast_vote():
    """Cast a vote"""
    data = request.json
    voter_id = session.get('voter_id')
    candidate_id = data.get('candidate_id')
    
    if not candidate_id:
        return jsonify({'error': 'Please select a candidate'}), 400
    
    conn = get_db()
    cursor = conn.cursor()
    
    # Check if voter already voted
    cursor.execute('SELECT * FROM voters WHERE voter_id = ?', (voter_id,))
    voter = cursor.fetchone()
    
    if voter and voter['voted']:
        conn.close()
        return jsonify({'error': 'This Voter ID has already voted!'}), 400
    
    try:
        # Insert or update voter record
        if voter:
            cursor.execute(
                'UPDATE voters SET voted = 1, candidate_id = ? WHERE voter_id = ?',
                (candidate_id, voter_id)
            )
        else:
            cursor.execute(
                'INSERT INTO voters (voter_id, voted, candidate_id) VALUES (?, 1, ?)',
                (voter_id, candidate_id)
            )
        
        # Update candidate vote count
        cursor.execute('UPDATE candidates SET votes = votes + 1 WHERE id = ?', (candidate_id,))
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': 'Vote recorded successfully'})
    
    except Exception as e:
        conn.close()
        return jsonify({'error': str(e)}), 500

# ============================================================================
# API: GET RESULTS
# ============================================================================

@app.route('/api/results')
def get_results():
    """Get voting results"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM candidates')
    candidates = cursor.fetchall()
    
    cursor.execute('SELECT COUNT(*) as total FROM voters WHERE voted = 1')
    total_votes = cursor.fetchone()['total']
    
    conn.close()
    
    results = []
    winner = None
    max_votes = 0
    
    for candidate in candidates:
        percentage = (candidate['votes'] / total_votes * 100) if total_votes > 0 else 0
        results.append({
            'id': candidate['id'],
            'name': candidate['name'],
            'votes': candidate['votes'],
            'percentage': round(percentage, 2)
        })
        
        if candidate['votes'] > max_votes:
            max_votes = candidate['votes']
            winner = candidate['name']
    
    return jsonify({
        'results': results,
        'total_votes': total_votes,
        'winner': winner if max_votes > 0 else 'No votes yet'
    })

# ============================================================================
# ROUTE: RESULTS PAGE
# ============================================================================

@app.route('/results')
def results_page():
    """Results page"""
    return render_template('results.html')

# ============================================================================
# ROUTE: ADMIN PAGE
# ============================================================================

@app.route('/admin')
def admin_page():
    """Admin login page"""
    return render_template('admin.html')

# ============================================================================
# ROUTE: ADMIN DASHBOARD
# ============================================================================

@app.route('/admin/dashboard')
@admin_required
def admin_dashboard():
    """Admin dashboard page"""
    return render_template('admin_dashboard.html')

# ============================================================================
# API: ADMIN RESET
# ============================================================================

@app.route('/api/admin/reset', methods=['POST'])
@admin_required
def admin_reset():
    """Reset all voting data"""
    conn = get_db()
    cursor = conn.cursor()
    
    try:
        cursor.execute('UPDATE candidates SET votes = 0')
        cursor.execute('DELETE FROM voters')
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': 'Voting system reset successfully'})
    except Exception as e:
        conn.close()
        return jsonify({'error': str(e)}), 500

# ============================================================================
# API: ADMIN EXPORT (CSV)
# ============================================================================

@app.route('/api/admin/export-csv')
@admin_required
def export_csv():
    """Export results to CSV"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM candidates')
    candidates = cursor.fetchall()
    
    cursor.execute('SELECT COUNT(*) as total FROM voters WHERE voted = 1')
    total_votes = cursor.fetchone()['total']
    
    conn.close()
    
    # Create CSV content
    output = io.StringIO()
    writer = csv.writer(output)
    
    writer.writerow(['Candidate', 'Votes', 'Percentage'])
    
    for candidate in candidates:
        percentage = (candidate['votes'] / total_votes * 100) if total_votes > 0 else 0
        writer.writerow([candidate['name'], candidate['votes'], f"{percentage}%"])
    
    writer.writerow([])
    writer.writerow(['Total Votes', total_votes, '100%'])
    writer.writerow(['Timestamp', datetime.now().strftime('%Y-%m-%d %H:%M:%S'), ''])
    
    csv_content = output.getvalue()
    output.close()
    
    return jsonify({
        'success': True,
        'csv': csv_content,
        'filename': f"voting_results_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
    })

# ============================================================================
# API: ADMIN EXPORT (TXT)
# ============================================================================

@app.route('/api/admin/export-txt')
@admin_required
def export_txt():
    """Export results to TXT"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM candidates')
    candidates = cursor.fetchall()
    
    cursor.execute('SELECT COUNT(*) as total FROM voters WHERE voted = 1')
    total_votes = cursor.fetchone()['total']
    
    conn.close()
    
    # Create text content
    lines = []
    lines.append("=" * 60)
    lines.append("VOTING SYSTEM RESULTS")
    lines.append("=" * 60)
    lines.append("")
    
    for candidate in candidates:
        percentage = (candidate['votes'] / total_votes * 100) if total_votes > 0 else 0
        lines.append(f"{candidate['name']}: {candidate['votes']} votes ({percentage}%)")
    
    lines.append("")
    lines.append("-" * 60)
    lines.append(f"Total Votes: {total_votes}")
    lines.append(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    lines.append("=" * 60)
    
    txt_content = "\n".join(lines)
    
    return jsonify({
        'success': True,
        'txt': txt_content,
        'filename': f"voting_results_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
    })

# ============================================================================
# API: GET VOTING STATUS
# ============================================================================

@app.route('/api/voting-status')
def get_voting_status():
    """Get current voting status"""
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute('SELECT COUNT(*) as total FROM voters WHERE voted = 1')
    total_votes = cursor.fetchone()['total']
    
    cursor.execute('SELECT COUNT(DISTINCT voter_id) as unique_voters FROM voters')
    unique_voters = cursor.fetchone()['unique_voters']
    
    conn.close()
    
    return jsonify({
        'total_votes': total_votes,
        'unique_voters': unique_voters
    })

# ============================================================================
# ERROR HANDLERS
# ============================================================================

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Page not found'}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({'error': 'Server error'}), 500

# ============================================================================
# MAIN
# ============================================================================

if __name__ == '__main__':
    init_db()
    app.run(debug=True, host='localhost', port=5000)
