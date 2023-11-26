from flask import request, jsonify
from bson import json_util
from conf_db import MongoDBConnector
from datetime import datetime
import json
from flask_bcrypt import Bcrypt

class UserController:
    def __init__(self):
        self.bcrypt = Bcrypt()

    def get_all_users(self):
        mongo_connector = MongoDBConnector()
        mongo_connector.check_connection()
        # Menyimpan data ke dalam koleksi 'users'
        collection = mongo_connector.get_collection('users')

        # Mendapatkan semua data dari koleksi 'users'
        users = collection.find()

        # Menggunakan json_util untuk mengonversi ObjectId menjadi str
        result = json_util.dumps(list(users))

        result_dict = json.loads(result)
        return jsonify(result_dict)

    def create_user(self):
        try:
            mongo_connector = MongoDBConnector()
            mongo_connector.check_connection()
            collection = mongo_connector.get_collection('users')
            
            # Ambil data dari permintaan POST
            user_data = request.get_json()

            # Pastikan data yang diperlukan ada dalam permintaan
            required_fields = ['username', 'email', 'password', 'confPassword']
            if not all(field in user_data for field in required_fields):
                return jsonify({'error': 'Semua field wajib diisi.'}), 400
            
            # Pengecekan apakah username sudah ada
            existing_user = collection.find_one({'username': user_data['username']})
            if existing_user:
                return jsonify({'error': 'Username sudah digunakan.'}), 400
            
            # Pengecekan password harus sama dengan konfirmasi password
            if user_data['password'] != user_data['confPassword']:
                return jsonify({'error': 'Password tidak sesuai.'}), 400
            
            # Hash password sebelum menyimpan ke dalam database
            hashed_password = self.bcrypt.generate_password_hash(user_data['password']).decode('utf-8')
            user_data['password'] = hashed_password
            
            del user_data['confPassword']
                
            # Tambahkan data waktu pembuatan dan pembaruan
            user_data['createdAt'] = datetime.utcnow()
            user_data['updatedAt'] = datetime.utcnow()

            # Simpan data ke dalam koleksi 'users'
            result = collection.insert_one(user_data)

            # Kirim respons berhasil dengan ID pengguna yang dibuat
            return jsonify({'message': 'Register berhasil', 'user_id': str(result.inserted_id)}), 201

        except Exception as e:
            return jsonify({'error': str(e)}), 500
        
    def login(self):
        try:
            mongo_connector = MongoDBConnector()
            mongo_connector.check_connection()
            collection = mongo_connector.get_collection('users')
            
            # Ambil data dari permintaan POST
            user_data = request.get_json()

            # Pastikan data yang diperlukan ada dalam permintaan
            required_fields = ['username', 'password']
            if not all(field in user_data for field in required_fields):
                return jsonify({'error': 'Semua field wajib diisi.'}), 400
            
            # Periksa apakah terdapat user dengan username yang diinputkan
            username_input = user_data['username']
            password_input = user_data['password']
            
            existing_user = collection.find_one({"username": username_input})
            
            if not existing_user or not self.bcrypt.check_password_hash(existing_user['password'], password_input):
                return jsonify({'error': 'Username atau password salah.'}), 400
            
            return jsonify({'msg': 'Berhasil login.'}), 200
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500