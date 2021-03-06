const express = require('express');
const router = express.Router()
const Author = require('../model/author')

// all author route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
      searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
      const authors = await Author.find(searchOptions)
      res.render('authors/index', {
        authors: authors,
        searchOptions: req.query
      })
    } catch {
      res.redirect('/')
    }
  })
  

// new author route

router.get('/new', (req, res)=>{
    res.render('authors/new', {author: new Author() })
})

// creating a new author route

router.post('/', async (req , res)=>{
    const author = new Author({
        name: req.body.name 
    })
    try{
        const newAuthor = await author.save()
            // res.redirect(`author/${newAuthor.id}`)
            res.redirect('authors')
    }
    catch{
          res.render('authors/new',{
            author: author,
            errorMessage: "Error Creating Author" 
          })
        }
    })
    
    // same code without asyn await 

    // author.save((err ,newAuthor)=>{
    //     if(err){
    //         res.render('authors/new',{
    //             author: author,
    //             errorMessage: "Error Creating Author" 
    //         })
    //     }else{
    //         // res.redirect(`author/${newAuthor.id}`)
    //         res.redirect('authors')
    //     }
    // })

module.exports = router