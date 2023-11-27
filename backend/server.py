from flask import Flask, jsonify
from flask_cors import CORS
from flask import request
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

@app.route('/register', methods=['POST'])
def createUser():
    return user.create_user()

@app.route('/login', methods=['POST'])
def login():
    return user.login()

@app.route('/influencers')
def getAllInfluencer():
    return influencer.get_all_influencers()

@app.route('/influencer/<username>')
def getDetailsInfluencer(username):
    return influencer.get_details_influencer(username)

@app.route('/contents')
def getAllContents():
    return content.get_all_content()

@app.route('/content/<username>/<content_id>')
def getDetailsContent(username, content_id):
    return content.get_details_content(username, content_id)

@app.route('/search-influencer')
def searchInfluencer():
    # Retrieve the keyword from the query parameter
    keyword = request.args.get('keyword', '')

    # Use the keyword in your search
    return search.search_influencer(keyword)

@app.route('/search-content')
def searchContent():
    return search.search_content()

if __name__ == '__main__':
    app.run(debug=True)
