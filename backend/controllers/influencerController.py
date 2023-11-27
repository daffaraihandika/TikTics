from flask import jsonify
from bson import json_util
from conf_db import MongoDBConnector
import json
import joblib
import numpy as np

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
        
    def predict_next_content_engagement_rate(self, username):
        try:
            # Load the pre-trained model
            loaded_model = joblib.load('./models/linear_regression_model.joblib')

            mongo_connector = MongoDBConnector()
            mongo_connector.check_connection()
            collection = mongo_connector.get_collection('influencers')

            # Fetch the influencer data by username
            influencer = collection.find_one({'username': username})

            if influencer and 'content' in influencer:
                # Extracting views, likes, comments, and saves from each content
                views = [content['views'] for content in influencer['content']]
                likes = [content['likes'] for content in influencer['content']]
                comments = [content['comments'] for content in influencer['content']]
                saves = [content['save'] for content in influencer['content']]

                # Calculating the averages
                avg_views = np.mean(views) if views else 0
                avg_likes = np.mean(likes) if likes else 0
                avg_comments = np.mean(comments) if comments else 0
                avg_saves = np.mean(saves) if saves else 0

                # Preparing the input for the model
                model_input = [avg_views, avg_likes, avg_comments, avg_saves]

                # Predict the next content engagement rate
                predicted_rate = loaded_model.predict([model_input])[0] / 2

                # Extract existing engagement rates
                existing_engagement_rates = [content['engagement_rate_content'] for content in influencer['content']]

                # Add the predicted rate to the list of existing engagement rates
                engagement_rates = existing_engagement_rates + [predicted_rate]

                return jsonify({'engagement_rates': engagement_rates})
            else:
                return jsonify(message="Insufficient data for prediction or influencer not found"), 404
        except Exception as e:
            print(e)
            return jsonify(message="An error occurred"), 500

