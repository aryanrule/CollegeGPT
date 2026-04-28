const { ChromaClient } = require("chromadb");

const client = new ChromaClient({
  path: "http://localhost:8000",
});

async function getCollection() {
  const collection = await client.getOrCreateCollection({
    name: "college_docs",
  });

  return collection;
}

module.exports = { client, getCollection };