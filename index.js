import {VERSION} from "http://localhost:5000/get-scripts"
import * as _ from 'https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/+esm'
console.log(VERSION)
console.log(_.get({name: 'duong'}, 'name', ''))
console.log(_.get({name: 'duong'}, 'age', '20'))
