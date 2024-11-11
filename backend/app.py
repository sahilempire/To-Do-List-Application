from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Initialize the Flask application once
app = Flask(__name__)

# Configure the app
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todos.db'  # Using SQLite database
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database and enable CORS
db = SQLAlchemy(app)
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS)

# Define the Todo model
class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200), nullable=True)
    done = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<Todo {self.title}>'

# Initialize tables before handling the first request
# @app.before_first_request
# def create_tables():
#     db.create_all()

# Routes for the Todo application
@app.route('/todos', methods=['GET'])
def get_todos():
    todos = Todo.query.all()
    return jsonify([{'id': todo.id, 'title': todo.title, 'description': todo.description, 'done': todo.done} for todo in todos])

@app.route('/todos', methods=['POST'])
def add_todo():
    data = request.get_json()
    new_todo = Todo(
        title=data['title'],
        description=data.get('description', ''),
        done=False
    )
    db.session.add(new_todo)
    db.session.commit()
    return jsonify({'id': new_todo.id, 'title': new_todo.title, 'description': new_todo.description, 'done': new_todo.done}), 201

@app.route('/todos/<int:id>', methods=['PUT'])
def update_todo(id):
    data = request.get_json()
    todo = Todo.query.get_or_404(id)
    todo.title = data['title']
    todo.description = data.get('description', '')
    todo.done = data.get('done', False)
    db.session.commit()
    return jsonify({'id': todo.id, 'title': todo.title, 'description': todo.description, 'done': todo.done})

@app.route('/todos/<int:id>', methods=['DELETE'])
def delete_todo(id):
    todo = Todo.query.get_or_404(id)
    db.session.delete(todo)
    db.session.commit()
    return jsonify({'message': 'Todo deleted successfully'}), 200

# Run the application
if __name__ == '__main__':
    app.run(debug=True)
