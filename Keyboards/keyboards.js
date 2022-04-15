const { Markup } = require('telegraf')



exports.agent_main_keyboard = (ctx, registered) => {

	const buttons = [
		[ 
			ctx.getTitle('BUTTON_ORDERS'),
			ctx.getTitle('BUTTON_CLIENTS')
		],
		[ 
			ctx.getTitle('BUTTON_AGENT_PROFILE'),
		],
		[ 
			ctx.getTitle('BUTTON_CHOOSE_ROLE'),
		],
	]

	return Markup.keyboard(buttons).resize()
}

exports.pay_agent_keyboard = (ctx) => Markup.keyboard([

	ctx.getTitle('BUTTON_PAY_AGENT_SUBSCRIPTION'),
	ctx.getTitle('BUTTON_CHOOSE_ROLE'),

], { columns: 1 }).resize()

exports.pay_alpinist_keyboard = (ctx) => Markup.keyboard([

	ctx.getTitle('BUTTON_PAY_ALPINIST_SUBSCRIPTION'),
	ctx.getTitle('BUTTON_CHOOSE_ROLE'),

], { columns: 1 }).resize()


exports.admin_main_keyboard = (ctx) => Markup.keyboard([

	[
		ctx.getTitle('BUTTON_ADD_ADD'),
	],
	[
		ctx.getTitle('BUTTON_CLAIMS'),
		ctx.getTitle('BUTTON_CONFIRM_USERS'),
		
	],
	[ 
		ctx.getTitle('BUTTON_ADMINS'),
	],
	[ 
		ctx.getTitle('BUTTON_CHOOSE_ROLE'),
	],

]).resize()

exports.alpinist_main_keyboard = (ctx) => {

	const buttons = [
		[ 
			ctx.getTitle('BUTTON_SHEDLE'),
		],
		[ 
			ctx.getTitle('BUTTON_OFFERS'),
		],
		[ 
			ctx.getTitle('BUTTON_ALPINIST_PROFILE'),

		],
		[ 
			ctx.getTitle('BUTTON_CHOOSE_ROLE'),
		],
		
	]

	return Markup.keyboard(buttons).resize()
} 


exports.main_keyboard = (ctx, isAgent,isAlpinist,isAdmin) => {

	const buttons = []

	buttons.push([ 
		ctx.getTitle(isAgent ? 'BUTTON_AGENT_MENU' : 'BUTTON_REGISTER_AGENT')
	])

    buttons.push([ 
		ctx.getTitle(isAlpinist ? 'BUTTON_ALPINIST_MENU' : 'BUTTON_REGISTER_ALPINIST')
	])

    if (isAdmin) buttons.push([ 
		ctx.getTitle('BUTTON_ADMIN_MENU')
	])

	return Markup.keyboard(buttons).resize()
} 



exports.main_menu_goback_keyboard = (ctx) => Markup.keyboard([

	ctx.getTitle('BUTTON_GO_BACK'),
	ctx.getTitle('BUTTON_MAIN_MENU')

], { columns: 1 }).resize()



exports.main_menu_back_keyboard = (ctx) => Markup.keyboard([ ctx.getTitle('BUTTON_CHOOSE_ROLE') ]).resize()

exports.agent_back_keyboard = (ctx) => Markup.keyboard([ ctx.getTitle('BUTTON_BACK_AGENT') ]).resize()

exports.alpinist_back_keyboard = (ctx) => Markup.keyboard([ ctx.getTitle('BUTTON_BACK_ALPINIST') ]).resize()

exports.admin_back_keyboard = (ctx) => Markup.keyboard([ ctx.getTitle('BUTTON_BACK_ADMIN') ]).resize()


exports.remove_keyboard = () => Markup.removeKeyboard()