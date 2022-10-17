from app.models import db, Card


# Adds a demo user, you can add other users here if you want
def seed_cards():
    demo = Card(
        title='Grocery List', content='Broccoli \n fruit \n more stuff', userId=2, boardId=2, parent=1)
    demo2 = Card(
        title='Grocery List', content='Broccoli \n fruit \n more stuff', userId=2, boardId=2, parent=2)
    demo3 = Card(
        title='Grocery List', content='Broccoli \n fruit \n more stuff', userId=2, boardId=2, parent=3)          
    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_cards():
    db.session.execute('TRUNCATE cards RESTART IDENTITY CASCADE;')
    db.session.commit()
