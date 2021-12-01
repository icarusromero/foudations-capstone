const pictureContainer = document.getElementById('picture')
const { default: axios } = require("axios");

document.getElementById('submit').onclick = function () {
    axios.get(`http://localhost:5463/api/picselect`).then(function (response) {
        console.log(response)
        let pictures = response.data
        let selection = document.querySelector('select');
        let name = selection.options[selection.selectedIndex].value;
        console.log(name)

        let pic = {}
        for(let i = 0; i < pictures.length; i++){
            if(pictures[i]["name"] === name){
                pic = pictures[i]
            }
        }

        pictureContainer.innerHTML = ``
        const { rows } = pic
        rowNum = 1
        rows.forEach(row => {
            const row = document.createElement('p').className(`row${rowNum}`)
            row.forEach(btn => {
                const btn = document.createElement('button')
                row.appendChild(btn)
            })
            pictureContainer.appendChild(row)
            rowNum++
        });
    })
}

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