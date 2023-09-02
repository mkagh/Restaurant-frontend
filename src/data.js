import Burger from './images/burger.jpg'
import Pizza from './images/pizza.jpg'
import Salad from './images/salad.jpg'
import Pasta from './images/pasta.jpg'
import Steak from './images/steak.jpg'
import Sushi from './images/sushi.jpg'
import Sandwich from './images/sandwich.jpg'
import Taccos from './images/taccos.jpg'
import Soup from './images/soup.jpg'
import Chickenwings from './images/chickenwings.jpg'
import Cake from './images/cake.jpg'
import Icecream from './images/icecream.jpg'
import Tart from './images/tart.jpg'
import Cheesecake from './images/cheesecake.jpg'



const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]
const years = [
    '2023',
    '2024',
    '2025',
    '2026',
    '2027',
    '2028'

]


const items = [
    {
        id: 1,
        name: 'Burger',
        price: 9.99,
        ingredients: ['Beef patty, lettuce, tomato, onion'],
        image: Burger,
        category: 'Main Course',
        amount: 1
    },
    {
        id: 2,
        name: "Pizza",
        price: 12.99,
        ingredients: ['Tomato sauce, cheese, pepperoni, mushrooms'],
        image: Pizza,
        category: 'Main Course',
        amount: 1
    },
    {
        id: 3,
        name: "Salad",
        price: 7.99,
        ingredients: ['Lettuce, cucumber, cherry tomatoes, dressing'],
        image: Salad,
        category: 'Appetizer',
        amount: 1
    },
    {
        id: 4,
        name: 'Pasta',
        price: 10.49,
        ingredients: ['Pasta, marinara sauce, parmesan cheese'],
        image: Pasta,
        category: 'Main Course',
        amount: 1
    },
    {
        id: 5,
        name: 'Steak',
        price: 18.99,
        ingredients: ['Beef steak, mashed potatoes, aspara]gus'],
        image: Steak,
        category: 'Main Course',
        amount: 1
    },
    {
        id: 6,
        name: 'Sushi',
        price: 14.99,
        ingredients: ['Rice, raw fish, avocado, seaweed'],
        image: Sushi,
        category: 'Main Course',
        amount: 1
    },
    {
        id: 7,
        name: 'Sandwich',
        price: 6.99,
        ingredients: ['Ham, cheese, lettuce, bread'],
        image: Sandwich,
        category: 'Main Course',
        amount: 1
    },
    {
        id: 8,
        name: 'Soup',
        price: 5.49,
        ingredients: ['Vegetables, broth, noodles'],
        image: Soup,
        category: 'Appetizer',
        amount: 1
    },
    {
        id: 9,
        name: 'Taccos',
        price: 8.79,
        ingredients: ['Tortilla, beef, lettuce, salsa, che]ese'],
        image: Taccos,
        category: 'Main Course',
        amount: 1
    },
    {
        id: 10,
        name: ' Chickenwings',
        price: 9.49,
        ingredients: ['Chicken wings, buffalo sauce, celer]y, ranch'],
        image: Chickenwings,
        category: 'Appetizer',
        amount: 1
    },
    {
        id: 11,
        name: 'Cake',
        price: 6.49,
        ingredients: ['Chocolate, flour, sugar, eggs'],
        image: Cake,
        category: 'Dessert',
        amount: 1
    },
    {
        id: 12,
        name: 'Icecream',
        price: 3.99,
        ingredients: ['Milk, sugar, cream, flavorings'],
        image: Icecream,
        category: 'Dessert',
        amount: 1

    },
    {
        id: 13,
        name: 'Tart',
        price: 4.99,
        ingredients: ['Shortcrust pastry, custard, fresh f]ruits'],
        image: Tart,
        category: 'Dessert',
        amount: 1
    },
    {
        id: 14,
        name: 'Cheesecake',
        price: 5.99,
        ingredients: ['Cream cheese, graham cracker crust,] topping'],
        image: Cheesecake,
        category: 'Dessert',
        amount: 1
    },
];

export default items;



export { months, years, items }