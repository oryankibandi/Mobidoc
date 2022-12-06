#!/usr/bin/env python
import pika, sys, os
from pika.exchange_type import ExchangeType
from email_sender import sender_mail

def main():
    url = os.environ.get('CLOUDAMQP_URL', 'amqps://swfthzpe:bTZUYRg-Gvk4uX5QzyhX2wQq2tY-cDN0@moose.rmq.cloudamqp.com/swfthzpe')
    params = pika.URLParameters(url)
    connection = pika.BlockingConnection(params)
    channel = connection.channel()

    channel.exchange_declare(exchange='routing', exchange_type=ExchangeType.direct)

    queue = channel.queue_declare(queue='', exclusive=True)

    channel.queue_bind(exchange='routing', queue=queue.method.queue, routing_key='email')
    def callback(ch, method, properties, body):
        print(" [x] Received %r" % body)
        sender_mail(body.decode())
#This where i will put the function the communicates with the send email file
#An email is only sent if it has been recevied from the queue
#The function will run inside the callback

#I need to create a route that receives the data need to send the message
#I need to verify that the data sent is in an acceptable format for rabbitmq boby para
#verify data is sent from postman to rabbitmq queue
    channel.basic_consume(queue=queue.method.queue, on_message_callback=callback, auto_ack=True)

    print(' [*] Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()

if __name__ == '__main__':
    try:
        main() 
    except KeyboardInterrupt:
        print('Interrupted')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)