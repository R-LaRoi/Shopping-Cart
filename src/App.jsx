import React, {useState,  useEffect} from 'react'
import './App.css'
import shopIcon from "./assets/shopIcon.png"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove, } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-2dcb2-default-rtdb.europe-west1.firebasedatabase.app"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


export default function App() {
const [items, setItems] = useState()
const [list, setList] = useState([])

useEffect(()=> {

onValue(shoppingListInDB, function(snapshot) {
 if (snapshot.exists()){
  const itemsArray = Object.entries(snapshot.val())
    // console.log(itemsArray)
    // console.log(snapshot.val())

  for (let i = 0; i < itemsArray.length; i++) {
   let listItem = (itemsArray[i])
   let listItemID = listItem[0]
   let listItemValue = listItem[1]
                  console.log(listItemID)  
                  console.log(listItemValue)
   
     deleteItem(listItem)}

 } }) },[])



function addToCart(){
setList(prevSetList => [...prevSetList , (items)])
setItems('')

 push(shoppingListInDB, items)


}

function getInputValue(e){
setItems(e.target.value)

}

function deleteItem(listItemID){

// setItems(prevItems => prevItems.filter(items => items[0] != listItemID))

console.log(listItemID)
let itemLocationDB = ref(database, `shopping-list/${listItemID}`)
remove(itemLocationDB)

}

return (
    <section className='container'>
      <img src={shopIcon} ></img>
      <input type="text"
             placeholder='🥬 🥑🥬 🥑 '
             onChange={getInputValue}
             value={items}
             /> 
      <button onClick={addToCart}>add to cart</button>
        <div className='wrapper'>
        {list.map((grocery, index) => {
           console.log(grocery)
            return (
           
              <div key={index} className="index">
                <span className='cart-items' 
                onClick={deleteItem}
              >{grocery}</span>
              </div>
                
        );
      })} 
      </div>
    </section> 


        )
  
      }

      

