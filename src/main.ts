import './style.css'
import { initPWA } from './pwa.ts'
//@ts-ignore
import tafqit from './tafqit.js'

const app = document.querySelector<HTMLDivElement>('#app')!


// where display
const numValue: HTMLSpanElement = document.getElementById('num-value')!
const textualValue: HTMLSpanElement = document.getElementById('textual-value')!
const dateValue: HTMLSpanElement = document.getElementById('date-value')!
//@ts-ignore
const numInput: HTMLInputElement = document.getElementById('num-input')!


// bills inputs
//@ts-ignore
const bill2000: HTMLInputElement = document.getElementById('2000da-input')!
//@ts-ignore
const bill1000: HTMLInputElement = document.getElementById('1000da-input')!
//@ts-ignore
const bill500: HTMLInputElement = document.getElementById('500da-input')!
//@ts-ignore
const bill200: HTMLInputElement = document.getElementById('200da-input')!
//@ts-ignore
const bill100: HTMLInputElement = document.getElementById('100da-input')!


// recalculate the total based on the amount of bills selected
// then refresh to show the cheque
const recalcBills = () => {
  let currentValue = 0
  currentValue += Number(bill2000.value) * 2000
  currentValue += Number(bill1000.value) * 1000
  currentValue += Number(bill500.value) * 500
  currentValue += Number(bill200.value) * 200
  currentValue += Number(bill100.value) * 100

  numInput.value = String(currentValue)
  refreshValue()
}

// display the correct arabic text corresponding to the number
const refreshValue = () => {
  numValue.textContent = numInput.value
  textualValue.textContent = tafqit(numInput.value) + ' دينار'
}

// display the text and also recalculate how many bills it take to make up
// the total.
// this is done to make it easier to switch between using number input and
// bills input.
const refreshValueWithBills = () => {
  refreshValue()

  // this could be done more optimally maybe?
  // idc i just used the first method that came to mind and it works
  let val: number = Number(numInput.value)
  const billsof_2000: number = Math.floor(val / 2000)
  bill2000.value = String(billsof_2000)
  val = val % 2000
  if (val < 100) {
    bill1000.value = '0'
    bill500.value = '0'
    bill200.value = '0'
    bill100.value = '0'
    return
  }
  if (val >= 1000) {
    const billsof_1000: number = Math.floor(val / 1000)
    bill1000.value = String(billsof_1000)
    val = val % 1000
  } else {
    bill1000.value = '0'
  }

  if (val >= 500) {
    const billsof_500: number = Math.floor(val / 500)
    bill500.value = String(billsof_500)
    val = val % 500
  } else {
    bill500.value = '0'
  }

  if (val >= 200) {
    const billsof_200: number = Math.floor(val / 200)
    bill200.value = String(billsof_200)
    val = val % 200
  } else {
    bill200.value = '0'
  }

  if (val >= 100) {
    const billsof_100: number = Math.floor(val / 100)
    bill100.value = String(billsof_100)
  } else {
    bill100.value = '0'
  }


}

// display the current date in dd/mm/yyyy if its the locale default
// if its not then you change your locale maybe?
dateValue.textContent = new Date().toLocaleDateString()

// when changing the number input, refresh and recalculate the bills
numInput.addEventListener("change", refreshValueWithBills)

// handle bill input changes
bill2000.addEventListener("change", recalcBills)
bill1000.addEventListener("change", recalcBills)
bill500.addEventListener("change", recalcBills)
bill200.addEventListener("change", recalcBills)
bill100.addEventListener("change", recalcBills)

initPWA(app)
