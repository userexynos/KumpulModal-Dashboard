export default {
    setTraders: function(state, data) {
        state.tradersData = [...data];
    },
    setCampaign: function(state, data) {
        state.campaignData = [...data];
    },
    setInvestor: function(state, data) {
        state.investorData = [...data];
    },
    setBanner: function(state, data) {
        state.bannerData = [...data];
    }
}