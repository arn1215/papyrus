from app.models import db, Board


# Adds a demo user, you can add other users here if you want
def seed_boards():
    demoBoard = Board(
        id='2', title='marnies Board 🐨', userId='2')


    db.session.add_all([demoBoard])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_boards():
    db.session.execute('TRUNCATE boards RESTART IDENTITY CASCADE;')
    db.session.commit()
