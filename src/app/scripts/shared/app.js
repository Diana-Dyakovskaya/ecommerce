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
        const ratingItems = rating.querySelectorAll('.rating__item')
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

    // Аккордеон
    const accord = document.querySelector('.js-accord')
    const accordArrow = document.querySelector('.accordeon__arrow')
    accord.addEventListener(
      'click',
      (event) => {
        if (
          !event.target.className.includes('js-accord__btn') &&
          !event.target.className.includes('accordeon__title') &&
          !event.target.className.includes('accordeon__arrow')
        ) {
          return
        }
        showBody(event.target.closest('.js-accord'))
      },
      true
    )
    function showBody(el) {
      el.classList.toggle('active')
      accordArrow.classList.toggle('arrow__down')
    }
    // Селектор
    const getTemplate = (data = [], placeholder, selectedId) => {
      let text = placeholder

      const items = data.map((item) => {
        let cls = ''
        if (item.id === selectedId) {
          text = item.value
          cls = 'selected'
        }
        return `
      <li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>
    `
      })

      return `
    <div class="select__backdrop" data-type="backdrop"></div>
    <div class="select__input" data-type="input">
      <span data-type="value">${text}</span>
      <img class='select__arrow' src='../assets/images/home/arrow.png' data-type="arrow" width='16' height='8'>
    </div>
    <div class="select__dropdown">
      <ul class="select__list">
        ${items.join('')}
      </ul>
    </div>
  `
    }

    class Select {
      constructor(selector, options) {
        this.$el = document.querySelector(selector)
        this.options = options
        this.selectedId = options.selectedId

        this.render()
        this.setup()
      }

      render() {
        const { placeholder, data } = this.options
        this.$el.classList.add('select')
        this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId)
      }

      setup() {
        this.clickHandler = this.clickHandler.bind(this)
        this.$el.addEventListener('click', this.clickHandler)
        this.$arrow = this.$el.querySelector('[data-type="arrow"]')
        this.$value = this.$el.querySelector('[data-type="value"]')
      }

      clickHandler(event) {
        const { type } = event.target.dataset

        if (type === 'input' || type === 'value' || type === 'arrow') {
          this.toggle()
        } else if (type === 'item') {
          const id = event.target.dataset.id
          this.select(id)
        } else if (type === 'backdrop') {
          this.close()
        }
      }

      get isOpen() {
        return this.$el.classList.contains('open')
      }

      get current() {
        return this.options.data.find((item) => item.id === this.selectedId)
      }

      select(id) {
        this.selectedId = id
        this.$value.textContent = this.current.value

        this.$el.querySelectorAll('[data-type="item"]').forEach((el) => {
          el.classList.remove('selected')
        })
        this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected')

        this.options.onSelect ? this.options.onSelect(this.current) : null

        this.close()
      }

      toggle() {
        this.isOpen ? this.close() : this.open()
      }

      open() {
        this.$el.classList.add('open')
        this.$arrow.classList.add('arrow__down')
      }

      close() {
        this.$el.classList.remove('open')
        this.$arrow.classList.remove('arrow__down')
      }

      destroy() {
        this.$el.removeEventListener('click', this.clickHandler)
        this.$el.innerHTML = ''
      }
    }

    const select_1 = new Select('#select_1', {
      placeholder: 'Collection',
      // selectedId: '2',
      data: [
        { id: '1_1', value: 'Provence' },
        { id: '1_2', value: 'Jazz' },
        { id: '1_3', value: 'Taurus' },
        { id: '1_4', value: 'Jagger' },
        { id: '1_5', value: 'Taylor' },
        { id: '1_6', value: 'Evora' },
      ],
      onSelect(item) {
        console.log('Selected Item', item)
      }
    })
    const select_2 = new Select('#select_2', {
      placeholder: 'Color',
      // selectedId: '2',
      data: [
        { id: '2_1', value: 'Caramel' },
        { id: '2_2', value: 'Brown' },
        { id: '2_3', value: 'Indigo' },
        { id: '2_4', value: 'Gray' },
        { id: '2_5', value: 'Black' },
        { id: '2_6', value: 'Olive' },
      ],
      onSelect(item) {
        console.log('Selected Item', item)
      }
    })
    const select_3 = new Select('#select_3', {
      placeholder: 'Category',
      // selectedId: '2',
      data: [
        { id: '3_1', value: 'Lounge' },
        { id: '3_2', value: 'Side Table' },
        { id: '3_3', value: 'Armchair' },
        { id: '3_4', value: 'Shelves' },
        { id: '3_5', value: 'Chair' },
        { id: '3_6', value: 'Bedstead' },
      ],
      onSelect(item) {
        console.log('Selected Item', item)
      }
    })
  })
}
