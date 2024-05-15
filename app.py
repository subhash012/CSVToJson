from flask import Flask, render_template, request
import csv

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/convert', methods=['POST'])
def convert():
    # Get the uploaded CSV file
    csv_file = request.files['csvfile']

    # Save the CSV file temporarily
    csv_file.save('temp.csv')

    # Compile CSV to JSON
    with open('temp.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        headers = next(csv_reader)  # Read the headers
        json_data = []

        for row in csv_reader:
            # Create a dictionary for each row
            row_data = {}
            for index, value in enumerate(row):
                # Use the headers as keys and row values as values
                row_data[headers[index]] = value
            json_data.append(row_data)

        # Convert list of JSON data to string
        json_string = jsonify(json_data)

    return json_string, 200, {'Content-Type': 'application/json'}

def jsonify(data):
    json_string = '['
    for i, row in enumerate(data):
        json_string += '{'
        for key, value in row.items():
            json_string += f'"{key}": "{value}",'
        json_string = json_string[:-1]  # Remove the trailing comma
        json_string += '},'
    json_string = json_string[:-1]  # Remove the trailing comma
    json_string += ']'
    return json_string

if __name__ == '__main__':
    app.run(debug=False,host='0.0.0.0')
