


{
    let love = 'amor';
    console.log(love);
}

let name = 'andres'
let last_name = 'calambas'
let ege = '12'
country = 'india'
city = 'new dely'

console.log(`hola  soy ${name} ${last_name}
tengo una edad aproximada de ${ege}  mi pais de 
origen es ${country}  y vivo en la ciudad de ${city}`)

// destructuracion de objectos

let carros = {
    name: 'mesa',
    color: 'black',
    peso: {
        amor: 'lo mas bonito',
        desamor: 'lo mas doloroso'
    },
    precie: 50,
}

let { name, color, peso, precie } = carros;
console.log(peso)
console.log(name, color, peso, precie);


//spread operator

let gama_alta = ['bmw', 'ferrary', 'alfa romery', 'ford']
let gama_media = ['renault', 'mazda', 'toyota']

let gama = [...gama_alta, 'suzuki', ...gama_media]
console.log(gama)


// objectos

let name = 'julian'
let ege = 21
let gender = 'male'


let person = { name: name, ege: ege, gender: gender };
console.log(person)
//nueva forma
let person1 = { name, ege, gender }

console.log(person1)

//close object 


//scope of variable
{
    {
        let children = false;
        {
            let girl = 'daniela'
            console.log(girl);
            console.log(typeof (girl))
        }

        children && console.log(true)

    }
}
// close scope of variable


// arrow function

// 1)

const market = [
    { product: 'oil', quantity: 2, price: 4 },
    { product: 'sugar', quantity: 12, price: 32 },
    { product: 'rice', quantity: 21, price: 3 },
    { product: 'salt', quantity: 43, price: 0.32 }
]
//old version
const my_market = market.map(function (element) {
    console.log(element.product);
})

//new version
const my_market2 = market.map(element => console.log(element))

//other new version with destructuring
const my_market3 = market.map(({ product, quantity, price }) => {
    console.log(product, quantity, price)
})

//close arrow function

// promises  resolve=>resolver, reject=>rechazar

const say = (valor) => {
    return new Promise((resolve, reject) => {
        if (!valor) {
            resolve('promesa resuelta :D')
        } else {
            reject('promesa  fallida:( ')
        }
    })
}

say(false)
    .then(success => console.log(success))
    .catch(errors => console.log(errors))

//practice

const teach = (teacher) => {
    return new Promise((resolve, reject) => {
        if (teacher) {
            resolve('you are a well teacher')
        } else {
            reject('you are a bad teacher')
        }
    })
}

teach(true)
    .then((success) => console.log(success))
    .catch((errors) => console.log(errors))






const market = [
    { product: 'oil', quantity: 2, price: 200 },
    { product: 'sugar', quantity: 12, price: 320 },
    { product: 'rice', quantity: 21, price: 1200 },
    { product: 'salt', quantity: 43, price: 1000 },
    { product: 'oil', quantity: 3, price: 300 },
    { product: 'oil', quantity: 5, price: 500 },
    { product: 'oil', quantity: 2, price: 500 },
    { product: 'oil', quantity: 12, price: 500 },
    { product: 'rice', quantity: 21, price: 1200 }
]

let marketOne = market
let newMarket = []

market.map((value1) => {
    let product = ''
    let quantity = 0
    let price = 0
    marketOne.map((value2) => {
        if (value1.product == value2.product) {
            quantity += value2.quantity;
            price += value2.price;
        }
    })
    product = value1.product;

    if (newMarket.length == 0) {
        newMarket.push({ product, quantity, price })
    } else {
        let flag1 = 0;
        newMarket.map((value3) => {
            if (product == value3.product) {
                flag1++;
            }
        })
        if (flag1 === 0) {
            newMarket.push({ product, quantity, price })
        }
    }
})

console.log(newMarket)



