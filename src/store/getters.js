export default {
    getTraders: function(state) {
        return state.tradersData;
    },
    
    getCampaign: function(state) {
        return state.campaignData;
    },
    
    getInvestor: function(state) {
        return state.investorData;
    },
    
    getBanner: function(state) {
        return state.bannerData;
    },
    getCollectedTotal: function(state) {
        let total = 0;
        state.campaignData.map(function(item) {
            total += parseInt(item.collected_total)
        });
        
        switch(total.toString().length) {
            case 5:
                return total.toString().substr(0,2)+" Ribu";
            case 6: 
                return total.toString().substr(0,3)+" Ribu";
            case 7:
                return total.toString().substr(0,1)+" Jt";
            case 8: 
                return total.toString().substr(0,2)+" Jt";
            case 9: 
                return total.toString().substr(0,3)+" Jt";
            case 10:
                return total.toString().substr(0,1)+" M";
            case 11:
                return total.toString().substr(0,2)+" M";
        }
        return total;
    },
    
    getFundedTrader: function(state) {
        const data = state.campaignData.filter((item) => item.collected_total > 0);
        
        return data.length;
    },
    
    getTopCampaign: function(state) {
        const fromState = state.campaignData.filter((item) => item.status === "progress" || item.status === "done");
        let data = [];
        
        fromState.map((item) => data.push({ ...item, collected_total: parseInt(item.collected_total) }));
        return data.sort(function(a, b) {
            if ( b.collected_total < a.collected_total ) {
                return -1;
            }
            if ( b.collected_total > a.collected_total ) {
                return 1;
            }
            return 0;
        });
    },
    getUserTransaction: function(state) {
        const fromState = state.investorData;
        let dataTransaction = [];
        
        for(let i = 0; i < fromState.length; i++) {
            for(let ii = 0; ii < fromState[i].payment_transaction_user.length; ii++) {
                let campaign = state.campaignData.filter((item) => item.id === fromState[i].payment_transaction_user[ii].trader_id);
                dataTransaction.push(
                    { 
                        ...fromState[i].payment_transaction_user[ii], 
                        fullname: fromState[i].profile_user.fullname,
                        trader_name: campaign[0].title,
                        trader_return: campaign[0].detail_trader.return,
                        trader_contract: campaign[0].detail_trader.contract,
                    }
                );
            }
        }
        return dataTransaction;
    },
    getUserWithdraw: function(state) {
        const fromState = state.investorData;
        let dataWithdraw = [];
        
        for(let i = 0; i < fromState.length; i++) {
            for(let ii = 0; ii < fromState[i].withdraw_funds_user.length; ii++) {
                dataWithdraw.push(
                    {
                        ...fromState[i].withdraw_funds_user[ii], 
                        fullname: fromState[i].profile_user.fullname,
                    }
                );
            }
        }
        return dataWithdraw;
    }
}