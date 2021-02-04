export default class Component {

	constructor({id = null} = {}) {

		this.$el = document.querySelector(id)

	}

	hide() {
		this.$el.style.right = '-480px'
	}

	show() {
		this.$el.style.right = '0px'
	}


}