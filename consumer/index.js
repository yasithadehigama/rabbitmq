const amqp = require("amqplib");
const queue = "test_queue";

(async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    process.once("SIGINT", async () => {
      await channel.close();
      await connection.close();
    });

    await channel.assertQueue(queue, { durable: false });
    await channel.consume(
      queue,
      (message) => {
        if (message) {
          //console.log(message);
          console.log("Received '%s'", JSON.parse(message.content.toString()));
        }
      },
      { noAck: true }
    );

    console.log("Waiting for messages.");
  } catch (err) {
    console.warn(err);
  }
})();
