/**
 * Created by sophia on 4/11/17.
 */
document.addEventListener("DOMContentLoaded", function () {

  const orderForm = document.querySelector('.addItem'),
        orderedItemsList = document.querySelector('.orderedItems'),
        //on page load, check if there is something in local storage, if so return it, otherwise blank
        allItems = JSON.parse(localStorage.getItem('storedItems')) || [];

  function populateOrderedItemsList(dishes = [], dishList) {
    dishList.innerHTML = dishes.map((dish, i) => {
      return `
        <li>
            <input id="item${i}" type="checkbox" data-index=${i} ${dish.orderReceived ? 'checked' : ''} >
            <label for="item${i}">${dish.newItem}</label>
        </li>
      `;
    }).join(''); //removes commas between <li> elements
  }

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
      orderReceived: false
    };
    allItems.push(item);
    //1.name of key, and 2.value associated w/ it [only strings accepted, therefore use JSON to format data accordingly]
    localStorage.setItem('storedItems', JSON.stringify(allItems));
    this.reset();
  }

  function toggleCheck(e) {
    //e.target looks at all elements within each set of <li> tags, so only consider those with a data-index attribute
    if (!e.target.dataset.index) return;
    const index = e.target.dataset.index;
    allItems[index].orderReceived = !allItems[index].orderReceived;
    localStorage.setItem('storedItems', JSON.stringify(allItems));
  }

  //run addEventListener method on form element since it triggers an event
  orderForm.addEventListener('submit', addItem);
  orderedItemsList.addEventListener('click', toggleCheck);

  //run function here to populate page on page load and after each event
  populateOrderedItemsList(allItems, orderedItemsList);

});