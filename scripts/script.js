// PROCEDURE
// 1. flip a coin
// 2. do it 100 times and store the number of heads and tails
// 3. User submits a value that will repeat the above process X number of times, storing the number of heads and tails from each call of the function in an array.
// 4. print the min and max values from each array to the dom

$(function(){
    // Write a flip() function that flips a coin and returns heads or tails based on a random number.
    //COIN FLIP ~~~~~~~
    const flip = () => {
        // use an array to store heads or tails
        const coin = ['heads', 'tails'];
        // return an index randomly
        const flipResult = coin[Math.floor(Math.random()* coin.length)];
        return flipResult;
    };

    // Write a function flipMany() that calls flip() 100 times. Recording the results of heads and tails.
    // FLIP MANY ~~~~~~~
    const flipMany = () => {
        //how many times do we want to flip the coin?
        const count = 100;
        // create an object to hold the results
        const group = {
            heads: 0,
            tails: 0
        }
        // flip() count times and store in variable
        for (let i = 0; i < count; i++) {
            let side = flip();
            // if group.heads + group.tails < count, flip the coin and add it to the group object
            if (side === 'heads') {
                group.heads = group.heads + 1;
            } else {
                group.tails = group.tails + 1;
            }
        }
        return group;
    };

    // Write a function flipManyGroups() that calls flipMany() 100,000. Each time the flipMany() is run, it might find a new high/low.
    // FLIP MANY GROUPS ~~~~~~~
    const flipManyGroups = (count) => {
        // how many times to run flipMany() is determined by the value that is submitted through the dom
        //store all the heads in an array
        const heads = [];
        //store all the tails in an array
        const tails = [];
        // loop function count times
        for (let i = 0; i < count; i++) {
            // store the result of each flip
           const group = flipMany();
            // pass the result heads and tails array accordingly.
            heads.push(group.heads);
            tails.push(group.tails);
        }

        //Look for the max and min values in each array and store it in variable
        //We are simultaneously applying the value to our html by replacing the text of our selector
        const headsHigh = $('.highs .heads').html(
            `<h3>Highest Number of Heads</h3>
            <h3>${Math.max(...heads)}</h3>`);

        const headsLow = $('.lows .heads').html(
            `<h3>Lowest Number of Heads</h3>
            <h3>${Math.min(...heads)}</h3>`);

        const tailsHigh = $('.highs .tails').html(
            `<h3>Highest Number of Tails</h3>
            <h3>${Math.max(...tails)}</h3>`);

        const tailsLow = $('.lows .tails').html(
            `<h3>Lowest Number of Tails</h3>
            <h3>${Math.min(...tails)}</h3>`);
    };

    //on form submit, assign the value to the count and run theflipManyGroups function
    const count = $('form').on('submit', function(e){
        e.preventDefault();
        const $input = $('input[type=text]');
        //store value in count
        let val = $input.val();
        //make sure that the count is a number, otherwise return an error
        if(val > 0){
            val = flipManyGroups(val);
        } else {
            alert(`You've got to enter in a number`)
            val = $input.val("");
        }
        //provide feedback to confirm submit
        $('form div').fadeIn(500);
    });

    //let's focus on the input on page load
    $('input[type=text]').focus()
});