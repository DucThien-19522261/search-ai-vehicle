from pathlib import Path
from tqdm import tqdm
from server import db
from random import shuffle
from model.vehicle_model import get_single_image_embedding
from datetime import datetime

def migrate():
    data_path = Path(__file__).resolve().parent  / 'model' / 'data' / 'train'
    listData = []
    list_files = (sorted(data_path.glob('*/*.*')))
    shuffle(list_files)
    for file in tqdm(list_files):
        sort_path = str(file.relative_to(file.parents[1])).replace('\\', '/')
        print(str(file))
        embeding_vector = get_single_image_embedding(str(file))
        new_item = { "sort_path": sort_path, "image_embeded": embeding_vector.tolist(), "created": datetime.now()}
        listData.append(new_item)
    db.insert_many(listData)
    
migrate()