from flask import request, jsonify
from bson import json_util
from conf_db import MongoDBConnector
from datetime import datetime
import json

class SearchByKeywordController:
    def __init__(self):
        pass

    def search_influencer(self, keyword):
        mongo_connector = MongoDBConnector()
        mongo_connector.check_connection()
        collection = mongo_connector.get_collection('influencers')
        
        # Membuat filter untuk pencarian berdasarkan keyword
        search_filter = {
            '$or': [
                {'username': {'$regex': keyword, '$options': 'i'}},
                {'nickname': {'$regex': keyword, '$options': 'i'}},
                {'bio': {'$regex': keyword, '$options': 'i'}},
                {'content.deskripsi': {'$regex': keyword, '$options': 'i'}}
            ]
        }

        influencers = collection.find(search_filter, {'content': 0})
        
        # Menggunakan sorted untuk mengurutkan influencer berdasarkan engagement_rate_influencer
        sorted_influencer = sorted(influencers, key=lambda x: x.get('engagement_rate_influencer', 0), reverse=True)

        # Menggunakan json_util untuk mengonversi ObjectId menjadi str
        result = json_util.dumps(list(sorted_influencer))

        result_dict = json.loads(result)
        return jsonify(result_dict)
    
    def search_content(self):
        mongo_connector = MongoDBConnector()
        mongo_connector.check_connection()
        collection = mongo_connector.get_collection('influencers')
        
        # Mendapatkan nilai keyword dari parameter query string 'keyword'
        keyword = request.args.get('keyword', '')

        # Membuat filter untuk pencarian berdasarkan keyword
        search_filter = {
            '$or': [
                {'username': {'$regex': keyword, '$options': 'i'}},
                {'nickname': {'$regex': keyword, '$options': 'i'}},
                {'bio': {'$regex': keyword, '$options': 'i'}},
                {'content.deskripsi': {'$regex': keyword, '$options': 'i'}}
            ]
        }
        
        # Mendapatkan semua data dari koleksi 'influencers'
        influencers = collection.find(search_filter)

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
        result = json_util.dumps(list(sorted_content))

        result_dict = json.loads(result)
        return jsonify(result_dict)