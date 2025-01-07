from datetime import datetime, timedelta
import time
from .database import SessionLocal, Case
import json

# Load the steps from the response-3.json file
with open("assets/response-3.json", "r") as file:
    data = json.load(file)
    summary = data["summary"]
    steps = data["steps"]
    cpt_codes = data["cpt_codes"]


# Function to simulate background process to update case status on a second interval
def update_case_status():
    while True:
        db = SessionLocal()
        try:
            cases = db.query(Case).all()
            for case in cases:
                elapsed_time = datetime.now() - case.created_at
                if elapsed_time < timedelta(seconds=10):
                    case.status = "submitted"
                elif elapsed_time < timedelta(seconds=30):
                    case.status = "processing"
                    case.summary = summary
                else:
                    case.status = "complete"
                    case.steps = steps
                    case.cpt_codes = cpt_codes
                db.commit()
            time.sleep(1)
        finally:
            db.close()
