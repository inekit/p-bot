const createKeyboard = require('../Keyboards/createKeyboard')
const titles = require('../Titles/titles')
const handleRestriction = (error = {}, group_id) => {

    console.log(error);
    const { code, description, on } = error 

    if(!on || !code || !description) return 

    const id = group_id || on?.payload?.chat_id

    if(id > 0) return 

    
}

module.exports = ({

	botName: async function () {return (await this.telegram.getMe()).username},

	sceneName: function() {console.log(ctx, this.scene, this.scene?.options); return this.scene?.options?.defaultSession?.current},

	setAdminLocale: function(language) {
		this.session.admin_locale = "ru"
	},

	switchAdminLocale: function() {
		this.session?.admin_locale === 'en' ? this.session.admin_locale = "ru" : this.session.admin_locale = "en"

		this.replyWithTitle('ADMIN_LOCALE_CHANGED',[this.session.admin_locale])
	},

	setTitle: function(title, value, language) { 

		return titles.setTitle(title, value) 
	},

	getTitle: function(title, options) { 

		return titles.getTitle(title, this.session?.language || 'ru', options) 
	},

	replyWithTitle: function(title, options) { 

		return this.replyWithHTML(this.getTitle(title, options), { disable_web_page_preview: true }).catch(handleRestriction)
	},

	replyWithKeyboard: async function(title, keyboard, options) { 

        console.log(keyboard)
		const extra = createKeyboard(keyboard, this)
		extra.disable_web_page_preview = true

		const response = await this.replyWithHTML(this.getTitle(title, options), extra).catch(handleRestriction)

		if(this.session) this.session.last_keyboard = response?.message_id

		return response
	},

	sendWithKeyboard: async function(chat_id,title, keyboard, options) { 

		const extra = Object.assign(createKeyboard(keyboard, this),{ parse_mode: 'HTML', disable_web_page_preview: true })
		extra.disable_web_page_preview = true

		const response = await this.telegram.sendMessage(chat_id, this.getTitle(title, options), extra).catch(handleRestriction)

		if(this.session) this.session.last_keyboard = response?.message_id

		return response
	},

	editKeyboard: async function(keyboard) { 

		const { reply_markup } = await createKeyboard(keyboard, this)

		return this.editMessageReplyMarkup(reply_markup).catch(e => {})
	},

	editMenu: async function(title, keyboard, options) { 

		const extra = { parse_mode: 'HTML', disable_web_page_preview: true }
		
		keyboard && Object.assign(extra, await createKeyboard(keyboard, this))

		return this.editMessageText(this.getTitle(title, options), extra).catch(e => {
			//console.log(e);
		})
	},




	sendCopyOpt: async function(from, message_id, keyboard) { 

		if(keyboard) {

			const extra = createKeyboard(keyboard, this)

			if(this.session) {

				const response = await this.telegram.copyMessage(this.chat.id, from, message_id, extra)

				this.session.last_keyboard = response?.message_id

				return
			}
			
			return this.telegram.copyMessage(this.chat.id, from, message_id, extra)
		} 

		return this.telegram.copyMessage(this.chat.id, from, message_id, { disable_web_page_preview: true })
	},

	getTitleOpt: function(title, language, options) { 

		return titles.getTitle(title, language, options) 
	},

	sendKeyboardOpt: function(id, title, keyboard, language, options) { 

		const opt_lang = language || 'ru'

		const extra = createKeyboard(keyboard, this)
		extra.parse_mode = 'HTML'
		
		return this.telegram.sendMessage(id, this.getTitleOpt(title, opt_lang, options), extra).catch(e => {})
	},

	editLastMenu: async function(title, keyboard, options) { 

		const extra = { parse_mode: 'HTML', disable_web_page_preview: true }
		
		if(keyboard) Object.assign(extra, await createKeyboard(keyboard, this))

		return this.telegram.editMessageText(this.chat.id, this.session.last_keyboard, undefined, this.getTitle(title, options), extra).catch(e => {})
	},

	editKeyboardOpt: async function(chat_id, message_id, keyboard) { 

		const { reply_markup } = await createKeyboard(keyboard, this)

		return this.telegram.editMessageReplyMarkup(chat_id, message_id, undefined, reply_markup)
	},

})