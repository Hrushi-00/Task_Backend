const router = require('express').Router();
const { createLead, getLeads, updateLead, deleteLead } = require('../controllers/leadController');

router.post('/createLead', createLead);
router.get('/getLeads', getLeads);
router.put('/updateLead/:id', updateLead);
router.delete('/deleteLead/:id', deleteLead);

module.exports = router;
