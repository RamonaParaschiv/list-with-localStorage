const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
  console.log('In addItem');
  e.preventDefault();
  const text = this.querySelector('[name=item]').value;
  const item = {
    text,
    done: false,
  };
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
  console.log(items);
  this.reset();
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map(
      (plate, i) => `
    <li>
      <input type="checkbox" data-index=${i} id="item${i}" ${
        plate.done ? 'checked' : ''
      } />
      <label for="item${i}">${plate.text}</label>
      <p data-index="${i}" class="remove" style="font-size: 10px">remove</p>
    </li>
  `
    )
    .join('');

  const remove = document.querySelectorAll('.remove');
  remove.forEach(r => r.addEventListener('click', removeItem));
  console.log(remove);
}

function toggleDone(e) {
  if (!e.target.matches('input')) return;
  const el = e.target;
  const { index } = el.dataset;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

function removeItem(e) {
  // find index to remove
  // data-index
  console.log(e.target);
  const el = e.target;
  const { index } = el.dataset;
  // slice / splice to remove item
  items.splice(index, 1);
  console.log('TYPE', Array.isArray(items));
  // populate list
  populateList(items, itemsList);

  // set item in  local storage
  localStorage.setItem('items', JSON.stringify(items));
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

populateList(items, itemsList);
