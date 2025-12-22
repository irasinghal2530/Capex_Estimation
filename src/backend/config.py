# src/backend/config.py

# import urllib.parse

# DB_DRIVER = "ODBC Driver 18 for SQL Server"
# DB_SERVER = "100.79.207.16,56661"
# DB_NAME = "Cost_Estimation"
# DB_USER = "Ira"
# DB_PASSWORD = "6789"

# params = urllib.parse.quote_plus(
#     f"DRIVER={{{DB_DRIVER}}};"
#     f"SERVER={DB_SERVER};"
#     f"DATABASE={DB_NAME};"
#     f"UID={DB_USER};"
#     f"PWD={DB_PASSWORD};"
#     "TrustServerCertificate=yes;"
#     "timeout=30;"
# )

# DATABASE_URL = f"mssql+pyodbc:///?odbc_connect={params}"
# #


import os
import urllib.parse
from dotenv import load_dotenv
from pathlib import Path

# Load .env from project root
BASE_DIR = Path(__file__).resolve().parents[2]
load_dotenv(BASE_DIR / ".env")

DB_DRIVER = os.getenv("DB_DRIVER")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")

if not all([DB_DRIVER, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD]):
    raise RuntimeError("Database environment variables are missing")

params = urllib.parse.quote_plus(
    f"DRIVER={{{DB_DRIVER}}};"
    f"SERVER={DB_HOST},{DB_PORT};"
    f"DATABASE={DB_NAME};"
    f"UID={DB_USER};"
    f"PWD={DB_PASSWORD};"
    "TrustServerCertificate=yes;"
    "timeout=30;"
)

DATABASE_URL = f"mssql+pyodbc:///?odbc_connect={params}"