// Menu Toggler Function
let slider = document.getElementById('slider')
let mainContent = document.getElementById('main-content')
function toggle() {
  if (slider.className === 'col-2 slider position-fixed') {
    slider.className = 'slider-display'
    mainContent.className = 'col'
    console.log(slider.className)
  }
  else {
    slider.className = 'col-2 slider position-fixed'
    mainContent.className = 'col offset-2'
    console.log(mainContent.className)
  }
}