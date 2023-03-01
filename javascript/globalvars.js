export const blogEntryTemplate = document.getElementById("blog-entry");

export const createDialog = document.getElementById("create-dialog");
export const editDialog = document.getElementById("edit-dialog");
export const deleteDialog = document.getElementById("delete-dialog");

export const createEntryBtn = document.getElementById("create-entry-button");
export const createDialogForm = document.getElementById("create-dialog-form");
export const createEntryTitle = document.getElementById("create-entry-title");
export const createEntryDate = document.getElementById("create-entry-date");
export const createEntrySummary = document.getElementById("create-entry-summary");

export const editDialogForm = document.getElementById("edit-dialog-form");
export const editEntryTitle = document.getElementById("edit-entry-title");
export const editEntryDate = document.getElementById("edit-entry-date");
export const editEntrySummary = document.getElementById("edit-entry-summary");

export const deleteDialogForm = document.getElementById("delete-dialog-form");

export const blogEntriesTable = document.getElementById("blog-entries");

export const okButtons = document.querySelectorAll(".ok-buttons");
export const cancelButtons = document.querySelectorAll(".cancel-buttons");

export let nextEntryId = 3;
export function incrNextEntryId() {
    ++nextEntryId;
}

export let entries = [];
export function setEntries(e) {
    entries = e;
}
