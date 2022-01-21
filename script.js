document.querySelector('body').onload = () => {
    // run function after loading...
    renderRecipes();
}


let recipes = [
    {
        id: 0,
        title: 'Awesome recipe',
        ingredients: [
            'apple',
            'banana'
        ],
        body: 'This is an awesome smoothie'
    },
    {
        id: 1,
        title: 'Awesome recipe 2',
        ingredients: [
            'apple',
            'banana',
            'mango'
        ],
        body: 'This is another awesome smoothie'
    },
    {
        id: 2,
        title: 'Awesome recipe 3',
        ingredients: [
            'apple',
            'mango',
            'pineapple'
        ],
        body: 'This is another super awesome smoothie'
    },
    {
        id: 3,
        title: 'Awesome recipe 4',
        ingredients: [
            'apple',
            'banana',
            'mango',
            'grapes'
        ],
        body: 'This is another mega awesome smoothie'
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

















