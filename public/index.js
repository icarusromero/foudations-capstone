
let globalId = 2

const pictureContainer = document.getElementById('picture')
let colorKey = document.getElementById('color-key')
const submitbtn = document.getElementById("submit")
const dltBtn = document.getElementById('delete-pic')
const createBtn = document.getElementById('create-your-own-btn')
const clringSec = document.getElementById('coloring-section')
const picSelect = document.getElementById('picture-selector')
let nameAndSave = document.getElementById('name-and-save')
let pickedClr = ''

const initClrGuide = () => {
    let i = 0
    let colorsSide = document.createElement('div')
    colorsSide.setAttribute('id', 'colors-side')
    let numsSide = document.createElement('div')
    numsSide.setAttribute('id', 'numbers-side')
    
    while(i < 20){
        let clrBtn = document.createElement('button')
        clrBtn.setAttribute('class', 'color-button')
        clrBtn.setAttribute('id', `color${i + 1}`)
        clrBtn.style.background = 'blanchedalmond'
        clrBtn.innerHTML = `N/A`
        clrBtn.addEventListener('click', () => {
            pickedClr = clrBtn.value
        })
        colorsSide.appendChild(clrBtn)
        i++
    }

    let x = 1
    while(x < 21){
        let numbr = document.createElement('p')
        numbr.setAttribute('class', 'numbers')
        numbr.innerHTML = `= ${x}`
        numsSide.appendChild(numbr)
        x++
    }
    
    colorKey.appendChild(colorsSide)
    colorKey.appendChild(numsSide)
}
initClrGuide()

submitbtn.addEventListener('click', (e) => {
    e.preventDefault()
    axios.get('http://localhost:5000/api/picselect')
    .then(function (response) {
        let pictures = response.data
        console.log(pictures)
        
        let selection = document.querySelector('select');
        let name = selection.options[selection.selectedIndex].value;

        let pic = {}
        for(let i = 0; i < pictures.length; i++){
            if(pictures[i]["name"] === name){
                pic = pictures[i]
            }
        }

        pictureContainer.innerHTML = ``

        const { rows } = pic
        rowNum = 1
        rows.forEach(arr => {
            const row = document.createElement('p')
            row.setAttribute('id', `row${rowNum}`)
            row.setAttribute('class', `row`)
            arr.forEach(item => {
                const btn = document.createElement('button')
                btn.setAttribute('class', 'pixel')
                btn.innerHTML = `${item}`
                btn.addEventListener('click', () => {
                    btn.style.background = pickedClr
                })
                row.appendChild(btn)
            })
            pictureContainer.appendChild(row)
            rowNum++
        });

        const { colors } = pic

        let x = 0
        while(x < colors.length){
            let btnToChange = document.getElementById(`color${x + 1}`)
            btnToChange.style.background = colors[x]
            btnToChange.value = colors[x]
            btnToChange.innerHTML = ``
            x++
        }
    })
})

createBtn.addEventListener('click', () => {
    pictureContainer.innerHTML = ``
    let rowNum = 1
    let addRowBtn = document.createElement('button')

    nameAndSave.innerHTML = `<input id="name-input" placeholder="Pic Name">
    <button id="save-btn">Save</button>`

    let nameInput = document.getElementById('name-input')
    let saveBtn = document.getElementById('save-btn')

    addRowBtn.setAttribute('id', 'add-row-btn')
    addRowBtn.innerHTML = 'Add Row'
    pictureContainer.appendChild(addRowBtn)

    let colorsSide = document.getElementById('colors-side')
    colorsSide.innerHTML = ``

    let i = 0
    while(i < 20){
        let clrBtn = document.createElement('input')
        clrBtn.setAttribute('class', 'color-button')
        clrBtn.setAttribute('id', `color${i + 1}`)
        clrBtn.style.background = 'blanchedalmond'
        clrBtn.setAttribute('placeholder', '#000000')
        colorsSide.appendChild(clrBtn)
        i++
    }

    addRowBtn.addEventListener('click', () => {
        let row = document.createElement('p')
        row.setAttribute('id', `row${rowNum}`)
        row.setAttribute('class', 'row')

        let addPixelBtn = document.createElement('button')
        addPixelBtn.setAttribute('id', `row${rowNum}-add-pixel-btn`)
        addPixelBtn.setAttribute('class', 'add-pixel')
        addPixelBtn.innerHTML = '+'
        
        let deletePxBtn = document.createElement('button')
        deletePxBtn.setAttribute('id',`row${rowNum}-delete-pixel-btn`)
        deletePxBtn.setAttribute('value', `row${rowNum}`)
        deletePxBtn.setAttribute('class', `delete-pixel`)
        deletePxBtn.innerHTML = '-'


        row.appendChild(addPixelBtn)
        row.appendChild(deletePxBtn)
        pictureContainer.appendChild(row)
        let pixelNum = 1

        rowNum++

        addPixelBtn.addEventListener('click', () => {
            let thisRowNum = row.id
            const pixel = document.createElement('input')
            pixel.setAttribute('class', 'pixel')
            pixel.setAttribute('id', `${thisRowNum}-${pixelNum}`)

            row.appendChild(pixel)
            pixelNum++
        })

        deletePxBtn.addEventListener('click', () => {
            
            let rowNum = deletePxBtn.value
            let p = document.getElementById(`${rowNum}`)
            let pxNum = p.childElementCount - 2
            let pixel = document.getElementById(`${rowNum}-${pxNum}`)
            pixel.remove()

        })
    })



    saveBtn.addEventListener('click', (e) => {
        e.preventDefault()
        let x = 0
        let length = pictureContainer.childElementCount - 1
        while(x < length){
            let addBtn = document.getElementById(`row${x + 1}-add-pixel-btn`)
            let dltBtn = document.getElementById(`row${x + 1}-delete-pixel-btn`)
            addBtn.remove()
            dltBtn.remove()
            x++
        }
        // let addRowBtn = document.getElementById('add-row-btn')
        addRowBtn.remove()

        globalId++
        let rows = []
        let rowCount = pictureContainer.childElementCount

        for(let i = 0; i < rowCount; i++){
            let pixels = []
            let row = document.getElementById(`row${i + 1}`)
            let pixelCount = row.childElementCount
            for(let x = 0; x < pixelCount; x++){
                let pixel = document.getElementById(`row${i + 1}-${x + 1}`)
                pixels.push(pixel.value)
            }
            rows.push(pixels)
        }

            let colorsSide = document.getElementById('colors-side')
            let clrList = []
            let clrs = colorsSide.childElementCount

            for(let r = 0; r < clrs; r++){
                let clr = document.getElementById(`color${r + 1}`)
                if(clr.value !== ''){
                    let colorLC = clr.value.toLowerCase()
                    clrList.push(colorLC)
                }
            }

            const body = {
                id: globalId,
                name: nameInput.value,
                rows: rows,
                colors: clrList
            }
            

        axios.post(`http://localhost:5000/api/save-pic`, body)
        .then( (res) => {
            let newPicName = res.data
            let newOption = document.createElement('option')
            newOption.setAttribute('value', `${newPicName}`)
            newOption.setAttribute('id', `${globalId}`)
            newOption.innerHTML = `${newPicName}`
            picSelect.appendChild(newOption)

            
        })

        nameInput.remove()
        saveBtn.remove()
        pictureContainer.innerHTML = ``

        colorKey.innerHTML = ``
        initClrGuide()
    })

})

dltBtn.addEventListener('click', (e) => {
    e.preventDefault()

    let selection = document.querySelector('select');
    let thisId = selection.options[selection.selectedIndex].id;
    console.log(thisId)
    
    let toDlt = document.getElementById(`${thisId}`)
    // console.log(toDlt)
    axios.delete('http://localhost:5000/api/delete/:id', thisId)
    .then((res) => {
        toDlt.remove()
        pictureContainer.innerHTML = ``
        alert(res.data)
    })

    
 })