const express= require('express');

const router = express.Router();

const Checklist = require('../models/checklist');
const checklist = require('../models/checklist');

router.get('/',  async (req,res) => {
    try {

        let checklist = await Checklist.find({})
        res.status(200).render('checklists/index',{checklists:checklist})
    } catch (error) {
        res.status(500).render('checklists/new', {checklists: {...checklist, error}})
    }
})

router.post('/',  async (req,res) => {
    let {name} = req.body.checklist;
    let checklist = new Checklist({name})

    try {
        await checklist.save()
        res.redirect('/checklists')
        
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/new', async (req,res) => {
    try {

        let checklist = new Checklist();
        res.status(200).render('checklists/new',{checklist:checklist})
    } catch (error) {
        res.status(500).render('pages/error',{errors: 'Erro ao carregar o formulário'})
    }
});

router.get('/:id/edit', async (req,res) => {
    try {

        let checklist =  await Checklist.findById(req.params.id)
        res.status(200).render('checklists/edit',{checklist:checklist})
    } catch (error) {
        res.status(500).render('pages/error',{errors: 'Erro ao exibir a edição do formulário'})
    }
});



router.get('/:id', async (req,res) => {
    try {

        let checklist = await Checklist.findById(req.params.id).populate('tasks')
        res.status(200).render('checklists/show',{checklist:checklist})
    } catch (error) {
        res.status(500).render('pages/error',{error: 'Erro ao exibir as Listas de Tarefa'})
    }
});

router.put('/:id', async (req,res) => {

    let {name}= req.body.checklist;

    let checklist = await Checklist.findById(req.params.id)


    try {

        await checklist.updateOne({name})
        res.redirect('/checklists')
        
    } catch (error) {
        let errors = error.errors
        res.status(422).render('checklists/edit', {checklist: {...checklist,errors}})
    }
});

router.delete('/:id', async (req,res) => {
    try {

        let checklist = await Checklist.findByIdAndRemove(req.params.id )
        res.redirect('/checklists')
        
    } catch (error) {
        res.status(500).render('pages/error',{error: 'Erro ao deletar a Lista de Tarefas'})
    }
});



module.exports = router;