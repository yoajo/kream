const carousel = document.querySelector('section');
const slidesWrapper = document.querySelector('ul');
const slides = slidesWrapper.querySelectorAll('li');
const prevButton = document.querySelector('[aria-label="이전 탐색"]');
const nextButton = document.querySelector('[aria-label="다음 탐색"]');
const indicatorsWrapper = document.querySelector('.indicators');
const indicators = indicatorsWrapper.querySelectorAll('button');

let currentIndex = 0;
const SELECTED_CLASSNAME = 'is-selected';

//선택된 버튼 스타일
const SELECTED_BUTTON = '!bg-(--base-color)';

carousel.addEventListener('click', (evt) => {
  if (nextButton.contains(evt.target)) {
    goToSlide(currentIndex + 1);
  }
  if (prevButton.contains(evt.target)) {
    goToSlide(currentIndex - 1);
  }
  if ([...indicators].includes(evt.target)) {
    const index = [...indicators].indexOf(evt.target);
    goToSlide(index);
  }
});

//다음 버튼이 클릭되면 실행 될 함수
function goToSlide(index) {
  //currentIndex 상태 업데이트
  currentIndex = getCurrentIndex(index);
  //파라미터로 받은 인덱스로 이동 ->  index * 100 +  % 만큼 이동
  const distance = currentIndex * 100;

  //이전 상태 클래스 삭제
  slidesWrapper.className = slidesWrapper.className
    .split(' ')
    .filter((cls) => !cls.startsWith('translate-x-[') && !cls.startsWith('-translate-x-['))
    .join(' ')
    .trim();

  //현재 인덱스로 이동
  slidesWrapper.classList.add('transform', 'transition-transform', `translate-x-[-${distance}%]`);

  //현새 선택된 항목들 업데이트
  updateCarousel(currentIndex);
}

//인덱스 업데이트 함수
function getCurrentIndex(index) {
  //받은 인덱스 번호가 길이보다 크면 첫번째 인덱스로 다시 넘어가야댐
  if (index > slides.length - 1) {
    return (currentIndex = 0);
  }
  //받은 인덱스 번호가 0보다 작으면 마지막 인덱스로 다시 넘어가야댐
  if (index < 0) {
    return (currentIndex = slides.length - 1);
  } else {
    return (currentIndex = index);
  }
}

//캐러샐 상태 업데이트 함수
function updateCarousel(currentIndex) {
  //모든 슬라이드에서 선택 클래스 삭제
  slides.forEach((slide) => {
    slide.classList.remove(SELECTED_CLASSNAME);
  });
  slides[currentIndex].classList.add(SELECTED_CLASSNAME);

  updateIndicator(currentIndex);
}

//처음 인디케이터 업데이트
function updateIndicator(currentIndex) {
  //인디케이터에서 선택 클래스 삭제
  indicators.forEach((indicator) => {
    indicator.classList.remove(SELECTED_BUTTON);
    indicator.removeAttribute('aria-current');
  });
  indicators[currentIndex].classList.add(SELECTED_BUTTON);
  indicators[currentIndex].setAttribute('aria-current', 'true');
}

//
//키보드 접근성 향상

//화살표 버튼에 포커스 시 키보드 방향키로 슬라이드 이동
[prevButton, nextButton].forEach((button) => {
  button.addEventListener('keydown', (evt) => {
    if (evt.key === 'ArrowRight') {
      currentIndex++;
      goToSlide(currentIndex);
    }
    if (evt.key === 'ArrowLeft') {
      currentIndex--;
      goToSlide(currentIndex);
    }
  });
});

//인디케이터 버튼 포커스 시 키보드 방향키로 인디케이터 포커스 이동
indicatorsWrapper.addEventListener('keydown', (evt) => {
  if (evt.key === 'ArrowRight') {
    currentIndex = ++currentIndex % indicators.length;
    [...indicators][currentIndex].focus();
  }
  if (evt.key === 'ArrowLeft') {
    currentIndex = (--currentIndex + indicators.length) % indicators.length;
    [...indicators][currentIndex].focus();
  }
});
