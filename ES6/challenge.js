/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/

class Element{
    constructor(name, buildYear){
        this.name = name;
        this.buildYear = buildYear;
    }
}

class Park extends Element{
    constructor(name,buildYear,numberTree,parkArea){
        super(name,buildYear);
        this.numberTree = numberTree;
        this.parkArea = parkArea; //km2
    }
    
    treeDensity(){      
    const treeDen = this.numberTree / this.parkArea;
        console.log(`${this.name} has a tree density of ${treeDen}`);
    }
    
    ageOfPark(){
        const age =  new Date().getFullYear() - this.buildYear;
        return age;
        //console.log(`the age of park is ${age}`);
    }
}


class Street extends Element{
    constructor(name, buildYear, length){ 
    super(name,buildYear);
    this.length = length;
    } 

}

var park1 = new Park('Luzanky',1990,500,100);
var park2 = new Park('Grand Canoyon',1900,5000,300);
var park3 = new Park('Zion',1800,800,30);

//1. Tree density of each park in the town

console.log(`------Parks Report ------`);
park1.treeDensity();
park2.treeDensity(); 
park3.treeDensity();



//2. Average age of town's parks
const parks = new Map();
parks.set(1, park1.ageOfPark());
parks.set(2, park2.ageOfPark());
parks.set(3, park3.ageOfPark());
//console.log(parks.size);


let sum =0;
parks.forEach((key) =>  sum += key ); //count the sum of the age of parks
const averageAgeOfParks = sum / parks.size;
console.log(`Average age of our parks ${averageAgeOfParks}`);


console.log(park1.numberTree);

//3 Park which has more than 1000 trees
parks.set(park1.name, park1.numberTree);
parks.set(park2.name, park2.numberTree);
parks.set(park3.name, park3.numberTree);

for(let[key,value] of parks.entries()){
    
    if( value >= 1000){
        console.log(`The ${key} has more than 1000 trees precisely ${value}`);
    }
}

//Street Report
const street1 = new Street('Majakovskeho',1950, 100);
const street2 = new Street('Dukelska',1960, 200);
const street3 = new Street('Lidicka',1930, 300);
const street4 = new Street('Pavlovska',1920, 500);
const street = new Street(null,1300);

console.log(`----Street Report----`);
// 4 total length of the our streets

const streets = new Map();
streets.set(1,street1.length);
streets.set(2,street2.length);
streets.set(3,street3.length);
streets.set(4,street4.length);


let sumStreet = 0;
streets.forEach((key) => sumStreet += key);
const totalLength = sumStreet;
const averageSize = sumStreet / streets.size;
console.log(`Total length of our 4 streets is ${totalLength} and average of ${averageSize}`);

//5
const streetsDef = new Map();
streetsDef.set('tiny', street1.name);
streetsDef.set('normal', street2.name);
streetsDef.set('big', street3.name);
streetsDef.set('huge', street4.name);

for(let[key,value] of streetsDef.entries()){
    
console.log(`The ${value} street is ${key}`);

}

