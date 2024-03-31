export function addCarouselEventListeners() {
    const prevButton = document.querySelector('.carouselPrev');
    const nextButton = document.querySelector('.carouselNext');
    const track = document.querySelector('#carouselTrack');
  

  
    let currentIndex = 0;
    const postsLength = 5;
  
    const showCards = index => {
      const moveDistance = index * -100 / 3;
      track.style.transform = `translateX(${moveDistance}%)`;
    };
  
    prevButton.addEventListener('click', () => {
      currentIndex = Math.max(currentIndex - 1, 0);
      showCards(currentIndex);
    });
  
    nextButton.addEventListener('click', () => {
      currentIndex = Math.min(currentIndex + 1, postsLength - 3);
      showCards(currentIndex);
    });
}
