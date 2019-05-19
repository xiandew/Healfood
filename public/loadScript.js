/** Render data and produce an HTML node **/
function render_data(template, item) {
    var clone = document.importNode(template.content, true);
    clone.querySelector("#color-bg").style.backgroundColor = item.color;
    var color_code = clone.querySelector("#color-code");
    color_code.innerText = item.color;
    color_code.style.color = getContrastYIQ(item.color);
    clone.querySelector("#pantone-code").innerHTML = `PANTONE®<br/>${item.pantone_value}`;
    clone.querySelector("#name").innerText = item.name;
    return clone;
}

/** Load a page from API. */
function load(page_number) {
    // HTML Elements
    let load_more = document.querySelector("#load-more");
    let entries = document.querySelector(".entries");
    let template = document.querySelector('template#card');

    // Show loading state
    load_more.classList.add("is-loading");
    fetch(`https://reqres.in/api/unknown?page=${page_number}`).
    then((cont) => cont.json()).then((obj) => {
        // Remove loading state
        load_more.classList.remove("is-loading");

        // Hide button if reaching the last page
        if (obj.page === obj.total_pages) {
            load_more.style.display = "none";
        }

        // Render items loaded
        for (const item of obj.data) {
            entries.appendChild(render_data(template, item));
        }

        // Set the number of next page
        load_more.dataset.page = page_number + 1;
    });
}

/** Run when document is ready */
(function() {
    // Load the first page
    load(1);

    // Assign button action to load more page
    let load_more = document.querySelector("#load-more");
    load_more.addEventListener("click", () => {
        load(parseInt(load_more.dataset.page));
    })
})();
