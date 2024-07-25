/** @type {HTMLCanvasElement} */

const quadro = document.querySelector("#quadro")
const ctx = quadro.getContext("2d")

quadro.width = quadro.clientWidth
quadro.height = quadro.clientHeight

let width = quadro.width
let height = quadro.height

let numerador = 0.1
let ratio = ((1+5**0.5)*0.5)

ctx.fillStyle = "#000"
ctx.fillRect(0,0,width,height)
ctx.translate(width/2,height/2)

function DrawLine(x1,y1,x2,y2)
{
    ctx.strokeStyle = "#fff"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(x1,y1)
    ctx.lineTo(x2,y2)
    ctx.stroke()
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

function DrawSpiral()
{
    let rateChange = parseFloat(numerador)/9
    document.querySelector("#ratio").innerText = `ratio = ${parseFloat(numerador)}/9`
    let raio = 1
    ctx.fillStyle = "#000"
    ctx.fillRect(-width,-height,width*2,height*2)
    for(let i = 0 ;i < 1000*ratio; i+=rateChange)
        {
            ctx.fillStyle = "#ffffff"
            ctx.fillRect(raio * Math.cos(i)-2,raio * Math.sin(i)-2,4,4)
            DrawLine(raio * Math.cos(i),raio * Math.sin(i),raio * Math.cos(i+rateChange),raio * Math.sin(i+rateChange))
            raio += ratio
    }
}
DrawSpiral()