from dataclasses import dataclass
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms.create_note_form import NoteForm
from app.forms.edit_form import EditForm
from app.models import User, Note, NoteBook, Tag, db

note_routes = Blueprint('notes', __name__)

# get notes
# (by notebook id V)
@note_routes.route('/<int:nbid>')
@login_required
def notes(nbid): 
    notes = Note.query.filter_by(notebookId = nbid).all()

    return {'notes': [note.to_dict() for note in notes]}

# get a single note
@note_routes.route('/byNoteId/<int:noteId>')
@login_required
def note(noteId):
    # data = request.get_json()
    # if data.userId 
    note = Note.query.filter_by(id = noteId).one()

    return note.to_dict()



# post notes
@note_routes.route('/', methods=['POST'])
@login_required
def create_note():
  form = NoteForm()
  data = request.get_json()
  print("\n\n\n",data)
  form['csrf_token'].data = request.cookies['csrf_token']
  # if data['content'] == "": 
  #   return {"errors": "Please enter a value." } , 500
  if form.validate_on_submit():
    note = Note(
      userId = current_user.id,
      title = data['title'],
      content = data['content'],
      notebookId = data['notebook_id']
    )

    db.session.add(note)
    db.session.commit()

    return note.to_dict()
  else:
    return {"errors": form.errors}, 500

@note_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def edit_note(id):
  form = EditForm()
  data = request.get_json()
  print(data)
  form['csrf_token'].data = request.cookies['csrf_token']
  if data['string'] == "" or len(data['title']) < 1: 
    return {"errors": "Please enter a value." } , 500
  if len(data['string']) < 3 or len(data['title']) < 3 : 
    return {"errors": "Please enter  at least 3 characters" } , 500
  if form.validate_on_submit():
    note = Note.query.get(id)
    note.content = data['content']
    note.title = data['title']

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
