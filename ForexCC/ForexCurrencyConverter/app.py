from flask import Flask, request, render_template, redirect, session, jsonify, flash
from forex_python.converter import CurrencyRates, CurrencyCodes


app = Flask(__name__)
app.config["SECRET_KEY"] = "paslkdasdj"

currency_rates = CurrencyRates(force_decimal=False)
currency_code = CurrencyCodes()

@app.route("/")
def converter_form():
    """Homepage for converting currency"""

    return render_template("index.html")

@app.route("/result", methods=["GET","POST"])
def show_result():
    """Gets currencies and amount from form, uses imported currency codes and names to determine what currencies are for conversion. Then exceptions for incorrect inputs."""
    convert_from = request.form.get("convert-from")
    convert_to = request.form.get("convert-to")
    
    try:
        amount = float(request.form.get("amount"))

        input_code = currency_code.get_symbol(convert_from)
        output_code = currency_code.get_symbol(convert_to)
        input_name = currency_code.get_currency_name(convert_from)
        output_name = currency_code.get_currency_name(convert_to)

        converted = currency_rates.convert(convert_from, convert_to, amount)
        rounded = round(converted, 2)

        return render_template("results.html", rounded=rounded, output_code=output_code)

    except ValueError:
        flash("Error: Please enter a valid number for amount", "error")
        return redirect("/")
    except Exception as error:
        error = str(error)
        if error == "Currency Rates Source Not Ready" or "Currency {0} => {1} rate not available for Date {2}.":
            flash("Error: Please enter a valid currency", "error")
        return redirect("/")
    
        

   
  

    
    
