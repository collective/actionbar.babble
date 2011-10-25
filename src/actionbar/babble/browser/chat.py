from zExceptions import NotFound
from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile
from babble.client import utils
from babble.client.browser.chat import ChatBox
from babble.client import config

class BabbleChatBox(ChatBox):
    """ Override the browser view from babble.client to enable us to have a
        separate template and style for the 'online contacts' box.
    """
    def render_chat_box(self, chat_id, box_id):
        """ """
        if chat_id == 'actionbar_babble_online_contacts':
            online_users = utils.get_online_members(self.context)
            template = ViewPageTemplateFile('templates/onlinecontacts.pt')
            return template(self, online_users=online_users, chat_id=chat_id, box_id=box_id)

        elif chat_id == 'actionbar_babble_chat_rooms':
            chatrooms = utils.get_chat_rooms(self.context)  
            template = ViewPageTemplateFile('templates/chatrooms.pt')
            return template(self, chatrooms=chatrooms, chat_id=chat_id, box_id=box_id)

        else:
            chat_type, audience = chat_id.split('_', 1)
            response = utils.get_last_conversation(
                                            self.context, 
                                            audience, 
                                            chat_type)

            if response['status'] != config.SUCCESS:
                raise NotFound
            if chat_type == 'chatroom':
                messages = response['chatroom_messages']
            else:
                messages = response['messages']
            return self.template(
                            messages=messages, 
                            audience=audience,
                            box_id=box_id, 
                            chat_type=chat_type,
                            chat_id=chat_id ,)

