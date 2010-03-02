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

    jQuery("#chatpanel").adjustPanel(); 

    //Each time the viewport is adjusted/resized, execute the function
    jQuery(window).resize(function () {
        jQuery("#chatpanel").adjustPanel();
    });

    //Click event outside of subpanel
    jQuery(document).click(function() { 
        jQuery(".subpanel").hide(); 
        jQuery("#footpanel li a").removeClass('active'); //remove active class on subpanel trigger
    });
    jQuery('.subpanel ul').click(function(e) {
        e.stopPropagation(); //Prevents the subpanel ul from closing on click
    });

    //Click event on Chat Panel
    jQuery("#chatpanel a:first").click(function() { 
        title = 'bottomfeeder_online_contacts';
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
            jQuery.ajax({
                url: "@@render_chat_box",
                cache: false,
                async: false,
                data: {
                    box_id: "chatbox_"+title,
                    user: username,
                    title: title,
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

    //Show/Hide delete icons on Alert Panel
    jQuery("#alertpanel li").hover(function() {
        jQuery(this).find("a.delete").css({'visibility': 'visible'}); //Show delete icon on hover
    },function() {
        jQuery(this).find("a.delete").css({'visibility': 'hidden'}); //Hide delete icon on hover out
    });
});


