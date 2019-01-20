import express from 'express';
const bookRouter = express.Router();
app.get('/api/books', (req, res) => {
    res.json([
            {
                id: 1,
                title: "Alice's Adventures in Wonderland",
                author: "Charles Lutwidge Dodgson"
            },
            {
                id: 2,
                title: Einstein's Dreams",
                author: "Alan Lightman"
            }
        ])
})
app.get('/api/books/2', (req,res)=>{
    res.json(
            {
                id: 2,
                title: Einstein's Dreams",
                author: "Alan Lightman"
            }
        )
})
