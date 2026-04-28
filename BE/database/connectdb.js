const { ChromaClient } = require("chromadb");
const { DefaultEmbeddingFunction } = require("@chroma-core/default-embed");

const client = new ChromaClient({
  path: "http://localhost:8000",
});

async function getCollection() {
  const collection = await client.getOrCreateCollection({
    name: "college_docs",
    embeddingFunction: new DefaultEmbeddingFunction(),
  });

  return collection;
}

module.exports = { client, getCollection };