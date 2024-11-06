const API_KEY = "275d58779ccf4e22af03e792e8819fff";
const recipeListEl = document.getElementById("recipe-list");

function displayRecipes(recipes) {
  // 清除当前列表以确保显示更新的配方列表
  recipeListEl.innerHTML = "";
  recipes.forEach((recipe) => {
    // 对于 recipes 数组中的每个配方，它会创建一个 li 元素并填充它
    const recipeItemEl = document.createElement("li");
    recipeItemEl.classList.add("recipe-item");

    const recipeImageEl = document.createElement("img");
    recipeImageEl.src = recipe.image || "https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; 
    recipeImageEl.alt = "recipe image";

    const recipeTitleEl = document.createElement("h2");
    recipeTitleEl.innerText = recipe.title;

    const recipeIngredientsEl = document.createElement("p");
    recipeIngredientsEl.innerHTML = `
        <strong>Ingredients:</strong> ${recipe.extendedIngredients
          .map((ingredient) => ingredient.original)
          .join(", ")}
    `;

    const recipeLinkEl = document.createElement("a");
    recipeLinkEl.href = recipe.sourceUrl;
    recipeLinkEl.innerText = "View Recipe";

    recipeItemEl.appendChild(recipeImageEl);
    recipeItemEl.appendChild(recipeTitleEl);
    recipeItemEl.appendChild(recipeIngredientsEl);
    recipeItemEl.appendChild(recipeLinkEl);
    recipeListEl.appendChild(recipeItemEl);
  });
}

async function getRecipes() {
  // 使用 fetch（） 从 Spoonacular API 获取 10 个随机配方
  const response = await fetch(`https://api.spoonacular.com/recipes/random?number=12&apiKey=${API_KEY}`);
  // 如果响应不成功（非 OK 状态），则会引发错误并显示一条消息
  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }
  // 如果响应成功，它将解析 JSON 并返回配方列表 （data.recipes）
  const data = await response.json();
  return data.recipes;
}

// 当一个函数被标记为 async 时，它会自动返回一个 Promise 对象，并且可以使用 await 在这个函数内部等待异步操作的结果
async function init() {
  try {
    // 如果成功，它将调用 displayRecipes（recipes） 将配方呈现到页面
    // await 只能在 async 函数中使用，它会等待一个 Promise 被解决
    const recipes = await getRecipes();
    displayRecipes(recipes);
  } catch (error) {
    // 如果出现错误（例如，网络问题或 API 故障），它会显示一条回退消息：“无法加载配方。请稍后再试
    recipeListEl.innerHTML = "<li>Failed to load recipes. Please try again later.</li>";
    console.error(error);
  }
}

// 调用 init（） 来启动该过程
init();
