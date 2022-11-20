const transactionsUl = document.querySelector("#transactions");
const incomeDisplay = document.querySelector("#money-plus");
const expenseDisplay = document.querySelector("#money-minus");
const balanceDisplay = document.querySelector("#balance");
const form = document.querySelector("#form");
const inputTransactionName = document.querySelector("#text");
const inputTransactionAmount = document.querySelector("#amount");

//------------------------------ Local Storage--------------------//

const localStorageTransactions = JSON.parse(
	localStorage.getItem("transactions")
);
let transactions =
	localStorage.getItem("transactions") !== null
		? localStorageTransactions
		: [];

const addTransactionIntoDOM = ({ amount, name, id }) => {
	const operator = amount < 0 ? "-" : "+";
	const CSSClass = amount < 0 ? "minus" : "plus";
	const amountWithoutOperator = Math.abs(amount);
	const li = document.createElement("li");
	li.classList.add(CSSClass);
	li.innerHTML = `${name}
	<span>${operator} R$ ${amountWithoutOperator}</span>
	<button class="delete-btn" onClick="removeTransaction(${id})">x</button>`;

	transactionsUl.append(li);
};

const getExpenses = (transactionsAmount) =>
	Math.abs(
		transactionsAmount
			.filter((value) => value < 0)
			.reduce((accumulator, transaction) => accumulator + transaction, 0))
			.toFixed(2);

const getIncome = (transactionsAmount) =>
	transactionsAmount
		.filter((value) => value > 0)
		.reduce((accumulator, transaction) => accumulator + transaction, 0)
		.toFixed(2);

const getTotal = (transactionsAmount) =>
	transactionsAmount
		.reduce((accumulator, transaction) => accumulator + transaction, 0)
		.toFixed(2);

//-----------------------------Atualizar o Saldo, receita e despesas
const updateBalanceValues = () => {
	const transactionsAmount = transactions.map(({ amount }) => amount);

	const total = getTotal(transactionsAmount);
	const income = getIncome(transactionsAmount);
	const expense = getExpenses(transactionsAmount);

	balanceDisplay.textContent = `R$ ${total}`;
	incomeDisplay.textContent = `R$ ${income}`;
	expenseDisplay.textContent = ` R$ ${expense}`;
};

const init = () => {
	transactionsUl.innerHTML = "";
	transactions.forEach(addTransactionIntoDOM);
	updateBalanceValues();
};
init();


const updateLocalStorage = () => {
	localStorage.setItem("transactions", JSON.stringify(transactions))

}; 



const generateID = () => Math.round(Math.random() * 1000);

const addToTransactionsArray = (transactionName, transactionAmount) => {
	transactions.push({
		id: generateID(),
		name: transactionName,
		amount: Number(transactionAmount),
	});
};

const cleanInputs = (input1, input2) => {
	input1.value = "";
	input2.value = "";
};

const handleFormSubmit = (event) => {
	event.preventDefault(); //prevenir de realmente enviar (por enquanto)

	const transactionName = inputTransactionName.value.trim();
	const transactionAmount = inputTransactionAmount.value.trim();
	const isSomeInputEmpty = transactionName === "" || transactionAmount === "";

	//agora preciso ter certeza de que os valores do nome e do vlaor foram realmente preenchidos
	// logo, preciso da ref dos 2 inputs
	if (isSomeInputEmpty) {
		alert("Por favor, preencha tanto o nome quanto o valor da transação");
		return; // esse return faz com que, CASO seja lido esse bloco do if, ele da um RETURN e acaba a leitura da função
	}

	addToTransactionsArray(transactionName, transactionAmount);
	init();
	updateLocalStorage();
	cleanInputs(inputTransactionName,inputTransactionAmount);
};

form.addEventListener("submit", handleFormSubmit);

//--------------------------- Tirando uma transação

const removeTransaction = (ID) => {
	transactions = transactions.filter((transaction) => transaction.id !== ID);

	updateLocalStorage(); // pra limpar no storage

	//assim eu clico no X e com o filter eu digo "olha, me filtra todo mundo que tem o ID DIFERENTE do meu"
	init(); // a init faz "reler o bagulho" então como eu filtrei só pelos IDS que não são o q eu cliquei, ele vai desaperecer
};
