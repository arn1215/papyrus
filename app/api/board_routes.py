from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

from app.models import User, Note, NoteBook, Tag, db, Board

board_routes = Blueprint('boards', __name__)

# # get notebooks
# @notebook_routes.route('/')
# @login_required
# def notebooks(): 
#     notebooks = NoteBook.query.filter_by(userId= current_user.id).all()


#     return {'notebooks': [notebook.to_dict() for notebook in notebooks]}

#get single notebook
@board_routes.route('/<int:id>')
@login_required
def notebook(id): 
    board = Board.query.get(id)
    
    return board.to_dict() 

