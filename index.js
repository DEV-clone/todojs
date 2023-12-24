let items_container = document.getElementById("items")
let item_template = document.getElementById("itemtemplate")
let add_button = document.getElementById("button")

let items = getItems()

function getItems(){
 let value = localStorage.getItem("todo-test") || "[]";
 //if to-do instead of todo-test, get back items from before refresh
 //both of these are working similar to API keys
 return JSON.parse(value);

}

function setItems(items){
    let itemsJSON = JSON.stringify(items);
    localStorage.setItem("todo-test", itemsJSON);
}

function addItem(){
    items.unshift({
        description: "",
        completed: false
    })
    setItems(items);
    refreshList();
}

function refreshList(){
     items.sort((a, b) => {
         if (a.completed){
             return 1;
         }

         if (b.completed){
             return -1;
        }

         return a.description < b.description ? -1 : 1;
    }); 
    items_container.innerHTML = "";
    for (let item of items){
        let itemElement = item_template.content.cloneNode(true);
        let completedInput = itemElement.querySelector(".item-completed");
        let descriptionInput = itemElement.querySelector(".item-description")

        descriptionInput.value = item.description;
        completedInput.checked = item.completed;
        
        descriptionInput.addEventListener("change", () => {
            updateItem(item, "description", descriptionInput.value);
        })

        completedInput.addEventListener("change", () => {
            updateItem(item, "completed", completedInput.checked);
        })

        items_container.append(itemElement);
    }

}

function updateItem(item, key, value){
    item[key] = value;
    //updating the object here will update the same object in the list

    setItems(items);
    refreshList();
}

add_button.addEventListener("click", () =>{
    addItem();
});


refreshList();
