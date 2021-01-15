<template>
    <div class="container-dashboard">
        <div class="side-nav">
            <div class="nav-header m-3">
                <span class="nav-title text-white">
                    KumpulModal
                </span>
            </div>
            <div class="nav-body">
                <ul class="navbar-nav">
                    <li :class="[ currentPage.includes('dashboard') ? activeClass+' nav-item pt-1 pb-1' : 'nav-item pt-1 pb-1' ]">
                        <router-link to="/dashboard" tag="a" class="nav-link pl-3">
                            <icons icon="home" class="mr-3"></icons>Home
                        </router-link>
                    </li>
                    <li :class="[ currentPage.includes('investor') ? activeClass+' nav-item pt-1 pb-1' : 'nav-item pt-1 pb-1' ]">
                        <router-link to="/investor" tag="a" class="nav-link pl-3">
                            <icons icon="user" class="mr-3"></icons> Data Investor
                        </router-link>
                    </li>
                    <li :class="[ currentPage.includes('pedagang') ? activeClass+' nav-item pt-1 pb-1' : 'nav-item pt-1 pb-1' ]">
                        <router-link to="/pedagang" tag="a" class="nav-link pl-3">
                            <icons icon="shopping-cart" class="mr-3"></icons>Data Pedagang
                        </router-link>
                    </li>
                    <li :class="[ currentPage.includes('campaign') ? activeClass+' nav-item pt-1 pb-1' : 'nav-item pt-1 pb-1' ]">
                        <router-link to="/campaign" tag="a" class="nav-link pl-3">
                            <icons icon="sticky-note" class="mr-3"></icons> Campaign
                        </router-link>
                    </li>
                    <li :class="[ currentPage.includes('transaksi') ? activeClass+' nav-item pt-1 pb-1' : 'nav-item pt-1 pb-1' ]">
                        <router-link to="/transaksi" tag="a" class="nav-link pl-3">
                            <icons icon="history" class="mr-3"></icons> Transaksi Investasi
                        </router-link>
                    </li>
                    <li :class="[ currentPage.includes('tarik_dana') ? activeClass+' nav-item pt-1 pb-1' : 'nav-item pt-1 pb-1' ]">
                        <router-link to="/tarik_dana" tag="a" class="nav-link pl-3">
                            <icons icon="exchange-alt" class="mr-3"></icons> Tarik Dana
                        </router-link>
                    </li>
                    <li :class="[ currentPage.includes('banner') ? activeClass+' nav-item pt-1 pb-1' : 'nav-item pt-1 pb-1' ]">
                        <router-link to="/banner" tag="a" class="nav-link pl-3">
                            <icons icon="edit" class="mr-3"></icons> Banner
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="side-content">
            <div class="content-header">
                <div class="ml-4">
                    <icons icon="search"></icons>
                    <input type="text" style="width: 500px; color:grey; border-bottom: none;" placeholder="Search Transaction, Invoice or Help">
                </div>
                <div style="position: absolute; right: 30px; display: flex; align-items: center">
                    <b-dropdown class="m-2" text="Administrator" variant="link" toggle-class="text-decoration-none text-dark toggleClass">
                        <b-dropdown-item @click="logout()" href="#">Logout</b-dropdown-item>
                    </b-dropdown>
                    <img src="/km-dash/assets/images/avatar-44.png" width="40" height="40">
                </div>
            </div>
            <div class="content-body" style="height: 100vh; display: flex; justify-content: center; align-items: center;" v-if="loading">
                Loading
            </div>
            <div class="content-body" v-else>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { faHome, faUser, faShoppingCart, faStickyNote, faSearch, faHistory, faExchangeAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
    library.add(faHome, faUser, faShoppingCart, faStickyNote, faSearch, faHistory, faExchangeAlt, faEdit )
    export default {
        beforeCreate: async function() {
            if(typeof await this.$store.dispatch("getCookie") === "undefined" || await this.$store.dispatch("getCookie") !== "admin@kumpulmodal.com") {
                this.$router.push('/');
            }
        },
        created: async function() {
            this.loading = true;
            try {
                let getTraderResult = await this.server.get("profile_trader");
                await this.$store.dispatch('setTradersData', getTraderResult.data.data);
                
                let getInvestorResult = await this.server.get("users");
                await this.$store.dispatch('setInvestorData', getInvestorResult.data.data);
                
                let getCampaignResult = await this.server.get("traders");
                await this.$store.dispatch('setCampaignData', getCampaignResult.data.data);
                
                let getBannerResult = await this.server.get("banners");
                await this.$store.dispatch('setBanner', getBannerResult.data.data);
                
                this.loading = false;
            } catch (err) {
                window.console.log(err)
            }
        },
        data: function() {
            return {
                activeClass: 'active',
                loading: false
            }
        },
        watch: function() {
            
        },
        computed: {
            currentPage: function() {
                return this.$route.path;
            }
        },
        methods: {
            logout: function() {
                this.$store.dispatch("eraseCookie")
                .then(() => this.$router.push({ path: '/' }))
                .catch((err) => window.console.log(err))
            }
        }
    }
</script>
<style> 

a {
    color: white;
    transition: ease-in-out .3s;
}

a:hover {
    color: rgba(255,255,255,0.6)
}

</style>