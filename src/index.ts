import 'module-alias/register'
import Bot from '@discord-ts-app/core/build/Bot'
import Env from '@discord-ts-app/core/build/Utils/Env'
import { Help } from 'App/Commands'
import { Ready, Message } from 'App/Events'
const Koa = require('koa')
const https = require('https')

Bot.registerCommands([Help]).registerEvents([Ready, Message]).registerMiddlewares([]).registerModules([]).initialize().login(Env.get('CLIENT_TOKEN'))

export default Bot

// Liveness
// const app = new Koa()

// app.use(async (ctx: any) => {
// 	ctx.status = 200
// 	ctx.body = 'Gitlab merge request bot'
// })

// app.listen(process.env.PORT)

// setInterval(() => {
// 	https.get('TODO')
// }, 1000 * 60 * 10)
