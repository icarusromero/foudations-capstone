
const pictureContainer = document.getElementById('picture')
let colorKey = document.getElementById('color-key')
const submitbtn = document.getElementById("submit")

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

        // colorKey.innerHTML = ``
        // let i = 0
        //     while(i < 20){
        //         clrBtn = document.createElement('button')
        //         clrBtn.setAttribute('class', 'color-button')
        //         clrBtn.setAttribute('id', `color${i + 1}`)
        //         clrBtn.style.background = 'blanchedalmond'
        //         clrBtn.innerHTML = `N/A`
        //         colorKey.appendChild(clrBtn)
        //         i++
        //     } 

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

let pickedClr = ''
const color1 = document.getElementById('color1')
color1.addEventListener('click', () => {
    pickedClr = color1.value
    console.log(pickedClr)
})