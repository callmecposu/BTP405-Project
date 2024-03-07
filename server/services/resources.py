from models import resources as ResourcesModel

from llama_index.embeddings import HuggingFaceEmbedding
import torch

embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-small-en-v1.5")
cos = torch.nn.CosineSimilarity(dim=0)

def findResources(query):
    all_results =  ResourcesModel.Resources.objects()

    query_embedding = embed_model.get_text_embedding(query)
    results = []

    for result in all_results:
        result_embedding = result.embedding
        similarity = cos(torch.tensor(query_embedding), torch.tensor(result_embedding))
        if similarity > 0.615 or query == "":
            results.append({"title": result["title"], "subtitle": result["subtitle"], "content": result["content"], "score": 1.0 if query == "" else float(similarity)})
    
    results = sorted(results, key=lambda x: x["score"], reverse=True)
    
    return results

