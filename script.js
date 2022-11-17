const transactionsUl = document.querySelector('#transactions')

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
    const operator = transaction.amount < 0 ? '-' : '+' //testado e aprovado
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)
    //agora criar o li e a classe
    const li = document.createElement('li')
    li.classList.add(CSSClass)
                                        //no amountWithoutOperator tem uma situação curiosa, se eu colocar o "operator" e o amount tiver um valor negativo,
                                        //vai acontecer de ter - e -, então a gente passa o Math.abs, que retorna o valor absoluto :)
    li.innerHTML = `                               
    ${transaction.name} <span>${operator} R$ ${amountWithoutOperator}</span><button class="delete-btn">x</button>
    `
    // agora precisa inserir no ul
    //precisamos então da referencia == transactionsul criada
    
    //transactionsUl.innerHTML = li //isso não da certo, pq como o li foi criado pelo JS, ele é um OBJETO
    // ta isso quer dizer oq? que não funciona pq o innerHTML PRECISA ser uma string

    transactionsUl.append(li)  // isso adiciona como ULTIMO filho PRONTO


	// <li class="minus"> 
	// 	
	// </li>;
};
addTransactionIntoDOM(dummyTransactions[0])
addTransactionIntoDOM(dummyTransactions[1])
addTransactionIntoDOM(dummyTransactions[2])
addTransactionIntoDOM(dummyTransactions[3])

// https://youtu.be/xarRciYWT5Q?t=985