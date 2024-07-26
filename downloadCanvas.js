/** @type {HTMLCanvasElement} */

document.querySelector("#download").addEventListener("click",e=>
    {
        let canvasUrl = quadro.toDataURL("image/png",1.0)
        console.log(canvasUrl);
        const createEl = document.createElement("a")
        createEl.href = canvasUrl
        createEl.download = "takeThisSpin"
        createEl.click()
        createEl.remove()
    })