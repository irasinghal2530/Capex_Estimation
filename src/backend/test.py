import pyodbc

conn_str = (
    "DRIVER={ODBC Driver 18 for SQL Server};"
    "SERVER=100.79.207.16,56661;"
    "DATABASE=Cost_Estimation;"
    "UID=Ira;"
    "PWD=6789;"
    "TrustServerCertificate=yes;"
    "timeout=30;"
)

try:
    with pyodbc.connect(conn_str) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT 1")
        print("✅ Connection + query successful!")
except pyodbc.Error as e:
    print("Connection failed:", e)
