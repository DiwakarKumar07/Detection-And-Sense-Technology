from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from pymongo import MongoClient

# MongoDB Connection (Localhost)
client = MongoClient("mongodb://localhost:27017/")
db = client["user_database"]  # Database name
users_collection = db["users"]  # Collection name

bcrypt = Bcrypt()

# Create a Blueprint for Registration
register_bp = Blueprint("register_bp", __name__)

@register_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    email = data.get("email")
    username = data.get("username")
    password = data.get("password")

    if not email or not username or not password:
        return jsonify({"message": "All fields are required!"}), 400

    # Check if user already exists
    if users_collection.find_one({"email": email}):
        return jsonify({"message": "Email already registered!"}), 400

    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    
    # Insert user into MongoDB
    user_data = {"email": email, "username": username, "password": hashed_password}
    users_collection.insert_one(user_data)

    return jsonify({"message": "User registered successfully!"}), 201
