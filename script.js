document.querySelector('body').onload = () => {
    // run function after loading...
    renderRecipes();
}


let recipes = [
    {
        id: 0,
        title: 'Masala Cheese French Toast',
        ingredients: [
            'bread',
            'cheese'
        ],
        body: 'Saucy bread and cheese sandwiches dipped in a herby egg white batter and pan fried. A quick and healthy option for your breakfast on-the-go or a mid night snack.'
    },
    {
        id: 1,
        title: 'Chilli Gobhi',
        ingredients: [
            'Cauliflower'
        ],
        body: 'Spice is nice. Cauliflower florets cooked with an oriental tang. A quick serving for those unannounced guests! This delightful vegetarian recipe will help keep you hunger pangs away. It has a mix of spices that will ensure your palates are satisfied. '
    },
    {
        id: 2,
        title: 'Yogurt Crunch Pudding',
        ingredients: [
            'yogurt',
            'honey',
            'rose water'
        ],
        body: 'A breezy pudding to complete a lazy Sunday afternoon well spent. Impress all with this fuss free fruity dessert. What\'s better than having a crunchy and healthy dessert after a good meal? Nothing, we assure, as this recipe is bound to make you fall in love.'
    }
];

let currentlyEditing = recipes.length;

// ref
let recipesList = document.querySelector('.recipe-list');


const renderRecipes = () => {
    // render logic here...

    recipesList.innerHTML = '';

    recipes.map(recipe => {
        recipesList.innerHTML += `
            <div class="recipe-card">
            <h2 class="recipe-title">${recipe.title}</h2>
            <div class="recipe-hero">
                <div class="recipe-ingredients">
                <ul class="ingredients-list">
                    ${
                        recipe.ingredients.map(item => (
                            `<li>${item}</li>`
                        )).join('')
                    }
                </ul>
                </div>
            </div>
            <div>${recipe.body}</div>
            <button class="btn-edit" onclick="editItem(${recipe.id})">Edit</button>
            <button class="btn-delete" onclick="deleteItem(${recipe.id})">Delete</button>
            </div>
        `;
    })
}


// form elements ref
const form = document.querySelector('.add-recipe');

const titleInput = document.querySelector('.recipe-title');
const ingredientsInput = document.querySelector('.recipe-ingredients');
const bodyInput = document.querySelector('.recipe-body');

const editItem = (id) => {
    // e.preventDefault();
    console.log(id);
    currentlyEditing = id;
    setFormDefaults(); 
    setFormData(id);    
}

const deleteItem = (id) => {
    recipes = recipes.filter(recipe => recipe.id !== id);
    renderRecipes();
}

const setFormData = (id) => {
    titleInput.value = recipes[id].title;
    ingredientsInput.value = recipes[id].ingredients.join(", ");
    bodyInput.value = recipes[id].body;
    form.scrollIntoView();
}

const setFormDefaults = () => {
    titleInput.value = '';
    ingredientsInput.value = '';
    bodyInput.value = '';
}

const submitForm = (e) => {
    e.preventDefault();
    if(currentlyEditing !== -1) {
        const newRecipe = {
            id: recipes.length,
            title: titleInput.value,
            ingredients: ingredientsInput.value.split(','),
            body: bodyInput.value
        }

        recipes = [...recipes, newRecipe];
        
        // re-render
        renderRecipes();
        setFormDefaults();
    
        // currentlyEditing = -1
        currentlyEditing = recipes.length;
    } else {
        console.log("Nothing to submit.")
    }
}

















