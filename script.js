const transactionsUl = document.querySelector("#transactions");
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')


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


//-----------------------------Atualizar o Saldo, receita e despesas
const updateBalanceValues = () => {
	//fazer um map pq ele é um tipo forEach, só que retorna um novo array só com os values, ai eu uso um reduce pra transformar num valor único
	const transactionsAmount = dummyTransactions.map(transaction => transaction.amount)
	const total = transactionsAmount
		.reduce((accumulator, transaction) => accumulator + transaction, 0).toFixed(2)
												
	const income = transactionsAmount
		.filter(value => value > 0)
		.reduce((accumulator, transaction) => accumulator +transaction, 0).toFixed(2)

	const expense = transactionsAmount
	.filter(value => value <0)
	.reduce((accumulator, transaction) => accumulator +transaction, 0).toFixed(2)
// até aqui eu consegui já: balançoT, receitaT e despesaT, agora preciso adicionar no dom
//pra adicionar eu preciso pegar as referências de cada, no caso saldo = h1, receitas = p e despesas = p
//as referências foram feitas e colocadas lá em cima, no começo. income/expense/balanceDisplay

	balanceDisplay.textContent = `R$ ${total}`
	incomeDisplay.textContent = `R$ ${income}`
	expenseDisplay.textContent = `- R$ ${Math.abs(expense)}`
}




//---------------------------------- init precisa ficar aqui embaixo pq o JS precisa ler as outras funções antes.
// qnd a pagina for carregada é para chamar as transações armazenadas
const init = () => {
	//preciso fazer um loop para iterarar cada transação armazenada no dummyTransactions (q é o objto que guarda id, name, amount)
	dummyTransactions.forEach(addTransactionIntoDOM);
	// eu estou chamando o objeto e para CADA item do objeto eu realizo a função que cria li e adc
	
//-------------------------------Atualizar o saldo e receita e despesas
updateBalanceValues()
}
init();