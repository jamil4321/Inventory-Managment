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



// let slider = document.getElementById('slider')
// let mainContent = document.getElementById('main-content')
// function toggle() {
//   if (slider.className === 'col-xs-12 col-sm-12 col-md-3 col-lg-2 slider bg-dark position-fixed') {
//     slider.className = 'slider-display'
//     mainContent.className = 'col'
//     console.log(slider.className)
//   }
//   else {
//     slider.className = 'col-xs-12 col-sm-12 col-md-3 col-lg-2 slider bg-dark position-fixed'
//     mainContent.className = 'col offset-2'
//     console.log(mainContent.className)
//   }
// }