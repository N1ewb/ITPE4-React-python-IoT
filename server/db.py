import os

from flask import jsonify, request
from supabase import create_client, Client
from dotenv import load_dotenv
load_dotenv()
url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

def ensure_table_exists():
    try:
        # Check if the table "users" exists
        check_query = """
        SELECT EXISTS (
            SELECT FROM pg_tables 
            WHERE schemaname = 'public' 
            AND tablename = 'users'
        );
        """
        response = supabase.rpc("execute_raw", {"sql": check_query}).execute()

        table_exists = response.data[0].get("exists")
        if not table_exists:
            # If the table doesn't exist, create it
            create_table_query = """
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL
            );
            """
            create_response = supabase.rpc("execute_raw", {"sql": create_table_query}).execute()
            print("Table 'users' created successfully.")
        else:
            print("Table 'users' already exists.")
    
    except Exception as e:
        print(f"Error checking or creating table: {str(e)}")
        return False
    return True


def uploadUserData():
    try:
        # Ensure the table exists
        if not ensure_table_exists():
            return jsonify({"error": "Could not ensure table existence"}), 500

        # Log the incoming request data
        data = request.get_json()
        print(f"Received data: {data}")

        name = data.get("name")
        email = data.get("email")

        # Validate the request data
        if not name or not email:
            return jsonify({"error": "Missing required fields"}), 400

        # Insert data into the "users" table in Supabase
        result = supabase.table("Users").insert({"name": name, "email": email}).execute()
        print(f"Supabase response: {result}")

        return jsonify({"message": "User added successfully", "data": result.data}), 201

    except Exception as e:
        # Log the exact error for debugging
        print(f"Error: {str(e)}")
        return jsonify({"error": "Failed to add user", "details": str(e)}), 500