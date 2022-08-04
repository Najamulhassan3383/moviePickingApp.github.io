const container = document.querySelector('.container');
const unocc_seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movie_select = document.getElementById('movie');
let ticket_price = Number(movie_select.value);

populateUI();


//for storing movie price and choice to local storage

function register_movie_data(movieIndex, moviePrice) {
    localStorage.setItem("Selected_movie_choice", movieIndex);
    localStorage.setItem("Selected_movie_price", moviePrice);
}


function update_the_info() {
    const no_of_seats = document.querySelectorAll('.row .seat.selected');

    //copy the selected seats into arr;
    //map the array to indexes
    //return a new array of indexes

    const selected_seats_arr = [...no_of_seats].map(seat =>
        [...unocc_seats].indexOf(seat));
    localStorage.setItem("selected_seats", JSON.stringify(selected_seats_arr));


    const selected_seat_count = no_of_seats.length;

    count.innerText = selected_seat_count;
    total.innerText = selected_seat_count * ticket_price;
}



//get data from local storage and populate the UI
function populateUI() {
    const arr = JSON.parse(localStorage.getItem('selected_seats'));
    if (arr !== null && arr.length > 0) {
        unocc_seats.forEach((seat, index) => {
            if (arr.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
        // const p = Number(localStorage.getItem('Selected_movie_price'));
        // count.innerText = arr.length;
        // total.innerText = arr.length * p;
        movie_select.selectedIndex = Number(localStorage.getItem('Selected_movie_choice'));
    }
}


// adding addEventListener to container
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        update_the_info();
    }
});

movie_select.addEventListener('change', (e) => {
    ticket_price = Number(e.target.value);
    update_the_info();
    register_movie_data(e.target.selectedIndex, e.target.value);
    // console.log(e.target.selectedIndex, e.target.value);

});

//update the initial screen

update_the_info();









// ................// just for testing.......................



// for (let i = 0; i < unocc_seats.length; i++) {
//     const element = unocc_seats[i];
//     element.addEventListener('click', () => {

//         element.classList.toggle('selected');
//         if (element.classList.contains('selected')) {
//             selected_seats++;
//         }
//         else {
//             selected_seats--;
//         }
//         count.textContent = selected_seats;

//         let movie_price = movie_select.value;
//

//         total.textContent = selected_seats * Number(movie_price);


//     })
// }
