let loan_amount;
let tenure;
let interest_rate;
let calculated_emi = 0;

function calculate_interest() {
  if (check()) {
    loan_amount = document.getElementById("loan_amount");
    interest_rate = document.getElementById("interest_rate");
    tenure = document.getElementById("loan_year");
    console.log(loan_amount.value);
    console.log(interest_rate.value);
    console.log(tenure.value);
    //   calculate(loan_amount, interest_rate, tenure);
    document.getElementById("emi_amount").innerText = 10;
  } 
}

function check() {
  if (loan_amount === null || interest_rate === null || tenure === null) {
    alert("Please fill out all the value");
    return false;
  } else return true;
}
