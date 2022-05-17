from app.models import db, Note


# Adds a demo user, you can add other users here if you want
def seed_notes():
    demoNote = Note(
        title='Grocery List', content='Broccoli \n fruit \n more stuff', userId=2, notebookId=2)

    db.session.add(demoNote)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_notes():
    db.session.execute('TRUNCATE notes RESTART IDENTITY CASCADE;')
    db.session.commit()
