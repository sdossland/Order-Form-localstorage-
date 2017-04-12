/**
 * Created by sophia on 4/11/17.
 */
document.addEventListener("DOMContentLoaded", function () {

  const orderForm = document.querySelector('.addItem'),
        orderedItemsList = document.querySelector('.orderedItems'),
        allItems = [];

  //places an order on submit
  //1. create new item as an object called item
  //2. push item into allItems list
  //3. map newly revised list to display each item in HTML
  //4. clear the order form after each submit
  function addItem(e) {
    e.preventDefault();
    //'this' references the form element this event handler is run on (see second to last line)
    const newItem = (this.querySelector('[name=item]')).value;
    const item = {
      newItem,
      orderPlaced: false //delete this line??
    };
    allItems.push(item);
    populateOrderedItemsList(allItems, orderedItemsList);
    this.reset();
  }

  function populateOrderedItemsList(dishes = [], dishList) {
    dishList.innerHTML = dishes.map(dish => {
      return `
        <li>
            <label>${dish.newItem}</label>
        </li>
      `;
    }).join(''); //removes commas between <li> elements
  }

  //run addEventListener method on form element since it triggers an event
  orderForm.addEventListener('submit', addItem);
});