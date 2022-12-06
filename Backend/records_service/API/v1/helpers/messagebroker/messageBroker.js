class MessageBroker {
  constructor(url, queue, broker) {
    this.queue = queue;
    this.url = url;
    this.broker = broker;
    this.channel = null;
    this.conn = null;
  }

  async connect() {
    this.conn = await this.broker.connect(this.url);
    this.channel = await this.conn.createChannel();
    await this.channel.assertQueue(this.queue);
  }

  async sendMessage(message) {
    if (!this.channel) await this.connect();
    let msgStr = JSON.stringify(message);
    this.channel.sendToQueue(this.queue, Buffer.from(msgStr));
  }

  async consume() {
    if (!this.channel) await this.connect();
    this.channel.consume(queue, (msg) => {
      if (msg !== null) {
        console.log("Received:", msg.content.toString());
        ch1.ack(msg);
      } else {
        console.log("Consumer cancelled by server");
      }
    });
  }
}

module.exports = MessageBroker;
