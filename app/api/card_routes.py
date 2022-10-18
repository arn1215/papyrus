from dataclasses import dataclass
from flask import Blueprint, jsonify, request
from app.forms.edit_form import EditForm
from app.forms.create_card_form import CardForm
from flask_login import login_required, current_user
from app.models import User, Card, Tag, db, Card

card_routes = Blueprint('cards', __name__)

# # get cards
# # (by cardbook id V)
# @card_routes.route('/<int:nbid>')
# @login_required
# def cards(nbid): 
#     cards = Card.query.filter_by(cardbookId = nbid).all()

#     return {'cards': [card.to_dict() for card in cards]}

# # get a single card
# @card_routes.route('/byCardId/<int:cardId>')
# @login_required
# def card(cardId):
#     # data = request.get_json()
#     # if data.userId 
#     card = Card.query.filter_by(id = cardId).one()

#     return card.to_dict()



# post cards
@card_routes.route('/', methods=['POST'])
# @login_required
def create_card():
  form = CardForm()
  data = request.get_json()
  print("\n\n\n",data)
  form['csrf_token'].data = request.cookies['csrf_token']
  # if data['content'] == "": 
  #   return {"errors": "Please enter a value." } , 500
  if form.validate_on_submit():
    card = Card(
      userId = data['userId'], 
      title = data['title'],
      content = data['content'],
      boardId = data['boardId'],
      parent = data['parent']
    )

    db.session.add(card)
    db.session.commit()

    return card.to_dict()
  else:
    return {"errors": form.errors}, 500

@card_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def edit_card(id):
  form = EditForm()
  data = request.get_json()
  print(data)
  form['csrf_token'].data = request.cookies['csrf_token']
  if data['string'] == "" or len(data['title']) < 1: 
    return {"errors": "Please enter a value." } , 500
  if len(data['string']) < 3 or len(data['title']) < 3 : 
    return {"errors": "Please enter  at least 3 characters" } , 500
  if form.validate_on_submit():
    card = Card.query.get(id)
    card.content = data['content']
    card.title = data['title']
    card.parent = data['parent']

    db.session.commit()

    return card.to_dict()
  else:
    return {"errors": form.errors}

# delete cards
@card_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delCard(id):
  # card_id = request.get_json()
  card = Card.query.get(id)
  db.session.delete(card)
  db.session.commit()

  return card.to_dict()
