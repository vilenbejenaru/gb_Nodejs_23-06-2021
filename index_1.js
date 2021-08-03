const colors = require("colors/safe");

function calcPrimes(max){
    let primes = [];
    for(i=2; i<=max; i++){
        let isPrime = true;
        for(let j=0; j<primes.length; j++){
            let p = primes[j];
            if( i % p === 0){
                isPrime=false;
                break;
            }
            if(p*p > i)
                break;
         }

        if(isPrime)
            primes.push(i);
        }

        for (i=0; i<primes.length; i=i+3) {
        console.log(colors.green(primes[i]));
            if (primes[i+1] !== undefined) {
                console.log(colors.yellow(primes[i+1]));
            }
            if (primes[i+2] !== undefined) {
                console.log(colors.red(primes[i+2]));
            }
        }
}
calcPrimes(50);
