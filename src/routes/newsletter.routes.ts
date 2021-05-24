import express from "express";
import * as service from '../services/newsletter.services';

export const router = express.Router();

router.post('/addUser', service.addUser);

router.post('/addNewsletters/:userId', service.addUserNewsletters);

router.post('/resetNewsletters/:userId', service.resetNewsletters);

router.post('/setSentTime/:userId', service.setNewsletterSentTime);

router.patch('/updateUser/:userId', service.updateUser);

router.delete('/deleteNewsletters/:id', service.deleteNewsletters);

router.get('/userNewsletters/:userId', service.userFavorites);

router.get('/sentMailsReport', service.sentMailsReport);
