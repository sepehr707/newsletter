import {Request, Response} from "express";
import * as dataService from '../models/services';


export const addUser = (req: Request, res: Response) => {
  const mailAddress = req.body.mailAddress;
  const sendTime = +req.body.sendTime;
  const active = req.body.active !== undefined ? req.body.active : undefined;

  if(dataService.existedMailAddress(mailAddress)) {
    return res.status(500).send({message: 'Mail Address Existed'})
  }
  const user = dataService.insertUser(mailAddress, sendTime, active)
  res.send({user});
}

export const updateUser = (req: Request, res: Response) => {
  const id = +req.params.userId;
  const mailAddress = req.body.mailAddress;
  const sendTime = req.body.sendTime;
  const active = req.body.active !== undefined ? req.body.active : undefined;
  if(mailAddress && dataService.existedMailAddress(mailAddress)){
    return res.status(500).send({message: 'Mail Address Existed'});
  }

  const updated = dataService.updateUser({
    id: id,
    mailAddress: mailAddress,
    sendTime: sendTime,
    activeNewsletter: active
  })

  res.status(updated ? 200 : 500).send({updated: updated})
}

export const addUserNewsletters = (req: Request, res: Response) => {
  const userId = +req.params.userId;
  const urls = req.body.urls;
  console.log(typeof urls);
  const inserted = dataService.insertNewsletters(userId, urls)
  res.status(inserted ? 200 : 500).send({inserted: inserted});
}

export const resetNewsletters = (req: Request, res: Response) => {
  const userId = +req.params.userId;
  const urls = req.body.urls;
  const updated = dataService.resetNewsletters(userId, urls);
  res.status(updated ? 200 : 500).send({updated: updated});
}

export const setNewsletterSentTime = (req: Request, res: Response) => {
  const id = +req.params.userId;
  const sendTime = req.body.sendTime;
  const updated = dataService.updateUser({
    id: id,
    sendTime: sendTime
  })
  res.status(updated ? 200 : 500).send({updated: updated});
}

export const deleteNewsletters = (req: Request, res: Response) => {
  const userId = +req.params.userId;
  const urls = req.body.urls;
  const deleted = dataService.deleteNewsletters(userId, urls);
  res.status(deleted ? 200 : 500).send({deleted: deleted});
}

export const userFavorites = (req: Request, res: Response) => {
  const userId = +req.params.userId

  const report = dataService.userFavoriteNewsletters(userId);
  res.send({report});
}

export const sentMailsReport = (req: Request, res: Response) => {
  const report = dataService.sentMailsReport();

  res.send(report);
}
