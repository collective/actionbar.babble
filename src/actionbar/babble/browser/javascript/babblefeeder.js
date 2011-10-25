function render_chatbox(chat_id) {
    // chat_id: A string that is unique to this chatbox.
    var cookie = jQuery.cookie('chats-open-'+username);
    var open_chats = [];
    if (cookie) {
        open_chats = cookie.split('|');
    }
    var hashed_id = hash(chat_id);
    var chatbox = jQuery('#'+hashed_id);
    if (chatbox.length) {
        if(chatbox.is(':visible')){
            chatbox.hide();
            open_chats.pop(chat_id);
            jQuery.cookie('chats-open-'+username, open_chats.join('|'), {path: '/'});
            reorderChats();
        }
        else {
            chatbox.show();
            open_chats.push(chat_id);
            jQuery.cookie('chats-open-'+username, open_chats.join('|'), {path: '/'});
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
                chat_id: chat_id,
                box_id: hashed_id,
                tzoffset: new Date().getTimezoneOffset()/60
                },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                log.error(textStatus);
                log.error(errorThrown);
            },
            success: function(data) {
                jQuery('body').append(data);
            }
        });
        open_chats.push(chat_id);
        jQuery.cookie('chats-open-'+username, open_chats.join('|'), {path: '/'});
        chatbox = jQuery('#'+hashed_id);
        positionNewChat(chatbox);
        chats.push(chat_id);
        chatbox.show();
    }
}

jQuery(document).ready(function() {
    jQuery("#chatpanel_online_users").click(function() {
        render_chatbox('actionbar_babble_online_contacts');
        return false; //Prevent browser jump to link anchor
    });
    jQuery("#chatpanel_chatrooms").click(function() {
        render_chatbox('actionbar_babble_chat_rooms');
        return false; //Prevent browser jump to link anchor
    });
});

