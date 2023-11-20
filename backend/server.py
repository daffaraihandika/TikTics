from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from bson import json_util
from conf_db import MongoDBConnector
from controllers.userController import UserController
from controllers.influencerController import InfluencerController
from controllers.contentController import ContentController
from controllers.searchByKeyword import SearchByKeywordController

app = Flask(__name__)
CORS(app, supports_credentials=True)

user = UserController()
influencer = InfluencerController()
content = ContentController()
search = SearchByKeywordController()

@app.route('/users', methods=['GET'])
def getAllUser():
    return user.get_all_users()

@app.route('/users', methods=['POST'])
def createUser():
    return user.create_user()

@app.route('/login', methods=['POST'])
def login():
    return user.login()

@app.route('/influencers')
def getAllInfluencer():
    return influencer.get_all_influencers()

@app.route('/contents')
def getAllContents():
    return content.get_all_content()

@app.route('/search-influencer')
def searchInfluencer():
    return search.search_influencer()

@app.route('/search-content')
def searchContent():
    return search.search_content()

if __name__ == '__main__':
    app.run(debug=True)