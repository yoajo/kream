;(()=>{
const container = document.querySelector('section')
const contents = container.querySelectorAll('li')
const buttons = container.querySelectorAll('[aria-label $= "탐색"]')
const indicators = container.querySelectorAll('[aria-label $= "콘텐츠"]')

const SHOW_CONTENT = 'flex-shrink-0'
const BASE_COLOR = 'bg-(--base-color)'
const LINE_COLOR = 'bg-(--line-color)'
const ARIA_CURRENT = 'aria-current'

container.addEventListener('click', (e) => {
	const allButtons = e.target.closest('button')
	if (!allButtons) return
	prevAndNextButton(allButtons)
  con``
})

let currentIndex = 0

function prevAndNextButton (selector){
  let prevIndex = Object.values(contents).findIndex( content => content.classList.contains(SHOW_CONTENT))
  if(selector === buttons[0]) currentIndex --
  if(selector === buttons[1]) currentIndex ++

  if(currentIndex === -1) currentIndex = contents.length-1
  if(currentIndex === contents.length) currentIndex = 0

  contents[prevIndex].classList.remove(SHOW_CONTENT)
  contents[currentIndex].classList.add(SHOW_CONTENT)

  prevAndNextIndicator(prevIndex, currentIndex)

}

function prevAndNextIndicator (prevIndex, currentIndex){
  indicators[prevIndex].classList.remove(BASE_COLOR)
  indicators[prevIndex].classList.add(LINE_COLOR)  
  indicators[currentIndex].classList.remove(LINE_COLOR)
  indicators[currentIndex].classList.add(BASE_COLOR)

  // 선택 되지 않은 리스트 배열
  Object.values(indicators)
  .filter( indicator => indicator.classList.contains(LINE_COLOR))
  .map(indicator => indicator.setAttribute('tabindex', '-1'))

  indicators[currentIndex].removeAttribute('tabindex')
  indicators[prevIndex].removeAttribute(ARIA_CURRENT)
  indicators[currentIndex].setAttribute(ARIA_CURRENT, 'true')
  }
})()