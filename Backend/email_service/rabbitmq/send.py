#!/usr/bin/env python
import pika, os
from pika.exchange_type import ExchangeType

url = os.environ.get('CLOUDAMQP_URL', 'amqps://swfthzpe:bTZUYRg-Gvk4uX5QzyhX2wQq2tY-cDN0@moose.rmq.cloudamqp.com/swfthzpe')
params = pika.URLParameters(url)
connection = pika.BlockingConnection(params)
channel = connection.channel()

channel.exchange_declare(exchange='routing', exchange_type=ExchangeType.direct)

channel.basic_publish(exchange='routing', routing_key='email', body='katongole.roy100@gmail.com')
print(" [x] Sent 'Hello World!'")
connection.close()