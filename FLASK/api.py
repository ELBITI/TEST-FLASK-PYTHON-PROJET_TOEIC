from flask import Flask, request, jsonify
from PIL import Image

app = Flask(__name__)

@app.route('/process', methods=['POST'])
def process_image():
    try:
        # Récupérer l'image envoyée par PHP
        image_file = request.files['image']
        image = Image.open(image_file)

        # Exemple de traitement : obtenir la taille de l'image
        width, height = image.size
        return jsonify({"status": "success", "width": width, "height": height}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
    
