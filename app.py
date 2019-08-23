from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
import pandas as pd
import matplotlib.pyplot as plt 

app = Flask(__name__)

@app.route('/')
def homepage():
    return render_template("home.html")

@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file():
   if request.method == 'POST':
      csvFile = request.files['file']
      df = pd.read_csv(csvFile)
      dfhead = df.head(7)
      dfhtml = dfhead.to_html()
      return render_template("mainData.html", dfhtml=dfhtml, fileName = csvFile.filename)