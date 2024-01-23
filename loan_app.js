let loan_amount;
let tenure;
let interest_rate;
let calculated_emi = 0;

function calculate_interest() {
  loan_amount = document.getElementById("amount").value;
  interest_rate = document.getElementById("interest").value;
  tenure = document.getElementById("tenure").value;
  //   console.log(loan_amount.value);
  //   console.log(interest_rate.value);
  //   console.log(tenure.value);
  let emi = calculate(
    Number(loan_amount),
    Number(interest_rate),
    Number(tenure)
  );
  console.log(emi);
  document.getElementById("emi_amount").innerText = emi.toFixed(2);
}

function calculate(p, r, n) {
  console.log(p);
  console.log(r);
  console.log(n);
  //   let sum = 1 + r;
  //   console.log(sum);
  //   console.log(Math.pow(sum, n));
  //   console.log(p * r * Math.pow(1 + r, n));
  //   console.log(Math.pow(1 + r, n) - 1);

  return Number((p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
}

// function check() {
//   if (loan_amount === null || interest_rate === null || tenure === null) {
//     alert("Please fill out all the value");
//     return false;
//   } else return true;
// }
