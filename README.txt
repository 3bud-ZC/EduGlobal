Galala Results Portal (Flask) — White/Navy Academic Theme
========================================================

✅ Routes:
- /        Landing (Choose Portal)
- /login1  Portal 1 Login
- /login2  Portal 2 Login
- /result  Result Page (session-protected)
- /logout  Clear session and return to /

✅ Strict Security:
- /result cannot be opened without login
- If not logged in => auto redirect to /

--------------------------------------------------------
1) Project Setup (Windows CMD)
--------------------------------------------------------

Step A) Install Python
- Install Python 3.10+ from python.org
- During installation: CHECK "Add Python to PATH"

Step B) Open CMD inside the project folder
Example:
cd Desktop\Galala-Results-Portal

Step C) Create a virtual environment (recommended)
python -m venv venv

Step D) Activate venv
venv\Scripts\activate

Step E) Install Flask
pip install Flask

--------------------------------------------------------
2) Run the Project
--------------------------------------------------------
python app.py

Then open:
http://127.0.0.1:5000

--------------------------------------------------------
3) Add Your Logo (No 404 rule)
--------------------------------------------------------
You will provide ONE logo image.

Put it exactly here:
static\img\logo.png

Make favicon from same logo:
static\img\favicon.png

NOTE:
This project links favicon via:
<link rel="icon" type="image/png" href="/static/img/favicon.png">

So it MUST exist to avoid 404.

--------------------------------------------------------
4) Change Data (ONLY edit data.py)
--------------------------------------------------------
All logins and results are stored in:
data.py

- Portal usernames/passwords
- Student names
- Results (table/cards)
- Term label

Do NOT edit templates for changing data.
Just edit data.py.

--------------------------------------------------------
5) Troubleshooting
--------------------------------------------------------
If Flask not found:
pip install Flask

If CMD says 'python not recognized':
Reinstall Python with "Add to PATH" enabled.

--------------------------------------------------------
6) Notes
--------------------------------------------------------
- debug=False to keep console clean.
- Session guard is strict.
- Responsive UI included.
- Smooth transitions and subtle hover included.
