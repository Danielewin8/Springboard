let clickedBox = null;
let stopClick = false;
let matches = 0;

let section = document.querySelector('section');
for (let i = section.children.length; i >= 0; i--) {
    section.appendChild(section.children[Math.random() * i | 0]);
}

function clicked(e) {
  const selection = e.currentTarget;
  if(stopClick === true){
    return
  }
  if(selection === clickedBox || selection.className.includes('done')) {
  return;
}  
selection.className = selection.className.replace('hide', '').trim();
selection.className += ' done';

if(!clickedBox){  
  // if we havent clicked a second box, keep track of the first box and display its color 
  clickedBox = selection;
  }
else if(clickedBox){
  // if we have already clicked a second box, check if the second box matches the first box color 
  if(clickedBox.getAttribute('data-color') !== selection.getAttribute('data-color')) {
    stopClick = true;
    setTimeout(() => {
      clickedBox.className = clickedBox.className.replace('done', '').trim() + 'hide';
      selection.className = selection.className.replace('done', '').trim() + 'hide'
        clickedBox = null;
        stopClick = false
      }, 1000);
      // if the boxes are not matching ^, don't allow any more clicks and remove the done class and replace it the hide class again and revert the variables after one second 
    }  else{
      matches++;
      clickedBox = null
      if(matches === 8){
        alert('VICTORY!!!!! Refresh the page to play again.')
      }
    }
  }
}

