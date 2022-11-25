import requests

def send_simple_message():
	return requests.post(
		"https://api.mailgun.net/v3/sandboxa6ad4b8ad01d4540bc9e059ae1b76a86.mailgun.org/messages",
		auth=("api", "de254d027a90c9b0d189861101dc35af-69210cfc-e8e20f0e"),
		data={"from": "sandboxa6ad4b8ad01d4540bc9e059ae1b76a86.mailgun.org",
			"to": ["katongole.roy100@gmail.com"],
			"subject": "Hello",
			"text": "Testing some Mailgun awesomness!"})

x = send_simple_message()

print(x)git 
