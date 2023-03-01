import {
    blogEntriesTable,
    blogEntryTemplate,
    editDialog,
    editEntryTitle,
    editEntryDate,
    editEntrySummary,
    deleteDialog,
    entries
} from './globalvars.js';

export function renderEntries() {
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
