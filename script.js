const dummyTransactions = [  // cada objeto tem um id, name e amount
    { id: 1, name: 'Bolo de brigadeiro', amount: -20},
    { id: 2, name: 'Salário', amount: 300},
    { id: 3, name: 'Torta de frango', amount: -10},
    { id: 4, name: 'Violão', amount: 150}
]
// precisa agora utilizar o DOM pra jogar na ul vazia, aparecer no 
const addTransactionIntoDOM = (transaction) => {
    //se é uma receita a classe deve ser plus != minus
    // se o transaction é > 0, logo é plus != minus
    const operator = transaction.amount < 0 ? '-' : '+'
    console.log(operator)
	// <li class="minus"> 
	// 	Salário <span>-$400</span>
	// 	<button class="delete-btn">x</button>
	// </li>;
};

addTransactionIntoDOM(dummyTransactions[1])