from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
import uuid
from .database import SessionLocal, Case
from datetime import datetime

router = APIRouter()


# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
async def root():
    return {"message": "root"}


@router.post("/cases")
async def create_case(db: Session = Depends(get_db)):
    case_id = str(uuid.uuid4())
    new_case = Case(
        id=case_id,
        procedure_name="Facet Joint Injection",
        created_at=datetime.now(),
    )
    db.add(new_case)
    db.commit()
    db.refresh(new_case)

    return {"id": new_case.id}


@router.get("/cases/{case_id}")
async def get_case(case_id: str, db: Session = Depends(get_db)):
    case = db.query(Case).filter(Case.id == case_id).first()

    if not case:
        raise HTTPException(status_code=404, detail="Case not found")

    return case


@router.get("/cases")
async def get_cases(db: Session = Depends(get_db)):
    cases = db.query(Case).all()
    return cases
