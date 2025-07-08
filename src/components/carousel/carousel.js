const ACTIVE_CLASS = 'active';
const carouselContainer = document.getElementById('carouselContainer')
const contentsWrap = carouselContainer.querySelector('.carousel__contents')
const dotts = Array.from(carouselContainer.querySelectorAll('.carousel__indicators>button'))
const contents = Array.from(carouselContainer.querySelectorAll('.carousel__contents>li'))
const contentWidth =  Number.parseFloat(getComputedStyle(contentsWrap).getPropertyValue('--content-width'))

// 초기에 active 클래스를 보유한 캐러셀 content의 index 값을 찾아서 변수에 저장
let activeIndex = contents.findIndex((item) => item.classList.contains(ACTIVE_CLASS))

// 전체를 감싸는 캐러셀 컨테이너에 이벤트 청취 후 역할에 맞게 위임
carouselContainer.addEventListener('click', ({target}) => {
  const arrowBtn = target.closest('button[aria-label$="탐색"]')
  const prevBtn = target.closest('[aria-label^="이전"]')
  const dottBtn = target.closest('.carousel__indicators>button')
  const activeContent = carouselContainer.querySelector(`li.${ACTIVE_CLASS}`)
  const activeDott = carouselContainer.querySelector(`.carousel__indicators>button.${ACTIVE_CLASS}`)
  const contentsCount = contents.length

  // 이전과 다음버튼을 타겟으로 잡는 arrowBtn 상수
  if(arrowBtn){
    gsap.from(arrowBtn, {scale: 0.6, duration: 0.2})

    // arrowBtn 내에서 이전 버튼, 다음 버튼일 경우 밖에 없기때문에 이전 버튼일 경우 activeIndex 값을 -하여 재할당 다음 버튼일 경우 반대로 +
    prevBtn ? activeIndex-- : activeIndex++

    // activeIndex가 -1 이거나 콘텐츠 개수를 초과할 경우의 수를 처리하는 조건문
    if(activeIndex === -1) activeIndex = contentsCount - 1
    else if(activeIndex === contentsCount) activeIndex = 0

    moveActiveClass(contents, activeContent)
    moveActiveClass(dotts, activeDott)
    setDottsAriaCurrent()
    setContentsTabindex()
    setContentsWrapTranslate()
  }

  // 인디게이터 버튼을 타겟으로 잡는 dottBtn 상수
  if(dottBtn){
    gsap.from(dottBtn, {scale: 0.6, duration: 0.2})

    // 먼저 인디게이터 버튼 active 클래스 제어 함수를 통해 클릭한 dottBtn에 active 클래스 할당 후 나머진 제거
    moveActiveClass(dottBtn, activeDott)

    // 그 후 activeIndex 값을 찾아 재할당
    activeIndex = dotts.findIndex((item) => item.classList.contains(ACTIVE_CLASS))

    setDottsAriaCurrent()
    setContentsTabindex()
    setContentsWrapTranslate()
  }
})

function moveActiveClass(addClass, removeClassEl){
  removeClassEl.classList.remove(ACTIVE_CLASS)

  if(!Array.isArray(addClass)) return addClass.classList.add(ACTIVE_CLASS)
  addClass[activeIndex].classList.add(ACTIVE_CLASS)
}

function setContentsWrapTranslate(){
  contentsWrap.style.setProperty('translate',`-${contentWidth * activeIndex}%`)
}

function setContentsTabindex(){
  contents.forEach((content, i) => {
      if(i === activeIndex) content.querySelector('a').removeAttribute('tabindex');
      else content.querySelector('a').setAttribute('tabindex','-1')
  });
}

function setDottsAriaCurrent(){
  dotts.forEach((dott, i) => {
      if(i === activeIndex) dott.setAttribute('aria-current','true')
      else dott.removeAttribute('aria-current');
    });
}