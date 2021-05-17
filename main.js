//Returns a random DNA base
const returnRandomBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G'];
    return dnaBases[Math.floor(Math.random()*4)];
};

//Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
    const newStrand = [];
   
    for (let i = 0; i < 15; i++) {
        newStrand.push(returnRandomBase())
    };

    return newStrand;
};

const pAequorFactory = (number, array) => {
    return {
        specimenNumber: number,
        dna: array,

        //Takes one base from the given DNA and replaces it with a different one.
        mutate () {
            let randomIndex = Math.floor(Math.random() * 15); //Gets a random number between [0...14]
            let selectedBase = this.dna[randomIndex]; //Gets a base from the given dna, using the previous random number.
            let newBase = returnRandomBase();

            //Repeat the method ".returnRandomBase()" until find a "newBase" different from the "selectedBase"
            while(newBase === selectedBase) {
                newBase = returnRandomBase();
            };

            this.dna[randomIndex] = newBase;
        },
        
        compareDNA (other_pAequor) {
            let equalDNA = [];
            
            for(let i = 0; i < 15; i++) {
            if (this.dna[i] === other_pAequor.dna[i]) {
                    equalDNA.push(this.dna[i])
                }
            };

            console.log(`Specimen #0 and specimen #1 have ${ (equalDNA.length / this.dna.length) * 100}% DNA in common`)
        },

        willLikelySurvive () {
            let counter = 0; //variable created to count the number of 'G' and 'C' bases
            let percentage = (counter/this.dna.length) *100;
            
            for (let i = 0; i < this.dna.length; i++) {
                if (this.dna[i] === 'G' || this.dna[i] === 'C') {
                    counter++
                }
            };

            if (counter / this.dna.length * 100 >= 60) {
                return true
            } else {
                return false
            };

        },
     }
 }

const sample = () => {
    let survivors = [];
    let i = 0;

    while (survivors.length < 30) {
        let newCreature = pAequorFactory(i, mockUpStrand());
        
        if (newCreature.willLikelySurvive()) {
            survivors.push(newCreature);
            i++;
        }
    };

    return survivors
}

console.log(sample())