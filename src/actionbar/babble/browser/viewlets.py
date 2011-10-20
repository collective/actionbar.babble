from Products.CMFCore.utils import getToolByName
from babble.client import utils
from actionbar.panel.browser.viewlets import ActionViewlet

class ChatViewlet(ActionViewlet):
    """ """

    def get_num_online_contacts(self):
        """ Return one less to exclude the current user """
        # XXX: Consider a simple cache
        return len(utils.get_online_usernames(self.context))


class ChatRoomsViewlet(ActionViewlet):
    """ """

    def render(self):
        mtool = getToolByName(self.context, 'portal_membership')
        member = mtool.getAuthenticatedMember()
        catalog = getToolByName(self.context, 'portal_catalog')
        self.chatrooms = len(catalog(
                            portal_type='babble.client.chatroom',
                            allowedRolesAndUsers=member.getId()))
        
        if self.chatrooms:
            return self.index()

        return ''

