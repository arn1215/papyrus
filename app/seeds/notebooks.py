from app.models import db, NoteBook


# Adds a demo user, you can add other users here if you want
def seed_notebooks():
    demoNotebook = NoteBook(
        id='2', title='marnies ASCII notebook 🐨', userId='2')


    db.session.add(demoNotebook)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_notebooks():
    db.session.execute('TRUNCATE notebooks RESTART IDENTITY CASCADE;')
    db.session.commit()
