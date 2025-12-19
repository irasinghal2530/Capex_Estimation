# # import os
# # from urllib.parse import quote_plus
# # from dotenv import load_dotenv

# # load_dotenv()

# # DB_HOST = os.getenv("DB_HOST", "localhost")
# # DB_PORT = os.getenv("DB_PORT", "1433")
# # DB_NAME = os.getenv("DB_NAME", "MyDatabase")
# # DB_USER = os.getenv("DB_USER", "sa")
# # DB_PASSWORD = os.getenv("DB_PASSWORD", "YourPassword")
# # DRIVER = "ODBC Driver 18 for SQL Server"

# # # URL encode password and driver
# # encoded_password = quote_plus(DB_PASSWORD)
# # encoded_driver = quote_plus(DRIVER)

# # DATABASE_URL = (
# #     f"mssql+pyodbc://{DB_USER}:{encoded_password}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
# #     f"?driver={encoded_driver}"
# # )


# import pyodbc

# conn_str = (
#     "DRIVER={ODBC Driver 18 for SQL Server};"
#     "SERVER=100.79.207.16,56661;"
#     "DATABASE=Cost_Estimation;"
#     "UID=Ira;"
#     "PWD=6789;"
#     "TrustServerCertificate=yes;"
#     "timeout=30;"
# )

# try:
#     with pyodbc.connect(conn_str) as conn:
#         cursor = conn.cursor()
#         cursor.execute("SELECT 1")
#         print("✅ Connection + query successful!")
# except pyodbc.Error as e:
#     print("Connection failed:", e)


# src/backend/config.py

import urllib.parse

DB_DRIVER = "ODBC Driver 18 for SQL Server"
DB_SERVER = "100.79.207.16,56661"
DB_NAME = "Cost_Estimation"
DB_USER = "Ira"
DB_PASSWORD = "6789"

params = urllib.parse.quote_plus(
    f"DRIVER={{{DB_DRIVER}}};"
    f"SERVER={DB_SERVER};"
    f"DATABASE={DB_NAME};"
    f"UID={DB_USER};"
    f"PWD={DB_PASSWORD};"
    "TrustServerCertificate=yes;"
    "timeout=30;"
)

DATABASE_URL = f"mssql+pyodbc:///?odbc_connect={params}"
