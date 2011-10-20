function updateOpenChatsCookie(username, title) {
    var cookie = jQuery.cookie('chats-open-'+username);
    var open_chats = Array();
    if (cookie)
        var open_chats = cookie.split('|');
    open_chats.push(title);
    var new_cookie = open_chats.join('|');
    jQuery.cookie('chats-open-'+username, new_cookie, {path: '/'});
}

function render_chatbox(name, prefix) {
    var chatbox = jQuery('#'+prefix+'_'+name);
    if (chatbox.length) {
        if(chatbox.is(':visible')){
            chatbox.hide();
            reorderChats();
        }
        else {
            chatbox.show();
            reorderChats();
        }
    }
    else {
        path = sanitizePath('/@@render_chat_box');
        jQuery.ajax({
            url: path,
            cache: false,
            async: false,
            data: {
                box_id: prefix+"_"+name,
                contact: name,
                title: ''
                },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                log.error(textStatus);
                log.error(errorThrown);
            },
            success: function(data) {
                jQuery('body').append(data);
            }
        });
        updateOpenChatsCookie(username, name);
        chatbox = jQuery('#'+prefix+'_'+name);
        positionNewChat(chatbox);
        chats.push(name);
        chatbox.show();
    }
}


jQuery(document).ready(function() {
    jQuery("#chatpanel_online_users").click(function() {
        render_chatbox('actionbar_babble_online_contacts', 'chatbox');
        return false; //Prevent browser jump to link anchor
    });
    jQuery("#chatpanel_chatrooms").click(function() {
        render_chatbox('actionbar_babble_chat_rooms', 'chatroom');
        return false; //Prevent browser jump to link anchor
    });
});

