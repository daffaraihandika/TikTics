from flask import jsonify
from bson import json_util
from conf_db import MongoDBConnector
import json

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

        result_dict = json.loads(result)
        return jsonify(result_dict)
    
    
    def get_details_content(self, username, id_content):
        try:
            mongo_connector = MongoDBConnector()
            mongo_connector.check_connection()
            # Menyimpan data ke dalam koleksi 'influencers'
            collection = mongo_connector.get_collection('influencers')

            # Mendapatkan data influencer berdasarkan username
            influencer = collection.find_one({'username': username}, {'content': 1})

            if influencer:
                # Cari content berdasarkan _id di dalam list content influencer
                content_found = next(
                    (content for content in influencer.get('content', []) if str(content.get('_id')) == id_content), None)


                if content_found:
                    # Menggunakan json_util untuk mengonversi ObjectId menjadi str
                    result = json_util.dumps(content_found)
                    # Convert the JSON string to a Python dictionary
                    result_dict = json.loads(result)
                    return jsonify(result_dict)
                else:
                    # Return JSON dengan pesan bahwa content tidak ditemukan
                    return jsonify(message="Content tidak ditemukan"), 404
            else:
                # Return JSON dengan pesan bahwa influencer tidak ditemukan
                return jsonify(message="Influencer tidak ditemukan"), 404
        except Exception as e:
            # Handle other exceptions if needed
            print(e)
            return jsonify(message="Terjadi kesalahan"), 500
