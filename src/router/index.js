import Vue from 'vue';
import Router from 'vue-router';

// Dashboard
import Dashboard from '../views/Dashboard.vue';

// Login
import Login from '../views/Login.vue';

// Not found
import NotFound from '../views/404.vue';

// Home
import Home from '@/components/Home.vue';

// Investor
import InvestorData from '@/components/Investor/InvestorData.vue';
import EditDataInvestor from '@/components/Investor/EditInvestor.vue';

// Trader
import TraderData from '@/components/Trader/TraderData.vue';
import AddTrader from '@/components/Trader/AddTrader.vue';
import EditDataTrader from '@/components/Trader/EditTrader.vue';

// Campaign
import Campaign from '@/components/Campaign/Campaign.vue';
import AddCampaign from '@/components/Campaign/AddCampaign.vue';
import EditDataCampign from '@/components/Campaign/EditCampaign.vue';

// History
import History from '@/components/History.vue';

// RedeemRequest
import RedeemRequest from '@/components/RedeemRequest.vue';

// Banner
import Banner from '@/components/Banner/BannerData.vue';
import AddBanner from '@/components/Banner/AddBanner.vue'
import EditBanner from '@/components/Banner/EditBanner.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: "*",
            redirect: "/404"
        },
        {
            path: "/404",
            component: NotFound,
            name: "notfound"
        },
        { 
            path: '/',
            component: Login,
            name: "login",
            meta: {
                title: "kumpulModal | Login"
            }
        },
        { 
            path: '/dashboard',
            component: Dashboard,
            name: "dashboard",
            children: [
                {
                    path: "/dashboard",
                    component: Home,
                    name: "home",
                    meta: {
                        title: "kumpulModal | Dashboard"
                    }
                },
                {
                    path: "/investor",
                    component: InvestorData,
                    name: "investor"
                },
                {
                    path: "/investor/:id",
                    component: EditDataInvestor,
                    name: "editDataInvestor"
                },
                {
                    path: "/pedagang",
                    component: TraderData,
                    name: "trader"
                },
                {
                    path: "/pedagang/add",
                    component: AddTrader,
                    name: "traderAdd"
                },
                {
                    path: "/pedagang/:id",
                    component: EditDataTrader,
                    name: "editDataTrader"
                },
                {
                    path: "/campaign",
                    component: Campaign,
                    name: "campaign"
                },
                {
                    path: "/campaign/add",
                    component: AddCampaign,
                    name: "campaignAdd"
                },
                {
                    path: "/campaign/:id",
                    component: EditDataCampign,
                    name: "editDataCampaign"
                },
                {
                    path: "/transaksi",
                    component: History,
                    name: "historyData"
                },
                {
                    path: "/tarik_dana",
                    component: RedeemRequest,
                    name: "redeemRequest"
                },
                {
                    path: "/banner",
                    component: Banner,
                    name: "bannerData"
                },
                {
                    path: "/banner/add",
                    component: AddBanner,
                    name: "addBanner"
                },
                {
                    path: "/banner/:id",
                    component: EditBanner,
                    name: "editBanner"
                }
            ]
        }
    ]
});