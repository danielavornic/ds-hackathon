import json
import pickle
import pandas as pd
import numpy as np
from flask import Flask, request, session
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

from sklearn.metrics.pairwise import cosine_similarity


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///detection.sqlite3'
db = SQLAlchemy(app)
Session(app)


class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)

    def __init__(self, email, password):
        self.email = email
        self.password = password


class UserForm(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.String(256), nullable=False)
    criterion_1 = db.Column(db.String(256), nullable=False)
    criterion_2 = db.Column(db.String(256), nullable=False)
    criterion_3 = db.Column(db.String(256), nullable=False)
    criterion_4 = db.Column(db.String(256), nullable=False)
    criterion_5 = db.Column(db.String(256), nullable=False)

    def __init__(self, user_id, criterion_1, criterion_2, criterion_3, criterion_4, criterion_5):
        self.user_id = user_id
        self.criterion_1 = criterion_1
        self.criterion_2 = criterion_2
        self.criterion_3 = criterion_3
        self.criterion_4 = criterion_4
        self.criterion_5 = criterion_5


class LocationDB(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(256), nullable=False)
    latitude = db.Column(db.String(256), nullable=False)
    longitude = db.Column(db.String(256), nullable=False)
    address = db.Column(db.String(256), nullable=False)
    image = db.Column(db.String(), nullable=False)
    criterion_1 = db.Column(db.String(256), nullable=False)
    criterion_2 = db.Column(db.String(256), nullable=False)
    criterion_3 = db.Column(db.String(256), nullable=False)
    criterion_4 = db.Column(db.String(256), nullable=False)
    criterion_5 = db.Column(db.String(256), nullable=False)

    def __init__(self, title, latitude, longitude, address, image, site, phone,
                 criterion_1, criterion_2, criterion_3, criterion_4, criterion_5):
        self.title = title
        self.latitude = latitude
        self.longitude = longitude
        self.address = address
        self.image = image
        self.site = site
        self.phone = phone
        self.criterion_1 = criterion_1
        self.criterion_2 = criterion_2
        self.criterion_3 = criterion_3
        self.criterion_4 = criterion_4
        self.criterion_5 = criterion_5


def load_categorical_mapper():
    file = open('data/label_mapper_general.json')
    data = json.load(file)
    return data


def load_pca():
    return pickle.load(open('pca_question_14.sav', 'rb'))


def load_normalizer():
    return pickle.load(open('normalizer.sav', 'rb'))


def preprocessing(data):
    new_data = []
    # question_list = ['Q5', 'Q18', 'Q21', 'Q14']
    mapper = load_categorical_mapper()
    pca = load_pca()

    new_data.append(mapper['Q5'][data[0]])
    new_data.append(mapper['Q18'][data[1]])
    new_data.append(int(data[2]))

    question_14_mapper = [
        'It is not a well-known country',
        'It is a country that comes from the Soviet Union',
        'It is cheap to visit Moldova',
        'It is a country with a very low risk of terrorist attacks',
        'I have seen pictures on the internet and I was struck by their beauty',
        'Friends / acquaintances told me good things about Moldova, I was intrigued',
        'Lately RM is more publicized in the international media, so I was curious to visit',
        'I read in the Internet / I heard that RM keeps the traditions and customs of ancestors',
        'I heard that in Moldova are organized various festivals, including the wine festival',
        'I wanted to taste Moldovan wine',
        'I wanted to visit Moldovan wineries and cellars',
        'I wanted to visit monuments (fortress, natural monuments, etc.)',
        'I wanted to see rural life',
        'Other',
        'DK'
    ]

    question_14_vector = np.zeros(15)
    indexes = [question_14_mapper.index(element) for element in [data[3]]]

    for idx in indexes:
        question_14_vector[idx] = 1

    question_14_vector = pd.DataFrame(
        {key: [value] for key, value in zip(['Q14_1', 'Q14_2', 'Q14_3', 'Q14_4', 'Q14_5', 'Q14_6',
                                             'Q14_7', 'Q14_8', 'Q14_9', 'Q14_10', 'Q14_11', 'Q14_12',
                                             'Q14_13', 'Q14_14', 'Q14_99'], question_14_vector)})

    pca_question_14 = pca.transform(question_14_vector).tolist()
    new_data.append(pca_question_14[0][0])
    new_data.append(pca_question_14[0][1])

    return new_data


def load_location_vectors():
    file = open('data/locations_vectors.json')
    data = json.load(file)
    return data


def load_location_info():
    file = open('data/locations_info.json')
    data = json.load(file)
    return data


def load_location_images():
    file = open('data/images.json')
    data = json.load(file)
    return data


def get_recommendations(user_answers):
    locations = load_location_vectors()
    location_information = load_location_info()
    location_images = load_location_images()
    normalizer = load_normalizer()

    user_answers_df = pd.DataFrame({key: [value] for key, value in zip(
        ['Q5', 'Q18', 'Q21', 'Q14_1', 'Q14_2'], user_answers)})
    user_answers = normalizer.transform(user_answers_df)

    locations_preprocessed = []
    for location in locations.values():
        locations_preprocessed.append(preprocessing(location))

    return_number = 5
    similarity_matrix = cosine_similarity(user_answers, locations_preprocessed)

    similarity_series = pd.Series(similarity_matrix[0])
    idx_locations = similarity_series.sort_values(ascending=True)[
        :return_number]
    locations = [list(locations.keys())[element]
                 for element in idx_locations.index]

    print(location_information)

    recommended_locations = [
        element for element in location_information if element['id'] in locations]
    for element in recommended_locations:
        element['image'] = location_images[element['id']]

    # recommended_locations = [element for element in recommended_locations]

    return recommended_locations


@app.route('/registration', methods=['POST'])
def registration():
    # if request.methods == 'POST':
    request_json = request.get_json()
    email = request_json['email']
    password = request_json['password']

    user = User.query.filter_by(email=email).first()

    if user:
        return {'message': 'User already registered.'}, 409

    new_user = User(email=email, password=generate_password_hash(password))

    db.session.add(new_user)
    db.session.commit()

    # session['user-id'] = new_user.id

    return {'message': 'User registered succesfully.', 'user-id': new_user.id}, 200


@app.route('/user-form', methods=['POST'])
def user_form():
    request_json = request.get_json()
    print(request_json)
    # user_form = User.query.filter_by(user_id=request_json['user-id']).first()

    criterion_preprocessed = preprocessing([request_json['criterion_1'], request_json['criterion_2'],
                                            request_json['criterion_3'], request_json['criterion_4']])

    print(criterion_preprocessed)

    new_user_form = UserForm(user_id=request_json['user-id'],
                             criterion_1=criterion_preprocessed[0], criterion_2=criterion_preprocessed[1],
                             criterion_3=criterion_preprocessed[2], criterion_4=criterion_preprocessed[3],
                             criterion_5=criterion_preprocessed[4])

    db.session.add(new_user_form)
    db.session.commit()

    recommendations = get_recommendations(criterion_preprocessed)

    context = {'recommendations': recommendations}

    return context


@app.route('/recommendations', methods=['GET'])
def recommendations():
    request_json = request.get_json()
    user_id = request_json['user-id']

    user_form = UserForm.query.filter_by(user_id=user_id).first()

    recommendations = get_recommendations([user_form.criterion_1, user_form.criterion_2, user_form.criterion_3,
                                           user_form.criterion_4, user_form.criterion_5])

    context = {'recommendations': recommendations}

    return context


@app.route('/login', methods=['POST', 'GET'])
def login():
    request_json = request.get_json()

    email = request_json['email']
    password = request_json['password']

    user = User.query.filter_by(email=email).first()

    # check if the user actually exists
    # take the user-supplied password, hash it, and compare it to the hashed password in the database
    if not user or not check_password_hash(user.password, password):
        # if the user doesn't exist or password is wrong, reload the page
        return {'message': 'User invalid.'}

    user_id = user.id
    user_form = UserForm.query.filter_by(user_id=user_id).first()
    recommendations = get_recommendations([user_form.criterion_1, user_form.criterion_2, user_form.criterion_3,
                                           user_form.criterion_4, user_form.criterion_5])

    return {'message': 'User confirmed.', 'recommendations': recommendations}, 200


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)
