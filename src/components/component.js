export default class Component {

	constructor({id = null} = {}) {

		this.$el = document.getElementById(id)

	}


	init() {
		console.log(this.$el)
	}

}