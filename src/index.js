import './styles/main.sass'
import {AsideComponent} from './components/aside.component'
import {FormComponent} from './components/form.component'


new AsideComponent({id: '.aside'}).init()
new FormComponent({id: '.aside-form'}).init()