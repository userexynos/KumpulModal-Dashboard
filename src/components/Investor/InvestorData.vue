<template>
    <div class="investor">
        <h3>
            Data Investor
        </h3>
        <div class="col-md ml-2 mr-2 mt-4 p-3 datatbl">
            <h5>
                Detail Investor
            </h5>
            <div class="ml-2 mr-2 mt-4">
                <v-client-table :data="data" :columns="columns" :options="options">
                    <template slot="image" slot-scope="props">
                        <img :src="props.row.profile_user.avatar" alt="" width="40" height="40">
                    </template>
                    <template slot="asset_value" slot-scope="props">
                        {{ props.row.portofolio_user.asset_value | currency }}
                    </template>
                    <template slot="net_gain_return" slot-scope="props">
                        {{ props.row.trader_user.net_gain_return | currency }}
                    </template>
                    <template slot="funds_available" slot-scope="props">
                        {{ props.row.portofolio_user.funds_available | currency }}
                    </template>
                    <template slot="image" slot-scope="props">
                        <img :src="props.row.profile_user.avatar" alt="" width="40" height="40">
                    </template>
                    <template slot="action" slot-scope="props">
                        <button @click.prevent="editInvestor(props.row.id)"><img src="assets/images/edit@3x.png" height="16"></button>
                    </template>
                </v-client-table>
            </div>
        </div>
    </div>
</template>
<script>
import JQuery from "jquery";
var $ = JQuery;
export default {
    created: async function() {
        let result = await this.server.get("users");
        await this.$store.dispatch('setInvestorData', result.data.data);

        this.data = result.data.data;
    },
    data: function() {
        return {
            data: this.$store.getters.getInvestor,
            columns: [ 'image', 'profile_user.fullname', 'email', 'profile_user.phone_number', 'asset_value', 'net_gain_return', 'funds_available', 'action' ],
            options: {
                filterByColumn: false,
                perPage: 10,
                filterable: [ 'profile_user.fullname', 'email' ],
                sortable: [ 'profile_user.fullname' ],
                texts: {
                    filter: '',
                    filterPlaceholder: 'Ketik kata kunci',
                    count: '',
                    noResults: 'Data masih kosong',
                },
                pagination: { 
                    chunk: 10,
                    dropdown: false
                },
                headings: {
                    image: "foto",
                    "profile_user.fullname": "Nama",
                    "profile_user.phone_number": "nomor hp",
                    "net_gain_return": "Net Gain Return",
                    "asset_value": "Nilai Asset",
                    "funds_available": "Dana Tersedia"
                }
            }
        }
    },
    methods: {
        editInvestor: function(id) {
            this.$router.push({ path: `/investor/${id}` })
        }
    },
    mounted: function() {
        this.$nextTick(function() {
            $('table').removeClass('table-bordered table-striped')
        })
    }
}
</script>
<style>
    
</style>