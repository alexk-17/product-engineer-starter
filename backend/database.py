from sqlalchemy import create_engine, Column, String, DateTime, Boolean
from sqlalchemy.orm import sessionmaker, declarative_base
from datetime import datetime
from sqlalchemy.types import TypeDecorator, String
import json

DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# Adding decorator here to handle the JSON encoding and decoding
class JSONListEncodedDict(TypeDecorator):
    impl = String

    def process_bind_param(self, value, dialect):
        if value is None:
            return "[]"
        return json.dumps(value)

    def process_result_value(self, value, dialect):
        if value is None:
            return []
        return json.loads(value)


class Case(Base):
    __tablename__ = "cases"

    id = Column(String, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.now())
    status = Column(String, default="submitted")
    procedure_name = Column(String, nullable=True)
    cpt_codes = Column(JSONListEncodedDict, default=[])
    summary = Column(String, nullable=True)
    is_met = Column(Boolean, default=False)
    is_complete = Column(Boolean, default=False)
    steps = Column(JSONListEncodedDict, default=[])


Base.metadata.create_all(bind=engine)
