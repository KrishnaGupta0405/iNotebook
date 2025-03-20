const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser"); // middleware to check if user is logged in or not
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
// using diffretnt types of request like put and get and post, will help to structure the app like on the same endpoint API we can do a lot of diffrent work just by chaing the request like from put to post or patch


// ROUTE:1, Add a new ntoe using: POST "/api/note/addnote", login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 1 }),
    body("description", "Enter atleast 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      // Check for validation errors of express-validators
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
      const { title, description, tag } = req.body;
      const note = new Note({ title, description, tag, user: req.user.id });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE:2, Get all the note using: GET "/api/note/fetchallnote", login required
router.get("/fetchallnote", fetchuser, async (req, res) => {
  try {
    const note = await Note.find({ user: req.user.id });
    // all notes reqgarding that particular user id
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE:3, update an existing noteusing: put "/api/note/updatenote", login required (POST request can also be used)

// we can use PATCH request in this project instead of PUT because :
// 1. PATCH as it name says, it updates only the data which we changed and doesn't sends whole payload.
// 2. PUT sends the whole body payload and pastes into the DB which might not be good for overall performance of the API when scaled it.

// Let's understand it with an example.

// There's a box of 3 colors RGB and say you want to replace red with white so you'll just replace that red bottle, right? So that's what PATCH does that it only updates that specific field by sending over the network. But PUT will change whole box with a new box with WGB colors which may increase the stress on network due to complete payload body if there's a heavy JSON transferred.
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    // obatine things using de-struturing
    const { title, description, tag } = req.body;
    // Crete a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    // that's it, we don't want user to update anything else like date...

    // find the note to be updated and update it
    let note = await Note.findById(req.params.id);

    // if that note does'nt exist, then it can't be updated
    if (!note) {
      return res.status(500).send("Notes not found");
    }
    // Allow upadtion if only that user owns that note...
    if (note.user.toString() != req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    // new:true basically tells that is something new come that yes update is..
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Internal Server Error");
  }
});

// ROUTE:4, Delete and existing Note using: DELETE "/api/note/deletenote",
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // find the note to be delted and delete it
    let note = await Note.findById(req.params.id);

    // if that note does'nt exist, then it can't be updated
    if (!note) {
      return res.status(500).send("Notes not found");
    }
    // Allow deletion if only that user owns that note...
    if (note.user.toString() != req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
