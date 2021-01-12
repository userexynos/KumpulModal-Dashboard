<template>
    <div class="data-body">
        <h3>
            Overview
        </h3>
        <div class="row mt-4">
            <!-- Dana Terkumpul -->
            <div class="card col m-3 pt-2">
                <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">Total Dana Terkumpul</h6>
                    <div class="row pl-3 mt-3">
                        <div>
                            <h3 class="card-title">{{ collectedTotal  }}</h3>
                        </div>
                        <img src="assets/images/dana-terkumpul.png" style="height: 40px; position: absolute; right: 20px; bottom: 30px">
                    </div>
                </div>
            </div>
            <!-- Total Pedagang Terdanai -->
            <div class="card col m-3 pt-2">
                <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">Total Pedagang Yang Terdanai</h6>
                    <div class="row pl-3 mt-3">
                        <div>
                            <h3 class="card-title">{{ fundedTraderTotal }} Orang</h3>
                        </div>
                        <img src="assets/images/pedagang-terdanai.png" style="height: 40px; position: absolute; right: 20px; bottom: 30px">
                    </div>
                </div>
            </div>
            <!-- Total Investasi -->
            <div class="card col m-3 pt-2">
                <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">Total Investasi</h6>
                    <div class="row pl-3 mt-3">
                        <div>
                            <h3 class="card-title">{{ dataInvestor.length }} Investor</h3>
                        </div>
                        <img src="assets/images/total-investor.png" style="height: 40px; position: absolute; right: 20px; bottom: 30px">
                    </div>
                </div>
            </div>
        </div>
        <!-- Content -->
        <div class="row mt-2">
            <!-- Top campaign -->
            <div class="col-md m-2 p-3 datatbl">
                <h5>
                    Top Campaign
                </h5>
                <!-- Jika dataCampaign masih kosong -->
                <div class="m-3" v-if="!dataCampaign.length">
                    <table class="table">
                        <thead>
                            <tr>
                                <th width="60%">Nama Campaign</th>
                                <th scope="col">Sisa Hari</th>
                                <th scope="col">Dana Terkumpul</th>
                            </tr>
                        </thead>
                    </table>
                    <div style="display: flex; justify-content: center; font-size: 12px">
                        Data masih kosong
                    </div>
                </div>
                <!-- Jika Tidak -->
                <div v-else>
                    <table class="table">
                        <thead>
                            <tr>
                                <th width="60%">Nama Campaign</th>
                                <th scope="col">Sisa Hari</th>
                                <th scope="col">Dana Terkumpul</th>
                            </tr>
                        </thead>
                        <!-- Jika dataCampaign ada lebih dari 5 item -->
                        <tbody v-if="dataCampaign.length > 5">
                            <tr v-for="i in 5" :key="i-1">    
                                <td>
                                    <img :src="dataCampaign[i-1].image" style="width: 50px; height: 50px;">
                                    <span class="ml-2">{{ dataCampaign[i-1].title.length > 39 ? dataCampaign[i-1].title.substr(0,39)+" ..." : dataCampaign[i-1].title }}</span>
                                </td>
                                <td class="pt-4">{{ dataCampaign[i-1].days_left }} Hari</td>
                                <td class="pt-4">{{ dataCampaign[i-1].collected_total | currency }}</td>
                            </tr>
                        </tbody>
                        <!-- Jika Tidak -->
                        <tbody v-else>
                            <tr v-for="(item, index) in dataCampaign" :key="index">    
                                <td>
                                    <img :src="item.image" style="width: 50px; height: 50px;">
                                    <span class="ml-2">{{ item.title }}</span>
                                </td>
                                <td class="pt-4">{{ item.days_left }}</td>
                                <td class="pt-4">{{ item.collected_total | currency }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- Jika dataCampaign lebih dari 5 items maka tampilkan -->
                    <div v-if="dataCampaign.length > 5" style="display: flex; justify-content: center">
                        <router-link class="text-dark" to="/campaign" tag="a">Selengkapnya</router-link>
                    </div>
                </div>
            </div>
            <!-- Top Investor -->
            <div class="col-md-4 mt-2 p-2">
                <div class="datatbl2 p-3" v-if="dataInvestor.length">
                    <h5>
                        Top Investor
                    </h5>
                    <!-- Jika datainvestor lebih dari 5 items -->
                    <div v-if="dataInvestor.length >= 5">
                        <div class="row p-3" v-for="i in 5" :key="i">
                            <img src="assets/images/avatar-1@3x.png" class="invest-image">
                            <div class="ml-2">
                                <span class="d-block invest-name">
                                    David Lee
                                </span>
                                <span class="d-block invest-detail">
                                    5 Pedagang
                                </span>
                            </div>
                            <div class="invest-total-right">
                                <span class="invest-total">
                                    Rp 2.500.000
                                </span>
                            </div>
                        </div>
                    </div>
                    <div v-if="dataInvestor.length <= 5">
                        <div class="row p-3" v-for="(item, index) in dataInvestor" :key="index">
                            <img :src="item.profile_user.avatar" class="invest-image">
                            <div class="ml-2">
                                <span class="d-block invest-name">
                                    {{ item.profile_user.fullname }}
                                </span>
                                <span class="d-block invest-detail">
                                    1 Pedagang
                                </span>
                            </div>
                            <div class="invest-total-right">
                                <span class="invest-total">
                                    {{ item.portofolio_user.asset_value | currency }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="datatbl2 p-3" v-else>
                    <h5>
                        Top Investor
                    </h5>
                    <div class="row p-3">
                        <div class="mt-3" style="display: flex; justify-content: center; width: 100%">
                            Belum ada investor
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <span>
                KumpulModal All right reserved
            </span>
        </div>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            collectedTotal: this.$store.getters.getCollectedTotal,
            fundedTraderTotal: this.$store.getters.getFundedTrader,
            dataCampaign: this.$store.getters.getTopCampaign,
            dataInvestor: this.$store.getters.getInvestor
        }
    }
}
</script>
<style>
    th {
        font-size: 14px;
        color: rgba(0,0,0,0.7)
    }
    td {
        font-size: 13px;
    }
</style>