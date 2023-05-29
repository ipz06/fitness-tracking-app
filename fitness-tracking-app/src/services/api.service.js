// fetch('https://api.edamam.com/api/nutrition-details?app_id=a4327f4b&app_key=71caf64c6a09a9de397dc19053230452', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         title: 'Fresh Ham Roasted With Rye Bread and Dried Fruit Stuffing',
//         ingr: ['1 fresh ham, about 18 pounds, prepared by your butcher (See Step 1)',
//         '7 cloves garlic, minced',
//         '1 tablespoon caraway seeds, crushed',
//         '4 teaspoons salt',
//         ]
//     })
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error('Error:', error));



// export const analyzeNutrition = async (recipeTitle, ingredients) => {
//     const response = await fetch('https://api.edamam.com/api/nutrition-details?app_id=a4327f4b&app_key=71caf64c6a09a9de397dc19053230452', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             title: recipeTitle,
//             ingr: ingredients
//         })
//     });
//     const data = await response.json();
//     return data;
// };

export const analyzeNutrition = async (recipeTitle, ingredients) => {
    const response = await fetch('https://api.edamam.com/api/nutrition-details?app_id=a4327f4b&app_key=71caf64c6a09a9de397dc19053230452', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: recipeTitle,
            ingr: ingredients
        })
    });
    if (!response.ok) {
        let errMsg = `HTTP error! status: ${response.status}`;
        try {
            let errorBody = await response.json();
            errMsg += ', ' + (errorBody.error || JSON.stringify(errorBody));
        } catch(e){
            console.log(e);
        }
        throw new Error(errMsg);
    }
    const data = await response.json();
    return data;
};