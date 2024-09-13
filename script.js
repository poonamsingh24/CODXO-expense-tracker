// Retrieve expenses from localStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let totalAmount = parseFloat(localStorage.getItem("totalAmount")) || 0;

document.addEventListener("DOMContentLoaded", () => {
  renderExpenses();
  updateTotal();
});

// Add an expense
function addExpense() {
  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;

  if (description && !isNaN(amount) && amount > 0 && category) {
    const expense = {
      id: Date.now(),
      description,
      amount,
      category,
    };
    expenses.push(expense);
    totalAmount += amount;
    saveToLocalStorage();
    renderExpenses();
    updateTotal();
    clearForm();
  } else {
    alert("Please enter a valid description, amount, and category.");
  }
}

// Render expenses to the UI
function renderExpenses() {
  const expenseList = document.getElementById("expenseList");
  expenseList.innerHTML = "";

  expenses.forEach((expense) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
            ${expense.description} - $${expense.amount.toFixed(2)} (${
      expense.category
    })
            <button onclick="editExpense(${expense.id})">Edit</button>
            <button onclick="deleteExpense(${expense.id})">Delete</button>
        `;
    expenseList.appendChild(listItem);
  });
}

// Update the total amount
function updateTotal() {
  document.getElementById("totalAmount").textContent = totalAmount.toFixed(2);
}

// Delete an expense
function deleteExpense(id) {
  expenses = expenses.filter((expense) => expense.id !== id);
  totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  saveToLocalStorage();
  renderExpenses();
  updateTotal();
}

// Edit an expense
function editExpense(id) {
  const expense = expenses.find((exp) => exp.id === id);
  if (expense) {
    document.getElementById("description").value = expense.description;
    document.getElementById("amount").value = expense.amount;
    document.getElementById("category").value = expense.category;

    deleteExpense(id);
  }
}

// Add a new category
function addCategory() {
  const newCategory = prompt("Enter new category name:");
  if (newCategory) {
    const categorySelect = document.getElementById("category");
    const newOption = document.createElement("option");
    newOption.value = newCategory;
    newOption.textContent = newCategory;
    categorySelect.appendChild(newOption);
    categorySelect.value = newCategory;
  }
}

// Save data to localStorage
function saveToLocalStorage() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  localStorage.setItem("totalAmount", totalAmount);
}

// Clear form fields
function clearForm() {
  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("category").value = "";
}
