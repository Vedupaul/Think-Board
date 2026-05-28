import Note from "../models/Notes.js";



export async function getAllNotes(req, res) {
    try{
       const notes = (await Note.find()).sort({ createdAt: -1 }); //-1 will sort in descending order newest first

        res.status(200).json(notes);
    }
    catch(error){
        console.error("Error in get allNotes controller:", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export async function getNotebyid(req,res){
  try{
    const note = await Note.findById(req.params.id);
    if(!note){
      return res.status(404).json({message: "Note not found"});
    }
    res.json(note);
  } catch (error) {
    console.error("Error in getNotebyid controller:", error);
    res.status(500).json({message: "Internal server error"});
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote controller:", error);
    res.status(500).json({message: "Internal server error"});
  }
};

export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const note = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in updateNote controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findByIdAndDelete(id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error in deleteNote controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
