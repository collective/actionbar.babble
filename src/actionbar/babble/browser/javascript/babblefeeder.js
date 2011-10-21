function render_chatbox(name, prefix) {
    var cookie = jQuery.cookie('chats-open-'+username);
    var open_chats = [];
    if (cookie) {
        open_chats = cookie.split('|');
    }
    var chatbox_id = prefix+'_'+name;
    var chatbox = jQuery('#'+chatbox_id);
    if (chatbox.length) {
        if(chatbox.is(':visible')){
            chatbox.hide();
            open_chats.pop(chatbox_id);
            jQuery.cookie('chats-open-'+username, open_chats.join('|'), {path: '/'});
            reorderChats();
        }
        else {
            chatbox.show();
            open_chats.push(chatbox_id);
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
                box_id: chatbox_id,
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
        open_chats.push(chatbox_id);
        jQuery.cookie('chats-open-'+username, open_chats.join('|'), {path: '/'});
        chatbox = jQuery('#'+chatbox_id);
        positionNewChat(chatbox);
        chats.push(chatbox_id);
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

