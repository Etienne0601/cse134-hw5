import {
    okButtons,
    cancelButtons,
    createDialogForm,
    editDialogForm,
    deleteDialogForm,
    createEntryBtn,
    createDialog,
    editEntryTitle,
    editEntryDate,
    editEntrySummary,
    createEntryTitle,
    createEntryDate,
    createEntrySummary,
    nextEntryId,
    entries,
    setEntries,
    incrNextEntryId
} from './globalvars.js';

import {renderEntries} from './display.js';

// pre-populate the data store with an array of 2 blog entries if it's empty
if (!window.localStorage.getItem("entries")) {
    window.localStorage.setItem("entries", JSON.stringify([
        {
            id: 1,
            title: "Duck Pond",
            date: "2009-07-16",
            summary: "Today I rode my bike to the duck pond and then I stared at ducks for 7 hours."
        },
        {
            id: 2,
            title: "School Project",
            date: "2010-02-22",
            summary: "Today I finished my 7 year long research project about ducks."
        }
    ]));
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
            title: DOMPurify.sanitize(createEntryTitle.value),
            date: DOMPurify.sanitize(createEntryDate.value),
            summary: DOMPurify.sanitize(createEntrySummary.value)
        });
        incrNextEntryId();
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
                entry.title = DOMPurify.sanitize(editEntryTitle.value);
                entry.date = DOMPurify.sanitize(editEntryDate.value);
                entry.summary = DOMPurify.sanitize(editEntrySummary.value);
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
        setEntries(entries.filter(item => {
            return item.id != this.toDelete;
        }));
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
    setEntries(JSON.parse(window.localStorage.getItem("entries")));
    renderEntries();
});
