from flask import Flask, request, session
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash


app = Flask(__name__)
app.secret_key = 'super secret key'
app.config['SESSION_TYPE'] = 'filesystem'
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

    session['user-id'] = new_user.id

    return {'message': 'User registered succesfully.', 'id': new_user.id}, 200


@app.route('/user-form', methods=['POST'])
def user_form():
    request_json = request.get_json()
    # user_form = User.query.filter_by(user_id=request_json['user-id']).first()

    new_user_form = UserForm(title=request_json['user_id'],
                             criterion_1=request_json['criterion_1'], criterion_2=request_json['criterion_2'],
                             criterion_3=request_json['criterion_3'], criterion_4=request_json['criterion_4'],
                             criterion_5=['criterion_5'])

    db.session.add(new_user_form)
    db.session.commit()

    context = {}

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
        return {'message': 'User invalid.'}, 404

    user_id = user.id
    user_form = UserForm.query.filter_by(user_id=user_id).first()
    context = {}

    return {'message': 'User confirmed.', 'id': user_id, 'user_form': user_form}, 200


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)
