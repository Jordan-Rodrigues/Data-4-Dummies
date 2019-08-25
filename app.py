from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
import pandas as pd
import matplotlib.pyplot as plt

app = Flask(__name__)

@app.route('/')
@app.route('/home')
def homepage():
    return render_template("home.html")

@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file():
   if request.method == 'POST':
      csvFile = request.files['file']
      df = pd.read_csv(csvFile)
      dfhead = df.head(7)
      dfhtml = dfhead.to_html()
      df_len = len(df.index)
      all_data, df_len = get_dataframe_data(df)
      column_len = len(all_data.index)
      return render_template("mainData.html", dfhtml=dfhtml,
      fileName = csvFile.filename, df_len=df_len, column_len=column_len)

# All column info
def get_dataframe_data(df):
    # Create Dataframe on all column info
    all_data = pd.DataFrame(
    {'columns': df.columns,
     'type': df.dtypes,
     'count_of_nans': df.isnull().sum()
    }).set_index('columns')

    # Booleon if column has NaN's
    all_data['no_nans'] = all_data['count_of_nans'].map(lambda x: x > 0)

    df_len = len(df.index)

    return all_data, df_len
