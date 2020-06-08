//funções para pegar as api's do ibge referente à estados e cidades

function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    //acima api do ibge para os estados
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json()) //função anonima, arrow function
    .then(states => {
        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`//concatenado o id e o nome do estado
        }
        
    })
}

populateUFs()

function getCities(event){//passagem por referencia
    const citySelect = document.querySelector("[name=city]")//esta pegando a opção com o nome city e passando pra constante
   const stateInput = document.querySelector("[name=state]")

    
    const ufValue = event.target.value//foi dado como alvo o valor do objeto armazenado em uf

   const indexOfSelectedState = event.target.selectedIndex// selecionada a posição
   stateInput.value = event.target.options[indexOfSelectedState].text
    // ${} serve pra interpolar pegar objetos como referencia
     const url =`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

     fetch(url)// instanciou a variavel url
     .then( res => res.json()) //função anonima, arrow function caracterizada como variavel => resultado()
     .then(cities => {
        citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
        citySelect.disabled = true

         for(const city of cities){
             citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
         }

         citySelect.disabled = false
         
     })
}

document
.querySelector("select[name=uf]")
.addEventListener("change",getCities)

//Items de Coleta
// pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
    //handleSelectedItem é uma função, click outra função do prório javascript

}
const collectedItems = document.querySelector("input[name=items")
let selectedItems = [] //vetor dos items selecionados


function handleSelectedItem(event){ //event é o objeto metodo em si
    const itemLI = event.target //objeto li
    //adicionar ou remover uma classe com javascript
    itemLI.classList.toggle("selected")//toggle é uma especie de liga/desliga significa alternancia
    const itemId = itemLI.dataset.id//pegando o dataset armazenado


    
    //verificar se existem items selecionados e 
    //pegar os mesmos, 

    const alreadySelected = selectedItems.findIndex(item =>{
    const itemFound = item == itemId //isso sera true ou false
     return itemFound
     
   })
    
    //se já estiver selecionado 
    if(alreadySelected >= 0){
        // tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })
        selectedItems = filteredItems // selectedItems assume o valor do novo vetor filtrado
    } else{
        //se não estiver selecionado adicionar a seleção
        selectedItems.push(itemId)
    }
    
    //, atualizar o hidden com os items selecionados
    collectedItems.value = selectedItems


}