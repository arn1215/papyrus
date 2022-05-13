from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms.create_note_form import NoteForm
from app.forms.edit_form import EditForm
from app.models import User, Note, NoteBook, Tag, db

note_routes = Blueprint('notes', __name__)

# get notes
@note_routes.route('/')
# @login_required
def notes(): 
    notes = Note.query.filter_by(userId= current_user.id).all()
    
    print("current \n\n\n\n\n", current_user)
    return {'notes': [note.to_dict() for note in notes]}

# post notes
@note_routes.route('/', methods=['POST'])
@login_required
def create_note():
  form = NoteForm()
  data = request.get_json()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    note = Note(
      userId = current_user.id,
      title = data['title'],
      content = data['content']
      # notebookId = data['notebookId']
    )

    db.session.add(note)
    db.session.commit()

    return note.to_dict()
  else:
    return {"errors": form.errors}

@note_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def edit_note(id):
  form = EditForm()
  data = request.get_json()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    note = Note.query.get(id)
    note.title = data['title']
    note.content = data['content']

    db.session.commit()

    return note.to_dict()
  else:
    return {"errors": form.errors}

# delete notes
@note_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delNote(id):
  # note_id = request.get_json()
  note = Note.query.get(id)
  db.session.delete(note)
  db.session.commit()

  return note.to_dict()