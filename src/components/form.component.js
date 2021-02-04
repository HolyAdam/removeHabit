import Component from './component'
import Validate from '../functions/Validate.function'


export class FormComponent extends Component {

	constructor(id) {
		super(id)
	}

	clear() {
		const formEls = [...this.$el.children]; 

		formEls.forEach((input, i) => {
			if (input.tagName !== 'BUTTON') {
				if (i === 1) {
					[...formEls[i].children].forEach(item => {
						if (item.querySelector('.date')) {
							item.querySelector('.date').value = ''
						}
					})
				} else {
					input.value = ''
				}
			}
		})
	}


	init() {

		let bcd = 0


		const localArray = []
		if (localStorage.getItem('abc')) {

			const bdd = JSON.parse(localStorage.getItem('abc'))


			document.querySelector('.empty').style.display = 'none'

			const ab1 = JSON.parse(localStorage.getItem('abc'))

			let layout = ''

			ab1.forEach(arr => {
				layout += renderPost(arr)
			})

			document.querySelector('.all-cont').insertAdjacentHTML('beforeend', layout)

			ab1.forEach((arr, i) => {
				arr.forEach((value, j) => {
					if (j === 2) {
						timer(document.querySelectorAll('.prrrr')[i], value)
					}
				})
			})

			if (document.querySelectorAll('.prrrr').length !== 0) {
				bcd = document.querySelectorAll('.prrrr').length
			}
		}


		this.$el.addEventListener('submit', e => {

			e.preventDefault() 

			const obj = new Object()

			const childs = this.$el.elements

			const arr = [childs.name.value, childs.color.value, childs.date.value]

			let isTrue = true

			arr.forEach(value => {

				if (Validate.CheckValue(value) == false) {
					isTrue = false;
				}
			})



			if (isTrue) {

				this.clear()

				obj[new Date().getTime()] = arr

				const layoutEl = renderPost(arr)

				document.querySelector('.empty').style.display = 'none'

				document.querySelector('.all-cont').insertAdjacentHTML('beforeend', layoutEl)

				localArray.push(arr)
				localStorage.setItem('abc', JSON.stringify(localArray))

				let bbc = ''

				Object.keys(obj).forEach(key => {
					bbc = obj[key]
				})	

				bbc = bbc[2]

				timer(document.querySelectorAll('.prrrr')[bcd++], bbc)


			} else {
				alert('Не все поля заполнены')
			}

		})
	}
}



const timer = (id, deadline) => {


	const addZero = (time) => {
		if (time <= 9) {
			return '0' + time
		}

		return time
	}


	const getTimeRemain = (endTime) => {

		let t = Date.parse(endTime) - Date.parse(new Date()),
			  sec = Math.floor(t / 1000 % 60),
			  min = Math.floor((t / 1000) / 60 % 60),
			  h = Math.floor((t / (1000 * 60 * 60)) % 24),
			  day = Math.floor((t / (1000 * 60 * 60 * 24)))


		return {
			t, sec, min, h, day
		}


	}

	const setClock = (selector, endTime) => {
		const timer = selector
		const days = timer.querySelector('.days')
		const hours = timer.querySelector('.hours')
		const minutes = timer.querySelector('.minutes')
		const seconds = timer.querySelector('.seconds')

		const timeInterval = setInterval(updateClock, 1000)

		updateClock()

		function updateClock() {
			const t = getTimeRemain(endTime)

			days.textContent = addZero(t.day)
			hours.textContent = addZero(t.h)
			seconds.textContent = addZero(t.sec)
			minutes.textContent = addZero(t.min)

			if (t.t <= 0) {
				days.textContent = "00"
				hours.textContent = "00"
				seconds.textContent = "00"
				minutes.textContent = "00"

				clearInterval(timeInterval)
			}

		}

	}

	setClock(id, deadline)

}


function renderPost(arr) {

	switch(arr[1]) {
		case 'blue':
			arr[1] = '<svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em"></text></svg>'
			break;
		case 'purple':
			arr[1] = '<svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#6f42c1"></rect><text x="50%" y="50%" fill="#6f42c1" dy=".3em"></text></svg>'
			break;
		case 'pink':
			arr[1] = '<svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#e83e8c"></rect><text x="50%" y="50%" fill="#e83e8c" dy=".3em"></text></svg>'
	}


	return `
		<div class="d-flex text-muted pt-3 prrrr">
		  ${arr[1]}

		  <p class="pb-3 mb-0 small lh-sm border-bottom">
		    <strong class="d-block text-gray-dark">${arr[0]}</strong><br>
		    Осталось дней: <span class="days"></span><br><br>
		    Осталось часов: <span class="hours"></span><br><br>
		    Осталось минут: <span class="minutes"></span><br><br>
		    Осталось секунд: <span class="seconds"></span>
		  </p>
		</div>
	`

}





