const amqp = require("amqplib");

const queue = "test_queue";
const text = {
  text: "sending test message",
};

(async () => {
  let connection;
  try {
    connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(text)));
    console.log(" [x] Sent '%s'", text);
    await channel.close();
  } catch (err) {
    console.warn(err);
  } finally {
    if (connection) await connection.close();
  }
})();
