// Listen for submit
document.getElementById('loan-form').addEventListener('submit', (e) => {
  // Hide results
  document.getElementById('results').style.display = 'none'

  // Show loader
  document.getElementById('loading').style.display = 'block'

  setTimeout(calculateResults, 2000)

  e.preventDefault()
})

// Calculate results function
calculateResults = () => {

  // UI Vars
  const amount = document.getElementById('amount')
  const interest = document.getElementById('interest')
  const years = document.getElementById('years')
  const monthlyPayment = document.getElementById('monthly-payment')
  const totalPayment = document.getElementById('total-payment')
  const totalInterest = document.getElementById('total-interest')

  // Return a floating point number (decimal place values)
  const principal = parseFloat(amount.value)
  const calculatedInterest = parseFloat(interest.value) / 100 / 12
  const calculatedPayments = parseFloat(years.value) * 12


  // Compute monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments)
  const monthly = (principal * x * calculatedInterest) / (x - 1)

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2)
    totalPayment.value = (monthly * calculatedPayments).toFixed(2)
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2)

    // Show results
    document.getElementById('results').style.display = 'block'

    // Hide loader
    document.getElementById('loading').style.display = 'none'
  } else {
    showError('Please check your fields')
  }

}

// Show Error
showError = (error) => {
  // Hide results
  document.getElementById('results').style.display = 'none'

  // Hide loader
  document.getElementById('loading').style.display = 'none'

  // Create a div
  const errorDiv = document.createElement('div')

  // Get elements
  const card = document.querySelector('.card')
  const heading = document.querySelector('.heading')

  // Add class
  errorDiv.className = 'alert alert-danger'

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error))

  // Insert error above heading
  card.insertBefore(errorDiv, heading)

  // Set timeout
  setTimeout(() => {
    document.querySelector('.alert').remove()
  }, 3000)
}