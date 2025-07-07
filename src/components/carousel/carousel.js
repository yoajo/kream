// 요소 찾기
const carouselWrapper = document.querySelector('ul.flex.flex-nowrap.flex-row');
const carouselImg = carouselWrapper.querySelectorAll('li');
const prevBtn = document.querySelector('button[aria-label="이전 탐색"]');
const nextBtn = document.querySelector('button[aria-label="다음 탐색"]');
const indicatorBtn = document.querySelectorAll('button[aria-label$="번째 콘텐츠"]');

// 초기 이미지 변수에 저장
let currentImg = carouselImg[0];

// 이미지 이동 함수
function moveImg(target) {
  // 클래스 삭제/추가
  const visibleImg = carouselWrapper.querySelector('.is-visible');
  if (visibleImg) visibleImg.classList.remove('is-visible');
  target.classList.add('is-visible');

  const index = Array.from(carouselImg).indexOf(target);
  const moveRange = -100 * index;

  carouselWrapper.style.transform = `translateX(${moveRange}%)`;

  currentImg = target;

  updateIndicators(index);
}

// 인디케이터 버튼 업데이트 함수
function updateIndicators(index) {
  indicatorBtn.forEach((button, i) => {
    button.classList.toggle('bg-[var(--base-color)]', i === index);
  });
}

// 이전/다음 버튼 이벤트
prevBtn.addEventListener('click', () => {
  const movePrev = currentImg.previousElementSibling || [...carouselImg].at(-1);
  moveImg(movePrev);
});

nextBtn.addEventListener('click', () => {
  const moveNext = currentImg.nextElementSibling || carouselImg[0];
  moveImg(moveNext);
});

// 인디케이터 이벤트
indicatorBtn.forEach((button, i) => {
  button.addEventListener('click', () => {
    moveImg(carouselImg[i]);
  });
});

// 초기 설정 (moveImg 함수를 한번 돌려서 처음 렌더링부터 이벤트 적용)
moveImg(currentImg);
