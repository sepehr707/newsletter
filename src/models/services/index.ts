import fs from 'fs';
import path from "path";
import {User} from "../user.model";
import {Newsletter} from "../newsletter.model";
import {SentMail} from "../sentMail.model";

const fileAddress = path.join(__dirname, '../../../', 'src', 'mockData');

const usersFile = path.join(fileAddress, 'users.json');
const newslettersFile = path.join(fileAddress, 'newsletters.json');
const sentMailsFile = path.join(fileAddress, 'sentMails.json');

export const insertUser = (mailAddress: string, sendTime?: number, active?: boolean): User => {
  const user: User = {
    id: newUserId(),
    mailAddress: mailAddress,
    sendTime: sendTime || 800,
    activeNewsletter: active !== undefined ? active : true
  }

  const users = getUsers();
  users.push(user);
  writeToUsers(users);

  return user;
}

export const updateUser = (user: User): boolean => {
  const users = getUsers();
  const index = users.findIndex(val => val.id === user.id);

  if (index < 0) {
    return false;
  }
  const currentUser = users[index]
  users[index] = {
    id: currentUser.id,
    mailAddress: user.mailAddress || currentUser.mailAddress,
    sendTime: user.sendTime || currentUser.sendTime,
    activeNewsletter: user.activeNewsletter !== undefined ? user.activeNewsletter : currentUser.activeNewsletter
  }

  writeToUsers(users);
  return true;

}

export const insertNewsletters = (userId: number, urls: string[]): boolean => {
  if (!existedUserId(userId)) {
    return false
  }

  const newsLetters = getNewsletters();
  const newUrls = urls.filter(url => !newsLetters.some(val => val.userId === userId && val.newsLetterUrl === url))

  if (newUrls.length === 0) {
    return false;
  }
  newUrls.forEach(url => newsLetters.push({
    userId: userId,
    newsLetterUrl: url
  }))
  writeToNewsletters(newsLetters);
  return true;
}

export const resetNewsletters = (userId: number, urls: string[]): boolean => {
  if (!existedUserId(userId) || urls.length === 0) {
    return false;
  }

  const newsletters = getNewsletters().filter(val => val.userId !== userId);
  urls.forEach(url => newsletters.push({
    userId: userId,
    newsLetterUrl: url
  }))
  writeToNewsletters(newsletters);
  return true;
}

export const deleteNewsletters = (userId: number, urls: string[]): boolean => {
  if (!existedUserId(userId) || urls.length === 0) {
    return false;
  }

  const newsletters = getNewsletters().filter(val => {
    return val.userId !== userId || (val.userId === userId && !urls.some(url => val.newsLetterUrl === url))
  })

  writeToNewsletters(newsletters);
  return true;
}

const newUserId = (): number => {
  const users = getUsers();
  return users.length > 0 ? Math.max(...(users.map(val => val.id))) + 1 : 1;
}

const existedUserId = (userId: number): boolean => {
  const users = getUsers();
  return users.findIndex(val => val.id === userId) > -1
}

export const existedMailAddress = (mailAddress: string) => {
  const users = getUsers();
  return users.findIndex(val => val.mailAddress === mailAddress) > -1
}

export const userFavoriteNewsletters = (userId: number) => {
  const user = getUsers().find(val => val.id === userId);
  const newsletters = getNewsletters().filter(val => val.userId === userId).map(val => val.newsLetterUrl);
  return {
    ...user, newsletters: [...newsletters]
  }
}

export const sendNewsletters = (time: number): boolean => {
  const users = getUsers().filter(val => val.sendTime === time && val.activeNewsletter);
  const newsletters = getNewsletters();
  const sentMails = getSentMails();
  const userNewsletters = users.map(user => {
    const urls = newsletters.filter(newsletter => newsletter.userId === user.id).map(val => val.newsLetterUrl)
    return {
      userId: user.id,
      urls: urls
    }
  })
  userNewsletters.forEach(user => {
    user.urls.forEach(url => {
      sentMails.push({
        userId: user.userId,
        newsletter: url,
        sent: true,
        sentTime: time
      })
    })
  })
  writeToSentMail(sentMails);
  return true;
}

export const sentMailsReport = () => {
  const sentMails = getSentMails();
  const users = getUsers().filter(user => sentMails.some(mail => mail.userId === user.id))

  return users.map(user => {
    return {
      userId: user.id,
      mailAddress: user.mailAddress,
      sentNewsletters: sentMails
        .filter(mail => mail.userId === user.id)
        .map(mail => {
          return {
            newsletter: mail.newsletter,
            time: getTime(mail.sentTime)
          }
        })
    }
  })
}

const getTime = (time: number): string => {
  const hh = String(Math.floor(time/100)).padStart(2, '0');
  const mm = String(time % 100).padStart(2, '0');

  return `${hh}:${mm}`;
}

const getUsers = (): Array<User> => {
  let users = new Array<User>();
  if (fs.existsSync(usersFile)) {
    users = JSON.parse(fs.readFileSync(usersFile, {encoding: "utf-8"}))
  }

  return users;
}

const getNewsletters = (): Array<Newsletter> => {
  let newsLetters = new Array<Newsletter>();
  if (fs.existsSync(newslettersFile)) {
    newsLetters = JSON.parse(fs.readFileSync(newslettersFile, {encoding: "utf-8"}))
  }

  return newsLetters;
}

const getSentMails = (): Array<SentMail> => {
  let sentMails = new Array<SentMail>();
  if (fs.existsSync(sentMailsFile)) {
    sentMails = JSON.parse(fs.readFileSync(sentMailsFile, {encoding: "utf-8"}))
  }

  return sentMails;
}

const writeToUsers = (users: Array<User>) => {
  fs.writeFileSync(usersFile, JSON.stringify(users));
}


const writeToNewsletters = (newsLetters: Array<Newsletter>) => {
  fs.writeFileSync(newslettersFile, JSON.stringify(newsLetters));
}


const writeToSentMail = (sentMails: Array<SentMail>) => {
  fs.writeFileSync(sentMailsFile, JSON.stringify(sentMails));
}
