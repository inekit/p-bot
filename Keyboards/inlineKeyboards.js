const { Markup } = require('telegraf')

const callbackButton = Markup.button.callback
const { inlineKeyboard } = Markup



exports.offers_alp_list_keyboard = (ctx, offers) => {

    const keyboard = inlineKeyboard(offers.map(({ order_id, alpinist_id, header }) => callbackButton(header ?? "default", `order-${order_id}-${alpinist_id}`)), { columns: 2 })

    return keyboard
}

exports.shedle_keyboard = (ctx, shedle) => {

    const keyboard = inlineKeyboard(shedle.map(({ id, header, type }) => 
    callbackButton(header ?? "default", `${type}-${id}`)), { columns: 2 })

    keyboard.reply_markup.inline_keyboard.push(
        [callbackButton(ctx.getTitle('ADD_SHEDLE_ENTRY'), 'addShedleEntry')]
    )

    return keyboard
}

exports.orders_list_keyboard = (ctx, orders) => {

    const keyboard = inlineKeyboard(orders.map(({ order_id, header }) => callbackButton(header ?? "default", "order-"+order_id)), { columns: 2 })

    keyboard.reply_markup.inline_keyboard.push(
        [callbackButton(ctx.getTitle('BUTTON_ADD_ORDER'), 'add')]
    )

    return keyboard
}



exports.confirm_cert_keyboard = (ctx, cert_id) => {

    //console.log(ctx,cert_id)

    const keyboard = inlineKeyboard([
        callbackButton(ctx.getTitle('BUTTON_APPROVE'), 'approve-'+cert_id),
    callbackButton(ctx.getTitle('BUTTON_DELETE'), 'delete-'+cert_id),
    callbackButton(ctx.getTitle('BUTTON_SKIP'), 'skip-'+cert_id),
])

    return keyboard
}

exports.claim_keyboard = (ctx, claim_id) => {

    const keyboard = inlineKeyboard([
        callbackButton(ctx.getTitle('BUTTON_SEND_RES'), 'sendres-'+claim_id),
    callbackButton(ctx.getTitle('BUTTON_SKIP'), 'skip-'+claim_id),
])

    return keyboard
}


exports.alpinists_list_keyboard = (ctx, alpinists) => {

    const keyboard = inlineKeyboard(alpinists.map(({ alpinist_id, name }) => callbackButton(name ?? "default", alpinist_id)), { columns: 2 })

    return keyboard
}

exports.admins_actions_keyboard = (ctx ) => {

    const keyboard = inlineKeyboard([
        callbackButton(ctx.getTitle("BUTTON_ADD_ADMIN"), 'addAdmin'),
        callbackButton(ctx.getTitle("BUTTON_DELETE_ADMIN"), 'deleteAdmin')
    ], { columns: 2 })

    return keyboard
}


exports.admins_list_keyboard = (ctx, admins) => {

    const keyboard = inlineKeyboard(admins.map(({ admin_id, name }) => callbackButton(admin_id, "admin-"+admin_id)), { columns: 2 })

    return keyboard
}

exports.alpinists_list_keyboard = (ctx, alpinists) => {

    const keyboard = inlineKeyboard(alpinists.map(({ alpinist_id, name }) => callbackButton(name ?? "default", alpinist_id)), { columns: 2 })

    return keyboard
}

exports.add_delete_keyboard = (ctx ) => {

    const keyboard = inlineKeyboard([
        callbackButton("ADD", 'add'),
        callbackButton("DELETE", 'delete')
    ], { columns: 2 })

    return keyboard
}

exports.back_comment_keyboard = (ctx ) => {

    const keyboard = inlineKeyboard([
        callbackButton("ADD_COMMENT", 'add_comment'),
        callbackButton("SUBMIT", 'submit')
    ], { columns: 2 })

    return keyboard
}

exports.clients_list_keyboard = (ctx, clients) => {

    const keyboard = inlineKeyboard(clients.map(({ client_id, name }) => callbackButton(name, "client-"+client_id)), { columns: 2 })

    keyboard.reply_markup.inline_keyboard.push(
        [callbackButton(ctx.getTitle('BUTTON_ADD_CLIENT'), 'addClient')]
    )

    return keyboard
}

exports.ads_list_keyboard = (ctx, ads) => {
    const keyboard = inlineKeyboard(ads.map(({ add_id, header }) => callbackButton(header, "add-"+add_id)), { columns: 2 })

    keyboard.reply_markup.inline_keyboard.push(
        [callbackButton(ctx.getTitle('BUTTON_ADD_ADD'), 'addAdd')]
    )

    return keyboard
}

exports.offers_list_keyboard = (ctx, offers) => {

    console.log("its me")

    const keyboard = inlineKeyboard(offers.map(({ name, alpinist_id, rate, efficienty, client_focus, accuracy, orders_count, comment, backOfferPrice }) => 
     callbackButton(
         `${comment ? "Усл": ""} ${name.length < 25 ? name : (name.substr(0,25)+'..')} ${orders_count === 0 ? "св." : "зан."} ${rate} ${efficienty} ${client_focus} ${accuracy}`
        , comment ? ("backBackOffer-"+alpinist_id) : ("setlead-"+alpinist_id))), { columns: 1 })

    return keyboard
}

exports.alpinists_to_offer_keyboard = (ctx, alpinists) => {

    console.log(alpinists)

    const keyboard = inlineKeyboard(alpinists.map(({ name, alpinist_id, selected, rate, efficienty, client_focus, accuracy, orders_count }) => 
     callbackButton(
         `${selected ? "✅" : ""} ${name.length < 25 ? name : (name.substr(0,25)+'..')} ${orders_count === 0 ? "св." : "зан."} ${rate} ${efficienty} ${client_focus} ${accuracy}`
        , "toogle-"+alpinist_id)), { columns: 1 })

    keyboard.reply_markup.inline_keyboard.push(
        [callbackButton(ctx.getTitle('CONFIRM'), 'confirm')]
    )

    return keyboard
}





exports.custom_keyboard = (ctx, bNames, bLinks) => {

    let k=inlineKeyboard([])

    if (bNames.length!=bLinks.length) return k;

    bNames.forEach((name,id)=>{
        k.reply_markup.inline_keyboard.push([callbackButton(ctx.getTitle(name), bLinks[id])])
    })

    return k;
}

exports.ctype_keyboard = (ctx, cTypes) => {

    return this.dictionary_keyboard(cTypes, 'ctype')
}
exports.comm_type_keyboard = (ctx, commTypes) => {

    return this.dictionary_keyboard(commTypes, 'commtype')
}
exports.etype_keyboard = (ctx, eTypes) => {

    return this.dictionary_keyboard(eTypes, 'etype')
}
exports.add_works_keyboard = (ctx, works) => {

    let k = this.dictionary_keyboard(works, 'work')

    if (ctx.scene.state.input?.works) 
     k.reply_markup.inline_keyboard.push([callbackButton(ctx.getTitle("BUTTON_ENOUGH"), 'confirm')])

    return k
}
exports.dictionary_keyboard = (dictionary, tag)=> {
    let k=inlineKeyboard([], { columns: 2 })

    dictionary.forEach((type_name,id)=>{
        k.reply_markup.inline_keyboard.push([callbackButton(type_name, `${tag}-${id}`)])
    })

    return k;
}


exports.skip_keyboard = (ctx) => this.custom_keyboard(ctx,["SKIP"],["skip"])

exports.t_opportunity_keyboard = (ctx) => this.custom_keyboard(ctx,["BUTTON_CITY", "BUTTON_REGION", "NO"],["city","region", "0"])


exports.payment_type_keyboard= (ctx) => inlineKeyboard([
    
    callbackButton(ctx.getTitle('BUTTON_PAY_AGENT'), 'pay_agent'),
    callbackButton(ctx.getTitle('BUTTON_PAY_ALPINIST'), 'pay_alpinist'),


], { columns: 1 })

exports.template_keyboard= (ctx) => inlineKeyboard([
    
    callbackButton(ctx.getTitle('START_NEW'), 'start_new'),
    callbackButton(ctx.getTitle('CONTINUE'), 'continue'),


], { columns: 1 })


exports.choose_c_keyboard = (ctx) => inlineKeyboard([
        
        callbackButton(ctx.getTitle('BUTTON_CHANGE_REGION'), 'region'),
        callbackButton(ctx.getTitle('BUTTON_CHANGE_CITY'), 'city'),
        callbackButton(ctx.getTitle('BUTTON_CHANGE_DISTRICT'), 'district'),
        callbackButton(ctx.getTitle('BUTTON_CHANGE_ADDRESS'), 'address'),
        callbackButton(ctx.getTitle('BUTTON_CONFIRM'), 'confirm'),

    
    ], { columns: 1 })

exports.choose_city_keyboard = (ctx) => inlineKeyboard([
    
    callbackButton(ctx.getTitle('BUTTON_CHANGE_REGION'), 'region'),
    callbackButton(ctx.getTitle('BUTTON_CHANGE_CITY'), 'city'),
    callbackButton(ctx.getTitle('BUTTON_CONFIRM'), 'confirm'),


], { columns: 1 })

exports.rates_keyboard = (ctx) => this.custom_keyboard(ctx,
    ["BUTTON_5S", "BUTTON_4S", "BUTTON_3S","BUTTON_2S","BUTTON_1S"],
    ["rate-5","rate-4","rate-3","rate-2","rate-1"])


exports.previous_step_keyboard = (ctx) => this.custom_keyboard(ctx,["BUTTON_PREVIOUS"],["previous_step"])

exports.greetings_keyboard = (ctx) => this.custom_keyboard(ctx,["IUNDERSTOOD"],["confirm"])

exports.greetings_fin_keyboard = (ctx) => this.custom_keyboard(ctx,["FIN"],["fin"])

exports.skip_previous_keyboard = (ctx) => inlineKeyboard([
        
    callbackButton(ctx.getTitle('BUTTON_PREVIOUS'), 'previous_step'),
    callbackButton(ctx.getTitle('BUTTON_SKIP'), 'skip'),


], { columns: 2 })


exports.client_actions_keyboard = (ctx) => this.custom_keyboard(ctx,["BUTTON_UPDATE", "BUTTON_DELETE"],
 ["update_client","delete_client"])

 exports.fine_keyboard = (ctx) => this.custom_keyboard(ctx,["BUTTON_CONFIRM", "BUTTON_REFUSE","BUTTON_CANCEL"],
 ["status-true","status-false","cancel"])

 exports.order_actions_keyboard = (ctx, status) => {

    console.log(status)
    const keyboard = inlineKeyboard([], { columns: 2 })

    if (!status) keyboard.reply_markup.inline_keyboard.push([
        callbackButton(ctx.getTitle("BUTTON_UPDATE"), 'update_order'),
        callbackButton(ctx.getTitle("BUTTON_SEND_ORDER"), 'send_order'),
        callbackButton(ctx.getTitle('BUTTON_DELETE'), 'delete_order')

    ]) 
    else if (status === 'issued') keyboard.reply_markup.inline_keyboard.push([
        callbackButton(ctx.getTitle("BUTTON_ADD_CLAIM"), 'add_claim'),
        callbackButton(ctx.getTitle("BUTTON_SEND_ORDER"), 'send_order'),
        callbackButton(ctx.getTitle('BUTTON_DELETE'), 'delete_order')

    ])
    else if (status === 'leadset') keyboard.reply_markup.inline_keyboard.push([
        callbackButton(ctx.getTitle("BUTTON_ADD_CLAIM"), 'add_claim'),
    ])
    else if (status === 'gotMoney') keyboard.reply_markup.inline_keyboard.push([
        callbackButton(ctx.getTitle("BUTTON_ADD_CLAIM"), 'add_claim'),
        callbackButton(ctx.getTitle("BUTTON_SET_COMPLETED"), 'set_completed'),
    ])

    return keyboard
}

exports.order_client_actions_keyboard = (ctx, status) => {

    const keyboard = inlineKeyboard([], { columns: 2 })

    if (status === 'leadset') keyboard.reply_markup.inline_keyboard.push([
        callbackButton(ctx.getTitle("SET_COMPLETED"), 'set_completed'),
        callbackButton(ctx.getTitle("ADD_CLAIM"), 'add_claim'),

    ])
    else if (status === 'gotMoney') keyboard.reply_markup.inline_keyboard.push([
    ])

    return keyboard
}

 exports.update_order_keyboard = (ctx) => this.custom_keyboard(ctx,
    ['BUTTON_ORDER_HEADER','BUTTON_ORDER_START',
     'BUTTON_ORDER_CONTENT', 'BUTTON_ORDER_ADRESS','BUTTON_ORDER_PRICE', 'BUTTON_ORDER_COMISSION', 'BUTTON_ORDER_PTYPE',
     'BUTTON_ORDER_WORKS', 'BUTTON_ORDER_FILES'],
    ['update_header','update_dtime_start','update_content', 'update_address', 
     'update_price', 'update_comission', 'update_payment_type', 'update_works','update_files'])

 exports.client_settings_keyboard = (ctx) => this.custom_keyboard(ctx,["NAME", "CONTRACT_TYPE", "CONTACTS"],
 ["update_name","update_contract_type", "update_contacts"])

 exports.update_keyboard = (ctx) => this.custom_keyboard(ctx,["BUTTON_RELOAD"],
 ["reload"])

 

exports.confirm_cancel_keyboard = (ctx) => inlineKeyboard([

    callbackButton(ctx.getTitle('BUTTON_CONFIRM'), 'confirm'),
    callbackButton(ctx.getTitle('BUTTON_CANCEL'), 'cancel')

], { columns: 1 })

exports.send_to_alp_keyboard = (ctx) => inlineKeyboard([

    callbackButton(ctx.getTitle('BUTTON_CONFIRM'), 'back'),
    callbackButton(ctx.getTitle('BUTTON_SEND_TO_ALPINISTS'), 'send_to_alpinists')

], { columns: 1 })


exports.go_back_keyboard = (ctx) => inlineKeyboard([

    callbackButton(ctx.getTitle('BUTTON_GO_BACK'), 'go_back')
])



exports.skip_keyboard = (ctx) => inlineKeyboard([

    callbackButton(ctx.getTitle('BUTTON_SKIP'), 'skip')
])

exports.cancel_keyboard = (ctx) => inlineKeyboard([

    callbackButton(ctx.getTitle('BUTTON_CANCEL'), 'cancel')
])

exports.confirm_keyboard = (ctx) => inlineKeyboard([

    callbackButton(ctx.getTitle('BUTTON_CONFIRM'), 'confirm')
])

exports.confirm_bbo_keyboard = (ctx) => inlineKeyboard([

    callbackButton(ctx.getTitle('BUTTON_CONFIRM'), 'confirm_bbo')
])

exports.enough_keyboard = (ctx) => inlineKeyboard([

    callbackButton(ctx.getTitle('BUTTON_ENOUGH'), 'confirm')
])

exports.confirm_add_client_keyboard = (ctx) => inlineKeyboard([

    //callbackButton(ctx.getTitle('BUTTON_CONFIRM'), 'confirm'),
    callbackButton(ctx.getTitle('BUTTON_ADD_CONTACT'), 'addContact')
])

exports.confirm_and_cert_keyboard = (ctx) => inlineKeyboard([

    callbackButton(ctx.getTitle('BUTTON_CONFIRM'), 'confirm'),
    callbackButton(ctx.getTitle('BUTTON_ADD_CERTIFICATE'), 'addCertificate')
])



exports.confirm_add_contact_comm_keyboard = (ctx) => inlineKeyboard([

    callbackButton(ctx.getTitle('BUTTON_CONFIRM'), 'confirm'),
    callbackButton(ctx.getTitle('BUTTON_ADD_METHOD'), 'addMethod'),
    callbackButton(ctx.getTitle('BUTTON_ADD_CONTACT'), 'addContact')
], { columns: 1 })

exports.add_delete_contact_comm_keyboard = (ctx, contacts) => {
    const keyboard = inlineKeyboard(contacts.map(({ contact_id, name }) => callbackButton(name, "contact-"+contact_id)), { columns: 2 })

    keyboard.reply_markup.inline_keyboard.push(
        [callbackButton(ctx.getTitle('BUTTON_ADD_CONTACT'), 'addContact')]
    )

    return keyboard
}

