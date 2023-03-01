const blogEntryTemplate = document.getElementById("blog-entry");

const createDialog = document.getElementById("create-dialog");
const editDialog = document.getElementById("edit-dialog");
const deleteDialog = document.getElementById("delete-dialog");

const createEntryBtn = document.getElementById("create-entry-button");
const createDialogForm = document.getElementById("create-dialog-form");
const createEntryTitle = document.getElementById("create-entry-title");
const createEntryDate = document.getElementById("create-entry-date");
const createEntrySummary = document.getElementById("create-entry-summary");

const editDialogForm = document.getElementById("edit-dialog-form");
const editEntryTitle = document.getElementById("edit-entry-title");
const editEntryDate = document.getElementById("edit-entry-date");
const editEntrySummary = document.getElementById("edit-entry-summary");

const deleteDialogForm = document.getElementById("delete-dialog-form");

const blogEntriesTable = document.getElementById("blog-entries");

const okButtons = document.querySelectorAll(".ok-buttons");
const cancelButtons = document.querySelectorAll(".cancel-buttons");

// pre-populate the data store with an array of 2 blog entries if it's empty
if (!window.localStorage.getItem("entries")) {
    window.localStorage.setItem("entries", JSON.stringify([
        {
            id: 1,
            title: "Duck Pond",
            date: "2009-07-16",
            summary: "Today I rode my bike to the duck pond and then I stared at ducks for a minimum of 7 hours."
        },
        {
            id: 2,
            title: "School Project",
            date: "2010-02-22",
            summary: "Today I finished my 7 year long research project about ducks."
        }
    ]));
}

let nextEntryId = 3;

let entries = [];

function renderEntries() {
    while (blogEntriesTable.firstChild) {
        blogEntriesTable.removeChild(blogEntriesTable.lastChild);
    }

    for (const entry of entries) {
        const blogEntryNode = blogEntryTemplate.content.cloneNode(true);
        blogEntryNode.firstElementChild.children[0].innerHTML = entry.title;
        blogEntryNode.firstElementChild.children[1].innerHTML = entry.date;
        blogEntryNode.firstElementChild.children[2].innerHTML = entry.summary;

        // add edit button click event listener
        blogEntryNode.firstElementChild.children[3].addEventListener("click", function() {
            console.log("hello");
            document.body.style.backgroundColor = "lightgray";
            editDialog.open = true;
            editDialog.firstElementChild.toEdit = entry.id;
            // fill in the edit dialog form with the preexisting values
            editEntryTitle.value = entry.title;
            editEntryDate.value = entry.date;
            editEntrySummary.value = entry.summary;
        });

        // add delete button click event listener
        blogEntryNode.firstElementChild.children[4].addEventListener("click", function() {
            document.body.style.backgroundColor = "lightgray";
            deleteDialog.open = true;
            deleteDialog.lastElementChild.toDelete = entry.id;
        });
        blogEntriesTable.append(blogEntryNode);
    }
}

okButtons.forEach(button => {
    button.addEventListener('click', function() {
        this.form.submitted = true;
    });
});

cancelButtons.forEach(button => {
    button.addEventListener('click', function() {
        this.form.submitted = false;
    });
});

// when the create entry dialog form is submitted then record the information and rerender
// the list of blog entries
createDialogForm.addEventListener("submit", function() {
    document.body.style.backgroundColor = "white";

    // add the blog entry object to the array if ok was pressed
    if (this.submitted) {
        entries.push({
            id: nextEntryId,
            title: createEntryTitle.value,
            date: createEntryDate.value,
            summary: createEntrySummary.value
        });
        nextEntryId++;
        renderEntries();
        window.localStorage.removeItem("entries");
        window.localStorage.setItem("entries", JSON.stringify(entries));
    }
});

// when the edit entry dialog form is submitted then find the entry with the matching id in
// the list of blog entries and change the data
editDialogForm.addEventListener("submit", function() {
    document.body.style.backgroundColor = "white";

    // edit the blog entry object if ok was pressed
    if (this.submitted) {
        let notFound = true;
        for (const entry of entries) {
            if (entry.id == this.toEdit) {
                entry.title = editEntryTitle.value;
                entry.date = editEntryDate.value;
                entry.summary = editEntrySummary.value;
                notFound = false;
            }
        }
        if (notFound) {
            console.error("Could not find the matching entry to edit");
        }
        renderEntries();
        window.localStorage.removeItem("entries");
        window.localStorage.setItem("entries", JSON.stringify(entries));
    }
});

// when the delete entry dialog form is submitted then remove the entry with the matching id
// from entries and rerender the list of blog entries
deleteDialogForm.addEventListener("submit", function() {
    document.body.style.backgroundColor = "white";
    // delete the blog entry object from the array if ok was pressed
    if (this.submitted) {
        entries = entries.filter(item => {
            return item.id != this.toDelete;
        });
        renderEntries();
        window.localStorage.removeItem("entries");
        window.localStorage.setItem("entries", JSON.stringify(entries));
    }
});

// the create entry button should open the create entry dialog
createEntryBtn.addEventListener("click", function() {
    document.body.style.backgroundColor = "lightgray";
    createDialog.open = true;
});

// when the page loads we want to load all the entries from localStorage and
// add them to the entries array. then we want to render the contents of the
// entries array to the screen
window.addEventListener("load", function() {
    entries = JSON.parse(window.localStorage.getItem("entries"));
    renderEntries();
});
