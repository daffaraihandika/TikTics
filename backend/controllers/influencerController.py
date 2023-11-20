from flask import jsonify
from bson import json_util
from conf_db import MongoDBConnector

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

        return result
