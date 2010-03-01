from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile
from babble.client import utils
from babble.client.browser.chat import ChatBox

class BabbleChatBox(ChatBox):
    """ Override the browser view from babble.client to enable us to have a
        separate template and style for the 'online contacts' box.
    """

    def render_chat_box(self, box_id, user, title):
        """ """
        if title == 'bottomfeeder_online_contacts':
            online_users = utils.get_online_contacts(self.context)
            template = ViewPageTemplateFile('templates/onlinecontacts.pt')
            return template(self, online_users=online_users)
        else:
            messages = utils.get_last_conversation(self.context, user, title)
            return  self.template(messages=messages, box_id=box_id, title=title)

