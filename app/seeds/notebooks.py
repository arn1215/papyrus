from app.models import db, NoteBook


# Adds a demo user, you can add other users here if you want
def seed_notebooks():
    demoNotebook = NoteBook(
        id='2', title='marnies ASCII notebook 🐨', userId='2')
    Elit = NoteBook(
        id='3', title='E-Literature class', userId='2')
    Poetry = NoteBook(
        id='4', title='Poetry', userId='2')
    Hmn = NoteBook(
        id='5', title='HUMN 4730', userId='2')
    phi = NoteBook(
        id='6', title='Descartes', userId='2')
    test = NoteBook(
        id='7', title='test', userId='2'
    )
    grocery = NoteBook(
        id='8', title='Groceries', userId='2'
    )

    db.session.add_all([demoNotebook, Elit, Poetry, Hmn, phi, test, grocery])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_notebooks():
    db.session.execute('TRUNCATE notebooks RESTART IDENTITY CASCADE;')
    db.session.commit()
