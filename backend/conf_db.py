from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

class MongoDBConnector:
    def __init__(self):
        self.client = MongoClient('mongodb+srv://daffaraihandika:daffa170203@sistemrekomendasiinflue.qjkw3sx.mongodb.net/')
        self.db = self.client['tiktics']

    def check_connection(self):
        try:
            self.client.server_info()
            print("Koneksi ke MongoDB Atlas berhasil.")
        except ConnectionFailure as e:
            print(f"Koneksi ke MongoDB Atlas gagal: {e}")

    def get_collection(self, collection_name):
        return self.db[collection_name]
