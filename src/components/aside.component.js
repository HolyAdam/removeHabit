import Component from './component.js'


export class AsideComponent extends Component {
	constructor(id) {
		super(id)
	}


	init() {
		document.querySelector('.navbar-toggler').addEventListener('click', e => {
			this.show()
		})

		document.addEventListener('keyup', e => {
			if (e.keyCode === 27) {
				this.hide()
			}
		})

		document.querySelector('.aside-close').addEventListener('click', e => {
			this.hide()
		})

	}
}

