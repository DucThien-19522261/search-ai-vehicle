import json
from flask import Flask, jsonify, request, Response
from flask_pymongo import PyMongo
from flask_cors import CORS
from datetime import datetime
from model.vehicle_model import get_single_image_embedding, get_single_text_embedding
from sklearn.metrics.pairwise import cosine_similarity, euclidean_distances

IMAGE_SEARCH_PATH = 'C:/Users/thien/Code/vector/vehicle-python/search.png'
NEW_IMAGE_PATH="C:/Users/thien/Code/vector/vehicle-search-app/src/assets/data/new/"
MIN_DISTANCE = 8
MIN_SIMILARITY = 0.25

CMIN = 0.12

app = Flask(__name__)
CORS(app)

app.config['DEBUG'] = True
app.config['MONGO_URI'] = "mongodb+srv://thiennd18:thienngo123123@mycluster.5ytbjpr.mongodb.net/vehicle?retryWrites=true&w=majority&appName=MyCluster"
mongodb_client = PyMongo(app)
db = mongodb_client.db.data

@app.route("/", methods=["GET"])
def get_all():
    try:
        list_image = list(db.find({}).sort({"created": -1}).limit(100))       
        return json.dumps(list_image, default=str)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route("/search", methods=['POST'])
def get_search():
    file = request.files['file']
    file.save(IMAGE_SEARCH_PATH)
    image_query_vector = get_single_image_embedding(str(IMAGE_SEARCH_PATH))
    
    try:
        all_data = list(db.find({}))
        list_image = []
        for item in all_data:
            eucl_distances=euclidean_distances(image_query_vector,  item['image_embeded'])
            if (eucl_distances[0][0] < MIN_DISTANCE):
                list_image.append({'sort_path': item['sort_path'], 'eucl_distances': eucl_distances[0][0]})
        list_image.sort(key=lambda x: x['eucl_distances'], reverse=False)
        return json.dumps(list_image [:100], default=str)
    except Exception as e:
        return jsonify({'error': str(e)}),
    
@app.route("/search-keywork", methods=['GET'])
def get_search_keywork():
    keywork = request.args.get('keywork')
    text_query_vector = get_single_text_embedding(keywork)
    try:
        all_data = list(db.find({}))
        list_image = []
        for item in all_data:
            cosine=cosine_similarity(text_query_vector,  item['image_embeded'])
            if (cosine[0][0] > MIN_SIMILARITY):
                list_image.append({'sort_path': item['sort_path'], 'cosine': cosine[0][0]})
        list_image.sort(key=lambda x: x['cosine'], reverse=True)  
        return json.dumps(list_image [:100], default=str)
    except Exception as e:
        return jsonify({'error': str(e)}),
    
@app.route("/post", methods=["POST"])
def post_image():
    file = request.files['file']
    print(file.filename)
    current_time = datetime.now()
    seconds_since_epoch = str(current_time.timestamp())
    file_path = NEW_IMAGE_PATH + seconds_since_epoch + file.filename
    print(file_path)
    file.save(file_path)
    image_embebed_vector = get_single_image_embedding(str(file_path))
    
    try:
        new_item = {"sort_path": 'new/' +seconds_since_epoch + file.filename, "image_embeded": image_embebed_vector.tolist(), "created": datetime.now()}
        db.insert_one(new_item)
        # return Response(new_item, status=201, mimetype='application/json')  
        return json.dumps(new_item, default=str)  
    except Exception as e:
        return jsonify({'error': str(e)}),

if __name__ == "__main__":
    app.run()
