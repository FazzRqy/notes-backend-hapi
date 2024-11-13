const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title, tag, body } = request.payload;

  const id = nanoid(16);
  const createAt = new Date().toISOString();
  const updateAt = createAt;

  const newNote = { title, tag, body, id, createAt, updateAt, };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    //ress === response;
    const ress = h.response({
      status: 'success',
      message: 'catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    ress.code(201);
    return ress;
  }
  const ress = h.response({
    status: 'fail',
    message: 'catatan gagal ditambahkan',
  });
  ress.code(500);
  return ress;
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

module.exports = { addNoteHandler, getAllNotesHandler };