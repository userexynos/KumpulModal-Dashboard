export default {
    setCookie: function(data, email) {
        data = null;
        let date = new Date();
        date.setTime(date.getTime() + (3*60*60*1000))
        document.cookie = "email = "+ (email || "") + ";expires = "+date.toUTCString()+"; path = /"
    },
    getCookie: function() {
        let cookie = document.cookie.split(";")[0]
        return cookie.split("=")[1];
    },
    eraseCookie: function() {
        let date = new Date();
        date.setTime(date.getTime() + (-1*24*60*60*1000))
        document.cookie = "email = admin@kumpulmodal.com;expires = "+date.toUTCString()+"; path = /"
    },
    setTradersData: function({ commit }, data) {
        commit('setTraders', data);
    },
    setInvestorData: function({ commit }, data) {
        commit('setInvestor', data);
    },
    setCampaignData: function({ commit }, data) {
        commit('setCampaign', data);
    },
    setBanner: function({ commit }, data) {
        commit('setBanner', data);
    },
}