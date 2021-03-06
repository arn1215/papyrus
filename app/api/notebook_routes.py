from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms.create_note_form import NoteForm
from app.forms.create_notebook_form import NotebookForm
from app.forms.edit_notebook_form import EditNotebookForm
from app.forms.edit_form import EditForm
from app.models import User, Note, NoteBook, Tag, db

notebook_routes = Blueprint('notebooks', __name__)

# get notebooks
@notebook_routes.route('/')
@login_required
def notebooks(): 
    notebooks = NoteBook.query.filter_by(userId= current_user.id).all()
    

    return {'notebooks': [notebook.to_dict() for notebook in notebooks]}

#get single notebook
@notebook_routes.route('/<int:id>')
@login_required
def notebook(id): 
    notebook = NoteBook.query.get(id)
    
    return notebook.to_dict() 

# post notebooks
@notebook_routes.route('/', methods=['POST'])
@login_required
def create_note():
  form = NotebookForm()
  data = request.get_json()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    notebook = NoteBook(
      userId = current_user.id,
      title = data['title'],     
    )

    db.session.add(notebook)
    db.session.commit()

    return notebook.to_dict()
  else:
    return {"errors": form.errors}

@notebook_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def edit_note(id):
  form = EditNotebookForm()
  data = request.get_json()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    notebook = NoteBook.query.get(id)
    notebook.title = data['title']

    db.session.commit()

    return notebook.to_dict()
  else:
    return {"errors": form.errors}

# delete notebooks
@notebook_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delNote(id):
  # note_id = request.get_json()
  notebook = NoteBook.query.get(id)
  db.session.delete(notebook)
  db.session.commit()

  return notebook.to_dict()
