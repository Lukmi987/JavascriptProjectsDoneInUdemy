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
    constructor(name, buildYear, length, size){ 
    super(name,buildYear);
    this.length = length;
    this.size = size;
    } 
    
    classifyStreet() {
        const classification = new Map();
        classification.set(1,'tiny');
        classification.set(2,'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'huge');
        console.log(`${this.name} build in ${this.buildYear}, is a ${classification.get(this.size)} street`);
    
    }

}

//const park1 = new Park('Luzanky',1990,0.2,100);
//const park2 = new Park('Grand Canoyon',1900,0.5,200);
//const park3 = new Park('Zion',1800,0.8,3000);

const allParks = [new Park('Luzanky',1990,100,100),
                  new Park('Grand Canoyon',1900,1150,200),
                  new Park('Zion',1800,800,3000)
                 ];
const allStreets = [new Street('Majakovskeho',1950, 100,1),
                    new Street('Dukelska',1960, 200,3),
                    new Street('Lidicka',1930, 300,5),
                    new Street('Pavlovska',1920, 500,2)
                   ];



function calc(arr){
    //reduce to accumulate all elements to single value
    const sum = arr.reduce((prev,cur, index) => prev + cur, 0);
    
    return [sum, sum / arr.length];   
}

function reportParks(p){
   console.log(`------Parks Report ------`); 
    //Tree density
    p.forEach( el => el.treeDensity());    
    
    //Average age
    const ages = p.map(el => el.ageOfPark());
    //using the concept of destructuring
    const[totalAge, avgAge] = calc(ages);
    console.log(`Our ${p.length} parks have an average of ${avgAge}`);
    
    //Which park has more than 1000 trees
    //first we get all numbers of our trees into array and then use findIndex on that
    const i = p.map(el => el.numberTree).findIndex(el => el >= 1000);
    
    console.log(` ${p[i].name} has more than 1000 trees.`);

}

function reportStreets(s){
    console.log(`------Streets Report ------`); 
    
    //Total and average length of the town's streets
    const [totalLength, avgLength] = calc(s.map(el => el.length));
    console.log(`Our ${s.length} streets have a total length ${totalLength} km, with an average of ${avgLength}`);
    
    //Classify sizes
    s.forEach(el => el.classifyStreet());

}

console.log(typeof(allParks));

reportParks(allParks);
reportStreets(allStreets);

