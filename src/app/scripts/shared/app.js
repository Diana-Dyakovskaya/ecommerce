export const app = () => {
  document.addEventListener('DOMContentLoaded', () => {
    // Твой код
    const ratings = document.querySelectorAll('.rating')
    if (ratings.length > 0) {
      initRatings()
    }
    function initRatings() {
      let ratingActive, ratingValue
      for (let index = 0; index < ratings.length; index++) {
        const rating = ratings[index]
        initRating(rating)
      }
      // Инициализируем конкретный рейтинг
      function initRating(rating) {
        initRatingVars(rating)
        setRatingActiveWidth()
        setRating(rating)
      }
      // Инициализация переменных
      function initRatingVars(rating) {
        ratingActive = rating.querySelector('.rating__active')
        ratingValue = rating.querySelector('.rating__value')
      }
      // Изменяем ширину активных звезд
      function setRatingActiveWidth(index = ratingValue.innerHTML) {
        const ratingActiveWidth = index / 0.05
        ratingActive.style.width = `${ratingActiveWidth}%`
      }
      // Возможность указать оценку
      function setRating(rating) {
        const ratingItems = rating.querySelector('.rating__item')
        for (let index = 0; index < ratingItems.length; index++) {
          const ratingItem = ratingItems[index]
          ratingItem.addEventListener('mouseenter', function () {
            initRatingVars(rating)
            setRatingActiveWidth(ratingItem.value)
          })
          ratingItem.addEventListener('mouseleave', function () {
            setRatingActiveWidth()
          })
          ratingItem.addEventListener('click', function () {
            initRatingVars(rating)
            ratingValue.innerHTML = index + 1
            setRatingActiveWidth()
          })
        }
      }
    }
    document.querySelector('.header__mobile-menu').addEventListener('click', openMenu)
    const elem = document.querySelector('.header-main')
    function openMenu() {
      elem.classList.toggle('header-mobile-visible')
    }
    openMenu()
  })
}