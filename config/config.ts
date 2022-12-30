
export function lookup_list_config(){
    return [
        // 'setting.json','modlist.json'
        {name:'setting.json',lookup_field:['stardew_location','hidden_tags','shown_tags']},
        {name:'modlist.json',lookup_field:['modlist']},
    ]
}

export function lookup_list_config_create(){
    return [
        // 'setting.json','modlist.json'
        {name:'setting.json',lookup_field:[{name:'stardew_location',init:""},{name:'hidden_tags',init:[]},{name:'shown_tags',init:""}]},
        {name:'modlist.json',lookup_field:[{name:'modlist',init:[]}]},
    ]
}

export function setting_location_config(){
    return `./setting`
}

export function logs_location_config(){
    return {
        main:`./logs`,
        modlist:`./logs/modlist`
    }
}

export function mode_menu_menulist(){
    return [
        'create',
        'read',
        'update',
        'delete',
    ]
}