const searchInput = document.getElementById("recipeInput");
const showRecipe = document.getElementById("recipesList");

async function getRecipe() {
    try {
        const response = await fetch("https://dummyjson.com/recipes");
        if (!response.ok) {
            throw new Error("Failed to fetch recipes");
        }
        const data = await response.json();
        return data.recipes;
    } catch (error) {
        console.error("Error:", error);
        showRecipe.innerHTML =
            '<p class="text-red-500 text-center">Error fetching recipes. Please try again later.</p>';
        return [];
    }
}

async function veiwRecipe(search = "") {
    const recipes = await getRecipe();
    showRecipe.innerHTML = "";

    const filteredRecipes = recipes.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    if (filteredRecipes.length === 0) {
        showRecipe.innerHTML =
            '<p class="text-gray-500 text-center col-span-full">No recipes found.</p>';
        return;
    }

    filteredRecipes.forEach((item) => {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add(
            "bg-white",
            "max-h-xl",
            "p-4",
            "rounded-lg",
            "shadow-lg",
            "hover:shadow-xl",
            "transition-shadow",
            "duration-300"
        );

        recipeDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="rounded-t-lg w-full h-48 object-cover mb-4" />
      <h3 class="text-lg font-semibold text-gray-800">${item.name}</h3>
      <p class="text-sm text-gray-600"><strong>Ingredients:</strong> ${item.ingredients
                .slice(0, 3)
                .join(", ")}...</p>
      <p class="text-sm text-gray-600"><strong>Instruction:</strong> ${item.instructions[0]}...</p>
    `;

        showRecipe.appendChild(recipeDiv);
    });
}

searchInput.addEventListener("input", () => {
    const search = searchInput.value.trim();
    veiwRecipe(search);
});

veiwRecipe();
