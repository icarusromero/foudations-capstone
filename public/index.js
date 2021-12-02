
const pictureContainer = document.getElementById('picture')
let colorKey = document.getElementById('color-key')
const submitbtn = document.getElementById("submit")
let pickedClr = ''

const initClrGuide = () => {
    let i = 0
    
    while(i < 20){
        clrBtn = document.createElement('button')
        clrBtn.setAttribute('class', 'color-button')
        clrBtn.setAttribute('id', `color${i + 1}`)
        clrBtn.style.background = 'blanchedalmond'
        clrBtn.innerHTML = `N/A`
        colorKey.appendChild(clrBtn)
        i++
    }
    let clrBtns = document.getElementsByClassName('color-button')
    for(let i = 0; clrBtns.length; i++){
        console.log(clrBtns[`${i}`])
        console.log(clrBtns)
        
        // btn.addEventListener('click', () => {
        //     pickedClr = color1.value
        // })
    }
}
initClrGuide()

submitbtn.addEventListener('click', (e) => {
    e.preventDefault()
    axios.get('http://localhost:5000/api/picselect').then(function (response) {
        const pictures = response.data

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

// let pickedClr = ''


// const color1 = document.getElementById('color1')
// color1.addEventListener('click', () => {
//     pickedClr = color1.value
// })
// const color2= document.getElementById('color2')
// color2.addEventListener('click', () => {
//     pickedClr = color2.value
// })
// const color3 = document.getElementById('color3')
// color3.addEventListener('click', () => {
//     pickedClr = color1.value
// })
// const color4 = document.getElementById('color4')
// color4.addEventListener('click', () => {
//     pickedClr = color1.value
// })
// const color5 = document.getElementById('color5')
// color5.addEventListener('click', () => {
//     pickedClr = color1.value
// })
// const color6= document.getElementById('color6')
// color6.addEventListener('click', () => {
//     pickedClr = color2.value
// })
// const color7 = document.getElementById('color7')
// color7.addEventListener('click', () => {
//     pickedClr = color1.value
// })
// const color8 = document.getElementById('color8')
// color8.addEventListener('click', () => {
//     pickedClr = color1.value
// })
// const color9 = document.getElementById('color9')
// color9.addEventListener('click', () => {
//     pickedClr = color1.value
// })
// const color10 = document.getElementById('color10')
// color10.addEventListener('click', () => {
//     pickedClr = color1.value
// })
// const color11 = document.getElementById('color11')
// color11.addEventListener('click', () => {
//     pickedClr = color1.value
// })
// const color12= document.getElementById('color12')
// color12.addEventListener('click', () => {
//     pickedClr = color2.value
// })
// const color13 = document.getElementById('color13')
// color13.addEventListener('click', () => {
//     pickedClr = color1.value
// })
// const color14 = document.getElementById('color14')
// color14.addEventListener('click', () => {
//     pickedClr = color1.value
// })
// const color15 = document.getElementById('color15')
// color15.addEventListener('click', () => {
//     pickedClr = color1.value
// })
// const color16= document.getElementById('color16')
// color16.addEventListener('click', () => {
//     pickedClr = color2.value
// })
// const color17 = document.getElementById('color17')
// color17.addEventListener('click', () => {
//     pickedClr = color1.value
// })
// const color18 = document.getElementById('color18')
// color18.addEventListener('click', () => {
//     pickedClr = color1.value
// })
// const color19 = document.getElementById('color19')
// color19.addEventListener('click', () => {
//     pickedClr = color1.value
// })
// const color20 = document.getElementById('color20')
// color20.addEventListener('click', () => {
//     pickedClr = color1.value
// })