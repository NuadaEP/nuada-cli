/**
 * Use one file to make a job, the config of that job, usually, come from ./services
 */

// import Mail from '../services/Mail'

// export default class PurchaseMail {
//   public key (): string {
//     return 'PurchaseMail'
//   }

//   public async handle (job: any, done: any): Promise<any> {
//     const { ad, user, content } = job.data
//     await Mail.sendMail({
//       from: '"Your own marketplace" <your_own@marketplace.com>',
//       to: ad.author.email,
//       subject: `Buy notification: ${ad.title}`,
//       template: 'purchase',
//       context: {
//         user,
//         content,
//         ad
//       }
//     })

//     return done()
//   }
// }
