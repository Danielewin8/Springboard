from app import app
from forex_python.converter import CurrencyRates, CurrencyCodes
from unittest import TestCase
from flask import session

currency_rates = CurrencyRates(force_decimal=False)
currency_code = CurrencyCodes()

class Tests(TestCase):
    def setUp(self):
        self.client = app.test_client()

    def homepage_test(self):
        with app.test_client() as client:
            resp = client.get("/")
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Currency Converter</h1>', html)

    def redirect_test(self):
        with app.test_client() as client:
            resp = client.get("/back-button")

            self.assertEqual(resp.status_code, 302)
            self.assertEqual(resp.location, "http://127.0.0.1:5000/")

    def test_conversion(self):
        with self.client as client:
            self.assertEqual(currency_rates.convert("USD", "USD", 1), 1)
            self.assertEqual(currency_rates.convert("EUR", "EUR", 1), 1)
            self.assertEqual(currency_rates.convert("JPY", "JPY", 1), 1)