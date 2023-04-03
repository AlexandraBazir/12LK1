addBtn.addEventListener("click", e => {
    mdBox.style.display = "flex";
})

mdClose.addEventListener("click", e => {
    mdBox.style = null;
})

addForm.addEventListener("submit", e => {
    e.preventDefault(); // остановить действие по умолчанию
    const body = {};
    console.log(addForm.children); // дочерние теги (прямые потомки)
    console.log(addForm.elements); // все элементы формы (input и т.д.)
    
    for (let i = 0; i < addForm.elements.length; i++) {
        const inp = addForm.elements[i];
        // console.log(inp);
        // console.log(inp.name);
        // console.log(inp.value);
        if (inp.name) {
            if (inp.type === "checkbox") {
                body[inp.name] = inp.checked
            } else {
                body[inp.name] = inp.value
            }
        }
    }
    console.log(body);
   fetch(path + "/add", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
   })
   .then(res => {
    if (res.ok) {
        addForm.reset();
        mdBox.style = null;
        createCard(body);
    } else {
        return res.json();
    }
   })
   .then(err => {
    if (err && err.message) {
        alert(err.message);
    }
   });
})