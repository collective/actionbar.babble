function updateOpenChatsCookie(username, title) {
    var cookie = jQuery.cookie('chats-open-'+username);
    if (cookie)
        var open_chats = cookie.split('|');
    else
        var open_chats = Array();
    open_chats.push(title);
    var new_cookie = open_chats.join('|');
    jQuery.cookie('chats-open-'+username, new_cookie, {path: '/'});
}

jQuery(document).ready(function() {

    jQuery("#chatpanel a:first").click(function() { 
        title = 'actionbar_babble_online_contacts';
        var chatbox = jQuery('#chatbox_'+title);
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
                    box_id: "chatbox_"+title,
                    contact: title,
                    },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    log.error(textStatus);
                    log.error(errorThrown);
                },
                success: function(data) {
                    jQuery('body').append(data);
                }
            });
            updateOpenChatsCookie(username, title);
            var chatbox = jQuery('#chatbox_'+title);
            positionNewChat(chatbox);
            chats.push(title);
            chatbox.show();
        }
        return false; //Prevent browser jump to link anchor
    });
});


