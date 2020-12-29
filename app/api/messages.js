import client from "./client";

const endpoint = "/messages";

const getMessages = () => client.get(endpoint);

const send = (message, listingId) =>
  client.post("/messages", {
    message,
    listingId,
  });

export default {
  send,
  getMessages,
};
