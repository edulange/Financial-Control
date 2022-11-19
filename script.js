const transactionsUl = document.querySelector("#transactions");
const income = document.querySelector("#money-plus");
const expense = document.querySelector("#money-minus");
const balance = document.querySelector("#balance");
const btn = document.querySelector('.btn')
const nameDOM = document.querySelector('[data-value]')
const amountDOM = document.querySelector('#amount')


const dummyTransactions = [
	// cada objeto tem um id, name e amount
	{ id: 1, name: "Bolo de brigadeiro", amount: -20.5 },
	{ id: 2, name: "Salário", amount: 300 },
	{ id: 3, name: "Torta de frango", amount: -100 },
	{ id: 4, name: "Violão", amount: 150 },
];
// precisa agora utilizar o DOM pra jogar na ul vazia, aparecer no
const addTransactionIntoDOM = (transaction) => {
	//se é uma receita a classe deve ser plus != minus
	// se o transaction é > 0, logo é plus != minus
	const operator = transaction.amount < 0 ? "-" : "+"; //testado e aprovado
	const CSSClass = transaction.amount < 0 ? "minus" : "plus";
	const amountWithoutOperator = Math.abs(transaction.amount);
	//agora criar o li e a classe
	const li = document.createElement("li");
	li.classList.add(CSSClass);
	//no amountWithoutOperator tem uma situação curiosa, se eu colocar o "operator" e o amount tiver um valor negativo,
	//vai acontecer de ter - e -, então a gente passa o Math.abs, que retorna o valor absoluto :)
	li.innerHTML = `                               
    ${transaction.name} <span>${operator} R$ ${amountWithoutOperator}</span><button class="delete-btn">x</button>
    `;
	// agora precisa inserir no ul
	//precisamos então da referencia == transactionsul criada

	//transactionsUl.innerHTML = li //isso não da certo, pq como o li foi criado pelo JS, ele é um OBJETO
	// ta isso quer dizer oq? que não funciona pq o innerHTML PRECISA ser uma string

	transactionsUl.append(li); // isso adiciona como ULTIMO filho PRONTO
};

// qnd a pagina for carregada é para chamar as transações armazenadas
const init = () => {
	//preciso fazer um loop para iterarar cada transação armazenada no dummyTransactions (q é o objto que guarda id, name, amount)
	dummyTransactions.forEach(addTransactionIntoDOM);
	// eu estou chamando o objeto e para CADA item do objeto eu realizo a função que cria li e adc

	// aqui eu fiz o lance de pegar as transações e adicionar em receita ou despesa

	let totalIncome = 0;
	let totalExpenses = 0;
	let totalBalance = 0;
	const incomeAndExpenses = (item) => {
		const entryOrExpenditure = item.amount;
		const roundNumber = (number) =>
			(Math.round(number * 100) / 100).toFixed(2);
		entryOrExpenditure > 0
			? (totalIncome += entryOrExpenditure)
			: (totalExpenses += entryOrExpenditure);

		income.innerHTML = `+ R$${roundNumber(totalIncome)}`;
		expense.innerHTML = `- R$${Math.abs(roundNumber(totalExpenses))}`;
	};
	dummyTransactions.forEach(incomeAndExpenses);


//---------------------------Atualizar o saldo -------------------------
	const updatedBalance = () => {
		if (totalIncome !== 0 || totalExpenses !== 0) {
			if (totalIncome > checkWhoIsBigger(totalExpenses)) {
				totalBalance = totalIncome - -totalExpenses;
				balance.innerHTML = `R$ ${totalBalance}`;
			} else {
				totalBalance = totalExpenses + totalIncome;
				balance.innerHTML = `- R$ ${Math.abs(totalBalance)}`;
			}
		}
	};
	updatedBalance();
};

function checkWhoIsBigger(number) {
	//eu preciso transformar o numero negativo pra positivo pra checar qm é maior
	if (number < 0) {
		return number * -1;
	}
}
init();

//--------------------------adicionar transação----------------------//
//chamar pelo dom o btn
btn.addEventListener('click', (e) => {
	e.preventDefault()
	nameValue = nameDOM.value
	
	console.log('clicado')
})
