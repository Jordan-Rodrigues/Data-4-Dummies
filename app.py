from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
import pandas as pd
import matplotlib.pyplot as plt

app = Flask(__name__)
# Change the first number to change the size of file allowed in MBs
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024

@app.route('/')
@app.route('/home')
def homepage():
    return render_template("home.html")

@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file():
   if request.method == 'POST':
      csvFile = request.files['file']
      df = pd.read_csv(csvFile)

      dfhead = df.head(6)
      dfhtml = dfhead.to_html()

      all_data, df_len = get_dataframe_data(df)

      column_len = len(all_data.index)
      count_of_nans = len(all_data['count_of_nans'].loc[all_data['count_of_nans'] != 0].index)
      columns_with_nans = all_data['percent_missing'].loc[all_data['percent_missing'] >= 10]

      return render_template("mainData.html", dfhtml=dfhtml,
      fileName = csvFile.filename, df_len=df_len, column_len=column_len,
      count_of_nans=count_of_nans, columns_with_nans=columns_with_nans)

# All column info
def get_dataframe_data(df):
    df_len = len(df.index)

    # Create Dataframe on all column info
    all_data = pd.DataFrame(
    {'columns': df.columns,
     'type': df.dtypes,
     'count_of_nans': df.isnull().sum()
    }).set_index('columns')

    # Booleon if column has NaN's
    all_data['no_nans'] = all_data['count_of_nans'].map(lambda x: x > 0)

    all_data['percent_missing'] = (all_data['count_of_nans'] / df_len) * 100
    all_data.sort_values(by='percent_missing', ascending=False, inplace=True)


    return all_data, df_len

@app.errorhandler(413)
def page_not_found(e):
    return render_template("413.html")
