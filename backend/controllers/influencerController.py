from flask import jsonify
from bson import json_util
from conf_db import MongoDBConnector
import json

class InfluencerController:
    def __init__(self):
        pass

    def get_all_influencers(self):
        mongo_connector = MongoDBConnector()
        mongo_connector.check_connection()
        # Menyimpan data ke dalam koleksi 'influencers'
        collection = mongo_connector.get_collection('influencers')

        # Mendapatkan semua data dari koleksi 'influencers'
        influencers = collection.find({}, {'content': 0})
        
        # Menggunakan sorted untuk mengurutkan influencer berdasarkan engagement_rate_influencer
        sorted_influencer = sorted(influencers, key=lambda x: x.get('engagement_rate_influencer', 0), reverse=True)

        sorted_influencer = sorted_influencer[:10]

        # Menggunakan json_util untuk mengonversi ObjectId menjadi str
        result = json_util.dumps(list(sorted_influencer))
        
        result_dict = json.loads(result)
        return jsonify(result_dict)
    
    def get_details_influencer(self, username):
        try:
            mongo_connector = MongoDBConnector()
            mongo_connector.check_connection()
            # Menyimpan data ke dalam koleksi 'influencers'
            collection = mongo_connector.get_collection('influencers')

            # Mendapatkan data influencer berdasarkan username
            influencer = collection.find_one({'username': username})

            if influencer:
                # Menggunakan json_util untuk mengonversi ObjectId menjadi str
                result = json_util.dumps(influencer)
                # Convert the JSON string to a Python dictionary
                result_dict = json.loads(result)
                return jsonify(result_dict)
            else:
                # Return JSON dengan pesan bahwa influencer tidak ditemukan
                return jsonify(message="Influencer tidak ditemukan"), 404
        except Exception as e:
            # Handle other exceptions if needed
            print(e)
            return jsonify(message="Terjadi kesalahan"), 500
