from flask import jsonify
from bson import json_util
from conf_db import MongoDBConnector

class ContentController:
    def __init__(self):
        pass

    def get_all_content(self):
        mongo_connector = MongoDBConnector()
        mongo_connector.check_connection()
        # Menyimpan data ke dalam koleksi 'influencers'
        collection = mongo_connector.get_collection('influencers')

        # Mendapatkan semua data dari koleksi 'influencers'
        influencers = collection.find()

        # Membuat list untuk menyimpan hanya konten dari setiap influencer
        content_list = []

        # Loop melalui setiap influencer
        for influencer in influencers:
            username = influencer.get('username', '')
            # Loop melalui setiap content dan tambahkan 'username'
            for content_item in influencer.get('content', []):
                content_item['username'] = username
                content_list.append(content_item)
                
         # Menggunakan sorted untuk mengurutkan content berdasarkan engagement_rate_content
        sorted_content = sorted(content_list, key=lambda x: x.get('engagement_rate_content', 0), reverse=True)

        sorted_content = sorted_content[:10]
        
        # Menggunakan json_util untuk mengonversi ObjectId menjadi str
        result = json_util.dumps(sorted_content)

        return result
