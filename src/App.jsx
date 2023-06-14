import React, {useState,  useEffect} from 'react'
import './App.css'
import shopIcon from "./assets/shopIcon.png"

// {{ --------------FIREBASE------------------>


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue,remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-2dcb2-default-rtdb.europe-west1.firebasedatabase.app"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

//  <---------------FB --------------------- }}



export default function App() {

const [items, setItems] = useState()
const [list, setList] = useState([])
const [DBList, setDBList] = useState([])
let [selectItem, setSelectItem] = useState([])


function addToCart(){

if ( items === "" || items === null) {
 alert('Remember to add an item to your cart!')

} else {   setList(prevSetList => [...prevSetList , (items)])
      setItems('')
      push(shoppingListInDB, items)

}

  

}

useEffect(()=> {

      onValue(shoppingListInDB, function(snapshot) {
      
        if (snapshot.exists()){
        const itemsArray = Object.entries(snapshot.val())
          //  const itemKeys = Object.keys(snapshot.val())
          //   console.log(itemKeys)
              for (let i = 0; i < itemsArray.length; i++) {
               let currentItem = (itemsArray[i])
                    setSelectItem(currentItem)
                        }
                        setDBList(itemsArray)
 } }) },[])



function getInputValue(e){
setItems(e.target.value)


}

async function deleteItem(selectItem){
    let currentID = selectItem[0]

    setDBList(prevDBList => prevDBList.filter(items => items != selectItem))
    console.log(currentID, 'the id')

    let itemLocationDB = ref(database, `shopping-list/${currentID}`)
    await remove(itemLocationDB)

}





return (
    <section className='container'>
          <img src={shopIcon} ></img>
          <input type="text"
                placeholder='🥬 🥑🥬 🥑 '
                onChange={getInputValue}
                value={items}
                /> 
          <button onClick={addToCart}>
            add to cart
            </button>

        <div className='wrapper' key={list}>
            
            {DBList.map((grocery, index) => {
              //  console.log(grocery[1])
                return (
                  <div key={index[0]} className="index">
                    
                    <span className='cart-items' 
                        onClick={()=> {deleteItem(grocery)}}>
                        {grocery[1]}
                        </span>
                      
                      </div>
                
        );
      })} 
      </div>
    </section> 


        )
  
      }

      

