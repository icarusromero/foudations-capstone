
const pictureContainer = document.getElementById('picture')

const submitbtn = document.getElementById("submit")

submitbtn.addEventListener('click', (e) => {
    e.preventDefault()
    console.log('string hit')
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
        console.log(rows)
        rowNum = 1
        rows.forEach(arr => {
            console.log(arr)
            const row = document.createElement('p')
            row.setAttribute('id', `row${rowNum}`)
            row.setAttribute('class', `row`)
            console.log(row)
            arr.forEach(item => {
                const btn = document.createElement('button')
                btn.innerHTML = `${item}`
                row.appendChild(btn)
            })
            pictureContainer.appendChild(row)
            rowNum++
        });
    })
})

// const createPicture = picture => {
//     const { rows } = picture
//     rowNum = 1
//     rows.forEach(row => {
//         const row = document.createElement('p').className(`row${rowNum}`)
//         row.forEach(btn => {
//             const btn = document.createElement('button')
//             row.appendChild(btn)
//         })
//         pictureContainer.appendChild(row)
//         rowNum++
//     });
// }

// function displayPicture() {
//     pictureContainer.innerHTML = ``
    
// }

// form.addEventListener('submit', displayPicture)