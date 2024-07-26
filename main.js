/** @type {HTMLCanvasElement} */

const quadro = document.querySelector("#quadro")
const ctx = quadro.getContext("2d")

quadro.width = quadro.clientWidth
quadro.height = quadro.clientHeight

let width = quadro.width
let height = quadro.height

let isFoward = false
let isBackward = false
let divisor = 2.273
let numerador = 0.02
let ratio = ((1+5**0.5)*0.5)

ctx.fillStyle = "#000"
ctx.fillRect(0,0,width,height)
ctx.translate(width/2,height/2)

function DrawLine(x1,y1,x2,y2,lineColor)
{
    ctx.strokeStyle = lineColor
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(x1,y1)
    ctx.lineTo(x2,y2)
    ctx.stroke()
}

function DivisorInput()
{
    let divisorInput = document.querySelector("#divisor").value
    divisor = divisorInput
}

function TextInput()
{
    let inputText = document.querySelector("#rateChangeText").value
    document.querySelector("#rateChange").value = inputText
    numerador = inputText
}

function SlideInput()
{
    let input = document.querySelector("#rateChange").value
    document.querySelector("#rateChangeText").value = input
    numerador = input
}

function Next()
{
    let aux = parseFloat(document.querySelector("#rateChangeText").value)
    aux+=0.01
    if(aux>= 100)
    {
        aux=100
        isFoward = false
        isBackward = true
    }
    document.querySelector("#rateChangeText").value = aux
    TextInput()
    DrawSpiral()
}

function Previous()
{
    let aux = parseFloat(document.querySelector("#rateChangeText").value)
    aux-=0.01
    if(aux<= 0.01)
    {
        aux=0.01
        isBackward = false
        isFoward = true
    }
    document.querySelector("#rateChangeText").value = aux
    TextInput()
    DrawSpiral()
}

function Foward()
{
    isBackward = false
    isFoward = true
    setTimeout(()=>{
        Next()
    },35)
}

function Stop()
{
    isFoward = false
    isBackward = false
}

function Backward()
{
    isFoward = false
    isBackward = true
    setTimeout(()=>{
        Previous()
    },35)
}

function DrawSpiral()
{
    let rateChange = parseFloat(numerador)/divisor
    let raio = 1
    let colorValue = 0
    let color = "#fff"
    let revolutions = document.querySelector('#revolutions').value
    ctx.fillStyle = "#000"
    ctx.fillRect(-width,-height,width*2,height*2)
    for(let i = 0 ;i < revolutions*ratio; i+=rateChange)
    {
        color = document.querySelector('#color').checked == true ? `hsl(${colorValue},100%,50%)` : "#fff"
        ctx.fillStyle = color
        ctx.fillRect(raio * Math.cos(i)-1,raio * Math.sin(i)-1,2,2)
        DrawLine(raio * Math.cos(i),raio * Math.sin(i),raio * Math.cos(i+rateChange),raio * Math.sin(i+rateChange),color)
        raio += ratio
        colorValue+=2
    }
    if(isFoward==true){Foward()}
    if(isBackward==true){Backward()}
}
DrawSpiral()

document.addEventListener("keypress", e=>
{
    if(e.key == 'Enter'){DrawSpiral()}
})