const repositoryList = document.querySelector("#repositories");
const statusMessage = document.querySelector("#status");

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    for (const repository of repositories) {
      const item = document.createElement("li");
      item.className = "repository";

      const link = document.createElement("a");
      link.href = repository.url;
      link.textContent = repository.repository;

      const description = document.createElement("p");
      description.textContent = repository.description;

      const date = document.createElement("time");
      date.dateTime = repository.starred_at;
      date.textContent = `Starred on ${new Date(`${repository.starred_at}T00:00:00`).toLocaleDateString()}`;

      item.append(link, description, date);
      repositoryList.append(item);
    }

    statusMessage.textContent = repositories.length
      ? `Showing ${repositories.length} starred repositories.`
      : "No starred repositories yet.";
  } catch (error) {
    statusMessage.dataset.state = "error";
    statusMessage.textContent = "Could not load starred repositories. Please try again later.";
    console.error("Failed to load starred repositories:", error);
  }
}

loadRepositories();
